"use client";

import AktivGroteskText from "@/components/common/AktivGroteskText";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import LeaderBoardTable from "@/components/LeaderBoardTable";
import { MOBILE_TEMP_NAVBAR_DATA } from "@/constants";
import useWindowWidth from "@/hooks/useWindowWidth";
import React, { useState } from "react";

import ReactJoyride, { Step, CallBackProps } from "react-joyride";

const Leaderboard = () => {
  const width = useWindowWidth();
  const [run, setRun] = useState(true);

  const steps: Step[] = [
    {
      target: ".test",
      content: "Welcome! This is the banner section.",
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      setRun(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* <ReactJoyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      /> */}

      <MobileTempNavBar
        title={MOBILE_TEMP_NAVBAR_DATA.LEADERBOARD.TITLE}
        subtitle={MOBILE_TEMP_NAVBAR_DATA.LEADERBOARD.SUB_TITLE}
      />
      <ScreenWrapper
        className={`${width > 750 ? "mt-[71px] flex justify-center" : "mt-0"}`}
      >
        <div className="flex flex-col gap-[16.1px]">
          <div className="md:flex md:flex-col justify-center items-center md:mt-[37px] md:mb-[8px] gap-[12px] hidden">
            <AktivGroteskText
              text={MOBILE_TEMP_NAVBAR_DATA.LEADERBOARD.TITLE}
              fontSize="text-[30px]"
              fontWeight="font-[700]"
            />
            <AktivGroteskText
              text={MOBILE_TEMP_NAVBAR_DATA.LEADERBOARD.SUB_TITLE}
              fontSize="text-[20px]"
              fontWeight="font-[400]"
            />
          </div>
          <LeaderBoardTable />
        </div>
      </ScreenWrapper>
    </div>
  );
};

export default Leaderboard;
