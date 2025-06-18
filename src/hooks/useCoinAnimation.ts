import { useState, useCallback } from 'react';

export const useCoinAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const triggerAnimation = useCallback(() => {
    // Prevent multiple triggers while already animating
    if (isAnimating) {
      return;
    }
    
    setIsAnimating(true);
    setAnimationKey(prev => prev + 1); // Force new key to restart animation
    
    // Auto-hide after animation duration
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
    }, 3000); // 3 seconds duration

    // Clean up timeout if component unmounts
    return () => clearTimeout(timeoutId);
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