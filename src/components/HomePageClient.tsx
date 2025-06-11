"use client";
import { useEffect, useState } from "react";
import Login from "@/components/common/Login";
import OtpModal from "@/components/common/OtpModal";
import Signup from "@/components/common/Signup";
import SurpriseMeLockModal from "@/components/common/SurpriseMeLockModal";
import SurpriseMeModal from "@/components/common/SurpriseMeModal";
import useAppSelector from "@/hooks/useSelector";
import { useCMSData } from "@/data";

import Banner from "@/components/common/Banner/Banner";
import bannerImage from "../../public/assets/images/banner-top.svg";
import pjChallengeImage from "../../public/home-page/banner-bottom.png";
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
import { ICONS_NAMES } from "@/constants";
import UgcCard from "@/components/common/UgcCard";
import Link from "next/link";
import { updateSurpriseMe } from '@/store/auth/auth.slice'
import useAppDispatch from '@/hooks/useDispatch'

export default function HomePageClient() {
  const { otpSent, otpVerified, loginModal, crossModal } =
    useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const width = useWindowWidth();

  // Tour Guide State - REMOVED unused variables
  const [isClient, setIsClient] = useState(false);

  const [mounted, setMounted] = useState(false);

  // Use effect to handle client-side hydration
  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  // Get mapped CMS data using our data layer
  const cmsData = useCMSData(mounted);

  // Path to the thumbnail image - you'll need to ensure this exists in your project
  const thumbnailPath = "/videos/thumbnail.jpg";

  // Video data for the carousel
  const videoData = [
    {
      id: "video1",
      src: thumbnailPath,
      url: "/scroll-and-lol",
    },
    {
      id: "video2",
      src: thumbnailPath,
      url: "/scroll-and-lol",
    },
    {
      id: "video3",
      src: thumbnailPath,
      url: "/scroll-and-lol",
    },
  ];

  const categories: {
    id: string;
    name: string;
    icon: string;
    url?: string;
  }[] = [
    {
      id: "category1",
      name: "Cricket",
      icon: ICONS_NAMES.CRICKET,
      url: "/pick-mood",
    },
    {
      id: "category2",
      name: "Animals",
      icon: ICONS_NAMES.ANIMAL,
      url: "/pick-mood",
    },
    {
      id: "category3",
      name: "Food",
      icon: ICONS_NAMES.FOOD,
      url: "/pick-mood",
    },
    {
      id: "category4",
      name: "Wedding",
      icon: ICONS_NAMES.RELATIONSHIP,
      url: "/pick-mood",
    },
    {
      id: "category5",
      name: "College",
      icon: ICONS_NAMES.COLLEGE,
      url: "/pick-mood",
    },
    {
      id: "category6",
      name: "Office",
      icon: ICONS_NAMES.OFFICE,
      url: "/pick-mood",
    },
    {
      id: "category7",
      name: "Family",
      icon: ICONS_NAMES.FAMILY,
      url: "/pick-mood",
    },
    {
      id: "category8",
      name: "Friends",
      icon: ICONS_NAMES.FRIENDS,
      url: "/pick-mood",
    },
    {
      id: "category9",
      name: "Finance",
      icon: ICONS_NAMES.FINANCE,
      url: "/pick-mood",
    },
    {
      id: "category10",
      name: "Daily Humour",
      icon: ICONS_NAMES.DAILY_HUMOR,
      url: "/pick-mood",
    },
    {
      id: "category11",
      name: "Self",
      icon: ICONS_NAMES.SELF,
      url: "/pick-mood",
    },
    {
      id: "category12",
      name: "Adulting",
      icon: ICONS_NAMES.ADULTING,
      url: "/pick-mood",
    },
    {
      id: "category13",
      name: "Observation",
      icon: ICONS_NAMES.OBSERVING,
      url: "/pick-mood",
    },
    {
      id: "category14",
      name: "Internet",
      icon: ICONS_NAMES.INTERNET,
      url: "/pick-mood",
    },
    {
      id: "category15",
      name: "Pollution",
      icon: ICONS_NAMES.POLLUTION,
      url: "/pick-mood",
    },
    {
      id: "category16",
      name: "Travel",
      icon: ICONS_NAMES.TRAVEL,
      url: "/pick-mood",
    },
    {
      id: "category17",
      name: "Dating",
      icon: ICONS_NAMES.DATING,
      url: "/pick-mood",
    },
    {
      id: "category18",
      name: "Traffic",
      icon: ICONS_NAMES.TRAFFIC,
      url: "/pick-mood",
    },
    {
      id: "category19",
      name: "OTT",
      icon: ICONS_NAMES.OTT,
      url: "/pick-mood",
    },
    {
      id: "category20",
      name: "Non-Genre",
      icon: ICONS_NAMES.NON_GENRE,
      url: "/pick-mood",
    },
  ];

  // Calculate how many pages we need based on screen size
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to desktop
  const [activeTab, setActiveTab] = useState<"Latest" | "Trending">("Latest");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jokeBoxApi, setJokeBoxApi] = useState<CarouselApi>();
  const [jokeBoxCurrent, setJokeBoxCurrent] = useState(0);
  const [jokeBoxPageCount, setJokeBoxPageCount] = useState(0);

  useEffect(() => {
    // Use window check for client-side only
    const handleResize = () => {
      // Set items per page based on screen width
      if (window.innerWidth < 768) {
        setItemsPerPage(5); // Mobile: 5 items
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
    setJokeBoxPageCount(3); // Assuming 3 UgcCards for now
  }, []);

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

  useEffect(() => {
    if (!jokeBoxApi) {
      return;
    }

    jokeBoxApi.on("select", () => {
      setJokeBoxCurrent(jokeBoxApi.selectedScrollSnap());
    });
  }, [jokeBoxApi]);

  // Function to navigate to a specific page
  const goToPage = (pageIndex: number) => {
    if (!api) return;
    api.scrollTo(pageIndex * itemsPerPage);
  };

  const goToJokeBoxPage = (pageIndex: number) => {
    if (!jokeBoxApi) return;
    jokeBoxApi.scrollTo(pageIndex);
  };

  // Function to handle category click - will trigger modal
  const handleCategoryClick = (category: (typeof categories)[0]) => {
    console.log(`Category clicked: ${category.name}`);
    // Modal trigger logic would go here
  };

  const { isAuthenticated, isFirstLogin, surpriseMe } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-lightGray min-h-screen">
      <div className="container mx-auto md:pt-24 pt-20">
        {/* Modals */}
        {!isAuthenticated && <SurpriseMeLockModal />}
        {!isAuthenticated && loginModal && <Login />}
        {!isAuthenticated && otpSent && <OtpModal />}
        {!isAuthenticated && otpVerified && isFirstLogin && <Signup />}
        {isAuthenticated && !isFirstLogin && surpriseMe && (
          <SurpriseMeModal
            onClose={() => {
              dispatch(updateSurpriseMe({ surpriseMe: false }))
            }}
          />
        )}

        <Banner
          type="image"
          src={bannerImage.src}
          className="rounded-lg banner-section mx-5 md:mx-0"
        />
        {/* Video Scroll */}
        <Header
          title={cmsData.homePage.scrollAndLolText}
          className="md:mt-[40px] md:mb-[24px] mt-[20px] mb-[16px]"
          viewAllUrl="/scroll-and-lol"
          viewAllButtonText={cmsData.homePage.viewAllButtonText}
        />
        <div className="video-section">
          <VideoScroll videos={videoData} />
        </div>
        {/* Pick your mood */}
        <Header
          title={cmsData.homePage.pickYourMoodHeading}
          className="md:mb-[24px] mb-[16px] md:mt-0 mt-[20px]"
          viewAllUrl="/pick-mood"
          viewAllButtonText={cmsData.homePage.viewAllButtonText}
          description={cmsData.homePage.pickYourMoodSubheading}
        />
        <div id={BoxIds.PICK_YOUR_MOOD} className="categories-section">
          <Carousel
            className="md:mx-0 mx-4"
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
                  className="basis-1/5 md:basis-1/6"
                >
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="rounded-full bg-white w-[60px] h-[60px] md:w-[140px] md:h-[140px] flex items-center justify-center md:hover:border-2 hover:border hover:border-green transition-all duration-900 md:hover:shadow-lg">
                      <SvgIcons
                        name={category.icon}
                        className="w-10 h-10 md:w-20 md:h-20"
                      />
                    </div>
                    <p className="text-center font-medium mt-3 text-xs md:text-lg">
                      {category.name}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation dots - page based */}
          <div className="flex justify-center md:gap-1 gap-[1.77px] md:mb-10 mb-0 md:mt-[40px] mt-[8px]">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === current
                    ? "md:w-[24px] w-[17.73px] bg-black"
                    : "md:w-[12px] w-[8.86px] bg-gray-300"
                }`}
                onClick={() => goToPage(index)}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* PJ Challenge */}
        <div className="challenge-section md:mt-0 mt-[20px]">
          <Link href="/submit-your-joke">
            <Banner
              type="image"
              src={pjChallengeImage.src}
              className="rounded-lg md:mb-[40px] mx-5 md:mx-0 cursor-pointer"
            />
          </Link>
        </div>

        {isAuthenticated && (
          <>
            {/* Joke Box */}
            <Header
              title={cmsData.homePage.jokeBoxHeading}
              className="md:mb-[24px] mb-[16px] md:mt-0 mt-[20px]"
              viewAllUrl="/user-generated-jokes"
              viewAllButtonText={cmsData.homePage.viewAllButtonText}
              description={cmsData.homePage.jokeBoxSubheading}
            />
            {isClient && (
              <div className="md:mx-0 mx-4 mt-[20px] mb-[20px]">
                <div className="flex justify-center w-full">
                  <div className="flex items-center bg-white rounded-full mb-4 p-1 relative">
                    <div
                      className={`absolute transition-all duration-300 ease-in-out top-1 h-[calc(100%-8px)] w-[90px] rounded-full bg-green ${
                        activeTab === "Latest" ? "left-1" : "left-[94px]"
                      }`}
                    />
                    <button
                      onClick={() => setActiveTab("Latest")}
                      className={`w-[90px] h-[36px] flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 relative z-10 ${
                        activeTab === "Latest"
                          ? "text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {cmsData.homePage.latestButtonText}
                    </button>
                    <button
                      onClick={() => setActiveTab("Trending")}
                      className={`w-[90px] h-[36px] flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 relative z-10 ${
                        activeTab === "Trending"
                          ? "text-white"
                          : "text-gray-600 hover:text-black"
                      }`}
                    >
                      {cmsData.homePage.trendingButtonText}
                    </button>
                  </div>
                </div>

                <div className="md:grid md:grid-cols-3 flex justify-start overflow-x-scroll scrollbar-hide md:gap-[8px] gap-4">
                  {width < 768 ? (
                    <Carousel
                      setApi={setJokeBoxApi}
                      opts={{
                        align: "start",
                        loop: false,
                        skipSnaps: true,
                      }}
                      className="w-full"
                    >
                      <CarouselContent>
                        <CarouselItem className="basis-auto">
                          <div className="max-w-[320px] mx-auto">
                            <UgcCard
                              disclaimerText={
                                cmsData.homePage.jokeDisclaimerText
                              }
                            />
                          </div>
                        </CarouselItem>
                        <CarouselItem className="basis-auto">
                          <div className="max-w-[320px] mx-auto">
                            <UgcCard
                              disclaimerText={
                                cmsData.homePage.jokeDisclaimerText
                              }
                            />
                          </div>
                        </CarouselItem>
                        <CarouselItem className="basis-auto">
                          <div className="max-w-[320px] mx-auto">
                            <UgcCard
                              disclaimerText={
                                cmsData.homePage.jokeDisclaimerText
                              }
                            />
                          </div>
                        </CarouselItem>
                      </CarouselContent>
                    </Carousel>
                  ) : (
                    <>
                      <UgcCard
                        disclaimerText={cmsData.homePage.jokeDisclaimerText}
                      />
                      <UgcCard
                        disclaimerText={cmsData.homePage.jokeDisclaimerText}
                      />
                      <UgcCard
                        disclaimerText={cmsData.homePage.jokeDisclaimerText}
                      />
                    </>
                  )}
                </div>
                {width < 768 && (
                  <div className="flex justify-center md:gap-2 gap-[1.77px] mt-[8px]">
                    {Array.from({ length: jokeBoxPageCount }).map(
                      (_, index) => (
                        <button
                          key={`joke-slide-${index}`}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            index === jokeBoxCurrent
                              ? "w-[17.73px] bg-black"
                              : "w-[8.86px] bg-gray-300"
                          }`}
                          onClick={() => goToJokeBoxPage(index)}
                          aria-label={`Go to joke page ${index + 1}`}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </>
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
              },
              {
                id: 2,
                href: "https://www.instagram.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.INSTAGRAM} className="w-5 h-5" />
                ),
                label: "Instagram",
              },
              {
                id: 3,
                href: "https://www.youtube.com/sprite",
                icon: (
                  <SvgIcons name={ICONS_NAMES.YOUTUBE} className="w-5 h-5" />
                ),
                label: "YouTube",
              },
              {
                id: 4,
                href: "https://www.whatsapp.com",
                icon: (
                  <SvgIcons name={ICONS_NAMES.WHATSAPP} className="w-5 h-5" />
                ),
                label: "WhatsApp",
              },
            ].map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-full w-[31px] h-[31px] flex items-center justify-center"
                aria-label={`Follow on ${social.label}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {isClient && width < 768 && crossModal && (
        <CircularBoxesModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
