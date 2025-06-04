"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/common/Header/Header";
import ReactionEmojies from "@/components/ReactionEmojies";
import { ICONS_NAMES } from "@/constants"; // Import ICONS_NAMES
import CustomPopupWrapper from "@/components/common/CustomPopupWrapper";

// Define a type for the values of ICONS_NAMES (if not already global or imported appropriately)
// This might be duplicative if ReactionEmojies exports its Reaction type, consider refactoring later.
type IconName = (typeof ICONS_NAMES)[keyof typeof ICONS_NAMES];

interface SelectedReactionData {
  icon: IconName;
  count: string;
}

interface VideoData {
  id: number;
  url: string;
  title: string;
}

// Loading Spinner Component
const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative md:w-fit md:h-full w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-[8px] border-[#08C270] border-t-[#009639] rounded-full animate-spin mb-4"></div>
        <p className="text-green text-xl font-bold">Loading...</p>
      </div>
    </div>
  );
};

const ScrollAndLol: React.FC = () => {
  const [videos] = useState<VideoData[]>([
    { id: 1, url: "/videos/dummy-video.mp4", title: "Video 1" },
    { id: 2, url: "/videos/dummy-video-2.mp4", title: "Video 2" },
    { id: 3, url: "/videos/dummy-video-3.mp4", title: "Video 1" },
    { id: 4, url: "/videos/dummy-video-4.mp4", title: "Video 2" },
    { id: 5, url: "/videos/dummy-video-5.mp4", title: "Video 1" },
    { id: 6, url: "/videos/dummy-video-6.mp4", title: "Video 2" },
    { id: 7, url: "/videos/dummy-video.mp4", title: "Video 1" },
    { id: 8, url: "/videos/dummy-video-2.mp4", title: "Video 2" },
    { id: 9, url: "/videos/dummy-video-3.mp4", title: "Video 1" },
    { id: 10, url: "/videos/dummy-video-4.mp4", title: "Video 2" },
    { id: 11, url: "/videos/dummy-video-5.mp4", title: "Video 1" },
    { id: 12, url: "/videos/dummy-video-6.mp4", title: "Video 2" },
    { id: 13, url: "/videos/dummy-video.mp4", title: "Video 1" },
    { id: 14, url: "/videos/dummy-video-2.mp4", title: "Video 2" },
    { id: 15, url: "/videos/dummy-video-3.mp4", title: "Video 1" },
  ]);

  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [showEndOfFeedPopup, setShowEndOfFeedPopup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  // State to store the selected reaction
  const [selectedReaction, setSelectedReaction] =
    useState<SelectedReactionData | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktopRef = useRef(false);

  useEffect(() => {
    const checkDesktop = () => {
      isDesktopRef.current = window.innerWidth >= 768;
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, []);

  // Fallback to hide loading after a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        console.log("Loading timeout reached, hiding loader");
        setIsLoading(false);
      }
    }, 3000); // 3 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  const scrollToVideo = (direction: "up" | "down") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const videoElements = container.querySelectorAll(".snap-start");

    // Find the current video index based on scroll position
    let currentIndex = 0;
    videoElements.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight / 2) {
        currentIndex = idx;
      }
    });

    // Calculate target index
    const targetIndex =
      direction === "up"
        ? Math.max(0, currentIndex - 1)
        : Math.min(videoElements.length - 1, currentIndex + 1);

    // Get target element and scroll to it
    const targetElement = videoElements[targetIndex] as HTMLElement;
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveVideoIndex(targetIndex);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const videoIndex = parseInt(
          entry.target.getAttribute("data-index") || "0"
        );

        if (entry.isIntersecting) {
          setActiveVideoIndex(videoIndex);
          if (isPlaying) {
            videoRefs.current[videoIndex]?.play();
          }
          if (videoIndex === videos.length - 1) {
            setShowEndOfFeedPopup(true);
          }
        } else {
          videoRefs.current[videoIndex]?.pause();
        }
      });
    }, options);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        observer.observe(videoRef);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isPlaying, videos.length]);

  // Handle video load to hide loading spinner
  const handleVideoLoad = (index: number) => {
    console.log(`Video ${index} loaded`);
    setLoadedVideos((prev) => {
      const newSet = new Set(prev);
      newSet.add(index);

      // Hide loading when first video is loaded
      if (index === 0) {
        console.log("First video loaded, hiding loader");
        setIsLoading(false);
      }

      return newSet;
    });
  };

  // Handle video ready to play
  const handleVideoCanPlay = (index: number) => {
    console.log(`Video ${index} can play`);
    if (index === 0) {
      setIsLoading(false);
    }
  };

  // Handle video error
  const handleVideoError = (index: number) => {
    console.error(`Error loading video ${index}`);
    // Still mark as "loaded" to prevent infinite loading
    if (index === 0) {
      setIsLoading(false);
    }
  };

  // Handler for when an emoji is selected
  const handleEmojiSelect = (reaction: SelectedReactionData) => {
    setSelectedReaction(reaction);
    // Here you can also send the payload to an API if needed
    console.log("Selected Reaction:", reaction);
  };

  const togglePlay = (index: number) => {
    if (index === activeVideoIndex) {
      if (isPlaying) {
        videoRefs.current[index]?.pause();
      } else {
        videoRefs.current[index]?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (index: number) => {
    if (index === activeVideoIndex) {
      if (videoRefs.current[index]) {
        videoRefs.current[index]!.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  return (
    <>
      <div className="md:w-full md:h-screen md:pt-[130px] pt-0 flex flex-col justify-center items-center bg-[url('/assets/images/scroll-and-lol-bg.png')] bg-cover bg-center bg-fixed overflow-hidden">
        {isLoading ? (
          <></>
        ) : (
          <div className="w-full container md:block hidden">
            <Header title="Scroll & LOL" />
          </div>
        )}

        <div className="relative md:w-fit md:h-full w-full h-screen">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div
                ref={containerRef}
                className="relative md:w-fit md:h-full w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide"
              >
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className="relative h-screen w-full snap-start snap-always"
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      className="md:w-[442px] md:h-auto h-full w-full object-cover"
                      src={video.url}
                      loop
                      playsInline
                      muted={isMuted}
                      autoPlay={index === 0}
                      data-index={index}
                      onLoadedData={() => handleVideoLoad(index)}
                      onCanPlay={() => handleVideoCanPlay(index)}
                      onLoadStart={() => {
                        console.log(`Video ${index} started loading`);
                        if (index === 0) {
                          // Give a small delay then hide loading as fallback
                          setTimeout(() => setIsLoading(false), 2000);
                        }
                      }}
                      onError={() => handleVideoError(index)}
                      style={{
                        aspectRatio: "9/16",
                      }}
                    />

                    {/* Top controls */}
                    <div className="absolute top-4 w-full flex justify-between px-4 z-10">
                      <button
                        onClick={() => togglePlay(index)}
                        className="w-[40px] h-[40px] rounded-full bg-[#12121240] flex items-center justify-center"
                      >
                        <Image
                          src={
                            isPlaying && index === activeVideoIndex
                              ? "/other-svgs/pause-icon.svg"
                              : "/other-svgs/play-icon.svg"
                          }
                          alt={isPlaying ? "Pause" : "Play"}
                          width={
                            isPlaying && index === activeVideoIndex ? 12 : 20
                          }
                          height={
                            isPlaying && index === activeVideoIndex ? 12 : 20
                          }
                        />
                      </button>
                      <button
                        onClick={() => toggleMute(index)}
                        className="w-[40px] h-[40px] rounded-full bg-[#12121240] flex items-center justify-center"
                      >
                        <Image
                          src={
                            isMuted
                              ? "/other-svgs/mute-icon.svg"
                              : "/other-svgs/unmute-icon.svg"
                          }
                          alt={isMuted ? "Unmute" : "Mute"}
                          width={20}
                          height={20}
                          className="text-white"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reaction Emojis - only visible when not loading */}
              <div className="absolute md:bottom-[128.82px] bottom-[135px] md:right-[-5rem] right-[10px] z-20">
                <ReactionEmojies onEmojiSelect={handleEmojiSelect} />
              </div>
            </>
          )}
        </div>

        {/* Scroll buttons - only visible when not loading */}
        {!isLoading && (
          <div className="hidden md:flex flex-col gap-4 absolute bottom-[97.32px] right-[100px] transform z-20">
            <button
              onClick={() => scrollToVideo("up")}
              className={`w-[64px] h-[64px] rounded-full border-2 border-green flex items-center justify-center transition-all duration-300 ${
                activeVideoIndex === 0 ? "opacity-50" : ""
              }`}
              aria-label="Scroll up"
              disabled={activeVideoIndex === 0}
            >
              <Image
                src="/other-svgs/up-arrow.svg"
                alt="Scroll up"
                width={25}
                height={25}
                className={activeVideoIndex === 0 ? "opacity-50" : ""}
              />
            </button>
            <button
              onClick={() => scrollToVideo("down")}
              className={`w-[64px] h-[64px] rounded-full border-2 border-green flex items-center justify-center transition-all duration-300 ${
                activeVideoIndex === videos.length - 1 ? "opacity-50" : ""
              }`}
              aria-label="Scroll down"
              disabled={activeVideoIndex === videos.length - 1}
            >
              <Image
                src="/other-svgs/down-arrow.svg"
                alt="Scroll down"
                width={25}
                height={25}
                className={`${
                  activeVideoIndex === videos.length - 1 ? "opacity-50" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
      {showEndOfFeedPopup && (
        <CustomPopupWrapper
          open={showEndOfFeedPopup}
          onClose={() => setShowEndOfFeedPopup(false)}
          icon={ICONS_NAMES.EXTREME_LAUGH}
          title="Serial Chiller! 👀"
          subtitle="You've exhausted your daily limit of jokes."
        >
          <center>Come back tomorrow for more Ha-Ha-mazing jokes.</center>
        </CustomPopupWrapper>
      )}
    </>
  );
};

export default ScrollAndLol;
