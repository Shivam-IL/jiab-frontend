import React from "react";
import Image from "next/image";

interface CoinAnimationProps {
  isVisible: boolean;
  animationKey?: number;
  onAnimationEnd?: () => void;
  animation?: boolean;
}

const CoinAnimation: React.FC<CoinAnimationProps> = ({
  isVisible,
  animationKey = 0,
  onAnimationEnd,
  animation = false,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex justify-center items-center">
      <Image
        key={animationKey} // Force remount to restart animation from beginning
        src="/videos/coin-animation.gif"
        alt="Coin Animation"
        width={1000}
        height={1000}
        className="w-[800px] h-[800px] md:w-[2000px] md:h-[2000px] object-contain translate-y-[25%] md:translate-y-[0]"
        unoptimized // Required for GIFs
        onLoad={() => {
          // Trigger animation end callback after gif duration
          if (onAnimationEnd) {
            setTimeout(onAnimationEnd, 2800); // Slightly less than hook timeout
          }
        }}
        priority // Load immediately for smooth animation
      />
    </div>
  );
};

export default CoinAnimation;
