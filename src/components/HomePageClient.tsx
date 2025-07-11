"use client";
import { useEffect, useState } from "react";
import Login from "@/components/common/Login";
import OtpModal from "@/components/common/OtpModal";
import Signup from "@/components/common/Signup";
import SurpriseMeLockModal from "@/components/common/SurpriseMeLockModal";
import SurpriseMeModal from "@/components/common/SurpriseMeModal";
import useAppSelector from "@/hooks/useSelector";
import { useCMSData } from "@/data";
import Image from "next/image";

import Header from "@/components/common/Header/Header";
import VideoScroll from "@/components/video-carousel/VideoScroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CircularBoxesModal, {
  BoxIds,
} from "@/components/common/CircularBoxesModal";
import useWindowWidth from "@/hooks/useWindowWidth";
import SvgIcons from "@/components/common/SvgIcons";
import {
  GA_EVENTS,
  ICONS_NAMES,
  SESSION_STORAGE_KEYS,
  CATEGORY_ID_CMS_KEY_MAPPING,
  LANGUAGE_MNEMONICS,
} from "@/constants";
import { updateSurpriseMe } from "@/store/auth/auth.slice";
import useAppDispatch from "@/hooks/useDispatch";
import { useGetJokes } from "@/api/hooks/JokeHooks";
import { IJoke } from "@/api/types/JokeTypes";
import { useLanguage } from "@/hooks/useLanguage";
import { triggerGAEvent } from "@/utils/gTagEvents";
import HomePageJokeSection from "./common/HomePageJokeSection";
import { PJChallenge, ChillGuyBanner } from "./Banners";
import { useRouter } from "next/navigation";
import { useGlobalLoader } from "@/hooks/useGlobalLoader";
import HomePageDesktopOnboarding, {
  DesktopBoxIds,
} from "./common/HomePageDesktopOnboarding";
import { getSessionStorageItem } from "@/utils";
import {
  CoinAnimation,
  useCoinAnimation,
} from "@/components/common/CoinAnimation";
import { useCallback } from "react";
import {
  CDP_EVENT_SUB_TYPES,
  SocialMediaCDPEventPayload,
  CDPEventPayloadBuilder,
  BaseCDPEventPayload,
} from "@/api/utils/cdpEvents";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";
import { INFOBIP_WHATSAPP_URL } from "@/config";
import { cn } from "@/lib/utils";

