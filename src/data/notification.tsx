import { TCMSResponse } from "@/api/types/CMSTypes";

export interface NotificationData {
  notificationHeader: string;
  notificationSubHeading: string;
  ifNoNotificationsAreThere: string;
}

export const mapNotificationData = (
  cmsData: TCMSResponse["data"] | null
): NotificationData => {
  const notificationCMS = cmsData?.notification_text_after_click;

  return {
    notificationHeader: notificationCMS?.notification_header ?? "Notifications",
    notificationSubHeading:
      notificationCMS?.notification_sub_heading ??
      "Stay updated with your latest notifications",
    ifNoNotificationsAreThere:
      notificationCMS?.if_no_notfications_are_there ?? "No notifications yet",
  };
};

// Default data for SSR/hydration
export const defaultNotificationData: NotificationData = {
  notificationHeader: "Notifications",
  notificationSubHeading: "Stay updated with your latest notifications",
  ifNoNotificationsAreThere: "No notifications yet",
};
