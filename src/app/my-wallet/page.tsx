"use client";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import React from "react";
import GreenCTA from "@/components/GreenCTA";
import Banner from "@/components/common/Banner/Banner";
import AktivGroteskText from "@/components/common/AktivGroteskText";
import Image from "next/image";
import Link from "next/link";

const ComicCoinsPage = () => {
  return (
    <>
      <div className="bg-white -mt-5 pt-5">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 container mx-auto mt-20">
          {/* Comic Coins */}
          <div className="mx-4 md:mx-0">
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
                width={50}
                height={50}
                className="w-[20px] md:w-[50px] h-auto"
              />
            </div>
          </div>
        </div>
      </div>
      <ScreenWrapper className="mt-0">
        {/* Announcing Winner Timer */}
        {/* <AnnouncingWinnerTimer /> */}

        {/* Reward Pool */}
        {/* <Header title="My Wins" className="md:mt-8 mt-0 mx-0" /> */}
        {/* <div className="flex justify-center mt-4 md:w-[507px] w-full mx-auto">
          <WalletCard
            imageUrl="/other-svgs/my-win.svg"
            imageAlt={reward.imageAlt}
          >
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
        </div> */}

        {/* PhonePe Cashback */}
        {/* <Header title="PhonePe Cashback" className="md:mt-[40px] mt-[20px]" />
        <div className="bg-white rounded-[10.68px] flex flex-col items-center text-center p-6 md:p-10 gap-6 mt-4">
          <Image
            src="/other-svgs/bummer.svg"
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
            paddingClass="py-[6px] px-[16px] md:py-[14px] md:px-[60px] max-w-[337px]"
            fontSize="text-[12px] md:text-[20px]"
          />
          <p className="text-[#616161] text-[10px] md:text-[14px]">
            Grab a Sprite® & participate in the Cashbacks for this hour have
            already been won by other participants. Please come back next hour
            to try again, or continue entering code to collect more Comic Coins
            in the meantime.
          </p>
        </div> */}

        {/* Previous Winners Banner */}
        {/* */}
        <div className="mt-[40px] bg-[url('/other-svgs/banner-explore.svg')] bg-cover bg-center md:rounded-[20px] rounded-[10px] flex justify-between items-center p-4 md:p-6 ">
          <AktivGroteskText
            text="PREVIOUS WINNERS"
            fontSize="text-[16px] md:text-[30px]"
            fontWeight="font-[700]"
            className="text-white"
          />
          <Link href="/leaderboard">
            <GreenCTA
              text="Leaderboard"
              onClick={() => {}}
              paddingClass="py-[6px] px-[20px] md:py-[14px] md:px-[60px]"
              fontSize="text-[12px] md:text-[28px] md:font-bold"
              className="md:w-auto"
            />
          </Link>
        </div>

        {/* Promotional Banners */}
        <div className="md:my-[40px] my-[16px] flex flex-col md:gap-y-[40px] gap-y-[16px]">
          <Banner
            type="image"
            src="/other-svgs/share-laugh.svg"
            className="rounded-lg"
          />
          <Link href="/submit-your-joke">
            <Banner
              type="image"
              src="/home-page/banner-bottom.png"
              className="rounded-lg"
            />
          </Link>
        </div>
      </ScreenWrapper>
    </>
  );
};

export default ComicCoinsPage;
