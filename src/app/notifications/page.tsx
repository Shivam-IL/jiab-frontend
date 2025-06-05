"use client";

import Header from "@/components/common/Header/Header";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import NotificationItem from "@/components/common/NotificationItem/NotificationItem";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import { MOBILE_TEMP_NAVBAR_DATA } from "@/constants";
import useWindowWidth from "@/hooks/useWindowWidth";

import React from "react";
const NotificationsPage: React.FC = () => {
  const notifications = [
    {
      title: "Welcome to the chill-zone! 🤩",
      description:
        "Enter the Unique Code from behind the label of a Sprite® promo pack to participate & win* prizes up to Rs.25,000!",
      timestamp: "2 h",
    },
    {
      title: "And It's Done! 👍",
      description:
        "Thanks for the heads up. The joke you flagged was taken down.",
      timestamp: "2 h",
    },
    {
      title: "Cha-Ching Alert!",
      description: "You just earned 2 Comic Coins! 🪙",
      timestamp: "2 h",
    },
    {
      title: "Oops, We've Seen This Before",
      description:
        "We had to take your joke down as we realized it already exists! But we know you got more in you, keep them coming! 😊",
      timestamp: "2 h",
    },
    {
      title: "Thank you for being a vigilante!",
      description: "Thand Rakh, we'll get this sorted soon!",
      timestamp: "2 h",
    },
    {
      title: "It's going to be a laughter riot! 😂",
      description: "Your joke buddy has used your referral code to sign up! 🎉",
      timestamp: "2 h",
    },
    {
      title: "Uh Oh, That punchline needs a rework!",
      description:
        "No worries, even the funniest jokes don't always land! Keep submitting more jokes!",
      timestamp: "2 h",
    },
    {
      title: "You Made 'em LOL",
      description:
        "Did you hear that? That's the noise of your fans ROFL to your joke! Can't wait to hear what else you have in store!",
      timestamp: "2 h",
    },
    {
      title: "Good news coming your way!",
      description:
        "You've officially won a Sprite® tastic reward! Grab it now before it's too late.",
      timestamp: "2 h",
    },
    {
      title: "Let's Break The Ice",
      description:
        "Complete your profile to earn more Comic Coins, laugh and gain access to our treasured rewards!",
      timestamp: "2 h",
    },
    {
      title: "New Chill Buddy Alert!",
      description:
        "Great! You've successfully referred a friend! Let's get ready to greet them with a barrage of jokes!",
      timestamp: "2 h",
    },
  ];
  const width = useWindowWidth();

  return (
    <div className="bg-lightGray">
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
          {notifications.map((notification, index) => (
            <NotificationItem
              key={index}
              title={notification.title}
              description={notification.description}
              timestamp={notification.timestamp}
              iconBg="bg-green"
            />
          ))}
        </div>
      </ScreenWrapper>
    </div>
  );
};

export default NotificationsPage;
