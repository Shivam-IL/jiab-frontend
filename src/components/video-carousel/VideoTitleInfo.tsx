import React from "react";
import Image from "next/image";

interface VideoTitleInfoProps {
  title?: string;
  language?: string;
  className?: string;
  showGradient?: boolean;
  variant?: "card" | "scroll";
}

const VideoTitleInfo: React.FC<VideoTitleInfoProps> = ({
  title = "Video Title",
  language,
  className = "",
  showGradient = true,
  variant = "scroll",
}) => {
  const titleStyles = {
    card: "md:text-[14px] text-[12px] leading-[100%] font-semibold mb-1 md:w-auto w-[200px]",
    scroll:
      "md:text-[18px] text-[16px] leading-[100%] font-semibold mb-1 md:w-auto w-[260px]",
  };

  const artistStyles = {
    card: "md:text-[12px] text-[10px] opacity-80 leading-[100%]",
    scroll: "md:text-[16px] text-[14px] opacity-80 leading-[100%]",
  };

  const iconSizes = {
    card: { width: 16, height: 16 },
    scroll: { width: 20, height: 20 },
  };

  const gradientStyles = {
    card: "absolute bottom-0 left-0 w-full md:h-[80px] h-[60px] bg-gradient-to-t from-black to-transparent pointer-events-none",
    scroll:
      "absolute bottom-0 left-0 w-full md:h-[140px] h-[98px] bg-gradient-to-t from-black to-transparent pointer-events-none",
  };

  return (
    <>
      {showGradient && <div className={gradientStyles[variant]} />}
      <div className={`text-white ${className}`}>
        <div className="flex items-center gap-[8px]">
          {/* Need to update when BE is ready */}
          <Image
            src="/assets/categories/Traffic.svg"
            alt="Gludein Logo"
            width={iconSizes[variant].width}
            height={iconSizes[variant].height}
          />
          <div>
            <h2 className={titleStyles[variant]}>{title}</h2>
            <p className={artistStyles[variant]}>
              {language}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoTitleInfo;
