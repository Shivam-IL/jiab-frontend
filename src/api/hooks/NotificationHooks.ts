import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "../services/NotificationService";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";
import { TGetNotificationsParams, TRegisterDeviceRequest } from "../types/NotificationTypes";

/**
 * Notification Hooks - Optimized for Performance
 * 
 * This implementation uses FCM (Firebase Cloud Messaging) for real-time notifications.
 * When new notifications arrive, FCM automatically invalidates React Query caches via:
 * - useFCM.ts: Handles foreground notifications
 * - useFCMToken.ts: Handles background notifications via service worker
 * 
 * Performance optimizations:
 * - No automatic refetching on window focus (content-driven updates only)
 * - Selective invalidation based on what actually changed
 * - Optimistic updates for instant UI feedback
 * - Long stale time with smart invalidation
 * 
 * Data is refetched only when:
 * 1. New notifications arrive (FCM invalidation)
 * 2. Manual actions that change data (mark as read, etc.)
 * 3. Cache becomes stale (15+ minutes)
 */

// Hook to fetch notifications with pagination
// Real-time updates are handled by FCM invalidation - no polling needed
const useGetNotifications = (params: TGetNotificationsParams = {}) => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const notificationInstance = NotificationService.getInstance();

  return useQuery({
    queryKey: [...keys.notifications.getNotifications(), params],
    queryFn: () => notificationInstance.GetNotifications(params),
    enabled: !!(isAuthenticated && token),
    staleTime: 15 * 60 * 1000, // 15 minutes - longer cache for better performance
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer
    refetchOnWindowFocus: false, // Don't refetch on window focus - FCM handles updates
    refetchOnMount: false, // Don't refetch on component mount if data is fresh
    refetchIntervalInBackground: false, // Don't poll when tab is not active
    // Only refetch when data actually changes via FCM invalidation
    retry: 3, // Retry failed requests
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};

// Hook to fetch notification count
// Real-time updates are handled by FCM invalidation - no polling needed
const useGetNotificationCount = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const notificationInstance = NotificationService.getInstance();

  return useQuery({
    queryKey: [...keys.notifications.getNotificationCount()],
    queryFn: () => notificationInstance.GetNotificationCount(),
    enabled: !!(isAuthenticated && token),
    staleTime: 15 * 60 * 1000, // 15 minutes - longer cache for better performance
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer
    refetchOnWindowFocus: false, // Don't refetch on window focus - FCM handles updates
    refetchOnMount: false, // Don't refetch on component mount if data is fresh
    refetchIntervalInBackground: false, // Don't poll when tab is not active
    // Only refetch when data actually changes via FCM invalidation
    retry: 3, // Retry failed requests
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });
};

// Hook to register device for push notifications
const useRegisterDevice = () => {
  const notificationInstance = NotificationService.getInstance();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceData: TRegisterDeviceRequest) =>
      notificationInstance.RegisterDevice(deviceData),
    onSuccess: () => {
      // Only invalidate count initially - notifications will be fetched when needed
      queryClient.invalidateQueries({
        queryKey: keys.notifications.getNotificationCount(),
      });
      // Don't invalidate notification list unless user is actively viewing it
    },
  });
};

// Hook to mark notifications as read with optimistic updates
const useMarkAsRead = () => {
  const notificationInstance = NotificationService.getInstance();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationInstance.MarkAsRead(),
    onMutate: async () => {
      // Optimistic update - immediately set count to 0
      await queryClient.cancelQueries({ queryKey: keys.notifications.getNotificationCount() });
      
      const previousCount = queryClient.getQueryData(keys.notifications.getNotificationCount());
      
      // Optimistically update the count to 0
      queryClient.setQueryData(keys.notifications.getNotificationCount(), (old: { data: { count: number } } | undefined) => ({
        ...old,
        data: { count: 0 }
      }));

      return { previousCount };
    },
    onError: (err, variables, context) => {
      // Revert optimistic update on error
      if (context?.previousCount) {
        queryClient.setQueryData(keys.notifications.getNotificationCount(), context.previousCount);
      }
      console.error("Failed to mark notifications as read:", err);
    },
    onSuccess: () => {
      // Only invalidate notification list if needed (when user is viewing notifications)
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      if (currentPath.includes('/notifications')) {
        queryClient.invalidateQueries({
          queryKey: keys.notifications.getNotifications(),
        });
      }
    },
  });
};

// Hook to manually invalidate notification queries (for real-time updates)
const useInvalidateNotifications = () => {
  const queryClient = useQueryClient();

  const invalidateNotifications = () => {
    queryClient.invalidateQueries({
      queryKey: keys.notifications.getNotifications(),
    });
  };

  const invalidateNotificationCount = () => {
    queryClient.invalidateQueries({
      queryKey: keys.notifications.getNotificationCount(),
    });
  };

  // Smart invalidation - only invalidate what's actually needed
  const invalidateAllNotificationQueries = () => {
    // Always invalidate count as it's lightweight
    queryClient.invalidateQueries({
      queryKey: keys.notifications.getNotificationCount(),
    });
    
    // Only invalidate notification list if user is currently viewing notifications
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    if (currentPath.includes('/notifications')) {
      queryClient.invalidateQueries({
        queryKey: keys.notifications.getNotifications(),
      });
    }
  };

  return {
    invalidateNotifications,
    invalidateNotificationCount,
    invalidateAllNotificationQueries,
  };
};

// Hook to refetch notification queries manually (for immediate updates)
const useRefetchNotifications = () => {
  const queryClient = useQueryClient();

  const refetchNotifications = (params: TGetNotificationsParams = {}) => {
    return queryClient.refetchQueries({
      queryKey: [...keys.notifications.getNotifications(), params],
    });
  };

  const refetchNotificationCount = () => {
    return queryClient.refetchQueries({
      queryKey: keys.notifications.getNotificationCount(),
    });
  };

  const refetchAllNotificationQueries = (params: TGetNotificationsParams = {}) => {
    return Promise.all([
      refetchNotifications(params),
      refetchNotificationCount(),
    ]);
  };

  return {
    refetchNotifications,
    refetchNotificationCount,
    refetchAllNotificationQueries,
  };
};

export { 
  useGetNotifications, 
  useGetNotificationCount, 
  useRegisterDevice, 
  useMarkAsRead,
  useInvalidateNotifications,
  useRefetchNotifications
};
