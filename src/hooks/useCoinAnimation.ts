import { useState, useCallback, useRef } from 'react';

export const useCoinAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAnimation = useCallback(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // If already animating, force reset with a small delay
    if (isAnimating) {
      setIsAnimating(false);
      // Small delay to ensure state update and DOM refresh
      setTimeout(() => {
        setIsAnimating(true);
        setAnimationKey(prev => prev + 1);
        
        // Auto-hide after animation duration (2800ms to match GIF duration)
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false);
          timeoutRef.current = null;
        }, 2800);
      }, 100);
      return;
    }
    
    // Normal trigger
    setIsAnimating(true);
    setAnimationKey(prev => prev + 1); // Force new key to restart animation
    
    // Auto-hide after animation duration (2800ms to match GIF duration)
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      timeoutRef.current = null;
    }, 2800);
  }, [isAnimating]);

  const hideAnimation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsAnimating(false);
  }, []);

  // Clean up on unmount
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return {
    isAnimating,
    animationKey,
    triggerAnimation,
    hideAnimation,
    cleanup,
  };
}; 