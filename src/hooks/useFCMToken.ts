import { useEffect, useState, useCallback } from 'react';
import { messaging, getToken, onMessage } from '@/lib/firebase';
import { useRegisterDevice } from '@/api/hooks/NotificationHooks';
import useAppSelector from '@/hooks/useSelector';
import { useQueryClient } from '@tanstack/react-query';
import { keys } from '@/api/utils';

interface FCMTokenState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isRegistered: boolean;
  permissionStatus: NotificationPermission | null;
  serviceWorkerRegistered: boolean;
  isAuthenticated: boolean;
}

interface ErrorWithResponse {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

const useFCMToken = () => {
  const { isAuthenticated, token: authToken } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  
  const [fcmState, setFcmState] = useState<FCMTokenState>({
    token: null,
    isLoading: false,
    error: null,
    isRegistered: false,
    permissionStatus: null,
    serviceWorkerRegistered: false,
    isAuthenticated: false,
  });

  const registerDeviceMutation = useRegisterDevice();

  // Update authentication state
  useEffect(() => {
    setFcmState(prev => ({ ...prev, isAuthenticated }));
  }, [isAuthenticated]);

  const checkServiceWorkerRegistration = useCallback(async (): Promise<boolean> => {
    try {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered successfully:', registration);
        setFcmState(prev => ({ ...prev, serviceWorkerRegistered: true }));
        return true;
      } else {
        console.error('Service Worker not supported');
        setFcmState(prev => ({ 
          ...prev, 
          error: 'Service Worker not supported',
          serviceWorkerRegistered: false 
        }));
        return false;
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      setFcmState(prev => ({ 
        ...prev, 
        error: 'Service Worker registration failed',
        serviceWorkerRegistered: false 
      }));
      return false;
    }
  }, []);

  const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
      setFcmState(prev => ({ ...prev, permissionStatus: permission }));
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      setFcmState(prev => ({ ...prev, permissionStatus: 'denied' }));
      return false;
    }
  }, []);

  const setupForegroundMessageListener = useCallback(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      
      // Update notification count and list immediately
      queryClient.invalidateQueries({
        queryKey: [...keys.notifications.getNotificationCount()],
      });
      
      queryClient.invalidateQueries({
        queryKey: [...keys.notifications.getNotifications()],
      });
      
      // Show notification even when app is in foreground
      if (Notification.permission === 'granted') {
        const notificationTitle = payload.notification?.title || 'New Notification';
        const notificationOptions = {
          body: payload.notification?.body || 'You have a new message!',
          icon: payload.notification?.icon || '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
          tag: 'jiab-foreground-notification',
          requireInteraction: false,
          data: payload.data,
        };

        new Notification(notificationTitle, notificationOptions);
      }
    });

    return unsubscribe;
  }, [queryClient]);

  const generateFCMToken = useCallback(async (): Promise<string | null> => {
    if (!messaging) {
      console.error('Firebase messaging not initialized');
      setFcmState(prev => ({ 
        ...prev, 
        error: 'Firebase messaging not available',
        isLoading: false 
      }));
      return null;
    }

    try {
      setFcmState(prev => ({ ...prev, isLoading: true, error: null }));

      // Check service worker registration first
      const swRegistered = await checkServiceWorkerRegistration();
      if (!swRegistered) {
        setFcmState(prev => ({ ...prev, isLoading: false }));
        return null;
      }

      // Request notification permission
      const hasPermission = await requestNotificationPermission();
      if (!hasPermission) {
        setFcmState(prev => ({ 
          ...prev, 
          error: 'Notification permission denied',
          isLoading: false 
        }));
        return null;
      }

      // Generate FCM token
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });
      
      console.log('FCM Token generated:', token);

      if (token) {
        setFcmState(prev => ({ 
          ...prev, 
          token, 
          isLoading: false,
          error: null 
        }));
        
        // Store token in localStorage for persistence
        localStorage.setItem('fcm_token', token);
        
        // Setup foreground message listener
        setupForegroundMessageListener();
        
        return token;
      } else {
        setFcmState(prev => ({ 
          ...prev, 
          error: 'Failed to generate FCM token',
          isLoading: false 
        }));
        return null;
      }
    } catch (error) {
      console.error('Error generating FCM token:', error);
      setFcmState(prev => ({ 
        ...prev, 
        error: `Failed to generate FCM token: ${error}`,
        isLoading: false 
      }));
      return null;
    }
  }, [checkServiceWorkerRegistration, requestNotificationPermission, setupForegroundMessageListener]);

  const registerDeviceWithToken = useCallback(async (token: string): Promise<boolean> => {
    // Check authentication before attempting registration
    if (!isAuthenticated || !authToken) {
      console.error('User not authenticated, cannot register device');
      setFcmState(prev => ({ 
        ...prev, 
        error: 'User not authenticated. Please login first.' 
      }));
      return false;
    }

    try {
      console.log('Registering device with token:', token);
      console.log('Authentication status:', { isAuthenticated, hasAuthToken: !!authToken });
      
      const result = await registerDeviceMutation.mutateAsync({
        device_token: token,
      });

      console.log('Device registration result:', result);

      if (result.ok) {
        setFcmState(prev => ({ ...prev, isRegistered: true }));
        localStorage.setItem('device_registered', 'true');
        localStorage.setItem('device_registered_for_user', authToken); // Store which user this was registered for
        console.log('Device registered successfully:', result.data);
        return true;
      } else {
        console.error('Device registration failed:', result);
        setFcmState(prev => ({ 
          ...prev, 
          error: 'message' in result ? result.message as string : 'Device registration failed' 
        }));
        return false;
      }
    } catch (error) {
      console.error('Error registering device:', error);
      let errorMessage = 'Device registration failed';
      
      // Handle specific authentication errors
      if (error && typeof error === 'object' && 'response' in error) {
        const responseError = error as ErrorWithResponse;
        if (responseError.response?.status === 401 || responseError.response?.status === 403) {
          errorMessage = 'Authentication failed. Please login again.';
        } else if (responseError.response?.data?.message) {
          errorMessage = responseError.response.data.message;
        }
      }
      
      setFcmState(prev => ({ 
        ...prev, 
        error: errorMessage 
      }));
      return false;
    }
  }, [isAuthenticated, authToken, registerDeviceMutation]);

  const initializeFCM = useCallback(async () => {
    console.log('Initializing FCM...');
    console.log('Auth state:', { isAuthenticated, hasAuthToken: !!authToken });
    
    // Don't initialize if user is not authenticated
    if (!isAuthenticated || !authToken) {
      console.log('User not authenticated, skipping FCM initialization');
      setFcmState(prev => ({ 
        ...prev, 
        error: 'Please login to enable push notifications' 
      }));
      return;
    }
    
    // Check current permission status
    const currentPermission = Notification.permission;
    setFcmState(prev => ({ ...prev, permissionStatus: currentPermission }));

    // Check if already registered for this user
    const isAlreadyRegistered = localStorage.getItem('device_registered') === 'true';
    const registeredForUser = localStorage.getItem('device_registered_for_user');
    const existingToken = localStorage.getItem('fcm_token');

    console.log('FCM State:', { 
      isAlreadyRegistered, 
      registeredForUser, 
      currentUser: authToken,
      existingToken: !!existingToken, 
      currentPermission 
    });

    // If registered for a different user, clear the registration
    if (isAlreadyRegistered && registeredForUser && registeredForUser !== authToken) {
      console.log('Device was registered for different user, clearing registration');
      localStorage.removeItem('device_registered');
      localStorage.removeItem('device_registered_for_user');
      localStorage.removeItem('fcm_token');
    }

    // Check if already properly registered for current user
    if (isAlreadyRegistered && 
        registeredForUser === authToken && 
        existingToken && 
        currentPermission === 'granted') {
      setFcmState(prev => ({ 
        ...prev, 
        token: existingToken,
        isRegistered: true,
        permissionStatus: currentPermission
      }));
      
      // Still setup foreground listener
      setupForegroundMessageListener();
      
      // Verify service worker is registered
      await checkServiceWorkerRegistration();
      
      return;
    }

    // Generate new token and register device
    const token = await generateFCMToken();
    if (token) {
      await registerDeviceWithToken(token);
    }
  }, [isAuthenticated, authToken, generateFCMToken, registerDeviceWithToken, checkServiceWorkerRegistration, setupForegroundMessageListener]);

  const refreshToken = async () => {
    console.log('Refreshing FCM token...');
    
    // Clear existing data
    localStorage.removeItem('fcm_token');
    localStorage.removeItem('device_registered');
    localStorage.removeItem('device_registered_for_user');
    setFcmState({
      token: null,
      isLoading: false,
      error: null,
      isRegistered: false,
      permissionStatus: null,
      serviceWorkerRegistered: false,
      isAuthenticated,
    });

    // Generate new token and register
    await initializeFCM();
  };

  const testNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Test Notification', {
        body: 'This is a test notification from your app!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        tag: 'test-notification',
      });
      console.log('Test notification sent');
    } else {
      console.log('Notification permission not granted');
    }
  };

  // Initialize FCM when authentication state changes
  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated && authToken) {
      console.log('User authenticated, initializing FCM');
      initializeFCM();
    } else if (!isAuthenticated) {
      console.log('User not authenticated, clearing FCM state');
      // Clear FCM state when user logs out
      setFcmState(prev => ({
        ...prev,
        token: null,
        isRegistered: false,
        error: 'Please login to enable push notifications'
      }));
    }
  }, [isAuthenticated, authToken, initializeFCM]);

  return {
    ...fcmState,
    initializeFCM,
    refreshToken,
    testNotification,
    isRegistering: registerDeviceMutation.isPending,
  };
};

export default useFCMToken; 