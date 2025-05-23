import React from 'react';
import { IBannerProps } from '@/interfaces';
import Image from 'next/image';
const Banner: React.FC<IBannerProps> = ({
  type,
  src,
  alt = '',
  className = '',
  overlayColor = 'rgba(0, 0, 0, 0)',
  overlayOpacity = 0.5,
}) => {
  return (
    <div
      className={`relative overflow-hidden md:mx-0 mx-5 h-full ${className}`}
    >
      {type === 'video' ? (
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
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center"
          width={1000}
          height={1000}
        />
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
