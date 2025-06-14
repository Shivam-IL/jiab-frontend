"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header/Header";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import NotificationItem from "@/components/common/NotificationItem/NotificationItem";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { MOBILE_TEMP_NAVBAR_DATA } from "@/constants";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useGetNotifications } from "@/api/hooks/NotificationHooks";
import { INotification } from "@/api/types/NotificationTypes";

const NotificationsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20); // Default page size

  const {
    data: notificationsResponse,
    isLoading,
    error,
    isError,
  } = useGetNotifications({
    page_number: currentPage,
    page_size: pageSize,
  });

  const width = useWindowWidth();

  // Extract notifications data from the response
  const notifications = notificationsResponse?.data?.notifications || [];
  const totalCount = notificationsResponse?.data?.total_count || 0;
  const hasNextPage = currentPage * pageSize < totalCount;
  const hasPreviousPage = currentPage > 1;

  // Handle loading state
  if (isLoading) {
    return (
      <div className="bg-lightGray min-h-screen">
        <MobileTempNavBar
          title={MOBILE_TEMP_NAVBAR_DATA.NOTIFICATIONS.TITLE}
          subtitle={MOBILE_TEMP_NAVBAR_DATA.NOTIFICATIONS.SUB_TITLE}
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
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading notifications...</p>
            </div>
          </div>
        </ScreenWrapper>
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="bg-lightGray min-h-screen">
        <MobileTempNavBar
          title={MOBILE_TEMP_NAVBAR_DATA.NOTIFICATIONS.TITLE}
          subtitle={MOBILE_TEMP_NAVBAR_DATA.NOTIFICATIONS.SUB_TITLE}
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
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-gray-600 mb-4">Failed to load notifications</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </ScreenWrapper>
      </div>
    );
  }

  // Handle empty state
  if (notifications.length === 0) {
    return (
      <div className="bg-lightGray min-h-screen">
        <MobileTempNavBar
          title={MOBILE_TEMP_NAVBAR_DATA.NOTIFICATIONS.TITLE}
          subtitle={MOBILE_TEMP_NAVBAR_DATA.NOTIFICATIONS.SUB_TITLE}
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
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-gray-600 mb-2">No notifications yet</p>
              <p className="text-gray-500 text-sm">
                Check back later for updates!
              </p>
            </div>
          </div>
        </ScreenWrapper>
      </div>
    );
  }

  return (
    <div className="bg-lightGray min-h-screen">
      <MobileTempNavBar
        title={MOBILE_TEMP_NAVBAR_DATA.NOTIFICATIONS.TITLE}
        subtitle={MOBILE_TEMP_NAVBAR_DATA.NOTIFICATIONS.SUB_TITLE}
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
              timestamp="2 h" // You may want to calculate this from a timestamp field if available
              iconBg={notification.is_new ? "bg-primary" : "bg-gray-400"}
              // You can add more props based on the notification data
              // isRead={notification.is_read}
              // iconUrl={notification.icon_url}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalCount > pageSize && (
          <div className="flex justify-between items-center mt-8 px-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={!hasPreviousPage}
              className={`px-4 py-2 rounded transition-colors ${
                hasPreviousPage
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-600">
              Page {currentPage} of {Math.ceil(totalCount / pageSize)}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={!hasNextPage}
              className={`px-4 py-2 rounded transition-colors ${
                hasNextPage
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Total notifications count */}
        <div className="text-center mt-4 text-gray-600 text-sm">
          Showing {notifications.length} of {totalCount} notifications
        </div>
      </ScreenWrapper>
    </div>
  );
};

export default NotificationsPage;
