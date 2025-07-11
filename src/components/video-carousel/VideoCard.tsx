import React from "react";
import Image from "next/image";
import VideoTitleInfo from "./VideoTitleInfo";

interface VideoCardProps {
  src: string;
  title: string;
  artist?: string;
  language?: string;
}

const VideoCard = ({ src, title, language }: VideoCardProps) => {
  return (
    <div className="relative md:aspect-[9/16] rounded-[10px] overflow-hidden group cursor-pointer">
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt="video"
          className="object-cover w-[169.5px] h-[300px] md:w-full md:h-full"
          width={354}
          height={628}
          onError={(e) => {
            // Replace with fallback on error
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.parentElement?.classList.add("bg-gray-200");
          }}
        />
        {/* Dark overlay - always visible but more opaque on hover */}
        <div className="absolute inset-0 bg-black opacity-35 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/other-svgs/play-button.svg"
          alt="play"
          className="w-[20px] md:w-[50px] h-[20px] md:h-[50px]"
          width={64}
          height={64}
        />
      </div>
      <VideoTitleInfo
        title={title}
        language={language}
        className="absolute bottom-[16px] left-1/2 -translate-x-1/2 w-[90%]"
        variant="card"
      />
    </div>
  );
};

export default VideoCard;
