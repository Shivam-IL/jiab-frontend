import { useState, useCallback } from 'react';

export const useCoinAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = useCallback(() => {
    setIsAnimating(true);
    // Auto-hide after animation duration (adjust as needed)
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000); // 3 seconds duration
  }, []);

  const hideAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return {
    isAnimating,
    triggerAnimation,
    hideAnimation,
  };
}; 