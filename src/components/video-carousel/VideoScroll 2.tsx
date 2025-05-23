"use client";
import React from "react";
import VideoCard from "./VideoCard";

interface Video {
  src: string;
  id: string;
}

interface VideoScrollProps {
  videos: Video[];
}

const VideoScroll = ({ videos }: VideoScrollProps) => {
  return (
    <div className="relative w-full overflow-hidden max-w-full">
      <div className="md:grid md:grid-cols-3 md:gap-6 flex overflow-x-auto pb-4 scrollbar-hide md:pl-0 pl-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="md:w-full md:h-[627.87px] w-[136px] h-[241px] flex-shrink-0 md:flex-shrink md:mb-0 mb-2 mr-3 md:mr-0"
          >
            <VideoCard src={video.src} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoScroll;
