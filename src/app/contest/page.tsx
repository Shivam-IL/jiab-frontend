"use client";
import React, { useState, useEffect } from "react";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import HowToParticipate from "@/components/HowToParticipate";
import Header from "@/components/common/Header/Header";
import WalletCard from "@/components/WalletCard";
import ContentButton from "@/components/common/ContentButton";
import ContestFlatCard from "@/components/ContestFlatCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GA_EVENTS, LOCAL_KEYS } from "@/constants";
import ReferNowComponent from "@/components/common/ReferNowComponent";
import InviteCodeComponent from "@/components/common/InviteCodeComponent";
import UniqueCodeModal from "@/components/UniqueCodeModal";
import ContestSurpriseModal from "@/components/ContestSurpriseModal";
import { useCMSData } from "@/data";
import { triggerGAEvent } from "@/utils/gTagEvents";
import ComingSoon from "@/components/Banners/ComingSoon";
import CustomJoyride from "@/components/ui/custom-joyride";
import { Step } from "react-joyride";
import { getLocalStorageItem, removeLocalStorageItem } from "@/utils";
import {
  CoinAnimation,
  useCoinAnimation,
} from "@/components/common/CoinAnimation";

const steps: Step[] = [
  {
    title: "Check Previous Winner",
    content: "Check out rank here​",
    target: ".previous-winner",
    placement: "bottom",
    disableBeacon: true,
  },
  {
    title: "Level Up",
    content: "Check out how to collect more Comic Coins here​​",
    target: ".how-to-gather",
    placement: "bottom",
    disableBeacon: true,
  },
];

interface IRewardPool {
  id: number;
  imageUrl: string;
  imageAlt: string;
  textContent: string;
}

interface IContestActivity {
  id: number;
  icon: string;
  title: string;
  reward: number;
  rewardText: string;
  action?: () => void;
}

