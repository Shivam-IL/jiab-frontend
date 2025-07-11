"use client";

import HelpUsToKnowYourBetter from "@/components/common/HelpUsToKnowYourBetter";
import ReferAFriend from "@/components/common/ReferAFriend";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import UserAddressCard from "@/components/common/UserAddressCard";
import UserComicsCoinsAndRankCard from "@/components/common/UserComicsCoinsAndRankCard";
import ProfileCard from "@/components/ProfileCard";
import UserGeneratedJokecComponent from "@/components/UserGeneratedJokecComponent";
import React, { useEffect, useState } from "react";
import useAppSelector from "@/hooks/useSelector";
import { useCMSData } from "@/data";
import {
  CoinAnimation,
  useCoinAnimation,
} from "@/components/common/CoinAnimation";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { GA_EVENTS, SESSION_STORAGE_KEYS } from "@/constants";
import { getSessionStorageItem, setSessionStorageItem } from "@/utils";
import { useUpdateComicCoinPopUp } from "@/api";

const ProfilePage = () => {
  const [mounted, setMounted] = useState(false);

  const cmsData = useCMSData(mounted);

  const { user } = useAppSelector((state) => state.profile);

  const { isAnimating, triggerAnimation, animationKey } = useCoinAnimation();
  const updateComicCoinPopUpMutation = useUpdateComicCoinPopUp();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle profile completion animation
  useEffect(() => {
    if (!mounted || !user?.id) return;

    const isProfileComplete = user.is_profile_complete;
    const isProfilePopup = user.is_profile_popup;

    // Trigger animation if:
    // 1. Profile is complete
    // 2. Profile popup has not been shown yet
    if (isProfileComplete && !isProfilePopup) {
      // Trigger GA event
      if (
        user?.id &&
        getSessionStorageItem(
          SESSION_STORAGE_KEYS.PROFILE_GA_EVENT_TRIGGERED
        ) !== "true"
      ) {
        triggerGAEvent(GA_EVENTS.SPRITE_J24_COMPLETED_PROFILE_CONSUMER);
        setSessionStorageItem(
          SESSION_STORAGE_KEYS.PROFILE_GA_EVENT_TRIGGERED,
          "true"
        );
      }

      // Small delay to ensure smooth animation
      setTimeout(() => {
        triggerAnimation();
        // Call API to update the popup status
        updateComicCoinPopUpMutation.mutate();
      }, 500);
    }
  }, [
    user?.is_profile_complete,
    user?.is_profile_popup,
    user?.id,
    mounted,
    triggerAnimation,
    updateComicCoinPopUpMutation,
  ]);

  // Handle fragment scrolling when page loads
  useEffect(() => {
    const handleFragmentScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.getElementById(hash.slice(1)); // Remove the '#'
        if (element) {
          // Add a small delay to ensure all components are rendered
          setTimeout(() => {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }, 300);
        }
      }
    };

    // Check for fragment on initial load
    handleFragmentScroll();

    // Also listen for hash changes (in case user navigates back/forward)
    window.addEventListener("hashchange", handleFragmentScroll);

    return () => {
      window.removeEventListener("hashchange", handleFragmentScroll);
    };
  }, [mounted]); // Depend on mounted to ensure DOM is ready

  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-2">
        <ProfileCard />
        <UserComicsCoinsAndRankCard
          comicCoins={cmsData?.myProfile?.comicCoins}
          ranks={cmsData?.myProfile?.rank}
          leaderboardButtonText={cmsData?.myProfile?.leaderboardButtonText}
        />
        <div className="flex flex-col gap-[24px] md:gap-[40px]">
          <UserAddressCard
            addressTextField={cmsData?.myProfile?.addressTextField}
            addClickableText={cmsData?.myProfile?.addClickableText}
            setAsDefault={cmsData?.myProfile?.setAsDefault}
          />
          <HelpUsToKnowYourBetter
            id={"qna"}
            prevButtonText={cmsData?.myProfile?.prevButtonText}
            nextButtonText={cmsData?.myProfile?.nextButtonText}
          />
          <ReferAFriend
            referToFriendHeader={cmsData?.myProfile?.referToFriendHeader}
            referNowButtonText={cmsData?.myProfile?.referNowButtonText}
            prevButtonText={cmsData?.myProfile?.prevButtonText}
            nextButtonText={cmsData?.myProfile?.nextButtonText}
            user={cmsData?.myProfile?.user}
            sendReminder={cmsData?.myProfile?.sendReminder}
            status={cmsData?.myProfile?.status}
            referAnother={cmsData?.myProfile?.referAnother}
            myReferrals={cmsData?.myProfile?.myReferrals}
            pending={cmsData?.myProfile?.pending}
            accepted={cmsData?.myProfile?.accepted}
          />
          <UserGeneratedJokecComponent
            myJokeText={cmsData?.myProfile?.myJokes}
            hallOfLameText={cmsData?.myProfile?.hallOfLameText}
          />
        </div>
      </div>

      {/* Coin Animation for Profile Completion */}
      <CoinAnimation isVisible={isAnimating} animationKey={animationKey} />
    </ScreenWrapper>
  );
};

export default ProfilePage;
