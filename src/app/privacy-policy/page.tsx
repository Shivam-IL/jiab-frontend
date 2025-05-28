"use client";
import Header from "@/components/common/Header/Header";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import React from "react";

const page: React.FC = () => {
  return (
    <>
      <MobileTempNavBar title="Privacy Policy" />
      <ScreenWrapper className="px-4 md:mt-0 mt-[-30px]">
        <Header title="Privacy Policy" className="md:block hidden mt-[100px]" />

        <div className="mb-10">
          {/* Privacy Policy Content */}
          <div className="mt-[2.4rem]">
            <div className="md:text-xl text-xs space-y-6">
              This will come from the CMS
            </div>
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
};

export default page;