const ContestPage: React.FC = () => {
  const router = useRouter();

  // Modal states for refer functionality
  const [refer1, setRefer1] = useState<boolean>(false);

  // Modal states for invite code functionality
  const [invite1, setInvite1] = useState<boolean>(false);

  // Modal state for unique code functionality
  const [uniqueCodeModalOpen, setUniqueCodeModalOpen] =
    useState<boolean>(false);

  // Modal state for surprise me functionality
  const [surpriseMeModalOpen, setSurpriseMeModalOpen] =
    useState<boolean>(false);

  // Joyride tour state
  const [runTour, setRunTour] = useState<boolean>(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);

  // Coin animation hook for unique code modal
  const { isAnimating, triggerAnimation, animationKey } = useCoinAnimation();

  const rewardPool = [
    {
      id: 1,
      imageUrl: "/assets/images/reward-1.png",
      imageAlt: "reward-1",
      textContent: "Reward worth Rs.25,000",
    },
    {
      id: 2,
      imageUrl: "/assets/images/reward-2.svg",
      imageAlt: "reward-2",
      textContent: "Cashback worth Rs.10",
    },
  ];

  // Helper function to extract reward number and text from banner content
  const parseRewardContent = (content: string) => {
    const match = RegExp(/^(\d+)\s+(.+)$/).exec(content);
    if (match) {
      return {
        reward: parseInt(match[1], 10),
        rewardText: match[2],
      };
    }
    return {
      reward: 0,
      rewardText: content || "",
    };
  };

  const contestActivities: IContestActivity[] = [
    {
      id: 1,
      icon: "/other-svgs/unique.svg",
      title: cmsData.contest.banner1Header,
      ...parseRewardContent(cmsData.contest.banner1Content),
      action: () => {
        setUniqueCodeModalOpen(true);
      },
    },
    {
      id: 2,
      icon: "/other-svgs/haha.svg",
      title: cmsData.contest.banner2Header,
      ...parseRewardContent(cmsData.contest.banner2Content),
      action: () => {
        setSurpriseMeModalOpen(true);
      },
    },
    {
      id: 3,
      icon: "/other-svgs/vote.svg",
      title: cmsData.contest.banner3Header,
      ...parseRewardContent(cmsData.contest.banner3Content),
      action: () => {
        setTimeout(() => router.push("/user-generated-jokes"), 500);
      },
    },
    {
      id: 4,
      icon: "/other-svgs/referral.svg",
      title: cmsData.contest.banner4Header,
      ...parseRewardContent(cmsData.contest.banner4Content),
      action: () => {
        triggerGAEvent(GA_EVENTS.SPRITE_J24_REFER_NOW);
        setRefer1(true);
      },
    },
    {
      id: 5,
      icon: "/other-svgs/invite.svg",
      title: cmsData.contest.banner5Header,
      ...parseRewardContent(cmsData.contest.banner5Content),
      action: () => {
        setInvite1(true);
      },
    },
    {
      id: 6,
      icon: "/other-svgs/project.svg",
      title: cmsData.contest.banner6Header,
      ...parseRewardContent(cmsData.contest.banner6Content),
      action: () => {
        setTimeout(() => router.push("/profile"), 500);
      },
    },
    {
      id: 7,
      icon: "/other-svgs/qna.svg",
      title: cmsData.contest.banner7Header,
      ...parseRewardContent(cmsData.contest.banner7Content),
      action: () => {
        // Navigate to profile page with QNA section - works on both desktop and mobile
        setTimeout(() => {
          router.push("/profile#qna");
        }, 500);
      },
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

  useEffect(() => {
    const contestTour = getLocalStorageItem(LOCAL_KEYS.CONTEST_TOUR);
    if (contestTour === "true") {
      setRunTour(true);
      removeLocalStorageItem(LOCAL_KEYS.CONTEST_TOUR);
    }
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
    <>
      <CustomJoyride
        steps={steps as Step[]}
        run={runTour}
        onComplete={() => setRunTour(false)}
        onSkip={() => setRunTour(false)}
        showProgress={false}
        showSkipButton={false}
        spotlightClicks={false}
        continuous={true}
        disableOverlayClose={false}
        disableScrolling={false}
      />
      <ScreenWrapper className="overflow-hidden pt-20">
        {isContestOver ? (
          <div className="md:w-full h-auto md:mt-[40px] mt-[18px] ">
            <ComingSoon
              topText={cmsData.contest.giftBoxTheContestIsOver}
              mainText={cmsData.contest.comingSoon}
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
              {rewardPool.map((item: IRewardPool) => (
                <WalletCard
                  key={item.id}
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
                  {rewardPool.map((item) => (
                    <CarouselItem key={item.id} className="basis-4/5">
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
                    key={index + 1}
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
        <div className="flex justify-center md:mt-[40px] mt-[24px]">
          <Link href="/leaderboard">
            <ContentButton
              id="previous-winner"
              text={cmsData.contest.previousWinnerListButtonText}
              onClick={() => {}}
              icon="/static/sprite/icons/leaderboard.svg"
              className="md:py-[25px] previous-winner py-[10.4px] md:pl-[58px] pl-[23px] md:pr-[42.4px] pr-[22.62px] bg-yellow text-black"
            />
          </Link>
        </div>

        {/* How to Gather */}
        <div className="how-to-gather">
          <Header
            title={cmsData.contest.howToGatherComicCoins}
            id="how-to-gather"
            className="md:mt-[40px] how-to-gather mt-[24px] md:ml-0 -ml-[16px] mx-5"
          />

          {/* Contest Activities */}
          <div className="grid  grid-cols-2 lg:grid-cols-3 md:gap-x-[17px] md:gap-y-[28px] gap-x-[13px] gap-y-[12px] md:pb-[41px] pb-[28px] md:mt-[24px] mt-[16px]">
            {contestActivities?.map((activity) => (
              <ContestFlatCard
                key={activity.id}
                icon={activity.icon}
                title={activity.title}
                reward={activity.reward}
                rewardText={activity.rewardText}
                onClick={activity.action || (() => {})}
              />
            ))}
          </div>
        </div>
      </ScreenWrapper>

      {/* Refer Modals */}
      <ReferNowComponent
        setOpen={setRefer1}
        open={refer1}
        onClose={() => {
          setRefer1(false);
        }}
      />

      {/* Invite Code Modals */}
      <InviteCodeComponent
        setOpen={setInvite1}
        open={invite1}
        onClose={() => {
          setInvite1(false);
        }}
      />

      {/* Unique Code Modal */}
      <UniqueCodeModal
        open={uniqueCodeModalOpen}
        onClose={() => {
          setUniqueCodeModalOpen(false);
        }}
        onSuccess={() => {
          triggerAnimation();
        }}
      />

      {/* Contest Surprise Modal */}
      <ContestSurpriseModal
        open={surpriseMeModalOpen}
        onClose={() => {
          setSurpriseMeModalOpen(false);
        }}
        onReaction={() => {
          triggerAnimation();
        }}
      />

      {/* Coin Animation */}
      <CoinAnimation isVisible={isAnimating} animationKey={animationKey} />
    </>
  );
};

export default ContestPage;
