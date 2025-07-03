import React, { useEffect, useState } from "react";
import Image from "next/image";

interface CoinAnimationProps {
  isVisible: boolean;
  animationKey?: number;
  onAnimationEnd?: () => void;
}

const CoinAnimation: React.FC<CoinAnimationProps> = ({
  isVisible,
  animationKey = 0,
  onAnimationEnd,
}) => {
  const [gifSrc, setGifSrc] = useState("");
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Reset state first to ensure clean start
      setShowImage(false);
      setGifSrc("");

      // Small delay to ensure DOM updates
      const showTimer = setTimeout(() => {
        // Force GIF to restart from first frame by adding timestamp and random value
        const timestamp = Date.now();
        const random = Math.random();
        setGifSrc(`/videos/coin-animation.gif?t=${timestamp}&r=${random}`);
        setShowImage(true);
      }, 50);

      // Set animation end callback with fixed duration (2800ms for the GIF)
      if (onAnimationEnd) {
        const endTimer = setTimeout(onAnimationEnd, 2800);
        return () => {
          clearTimeout(showTimer);
          clearTimeout(endTimer);
        };
      }

      return () => clearTimeout(showTimer);
    } else {
      // Clean up when animation is hidden
      setShowImage(false);
      setGifSrc("");
    }
  }, [isVisible, animationKey, onAnimationEnd]);

  if (!isVisible || !gifSrc || !showImage) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex justify-center items-center">
      <Image
        key={`coin-${animationKey}-${gifSrc}`} // Add key to force new image element
        src={gifSrc}
        alt="Coin Animation"
        width={1000}
        height={1000}
        className="w-[800px] h-[800px] md:w-[2000px] md:h-[2000px] object-contain translate-y-[25%] md:translate-y-[0]"
        unoptimized // Required for GIFs to play from first to last frame
        priority // Load immediately for smooth animation
        onLoad={() => {
          // Force image reload to ensure animation starts
          if (typeof window !== "undefined" && "Image" in window) {
            const img = new window.Image();
            img.src = gifSrc;
          }
        }}
      />
    </div>
  );
};

export default CoinAnimation;
