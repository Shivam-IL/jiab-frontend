import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "../services/NotificationService";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";
import { TGetNotificationsParams, TRegisterDeviceRequest } from "../types/NotificationTypes";

// Hook to fetch notifications with pagination
const useGetNotifications = (params: TGetNotificationsParams = {}) => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const notificationInstance = NotificationService.getInstance();

  return useQuery({
    queryKey: [...keys.notifications.getNotifications(), params],
    queryFn: () => notificationInstance.GetNotifications(params),
    enabled: !!(isAuthenticated && token),
    staleTime: 30 * 1000, // 30 seconds - reduced for more real-time updates
    refetchOnWindowFocus: true, // Refetch when user focuses window
    refetchIntervalInBackground: false, // Don't poll when tab is not active
    refetchInterval: 30 * 1000, // Poll every 30 seconds for real-time updates
    retry: 3, // Retry failed requests
  });
};

// Hook to fetch notification count
const useGetNotificationCount = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const notificationInstance = NotificationService.getInstance();

  return useQuery({
    queryKey: [...keys.notifications.getNotificationCount()],
    queryFn: () => notificationInstance.GetNotificationCount(),
    enabled: !!(isAuthenticated && token),
    staleTime: 15 * 1000, // 15 seconds - reduced for more real-time updates
    refetchInterval: 30 * 1000, // Poll every 30 seconds for real-time updates
    refetchOnWindowFocus: true, // Refetch when user focuses window
    refetchIntervalInBackground: false, // Don't poll when tab is not active
    retry: 3, // Retry failed requests
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
      // Invalidate notification queries after successful device registration
      queryClient.invalidateQueries({
        queryKey: keys.notifications.getNotifications(),
      });
      queryClient.invalidateQueries({
        queryKey: keys.notifications.getNotificationCount(),
      });
    },
  });
};

// Hook to mark notifications as read
const useMarkAsRead = () => {
  const notificationInstance = NotificationService.getInstance();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationInstance.MarkAsRead(),
    onSuccess: () => {
      // Invalidate notification queries after marking as read
      queryClient.invalidateQueries({
        queryKey: keys.notifications.getNotifications(),
      });
      queryClient.invalidateQueries({
        queryKey: keys.notifications.getNotificationCount(),
      });
    },
    onError: (error) => {
      console.error("Failed to mark notifications as read:", error);
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

  const invalidateAllNotificationQueries = () => {
    queryClient.invalidateQueries({
      queryKey: keys.notifications.getNotifications(),
    });
    queryClient.invalidateQueries({
      queryKey: keys.notifications.getNotificationCount(),
    });
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
