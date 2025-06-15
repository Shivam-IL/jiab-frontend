import React from "react";
import { IBannerProps } from "@/interfaces";
import Image from "next/image";
const Banner: React.FC<IBannerProps> = ({
  type,
  src,
  msrc,
  alt = "",
  className = "",
  overlayColor = "rgba(0, 0, 0, 0)",
  overlayOpacity = 0.5,
}) => {
  return (
    <div className={`relative overflow-hidden h-full ${className}`}>
      {type === "video" ? (
        <video
          className="w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          {/* Desktop Image */}
          <Image
            src={src}
            alt={alt}
            className="w-full h-full object-cover object-center hidden md:block"
            width={1000}
            height={1000}
            priority
          />
          {/* Mobile Image - uses msrc if provided, otherwise falls back to src */}
          <Image
            src={msrc ?? src}
            alt={alt}
            className="w-full h-full object-cover object-center block md:hidden"
            width={1000}
            height={1000}
            priority
          />
        </>
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
      />
    </div>
  );
};

export default Banner;