export default function HomePageClient() {
  const {
    otpSent,
    otpVerified,
    loginModal,
    crossModal,
    enableCoachMarks,
    refreshTokenNotVerified,
  } = useAppSelector((state) => state.auth);

  // Get genres from Redux store
  const { genres } = useAppSelector((state) => state.reference);

  const dispatch = useAppDispatch();
  const width = useWindowWidth();

  const [isClient, setIsClient] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  // Get mapped CMS data using our data layer
  const cmsData = useCMSData(mounted);

  // Fetch jokes to populate video carousel dynamically
  const { selectedLanguage } = useLanguage();
  const isMathilyOdiaKannada =
    selectedLanguage === LANGUAGE_MNEMONICS.KANNADA ||
    selectedLanguage === LANGUAGE_MNEMONICS.ORIYA ||
    selectedLanguage === LANGUAGE_MNEMONICS.MAITHILI;
  const { data: jokesResponse } = useGetJokes({
    limit: 3,
    language: selectedLanguage,
    type: "home",
  });

  // Map API response to the structure expected by <VideoScroll />
  const jokesData = jokesResponse?.ok ? (jokesResponse.data as IJoke[]) : [];
  const videoData = jokesData.map((joke) => ({
    id: joke.id,
    src: joke.thumbnail_url,
    url: `/scroll-and-lol?selected_joke=${encodeURIComponent(joke.id)}`,
    title: joke.title,
  }));

  // Transform genres from API to match the expected structure
  const categories =
    genres?.map((genre) => {
      const CATEGORY_ID_CMS_KEY_MAPPING_TYPED =
        CATEGORY_ID_CMS_KEY_MAPPING as Record<number, string>;
      const key = CATEGORY_ID_CMS_KEY_MAPPING_TYPED[genre.id];
      const isValidKey =
        typeof key === "string" && key in cmsData.jokeBoxFilter;

      return {
        id: genre.id.toString(),
        name: isValidKey
          ? (cmsData.jokeBoxFilter[
              key as keyof typeof cmsData.jokeBoxFilter
            ] as string)
          : genre.genre, // fallback to original genre name
        image_url: genre.image_url,
        url: "/pick-mood",
      };
    }) || [];

  // Calculate how many pages we need based on screen size
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to desktop
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Genre-specific surprise me modal state
  const [genreSurpriseModal, setGenreSurpriseModal] = useState<boolean>(false);
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(
    undefined
  );

  // SerialChillerPopup session logic
  const [serialChillerOpen, setSerialChillerOpen] = useState(false);

  // Coin animation hooks
  const {
    isAnimating: isVoteAnimating,
    triggerAnimation: triggerVoteAnimation,
    animationKey: voteAnimationKey,
  } = useCoinAnimation();

  useEffect(() => {
    // Use window check for client-side only
    const handleResize = () => {
      // Set items per page based on screen width
      if (window.innerWidth < 768) {
        setItemsPerPage(4); // Mobile: 4 items
      } else {
        setItemsPerPage(6); // Desktop: 6 items
      }
    };

    // Initial check
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width < 768) {
      if (crossModal) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    } else {
      setIsModalOpen(false);
    }
  }, [width, crossModal]);

  // Calculate page count
  useEffect(() => {
    setPageCount(Math.ceil(categories.length / itemsPerPage));
  }, [itemsPerPage, categories.length]);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      const selectedIndex = api.selectedScrollSnap();
      const totalItems = categories.length;
      const lastPage = Math.ceil(totalItems / itemsPerPage) - 1;

      // Check if we're at or near the end of the carousel
      if (selectedIndex >= totalItems - itemsPerPage) {
        setCurrent(lastPage);
      } else {
        setCurrent(Math.floor(selectedIndex / itemsPerPage));
      }
    });
  }, [api, itemsPerPage, categories.length]);

  // Function to navigate to a specific page
  const goToPage = (pageIndex: number) => {
    if (!api) return;
    api.scrollTo(pageIndex * itemsPerPage);
  };

  // Function to handle category click - will trigger modal
  const handleCategoryClick = (category: {
    id: string;
    name: string;
    image_url: string;
    url: string;
  }) => {
    console.log(`Category clicked: ${category.name}`);
    // Check if user is authenticated before showing modal
    if (isAuthenticated) {
      setSelectedGenreId(parseInt(category.id));
      setGenreSurpriseModal(true);
      triggerGAEvent(GA_EVENTS.SPRITE_J24_SURPRISE_ME);
    } else {
      // Show SurpriseMeLockModal for unauthenticated users
      setSelectedGenreId(parseInt(category.id));
      setGenreSurpriseModal(true);
    }
  };

  const { isAuthenticated, isFirstLogin, surpriseMe } = useAppSelector(
    (state) => state.auth
  );
  const { user } = useAppSelector((state) => state.profile);
  const { forceHideLoader } = useGlobalLoader();

  const router = useRouter();
  const { mutate: sendCDPEvent } = useSendCDPEvent();

  useEffect(() => {
    // Show SerialChillerPopup only once after login
    const hasShownSerialChiller =
      getSessionStorageItem(
        SESSION_STORAGE_KEYS.HAS_SHOWN_SERIAL_CHILL_MODAL
      ) === "true";
    if (isAuthenticated && !hasShownSerialChiller) {
      setSerialChillerOpen(true);
    }
  }, [isAuthenticated, enableCoachMarks]);

  // Function to handle successful vote animation
  const handleVoteSuccess = useCallback(() => {
    triggerVoteAnimation();
  }, [triggerVoteAnimation]);

  const handlePJChallengeClick = () => {
    triggerGAEvent(GA_EVENTS.SPRITE_J24_SUBMIT_JOKE);
    triggerCDP_PJ_Challenge();
    router.push("/submit-your-joke");
  };

  const closeGenreSurpriseMe = () => {
    forceHideLoader();
    setGenreSurpriseModal(false);
    setSelectedGenreId(undefined);
  };

  const triggerCDPEvent = (eventSubType: string) => {
    if (eventSubType && user?.id) {
      const payload: SocialMediaCDPEventPayload =
        CDPEventPayloadBuilder.buildSocialMediaPayload(eventSubType, user?.id);
      sendCDPEvent(payload);
    }
  };

  const triggerCDP_PJ_Challenge = () => {
    if (user?.id) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildUGCInterestPayload({
          user_identifier: user?.id,
        });
      sendCDPEvent(payload);
    }
  };

  const isTamil = selectedLanguage === "ta";
  console.log("SurpriseMe", surpriseMe);

  return (
    <div className="bg-lightGray min-h-screen md:pb-[28px]">
      {/* SerialChillerPopup only once after login */}

      <div className="md:w-[76.57%] mx-auto md:pt-24 pt-20">
        {/* Modals */}
        {!isAuthenticated &&
          refreshTokenNotVerified &&
          getSessionStorageItem(SESSION_STORAGE_KEYS.HAS_SHOWN_LOCK_MODAL) !==
            "true" && <SurpriseMeLockModal />}
        {!isAuthenticated && loginModal && <Login />}
        {!isAuthenticated && otpSent && <OtpModal />}
        {isAuthenticated && otpVerified && isFirstLogin && <Signup />}
        {isAuthenticated &&
          !isFirstLogin &&
          surpriseMe &&
          !enableCoachMarks &&
          serialChillerOpen && (
            <SurpriseMeModal
              onClose={() => {
                forceHideLoader(); // Ensure any loading states are cleared
                dispatch(updateSurpriseMe({ surpriseMe: false }));
                setSerialChillerOpen(false);
              }}
            />
          )}

        <ChillGuyBanner />

        {/* Video Scroll */}
        {!isMathilyOdiaKannada && (
          <>
            <Header
              title={cmsData.homePage.scrollAndLolText}
              className="md:mt-[58px] md:mb-[24px] mt-[20px] mb-[16px]"
              viewAllUrl="/scroll-and-lol"
              viewAllButtonText={cmsData.homePage.viewAllButtonText}
            />
            <div className="video-section">
              <VideoScroll videos={videoData} />
            </div>
          </>
        )}
        {/* Pick your mood */}
        <Header
          title={cmsData.homePage.pickYourMoodHeading}
          className="md:mt-[58px] md:mb-[24px] mt-[20px] mb-[16px]"
          viewAllUrl="/pick-mood"
          viewAllButtonText={cmsData.homePage.viewAllButtonText}
          description={cmsData.homePage.pickYourMoodSubheading}
        />
        <div id={BoxIds.PICK_YOUR_MOOD} className="categories-section">
          <span id={DesktopBoxIds.PICK_YOUR_MOOD}></span>
          <Carousel
            className="md:mx-0 mx-4 flex justify-center"
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
              skipSnaps: true,
            }}
          >
            <CarouselContent>
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="basis-[24%] md:basis-1/6"
                >
                  <button
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="rounded-full bg-white w-[81.7px] h-[81.7px] xxs:w-[60px] xxs:h-[60px] md:w-[140px] md:h-[140px] flex items-center justify-center md:hover:border-2 hover:border hover:border-green transition-all duration-900 md:shadow-lg overflow-hidden shadow-sm">
                      <Image
                        src={category.image_url}
                        alt={category.name}
                        width={80}
                        height={80}
                        className="w-[51.7px] h-[51.7px] xxs:w-[30px] xxs:h-[30px] md:w-[6rem] md:h-[6rem] object-contain"
                      />
                    </div>
                    <p
                      className={cn(
                        "text-center font-medium mt-3 text-xs md:text-[16px]",
                        isTamil &&
                          "md:max-w-[140px] max-w-[80px] text-center text-[8px] md:text-[16px]"
                      )}
                    >
                      {category.name}
                    </p>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation dots - page based */}
          <div className="flex justify-center md:gap-1 gap-[1.77px] md:mb-10 mb-0 md:mt-[30px] mt-[8px]">
            {Array.from({ length: pageCount }).map((_, index) => {
              const isActive = index === current;
              const key = `pagination-dot-${index}`;

              const classes = [
                "h-1 rounded-full transition-all duration-300",
                isActive
                  ? "md:w-[24px] w-[17.73px] bg-black"
                  : "md:w-[12px] w-[8.86px] bg-gray-300",
              ].join(" ");

              return (
                <button
                  key={key}
                  className={classes}
                  onClick={() => goToPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* PJ Challenge */}
        <div
          className={`challenge-section md:mt-0 mt-[20px] mx-4 md:mx-0 ${
            isAuthenticated ? "" : "md:mb-[24px] mb-[16px]"
          }`}
        >
          <PJChallenge
            heading={cmsData.homePage.pjChallengeHeading}
            subheading={cmsData.homePage.pjChallengeSubheading}
            buttonText={cmsData.homePage.pjBannerSubmitButtonText}
            onClick={handlePJChallengeClick}
          />
        </div>

        {isAuthenticated && (
          <HomePageJokeSection
            isClient={isClient}
            onVoteSuccess={handleVoteSuccess}
          />
        )}

        {/* Follow Sprite */}
        <div className="bg-[#121212] text-white pt-[13.19px] mx-4 rounded-lg mb-[90px] block md:hidden">
          <h2 className="text-center text-md font-medium mb-[13px]">
            {cmsData.homePage.followSprite}
          </h2>
          <div className="flex justify-center gap-6 pb-[16.18px]">
            {[
              {
                id: 1,
                href: "https://www.facebook.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.FACEBOOK} className="w-5 h-5" />
                ),
                label: "Facebook",
                eventSubType: CDP_EVENT_SUB_TYPES.FOLLOW_JIAB_FB,
              },
              {
                id: 2,
                href: "https://www.instagram.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.INSTAGRAM} className="w-5 h-5" />
                ),
                label: "Instagram",
                eventSubType: CDP_EVENT_SUB_TYPES.FOLLOW_JIAB_INSTA,
              },
              {
                id: 3,
                href: "https://www.youtube.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.YOUTUBE} className="w-5 h-5" />
                ),
                label: "YouTube",
                eventSubType: CDP_EVENT_SUB_TYPES.FOLLOW_JIAB_YT,
              },
              {
                id: 4,
                href: `${INFOBIP_WHATSAPP_URL}&text=Hi,+I+am+here+for+Sprite+Joke-In-A-Bottle!+By+pressing+Send+on+this,+I+give+my+consent+to+sharing+my+mobile+number+and+display+name+with+Sprite.`,
                icon: (
                  <SvgIcons name={ICONS_NAMES.WHATSAPP} className="w-5 h-5" />
                ),
                label: "WhatsApp",
                eventSubType: CDP_EVENT_SUB_TYPES.FOLLOW_JIAB_WA,
              },
            ].map((social) => (
              <button
                key={social.id}
                onClick={() => {
                  triggerGAEvent(GA_EVENTS.CLICK);
                  triggerCDPEvent(social.eventSubType);
                  window.open(social.href, "_blank");
                }}
                rel="noopener noreferrer"
                className="bg-white border-none outline-none rounded-full w-[31px] h-[31px] flex items-center justify-center"
                aria-label={`Follow on ${social.label}`}
              >
                {social.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isClient && enableCoachMarks && width < 768 && (
        <CircularBoxesModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      {isClient && enableCoachMarks && width > 768 && (
        <HomePageDesktopOnboarding
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}

      {/* Genre-specific Surprise Me Modal */}
      {genreSurpriseModal && isAuthenticated && (
        <SurpriseMeModal
          genreId={selectedGenreId}
          category={
            categories?.find(
              (category) => category.id === selectedGenreId?.toString()
            )?.name ?? ""
          }
          pullJoke={true}
          languageId={1}
          onClose={() => {
            closeGenreSurpriseMe();
            setGenreSurpriseModal(false);
          }}
        />
      )}

      {/* Show login modal for unauthenticated users */}
      {genreSurpriseModal && !isAuthenticated && (
        <SurpriseMeLockModal onClose={closeGenreSurpriseMe} forceShow={true} />
      )}

      {/* Coin Animations */}
      <CoinAnimation
        isVisible={isVoteAnimating}
        animationKey={voteAnimationKey}
      />
    </div>
  );
}
