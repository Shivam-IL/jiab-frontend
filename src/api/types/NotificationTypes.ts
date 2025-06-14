export interface INotification {
  icon_url: string;
  is_new: boolean;
  is_read: boolean;
  notification_text: string;
  notification_title: string;
}

export interface INotificationsData {
  notifications: INotification[];
  page_number: number;
  page_size: number;
  total_count: number;
}

export interface INotificationsResponse {
  data: INotificationsData;
  message: string;
  status: number;
  success: boolean;
}

export interface INotificationsBadRequest {
  [key: string]: string;
}

// Query params accepted by GET /notifications endpoint
export interface TGetNotificationsParams {
  page_number?: number;
  page_size?: number;
}

// Register device request body
export interface TRegisterDeviceRequest {
  device_token: string;
}

// Register device response
export interface IRegisterDeviceResponse {
  data: string;
  message: string;
  status: number;
  success: boolean;
}
