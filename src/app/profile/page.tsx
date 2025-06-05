"use client";

import AnnouncingWinnerTimer from "@/components/AnnouncingWinnerTimer";
import HelpUsToKnowYourBetter from "@/components/common/HelpUsToKnowYourBetter";
import ReferAFriend from "@/components/common/ReferAFriend";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import UserAddressCard from "@/components/common/UserAddressCard";
import UserComicsCoinsAndRankCard from "@/components/common/UserComicsCoinsAndRankCard";
import ProfileCard from "@/components/ProfileCard";
import UserGeneratedJokecComponent from "@/components/UserGeneratedJokecComponent";
import React, { useState } from "react";
import { BreakTheIceExitPopup } from "@/components/ExitPopUps";

const ProfilePage = () => {
  const [breakTheIce, setBreakTheIce] = useState<boolean>(true);
  return (
    <ScreenWrapper>
      <div className="flex flex-col gap-2">
          {/* <AnnouncingWinnerTimer /> */}
        <ProfileCard />
        <UserComicsCoinsAndRankCard />
        <div className="flex flex-col gap-[24px] md:gap-[40px]">
          <UserAddressCard />
          <ReferAFriend />
          <HelpUsToKnowYourBetter />
          <UserGeneratedJokecComponent />
        </div>
      </div>
      {breakTheIce && (
        <BreakTheIceExitPopup
          open={breakTheIce}
          onClose={() => setBreakTheIce(false)}
        />
      )}
    </ScreenWrapper>
  );
};

export default ProfilePage;
