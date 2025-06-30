"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/common/Header/Header";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import NotificationItem from "@/components/common/NotificationItem/NotificationItem";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import useWindowWidth from "@/hooks/useWindowWidth";
import {
  useGetNotifications,
  useMarkAsRead,
} from "@/api/hooks/NotificationHooks";
import { INotification } from "@/api/types/NotificationTypes";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "@/api/utils";
import { useCMSData } from "@/data";

const NotificationsPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const cmsData = useCMSData(mounted);
  useEffect(() => {
    setMounted(true);
  }, []);
  const queryClient = useQueryClient();
  const [hasMarkedAsRead, setHasMarkedAsRead] = useState(false);

  const {
    data: notificationsResponse,
    isLoading,
    isError,
  } = useGetNotifications({});

  const markAsReadMutation = useMarkAsRead();
  const width = useWindowWidth();

  // Auto mark as read when page loads on mobile (width < 768)
  useEffect(() => {
    if (
      width > 0 &&
      width < 768 &&
      !markAsReadMutation.isPending &&
      !hasMarkedAsRead
    ) {
      // Only for mobile, if not already pending, and hasn't been marked yet
      setHasMarkedAsRead(true);
      markAsReadMutation.mutate(undefined, {
        onSuccess: () => {
          // Invalidate and refetch notifications to update the UI
          queryClient.invalidateQueries({
            queryKey: [...keys.notifications.getNotifications()],
          });

          // Also invalidate notification count
          queryClient.invalidateQueries({
            queryKey: [...keys.notifications.getNotificationCount()],
          });
        },
        onError: (error) => {
          console.error("Failed to mark notifications as read:", error);
          setHasMarkedAsRead(false); // Reset flag on error
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, queryClient, hasMarkedAsRead]); // Removed markAsReadMutation from dependencies to prevent loops

  // Extract notifications data from the response
  const notifications = notificationsResponse?.data?.notifications ?? [];

  // Function to calculate time difference for timestamps
  const getTimeAgo = (launchDate: string | null): string => {
    if (!launchDate) return "Recently";

    const now = new Date();
    const launch = new Date(launchDate);
    const diffInMs = now.getTime() - launch.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}d`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hr`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes > 0 ? `${diffInMinutes} min` : "Now";
    }
  };

  // Handle notification click to mark as read
  const handleNotificationClick = async () => {
    try {
      // Prevent multiple calls if already pending
      if (markAsReadMutation.isPending) return;

      await markAsReadMutation.mutateAsync();

      // Use a timeout to batch invalidations and prevent rapid refetching
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [...keys.notifications.getNotifications()],
        });

        queryClient.invalidateQueries({
          queryKey: [...keys.notifications.getNotificationCount()],
        });
      }, 100);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="bg-lightGray min-h-screen">
        <MobileTempNavBar
          title={cmsData?.notification?.notificationHeader}
          subtitle={cmsData?.notification?.notificationSubHeading}
        />
        <ScreenWrapper
          className={` ${
            width > 750
              ? "mt-20 flex justify-center bg-lightGray"
              : "mt-0 border-t-[14px] border-t-lightGray bg-white"
          }`}
        >
          <Header
            title={cmsData?.notification?.notificationHeader}
            description={cmsData?.notification?.notificationSubHeading}
            className="md:my-[40px] my-[20px] hidden md:block"
          />
        </ScreenWrapper>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return <></>;
  }

  // Handle empty state
  if (notifications.length === 0) {
    return <div className="bg-lightGray min-h-screen"></div>;
  }

  return (
    <div className="bg-lightGray min-h-screen">
      <MobileTempNavBar
        title={cmsData?.notification?.notificationHeader}
        subtitle={cmsData?.notification?.notificationSubHeading}
      />

      <ScreenWrapper
        className={` ${
          width > 750
            ? "mt-20 flex justify-center bg-lightGray"
            : "mt-0 border-t-[14px] border-t-lightGray bg-white"
        }`}
      >
        <Header
          title="Notifications"
          description="Keep up with the build-up."
          className="md:my-[40px] my-[20px] hidden md:block"
        />

        {/* Notifications List */}
        <div className="">
          {notifications.map((notification: INotification, index: number) => (
            <NotificationItem
              key={index}
              title={notification.notification_title}
              description={notification.notification_text}
              descriptionFontSize={{
                mobile: "text-[10px] w-[315px]",
                desktop: "md:text-[16px]",
              }}
              timestamp={getTimeAgo(notification.launch_date)}
              iconUrl={notification.icon_url}
              isLast={index === notifications.length - 1}
              onClick={handleNotificationClick}
            />
          ))}
        </div>
      </ScreenWrapper>
    </div>
  );
};

export default NotificationsPage;
