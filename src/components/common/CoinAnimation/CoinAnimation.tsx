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

  useEffect(() => {
    if (isVisible) {
      // Force GIF to restart from first frame by adding timestamp
      const timestamp = Date.now();
      setGifSrc(`/videos/coin-animation.gif?t=${timestamp}`);

      // Set animation end callback with fixed duration
      if (onAnimationEnd) {
        const timer = setTimeout(onAnimationEnd, 2800);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, animationKey, onAnimationEnd]);

  if (!isVisible || !gifSrc) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex justify-center items-center">
      <Image
        src={gifSrc}
        alt="Coin Animation"
        width={1000}
        height={1000}
        className="w-[800px] h-[800px] md:w-[2000px] md:h-[2000px] object-contain translate-y-[25%] md:translate-y-[0]"
        unoptimized // Required for GIFs to play from first to last frame
        priority // Load immediately for smooth animation
      />
    </div>
  );
};

export default CoinAnimation;
