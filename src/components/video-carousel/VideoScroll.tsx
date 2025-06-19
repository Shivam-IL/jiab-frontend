"use client";
import React from "react";
import VideoCard from "./VideoCard";
import Link from "next/link";

interface Video {
  src: string;
  id: string;
  url: string;
}

interface VideoScrollProps {
  videos: Video[];
}

const VideoScroll = ({ videos }: VideoScrollProps) => {
  return (
    <div className="relative w-full overflow-x-auto max-w-full">
      <div className="flex md:gap-[60px] gap-[12px] md:flex-wrap overflow-x-auto md:overflow-x-visible scrollbar-hide md:px-0 px-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="md:aspect-[9/16] flex-shrink-0 w-auto md:w-auto md:flex-1"
          >
            <Link href={video.url}>
              <VideoCard src={video.src} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoScroll;
