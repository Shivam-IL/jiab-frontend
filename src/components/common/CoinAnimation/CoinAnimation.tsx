import React from "react";
import Image from "next/image";

interface CoinAnimationProps {
  isVisible: boolean;
  onAnimationEnd?: () => void;
}

const CoinAnimation: React.FC<CoinAnimationProps> = ({
  isVisible,
  onAnimationEnd,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[49] pointer-events-none flex justify-center items-center">
      <Image
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
      />
    </div>
  );
};

export default CoinAnimation;
