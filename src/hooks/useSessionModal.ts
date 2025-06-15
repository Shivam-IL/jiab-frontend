import { useState, useEffect } from 'react';

export const useSessionModal = (sessionKey: string) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    const hasShownModal = sessionStorage.getItem(sessionKey);
    if (!hasShownModal) {
      setShouldShow(true);
      sessionStorage.setItem(sessionKey, "true");
    } else {
      setShouldShow(false);
    }
    setHasChecked(true);
  }, [sessionKey]);

  const markAsShown = () => {
    sessionStorage.setItem(sessionKey, "true");
    setShouldShow(false);
  };

  const clearSession = () => {
    sessionStorage.removeItem(sessionKey);
    setShouldShow(true);
  };

  return {
    shouldShow,
    hasChecked,
    markAsShown,
    clearSession
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