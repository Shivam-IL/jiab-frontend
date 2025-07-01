import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { LANGUAGE_MNEMONICS } from "@/constants";
import { cn } from "@/lib/utils";

const PJChallenge: React.FC<{
  heading: string;
  subheading: string;
  buttonText: string;
  onClick: () => void;
}> = ({ heading, subheading, buttonText, onClick }) => {
  const { selectedLanguage } = useLanguage();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontScale, setFontScale] = useState(1);
  const [isWindows, setIsWindows] = useState(false);

  useEffect(() => {
    // Detect Windows OS
    const detectWindows = () => {
      if (typeof window !== "undefined") {
        const userAgent = window.navigator.userAgent;
        setIsWindows(userAgent.includes("Windows"));
      }
    };

    detectWindows();
  }, []);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!buttonRef.current || !textRef.current) return;

      // Get the current screen width to determine breakpoint
      const screenWidth = window.innerWidth;

      // Define max widths for each breakpoint (accounting for padding)
      let maxWidth = 120; // base
      if (screenWidth >= 1536) maxWidth = 450; // 2xl
      else if (screenWidth >= 1280) maxWidth = 400; // xl
      else if (screenWidth >= 1024) maxWidth = 280; // lg
      else if (screenWidth >= 768) maxWidth = 220; // md
      else if (screenWidth >= 640) maxWidth = 160; // sm

      // Reset scale to measure original size
      setFontScale(1);

      // Small delay to ensure the font scale is applied
      setTimeout(() => {
        if (!textRef.current) return;

        const textWidth = textRef.current.scrollWidth;

        // If text exceeds max width, calculate scale factor
        if (textWidth > maxWidth) {
          const newScale = Math.max(maxWidth / textWidth, 0.6); // Minimum 60% scale
          setFontScale(newScale);
        }
      }, 10);
    };

    // Run on mount and when buttonText changes
    adjustFontSize();

    // Run on window resize with debounce
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(adjustFontSize, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [buttonText]);

  // Get current font size based on screen width and scale
  const getCurrentFontSize = () => {
    if (typeof window === "undefined") return 8 * fontScale;

    const screenWidth = window.innerWidth;
    let baseFontSize = 8;

    if (screenWidth >= 1536) baseFontSize = 24; // 2xl
    else if (screenWidth >= 1280) baseFontSize = 20; // xl
    else if (screenWidth >= 1024) baseFontSize = 20; // lg
    else if (screenWidth >= 768) baseFontSize = 16; // md
    else if (screenWidth >= 640) baseFontSize = 12; // sm

    return baseFontSize * fontScale;
  };

  const isTamil = selectedLanguage === "ta";

  return (
    <div className="relative w-full">
      {/* Background Image */}
      <Image
        src="/assets/images/pj-challenge-bg.svg"
        alt="PJ Challenge"
        className="w-full h-auto"
        width={1200}
        height={400}
        priority
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Main Container */}
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
          {/* Heading - "PJ Challenge?" */}
          <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2">
            <h1
              className="text-black font-bold italic text-center whitespace-nowrap
              text-[16px] leading-[20px]
              sm:text-[24px] sm:leading-[30px]
              md:text-[30.8px] md:leading-[40px]
              lg:text-[30.8px] lg:leading-[50px]
              xl:text-[30.8px] xl:leading-[58px]
              2xl:text-[30.8px] 2xl:leading-[66px]"
            >
              {heading}
            </h1>
          </div>

          {/* Subheading - "BOTTLE YOUR JOKES..." */}
          <div
            className={cn(
              "absolute top-[32%] left-1/2 transform -translate-x-1/2 -w-[60%]",
              isTamil && "md:top-[35%]"
            )}
          >
            <h2
              className={cn(
                "text-green font-bold italic uppercase text-center text-[14px] leading-[18px] max-w-[180px] sm:text-[16px] sm:leading-[20px] sm:max-w-[200px] md:text-[24px] md:leading-[30px] md:max-w-[300px] lg:text-[32px] lg:leading-[40px] lg:max-w-[415px] 2xl:text-[37.94px] 2xl:leading-[56px] 2xl:max-w-[500px]",
                isTamil && "text-[10px] leading-[14px] max-w-[190px] sm:text-[12px] sm:leading-[16px] sm:max-w-[140px] md:text-[16px] md:leading-[20px] md:max-w-[300px] lg:text-[20px] lg:leading-[24px] lg:max-w-[370px] 2xl:text-[31px] 2xl:leading-[37px] 2xl:max-w-[500px]"
              )}
            >
              {subheading}
            </h2>
          </div>

          {/* Submit Button */}
          <div className="absolute bottom-[20%] left-1/2 xl:top-[69%] top-[70%] transform -translate-x-1/2">
            <button
              ref={buttonRef}
              onClick={onClick}
              className="bg-black text-white font-bold rounded-full 
              transition-all duration-200 hover:bg-gray-800 active:scale-95
              px-[12px] py-[6px]
              sm:px-[20px] sm:py-[10px]
              md:px-[28px] md:py-[14px]
              lg:px-[36px] lg:py-[18px]
              xl:px-[56px] xl:py-[22px]
              2xl:px-[56px] 2xl:py-[22px]"
              style={{
                fontSize: `${getCurrentFontSize()}px`,
                letterSpacing:
                  selectedLanguage !== LANGUAGE_MNEMONICS.ENGLISH && isWindows
                    ? "-0.5px"
                    : "normal",
              }}
            >
              <span ref={textRef} className="whitespace-nowrap">
                {buttonText}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PJChallenge;
