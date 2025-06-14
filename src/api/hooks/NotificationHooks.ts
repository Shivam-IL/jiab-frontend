import { useMutation, useQuery } from "@tanstack/react-query";
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
    staleTime: 0,
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
    staleTime: 0,
  });
};

// Hook to register device for push notifications
const useRegisterDevice = () => {
  const notificationInstance = NotificationService.getInstance();

  return useMutation({
    mutationFn: (deviceData: TRegisterDeviceRequest) =>
      notificationInstance.RegisterDevice(deviceData),
  });
};

export { useGetNotifications, useGetNotificationCount, useRegisterDevice };
