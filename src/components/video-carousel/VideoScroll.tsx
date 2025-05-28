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
    <div className="relative w-full overflow-hidden max-w-full px-4">
      <div className="flex md:gap-16 gap-[12px] mb-10 md:flex-wrap overflow-x-auto md:overflow-x-visible scrollbar-hide">
        {videos.map((video) => (
          <div
            key={video.id}
            className="md:aspect-[9/16] flex-shrink-0 w-auto md:w-auto md:flex-1"
          >
            <VideoCard src={video.src} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoScroll;
