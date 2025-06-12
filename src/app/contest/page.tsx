"use client";
import React, { useState, useEffect } from "react";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import HowToParticipate from "@/components/HowToParticipate";
import Header from "@/components/common/Header/Header";
import WalletCard from "@/components/WalletCard";
import ContentButton from "@/components/common/ContentButton";
import Banner from "@/components/common/Banner/Banner";
import ContestFlatCard from "@/components/ContestFlatCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InviteCodePopupWrapper from "@/components/InviteCodePopus";
import {
  INVITE_CODE_POPUP_DATA,
} from "@/constants";
import ReferNowComponent from "@/components/common/ReferNowComponent";
import InviteCodeComponent from "@/components/common/InviteCodeComponent";
import { useCMSData } from "@/data";

const ContestPage: React.FC = () => {
  const router = useRouter();

  // Modal states for refer functionality
  const [refer1, setRefer1] = useState<boolean>(false);

  // Modal states for invite code functionality
  const [invite1, setInvite1] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);



  const rewardPool = [
    {
      imageUrl: "/assets/images/reward-1.png",
      imageAlt: "reward-1",
      textContent: "Reward worth Rs.25,000",
    },
    {
      imageUrl: "/assets/images/reward-2.png",
      imageAlt: "reward-2",
      textContent: "Cashback worth Rs.10",
    },
  ];

  const contestActivities = [
    {
      id: 1,
      icon: "/other-svgs/unique.svg",
      title: "Enter Unique Code",
      reward: 20,
      rewardText: "For Using Unique Code",
    },
    {
      id: 2,
      icon: "/other-svgs/haha.svg",
      title: "React to a Joke",
      reward: 1,
      rewardText: "Per Joke",
      action: () => router.push("/scroll-and-lol"),
    },
    {
      id: 3,
      icon: "/other-svgs/vote.svg",
      title: "Vote for Favorite Joke",
      reward: 1,
      rewardText: "Per Language Weekly",
      action: () => router.push("/user-generated-jokes"),
    },
    {
      id: 4,
      icon: "/other-svgs/referral.svg",
      title: "Refer a Friend",
      reward: 5,
      rewardText: "Per Successful Referral",
      action: () => setRefer1(true),
    },
    {
      id: 5,
      icon: "/other-svgs/invite.svg",
      title: "Use Invite Code",
      reward: 1,
      rewardText: "For Using Invite Code",
      action: () => setInvite1(true),
    },
    {
      id: 6,
      icon: "/other-svgs/project.svg",
      title: "Complete Your Profile",
      reward: 10,
      rewardText: "On Completion",
      action: () => router.push("/profile"),
    },
  ];

  // Carousel state management
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  // Calculate page count for reward pool carousel
  useEffect(() => {
    setPageCount(Math.ceil(rewardPool.length / 1)); // 1 item per page on mobile
  }, [rewardPool.length]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Function to navigate to a specific page
  const goToPage = (pageIndex: number) => {
    if (!api) return;
    api.scrollTo(pageIndex);
  };

  const isContestOver = true;

  return (
    <>
      <ScreenWrapper className="overflow-hidden pt-20">
        {isContestOver ? (
            <div className="md:w-full h-auto md:mt-[40px] mt-[18px] md:mx-0 -mx-5">
              <Banner
                type="image"
                msrc="other-svgs/contest-over-new.svg"
                src="other-svgs/contest-over-new-mobile.svg"
                className="rounded-lg md:mx-0 mx-5"
              />
            </div>
        ) : (
          <>
            {/* <AnnouncingWinnerTimer /> */}

            {/* How to participate */}
            <HowToParticipate />

            {/* Reward Pool */}
            <Header
              title="Reward Pool"
              className="md:mt-[66px] mt-[16px] md:mb-[40px] mb-[12px] md:ml-0 -ml-[16px]"
            />

            {/* Desktop Layout */}
            <div className="hidden md:flex md:gap-[88px] justify-center">
              {rewardPool.map((item, index) => (
                <WalletCard
                  key={index}
                  imageUrl={item.imageUrl}
                  imageAlt={item.imageAlt}
                  textContent={item.textContent}
                />
              ))}
            </div>

            {/* Mobile Carousel Layout */}
            <div className="block md:hidden">
              <Carousel
                className="mx-0"
                setApi={setApi}
                opts={{
                  align: "center",
                  loop: false,
                  skipSnaps: false,
                }}
              >
                <CarouselContent>
                  {rewardPool.map((item, index) => (
                    <CarouselItem key={index} className="basis-4/5">
                      <div className="flex justify-center">
                        <WalletCard
                          imageUrl={item.imageUrl}
                          imageAlt={item.imageAlt}
                          textContent={item.textContent}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Navigation dots for mobile */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === current
                        ? "md:w-8 w-[17.73px] bg-black"
                        : "md:w-4 w-[8.86px] bg-gray-300"
                    }`}
                    onClick={() => goToPage(index)}
                    aria-label={`Go to reward ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-center md:mt-[40px] mt-[17px]">
          <Link href="/leaderboard">
            <ContentButton
              text={cmsData.contest.previousWinnerListButtonText}
              onClick={() => {}}
              icon="/static/sprite/icons/leaderboard.svg"
              className="md:py-[25px] py-[10.4px] md:pl-[58px] pl-[23px] md:pr-[42.4px] pr-[22.62px] bg-yellow text-black"
            />
          </Link>
        </div>

        {/* How to Gather */}
        {/* <Header
          title="How to Gather Comic Coins"
          className="md:mt-[40px] mt-[16px] md:ml-0 -ml-[16px] mx-5"
        />
        <div className="md:w-full h-auto md:mt-[28px] mt-[12px] md:mx-0 -mx-5">
          <Banner
            type="image"
            src="/assets/images/banner-contest.png"
            className="rounded-lg md:mx-0 mx-5"
          />
        </div> */}

        {/* Contest Activities */}
        <div className="grid grid-cols-2 lg:grid-cols-3 md:gap-[30px] gap-x-[15px] gap-y-[10px] md:pb-[41px] pb-[28px] md:mt-[40px] mt-[16px]">
          {contestActivities.map((activity) => (
            <ContestFlatCard
              key={activity.id}
              icon={activity.icon}
              title={activity.title}
              reward={activity.reward}
              rewardText={activity.rewardText}
              onClick={activity.action}
            />
          ))}
        </div>
      </ScreenWrapper>

      {/* Refer Modals */}
      <ReferNowComponent
        setOpen={setRefer1}
        open={refer1}
        onClose={() => {
          setRefer1(false)
        }}
      />

      {/* Invite Code Modals */}
      <InviteCodeComponent
        setOpen={setInvite1}
        open={invite1}
        onClose={() => {
          setInvite1(false)
        }}
      />
     
    </>
  );
};

export default ContestPage;
