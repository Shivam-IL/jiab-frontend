"use client";

import HelpUsToKnowYourBetter from "@/components/common/HelpUsToKnowYourBetter";
import ReferAFriend from "@/components/common/ReferAFriend";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import UserAddressCard from "@/components/common/UserAddressCard";
import UserComicsCoinsAndRankCard from "@/components/common/UserComicsCoinsAndRankCard";
import ProfileCard from "@/components/ProfileCard";
import UserGeneratedJokecComponent from "@/components/UserGeneratedJokecComponent";
import React, { useEffect, useState } from "react";
import { BreakTheIceExitPopup } from "@/components/ExitPopUps";
import useAppSelector from "@/hooks/useSelector";
import { useRouter, usePathname } from "next/navigation";
import useAppDispatch from "@/hooks/useDispatch";
import { useCMSData } from "@/data";

const ProfilePage = () => {
  const [mounted, setMounted] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);

  const cmsData = useCMSData(mounted);
  const { user } = useAppSelector((state) => state.profile);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          />
          <ReferAFriend
            referToFriendHeader={cmsData?.myProfile?.referToFriendHeader}
            referNowButtonText={cmsData?.myProfile?.referNowButtonText}
            prevButtonText={cmsData?.myProfile?.prevButtonText}
            nextButtonText={cmsData?.myProfile?.nextButtonText}
          />
          <HelpUsToKnowYourBetter
            id={"qna"}
            prevButtonText={cmsData?.myProfile?.prevButtonText}
            nextButtonText={cmsData?.myProfile?.nextButtonText}
          />
          <UserGeneratedJokecComponent />
        </div>
      </div>
      {/* {showExitPopup && (
        <BreakTheIceExitPopup
          open={showExitPopup}
          onClose={handleStayOnPage}
        />
      )} */}
    </ScreenWrapper>
  );
};

export default ProfilePage;
