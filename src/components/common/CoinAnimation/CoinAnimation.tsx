import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

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
  const [showAnimation, setShowAnimation] = useState(false);
  const [lottieKey, setLottieKey] = useState(0);
  const [animationData, setAnimationData] = useState(null);

  // Load animation data
  useEffect(() => {
    fetch("/videos/coin-anim.json", {
      priority: "high",
      cache: "force-cache",
    })
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Failed to load animation:", error));
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Reset state first to ensure clean start
      setShowAnimation(false);

      // Small delay to ensure DOM updates
      const showTimer = setTimeout(() => {
        // Force animation to restart by updating the key
        setLottieKey((prev) => prev + 1);
        setShowAnimation(true);
      }, 50);

      // Set animation end callback based on Lottie animation duration
      // The animation duration can be calculated from the JSON: (op - ip) / fr * 1000
      // For coin-anim.json: (72 - 0) / 25 * 1000 = 2880ms, using 2800ms to be safe
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
      setShowAnimation(false);
    }
  }, [isVisible, animationKey, onAnimationEnd]);

  if (!isVisible || !showAnimation || !animationData) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex justify-center items-center">
      <Lottie
        key={`coin-lottie-${animationKey}-${lottieKey}`} // Force new instance on restart
        animationData={animationData}
        autoplay={true}
        loop={false}
        className="w-[800px] h-[800px] md:w-[2000px] md:h-[2000px] object-contain translate-y-[25%] md:translate-y-[0]"
        style={{
          width: "800px",
          height: "800px",
        }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid meet",
        }}
      />
    </div>
  );
};

export default CoinAnimation;
