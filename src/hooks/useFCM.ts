import { useEffect, useState } from 'react';
import { messaging, getToken, onMessage, setupMessaging } from '@/lib/firebase';
import { sendTokenToServer } from '@/utils/fcmUtils';
import { useQueryClient } from '@tanstack/react-query';
import { keys } from '@/api/utils';
import { isSupported } from 'firebase/messaging';

export interface FCMHookResult {
  token: string | null;
  permission: NotificationPermission | null;
  isSupported: boolean;
  requestPermission: () => Promise<boolean>;
  getRegistrationToken: () => Promise<string | null>;
  testNotificationUpdate: () => void;
}

export const useFCM = (): FCMHookResult => {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [isFCMSupported, setIsFCMSupported] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    // Check if FCM is supported
    const checkSupport = async () => {
      if (typeof window !== 'undefined') {
        try {
          const supported = await isSupported();
          const basicSupport = 'Notification' in window && 
                              'serviceWorker' in navigator && 
                              'PushManager' in window;
          
          const fullSupport = supported && basicSupport;
          setIsFCMSupported(fullSupport);
          
          if (fullSupport) {
            setPermission(Notification.permission);
            console.log("Firebase messaging is supported on this device/browser");
          } else {
            console.log("Firebase messaging not supported on this device/browser");
          }
        } catch (error) {
          console.error("Error checking Firebase messaging support:", error);
          setIsFCMSupported(false);
        }
      }
    };

    checkSupport();

    // Listen for messages from service worker
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'NOTIFICATION_RECEIVED') {
        console.log('Background notification received via service worker:', event.data.payload);
        
        // Update notification count and list immediately
        queryClient.invalidateQueries({
          queryKey: [...keys.notifications.getNotificationCount()],
        });
        
        queryClient.invalidateQueries({
          queryKey: [...keys.notifications.getNotifications()],
        });
      }
    };

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
      
      return () => {
        navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
      };
    }
  }, [queryClient]);

  const requestPermission = async (): Promise<boolean> => {
    try {
      if (typeof window === 'undefined' || !('Notification' in window)) {
        console.log('Notification API not available');
        return false;
      }

      if (!isFCMSupported) {
        console.log('FCM is not supported in this browser');
        return false;
      }

      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        console.log('Notification permission granted by user');
        await getRegistrationToken();
        return true;
      } else {
        console.log('Notification permission denied by user');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const getRegistrationToken = async (): Promise<string | null> => {
    try {
      // Ensure messaging is initialized with Web Push support check
      const messagingInstance = messaging || await setupMessaging();
      if (!messagingInstance) {
        console.log('Messaging not available or not supported');
        return null;
      }

      // Register service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered:', registration);

      const currentToken = await getToken(messagingInstance, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (currentToken) {
        console.log('Registration token:', currentToken);
        setToken(currentToken);
        
        // Send the token to your backend
        try {
          await sendTokenToServer(currentToken);
        } catch (error) {
          console.error('Failed to send token to backend:', error);
        }
        
        return currentToken;
      } else {
        console.log('No registration token available');
        return null;
      }
    } catch (error) {
      console.error('Error getting registration token:', error);
      return null;
    }
  };

  // Set up foreground message listener
  useEffect(() => {
    const setupListener = async () => {
      if (permission === 'granted' && isFCMSupported) {
        // Ensure messaging is available
        const messagingInstance = messaging || await setupMessaging();
        if (!messagingInstance) return;

        const unsubscribe = onMessage(messagingInstance, (payload) => {
          console.log('Foreground message received:', payload);
          
          // Update notification count and list immediately
          queryClient.invalidateQueries({
            queryKey: [...keys.notifications.getNotificationCount()],
          });
          
          queryClient.invalidateQueries({
            queryKey: [...keys.notifications.getNotifications()],
          });
          
          // Handle foreground message
          if (payload.notification) {
            // You can show a custom notification or update UI
            const notificationTitle = payload.notification.title ?? 'New Message';
            const notificationOptions = {
              body: payload.notification.body ?? 'You have a new message!',
              icon: payload.notification.icon ?? '/icons/icon-192x192.png',
              tag: 'jiab-foreground-notification',
            };

            // Show browser notification even when app is in foreground
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(notificationTitle, notificationOptions);
            }
          }
        });

        return () => unsubscribe();
      }
    };

    setupListener();
  }, [permission, isFCMSupported, queryClient]);

  const testNotificationUpdate = () => {
    console.log('Manual notification cache invalidation triggered');
    queryClient.invalidateQueries({
      queryKey: [...keys.notifications.getNotificationCount()],
    });
    
    queryClient.invalidateQueries({
      queryKey: [...keys.notifications.getNotifications()],
    });
  };

  return {
    token,
    permission,
    isSupported: isFCMSupported,
    requestPermission,
    getRegistrationToken,
    testNotificationUpdate,
  };
}; 