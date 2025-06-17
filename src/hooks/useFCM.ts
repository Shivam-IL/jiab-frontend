import { useEffect, useState } from 'react';
import { messaging, getToken, onMessage } from '@/lib/firebase';
import { sendTokenToServer, getStoredToken } from '@/utils/fcmUtils';

export interface FCMHookResult {
  token: string | null;
  permission: NotificationPermission | null;
  isSupported: boolean;
  requestPermission: () => Promise<boolean>;
  getRegistrationToken: () => Promise<string | null>;
}

export const useFCM = (): FCMHookResult => {
  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    // Check if FCM is supported
    const checkSupport = () => {
      if (typeof window !== 'undefined') {
        const supported = 'Notification' in window && 
                        'serviceWorker' in navigator && 
                        'PushManager' in window;
        setIsSupported(supported);
        
        if (supported) {
          setPermission(Notification.permission);
        }
      }
    };

    checkSupport();
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    try {
      if (!isSupported) {
        console.log('FCM is not supported in this browser');
        return false;
      }

      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        console.log('Notification permission granted');
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
      if (!messaging) {
        console.log('Messaging not available');
        return null;
      }

      // Register service worker
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered:', registration);

      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, // You'll need to add this to .env.local
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
    if (messaging && permission === 'granted') {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Foreground message received:', payload);
        
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
  }, [permission]);

  return {
    token,
    permission,
    isSupported,
    requestPermission,
    getRegistrationToken,
  };
}; 