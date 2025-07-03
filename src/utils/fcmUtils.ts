// Utility functions for FCM

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
  data?: Record<string, string | number | boolean | null | undefined>;
  link?: string;
}

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