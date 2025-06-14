import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";
import { TGetNotificationsParams, TRegisterDeviceRequest } from "../types/NotificationTypes";

export class NotificationService extends MainService {
  private static instance: NotificationService;

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  }

  /**
   * Fetch notifications with pagination
   * Corresponds to GET /notifications
   */
  public async GetNotifications({
    page_number,
    page_size,
  }: TGetNotificationsParams = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (page_number !== undefined) queryParams.append("page_number", page_number.toString());
      if (page_size !== undefined) queryParams.append("page_size", page_size.toString());

      const endpoint = `${API_ROUTES.NOTIFICATIONS.GET_NOTIFICATIONS}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

      const response = await apiClient.get(endpoint, {
        headers: {
          ...this.getAuthHeaders(),
        },
      });

      const responseData = response.data;
      if (responseData?.success) {
        return SuccessResponse(responseData.data);
      }
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error: unknown) {
      throw error;
    }
  }

  /**
   * Get notification count
   * Corresponds to GET /notifications/count
   */
  public async GetNotificationCount() {
    try {
      const endpoint = API_ROUTES.NOTIFICATIONS.GET_NOTIFICATION_COUNT;
      const response = await apiClient.get(endpoint, {
        headers: {
          ...this.getAuthHeaders(),
        },
      });

      const responseData = response.data;
      if (responseData?.success) {
        return SuccessResponse(responseData.data);
      }
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Register device for push notifications
   * Corresponds to POST /notifications/register-device
   */
  public async RegisterDevice({ device_token }: TRegisterDeviceRequest) {
    try {
      const endpoint = API_ROUTES.NOTIFICATIONS.REGISTER_DEVICE;
      const response = await apiClient.post(
        endpoint,
        { device_token },
        {
          headers: {
            ...this.getAuthHeaders(),
          },
        }
      );

      const responseData = response.data;
      if (responseData?.success) {
        return SuccessResponse(responseData.data);
      }
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error) {
      throw error;
    }
  }
}
