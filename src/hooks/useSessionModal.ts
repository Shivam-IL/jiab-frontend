import { useState, useEffect } from 'react';

export const useSessionModal = (sessionKey: string, forceShow?: boolean) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const hasShownModal = sessionStorage.getItem(sessionKey);
    
    // If forceShow is true (manual trigger), always show the modal
    if (forceShow) {
      setShouldShow(true);
    } else {
      // Auto-show logic: only show if never shown in this session
      if (!hasShownModal) {
        setShouldShow(true);
        sessionStorage.setItem(sessionKey, "true");
      } else {
        setShouldShow(false);
      }
    }
    setHasChecked(true);
  }, [sessionKey, forceShow]);

  const markAsShown = () => {
    sessionStorage.setItem(sessionKey, "true");
    setShouldShow(false);
  };

  const clearSession = () => {
    sessionStorage.removeItem(sessionKey);
    setShouldShow(true);
  };

  // Check if modal has been shown automatically in this session
  const hasAutoShown = () => {
    return sessionStorage.getItem(sessionKey) === "true";
  };

  return {
    shouldShow,
    hasChecked,
    markAsShown,
    clearSession,
    hasAutoShown
  };
};

// Utility functions for managing both modal sessions
export const clearAllModalSessions = () => {
  sessionStorage.removeItem("hasShownSurpriseMe");
  sessionStorage.removeItem("hasShownSurpriseMeLock");
};

export const hasShownAnyModal = () => {
  return sessionStorage.getItem("hasShownSurpriseMe") || 
         sessionStorage.getItem("hasShownSurpriseMeLock");
}; 