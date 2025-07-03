import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGetNotifications, useGetNotificationCount } from '@/api/hooks/NotificationHooks';
import useAppSelector from '@/hooks/useSelector';

/**
 * Custom hook to refetch notifications and notification count on route changes
 * This ensures notification data is always fresh when navigating between pages
 */
export const useNotificationRouteRefetch = () => {
  const pathname = usePathname();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  
  // Get refetch functions for notifications
  const { refetch: refetchNotifications } = useGetNotifications({
    page_number: 1,
    page_size: 10
  });
  
  const { refetch: refetchNotificationCount } = useGetNotificationCount();
  
  useEffect(() => {
    // Only refetch if user is authenticated
    if (isAuthenticated && token) {
      console.log('Route changed to:', pathname, '- Refetching notifications');
      
      // Always refetch notification count as it's lightweight
      refetchNotificationCount();
      
      // Only refetch notification list if user is currently viewing notifications page
      // or if they're on a page where notifications are prominently displayed
      const shouldRefetchNotifications = 
        pathname.includes('/notifications') || 
        pathname === '/' || // Home page might show notifications
        pathname.includes('/profile'); // Profile pages might show notifications
      
      if (shouldRefetchNotifications) {
        refetchNotifications();
      }
    }
  }, [pathname, isAuthenticated, token, refetchNotifications, refetchNotificationCount]);
  
  return {
    refetchNotifications,
    refetchNotificationCount
  };
}; 