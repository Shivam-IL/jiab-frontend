"use client";

import AktivGroteskText from "@/components/common/AktivGroteskText";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import LeaderBoardTable from "@/components/LeaderBoardTable";
import useWindowWidth from "@/hooks/useWindowWidth";
import React, { useEffect, useState } from "react";
import { useCMSData } from "@/data";

const Leaderboard = () => {
  const [mounted, setMounted] = useState(false);
  const cmsData = useCMSData(mounted);
  useEffect(() => {
    setMounted(true);
  }, []);
  const width = useWindowWidth();

  return (
    <div className="flex flex-col gap-3">
      <MobileTempNavBar
        title={cmsData?.leaderboard?.leaderboardHeading}
        subtitle={cmsData?.leaderboard?.leaderboardSubHeading}
      />
      <ScreenWrapper
        className={`${width > 750 ? "mt-[71px] flex justify-center" : "mt-0"}`}
      >
        <div className="flex flex-col gap-[16.1px]">
          <div className="md:flex md:flex-col justify-center items-center md:mt-[37px] md:mb-[8px] gap-[12px] hidden">
            <AktivGroteskText
              text={cmsData?.leaderboard?.leaderboardHeading}
              fontSize="text-[30px]"
              fontWeight="font-[700]"
            />
            <AktivGroteskText
              text={cmsData?.leaderboard?.leaderboardSubHeading}
              fontSize="text-[20px]"
              fontWeight="font-[400]"
            />
          </div>
          <LeaderBoardTable
            yourRankText={cmsData?.leaderboard?.yourRank}
            noDataFoundText={cmsData?.leaderboard?.noDataFoundText}
            avatarText={cmsData?.leaderboard?.avatar}
            comicCoinText={cmsData?.leaderboard?.comicCoin}
            mobileNoText={cmsData?.leaderboard?.mobileNo}
            prizeText={cmsData?.leaderboard?.prize}
            rankText={cmsData?.leaderboard?.rank}
            dailyWinnersText={cmsData?.leaderboard?.leaderboardDailyWinner}
          />
        </div>
      </ScreenWrapper>
    </div>
  );
};

export default Leaderboard;
