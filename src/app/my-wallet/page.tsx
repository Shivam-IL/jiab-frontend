"use client";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import React from "react";
import AnnouncingWinnerTimer from "@/components/AnnouncingWinnerTimer";
import Header from "@/components/common/Header/Header";
import WalletCard from "@/components/WalletCard";
import GreenCTA from "@/components/GreenCTA";
import Banner from "@/components/common/Banner/Banner";
import AktivGroteskText from "@/components/common/AktivGroteskText";
import Image from "next/image";

const ComicCoinsPage = () => {
  const reward = {
    imageUrl: "/assets/images/reward-1.png",
    imageAlt: "reward-1",
  };

  return (
    <>
      <div className="bg-white -mt-5 pt-5">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 container mx-auto mt-20">
          {/* Comic Coins */}
          <div>
            <AktivGroteskText
              text="COMIC COINS"
              fontSize="text-[14px] md:text-[30px]"
              fontWeight="font-[700]"
            />
            <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-[-px]">
              <AktivGroteskText
                text="0"
                fontSize="text-[44px] md:text-[64px]"
                fontWeight="font-[700]"
              />
              <Image
                src="/assets/images/sprite-gold.png"
                alt="coin"
                width={60}
                height={60}
                className="w-[20px] md:w-[60px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <ScreenWrapper className="pt-6 md:pt-0">
        {/* Announcing Winner Timer */}
        <AnnouncingWinnerTimer />

        {/* Reward Pool */}
        <Header title="Reward Pool" className="mt-8" />
        <div className="flex justify-center mt-4 w-[507px] mx-auto">
          <WalletCard imageUrl={reward.imageUrl} imageAlt={reward.imageAlt}>
            <div className="flex flex-col items-center gap-2 md:gap-3">
              <AktivGroteskText
                text="The Ultimate Retreat"
                fontSize="text-[14px] md:text-[24px]"
                fontWeight="font-[700]"
              />
              <p className="text-[#313131] md:text-lg text-[12px] text-center">
                Participate & win* MakeMyTrip voucher worth Rs.25,000 ✈️
              </p>
              <GreenCTA
                text="Collect More"
                onClick={() => {}}
                paddingClass="py-[6px] px-[24px] md:py-[14px] md:px-[60px]"
                fontSize="text-[12px] md:text-[20px]"
              />
            </div>
          </WalletCard>
        </div>

        {/* PhonePe Cashback */}
        <Header title="PhonePe Cashback" className="mt-12" />
        <div className="bg-white rounded-[10.68px] flex flex-col items-center text-center p-6 md:p-10 gap-6 mt-4">
          <Image
            src="/assets/images/reward-2.png"
            alt="no-wins"
            width={180}
            height={180}
            className="w-[120px] md:w-[180px] h-auto"
          />
          <AktivGroteskText
            text="Bummer! No wins yet!"
            fontSize="text-[14px] md:text-[24px]"
            fontWeight="font-[700]"
            className="text-black"
          />
          <GreenCTA
            text="Enter Code To Get Started"
            onClick={() => {}}
            paddingClass="py-[6px] px-[16px] md:py-[14px] md:px-[60px]"
            fontSize="text-[12px] md:text-[20px]"
          />
          <p className="text-[#616161] text-[10px] md:text-[14px] max-w-md">
            Grab a Sprite® & participate in the Cashbacks for this hour have
            already been won by other participants. Please come back next hour
            to try again, or continue entering code to collect more Comic Coins
            in the meantime.
          </p>
        </div>

        {/* Previous Winners Banner */}
        <div className="mt-12 bg-[url('/assets/images/green-bg.png')] bg-cover bg-center rounded-lg flex justify-between items-center p-4 md:p-6">
          <AktivGroteskText
            text="PREVIOUS WINNERS"
            fontSize="text-[16px] md:text-[30px]"
            fontWeight="font-[700]"
            className="text-white"
          />
          <GreenCTA
            text="Leaderboard"
            onClick={() => {}}
            paddingClass="py-[6px] px-[20px] md:py-[14px] md:px-[60px]"
            fontSize="text-[12px] md:text-[20px]"
            className="md:w-auto"
          />
        </div>

        {/* Promotional Banners */}
        <div className="mt-8 flex flex-col gap-4">
          <Banner
            type="image"
            src="/assets/images/banner-contest.png"
            className="rounded-lg"
          />
          <Banner
            type="image"
            src="/assets/images/banner-contest.png"
            className="rounded-lg"
          />
        </div>
      </ScreenWrapper>
    </>
  );
};

export default ComicCoinsPage;
