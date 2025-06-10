import React from "react";
import Image from "next/image";
import { CirclePlay } from "lucide-react";

const VideoCard = ({ src }: { src: string }) => {
  return (
    <div className="relative rounded-[10px] overflow-hidden group cursor-pointer">
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
        <CirclePlay className="w-12 h-12 text-white transition-transform group-hover:scale-110" />
      </div>
    </div>
  );
};

export default VideoCard;
