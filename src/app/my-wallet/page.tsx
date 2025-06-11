"use client";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import React, { useState, useEffect } from "react";
import GreenCTA from "@/components/GreenCTA";
import Banner from "@/components/common/Banner/Banner";
import AktivGroteskText from "@/components/common/AktivGroteskText";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/common/Header/Header";
import WalletCard from "@/components/WalletCard";
import { useCMSData } from "@/data";
import ReferNowComponent from "@/components/common/ReferNowComponent";

const ComicCoinsPage = () => {
  const [mounted, setMounted] = useState(false);
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);

  return (
    <>
      <div className="bg-white -mt-5 pt-5">
        {/* Top Section */}
        <div className="flex justify-between items-end h-full container mx-auto mt-20">
          {/* Comic Coins */}
          <div className="mx-4 md:mx-0">
            <AktivGroteskText
              text={cmsData.comic.comicCoinHeader}
              fontSize="text-[14px] md:text-[30px] text-uppercase"
              fontWeight="font-[700]"
            />
            <div className="flex items-center gap-2 md:gap-3 mt-1">
              <AktivGroteskText
                text="0"
                fontSize="text-[28px] md:text-[64px]"
                fontWeight="font-[700]"
              />
              <Image
                src="/assets/images/sprite-gold.png"
                alt="coin"
                width={50}
                height={50}
                className="w-[21px] md:w-[50px] h-[21px] md:h-[50px]"
              />
            </div>
          </div>
          <div className="md:mt-0 mt-[16px] md:mr-0 mr-[16px] md:mb-[30px] mb-[12px]">
            <GreenCTA
              text="How To Collect?"
              onClick={() => {}}
              paddingClass="py-[8px] px-[20px] md:py-[16px] md:px-[50px]"
              fontSize="text-[12px] md:text-[28px]"
              isCoinIcon={true}
            />
          </div>
        </div>
      </div>
      <ScreenWrapper className="mt-0">
        {/* Announcing Winner Timer */}
        {/* <AnnouncingWinnerTimer /> */}

        {/* Reward Pool */}
        <Header title="My Wins" className="md:mt-8 mt-0 mx-[-19px] md:mx-0" />
        <div className="mt-4 w-full">
          <WalletCard
            imageUrl="/other-svgs/my-win.svg"
            imageClassName="w-full h-auto"
            imageAlt="my-win"
            containerClassName="bg-white rounded-[10.68px] px-[13px] py-[14.57px] md:pt-[16px] md:pb-[35px] md:px-[33.5px] flex flex-col md:gap-[18.5px] gap-[8px] w-full"
          >
            <div className="flex flex-col items-center gap-[24px] md:gap-[36px]">
              <div className="flex flex-col items-center gap-[0px] md:gap-[20px]">
                <AktivGroteskText
                  text="The Ultimate Retreat"
                  fontSize="text-[20px] md:text-[28px]"
                  fontWeight="font-[700]"
                />
                <p className="text-[#313131] md:text-[20px] text-[16px] text-center max-w-[291px]">
                  Participate & win* MakeMyTrip voucher worth Rs.25,000 ✈️
                </p>
              </div>
              <GreenCTA
                text="Collect More"
                onClick={() => {}}
                paddingClass="py-[12px] px-[36px] md:py-[20px] md:px-[44px]"
                fontSize="text-[12px] md:text-[20px]"
                className="max-w-[250px]"
              />
            </div>
          </WalletCard>
        </div>

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
        <div className="md:mt-[40px] mt-[16px] bg-[url('/other-svgs/banner-explore.svg')] bg-cover bg-center md:rounded-[20px] rounded-[10px] flex justify-between items-center p-4 md:p-6 ">
          <AktivGroteskText
            text={cmsData.comic.previousWinnerBanner1Text}
            fontSize="text-[16px] md:text-[30px]"
            fontWeight="font-[700]"
            className="text-white"
          />
          <Link href="/leaderboard">
            <GreenCTA
              text={cmsData.comic.leaderboardButtonBanner1Text}
              onClick={() => {}}
              paddingClass="py-[6px] px-[20px] md:py-[14px] md:px-[60px]"
              fontSize="text-[12px] md:text-[28px] md:font-bold"
              className="md:w-auto"
            />
          </Link>
        </div>

        {/* Promotional Banners */}
        <div className="md:my-[40px] my-[16px] flex flex-col md:gap-y-[40px] gap-y-[16px]">
          <button
            onClick={() => setIsReferModalOpen(true)}
            className="cursor-pointer"
          >
            <Banner
              type="image"
              src="/other-svgs/share-laugh.svg"
              className="rounded-lg"
            />
          </button>
          <Link href="/submit-your-joke">
            <Banner
              type="image"
              src="/home-page/banner-bottom.png"
              className="rounded-lg"
            />
          </Link>
        </div>
      </ScreenWrapper>

      {/* Refer Modal */}
      <ReferNowComponent
        open={isReferModalOpen}
        onClose={() => setIsReferModalOpen(false)}
      />
    </>
  );
};

export default ComicCoinsPage;
