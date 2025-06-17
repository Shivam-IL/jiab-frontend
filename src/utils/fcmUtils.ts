// Utility functions for FCM
import { API_URL } from '@/config';

export interface FCMTokenData {
  token: string;
  userId?: string;
  deviceInfo?: {
    userAgent: string;
    platform: string;
    timestamp: number;
  };
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  data?: Record<string, any>;
  link?: string;
}

/**
 * Send FCM token to backend for storage
 */
export const sendTokenToServer = async (token: string, userId?: string): Promise<boolean> => {
  try {
    const deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      timestamp: Date.now(),
    };

    const tokenData: FCMTokenData = {
      token,
      userId,
      deviceInfo,
    };

    const response = await fetch(`${API_URL}/notifications/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tokenData),
    });

    if (response.ok) {
      console.log('Token sent to server successfully');
      return true;
    } else {
      console.error('Failed to send token to server:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error sending token to server:', error);
    return false;
  }
};

/**
 * Remove FCM token from backend
 */
export const removeTokenFromServer = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/notifications/token`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (response.ok) {
      console.log('Token removed from server successfully');
      return true;
    } else {
      console.error('Failed to remove token from server:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error removing token from server:', error);
    return false;
  }
};

/**
 * Get stored FCM token from localStorage
 */
export const getStoredToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('fcm-token');
  }
  return null;
};

/**
 * Clear stored FCM token from localStorage
 */
export const clearStoredToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('fcm-token');
  }
};

/**
 * Check if notifications are supported
 */
export const isNotificationSupported = (): boolean => {
  return (
    typeof window !== 'undefined' &&
    'Notification' in window &&
    'serviceWorker' in navigator &&
    'PushManager' in window
  );
};

/**
 * Get notification permission status
 */
export const getNotificationPermission = (): NotificationPermission | null => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    return Notification.permission;
  }
  return null;
}; 