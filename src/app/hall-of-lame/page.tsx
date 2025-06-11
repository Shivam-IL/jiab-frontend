"use client";
import AktivGroteskText from "@/components/common/AktivGroteskText";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import HallOfLameLeaderboardTable from "@/components/HallOfLameLeaderboardTable";
import useWindowWidth from "@/hooks/useWindowWidth";
import React, { useState, useEffect } from "react";
import { useCMSData } from "@/data";

const HallOfLameLeaderboard = () => {
  const width = useWindowWidth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);

  return (
    <div className="flex flex-col gap-3">
      <MobileTempNavBar
        title={cmsData.hallOfLame.hallOfLameHeader}
        subtitle={cmsData.hallOfLame.hallOfLameSubHeading}
      />
      <ScreenWrapper
        className={`${width > 750 ? "mt-[71px] flex justify-center" : "mt-0"}`}
      >
        <div className="flex flex-col gap-[16.1px]">
          {/* <AnnouncingWinnerTimer /> */}
          <div className="md:flex md:flex-col justify-center items-center md:mt-[37px] md:mb-[8px] gap-[12px] hidden">
            <AktivGroteskText
              text={cmsData.hallOfLame.hallOfLameHeader}
              fontSize="text-[30px]"
              fontWeight="font-[700]"
            />
            <AktivGroteskText
              text={cmsData.hallOfLame.hallOfLameSubHeading}
              fontSize="text-[20px]"
              fontWeight="font-[400]"
            />
          </div>
          <HallOfLameLeaderboardTable
            weeklyTopJokes={cmsData.hallOfLame.weaklyTopJokes}
            prevButtonText={`Prev`}
            nextButtonText={cmsData.hallOfLame.nextButtonText}
            rank={cmsData.hallOfLame.rankHeading}
            jokes={cmsData.hallOfLame.jokesHeading}
            votes={cmsData.hallOfLame.votesHeading}
          />
        </div>
      </ScreenWrapper>
    </div>
  );
};

export default HallOfLameLeaderboard;
