import { useState, useCallback } from 'react';

export const useCoinAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const triggerAnimation = useCallback(() => {
    if (isAnimating) return; // Prevent multiple triggers while animating
    
    setIsAnimating(true);
    setAnimationKey(prev => prev + 1); // Force new key to restart GIF
    
    // Auto-hide after animation duration (adjust as needed)
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000); // 3 seconds duration
  }, [isAnimating]);

  const hideAnimation = useCallback(() => {
    setIsAnimating(false);
  }, []);

  return {
    isAnimating,
    animationKey,
    triggerAnimation,
    hideAnimation,
  };
}; 