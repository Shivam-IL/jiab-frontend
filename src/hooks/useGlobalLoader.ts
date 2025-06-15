import { useDispatch } from "react-redux";
import { setGlobalApiLoading } from "@/store/global/loading.slice";
import { useEffect, useRef } from "react";

export const useGlobalLoader = () => {
  const dispatch = useDispatch();
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showLoader = () => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    dispatch(setGlobalApiLoading(true));
  };

  const hideLoader = () => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    dispatch(setGlobalApiLoading(false));
  };

  const hideLoaderWithDelay = (delay: number = 300) => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
    
    loadingTimeoutRef.current = setTimeout(() => {
      dispatch(setGlobalApiLoading(false));
      loadingTimeoutRef.current = null;
    }, delay);
  };

  const forceHideLoader = () => {
    // Clear any timeouts and immediately hide loader
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    dispatch(setGlobalApiLoading(false));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    };
  }, []);

  return {
    showLoader,
    hideLoader,
    hideLoaderWithDelay,
    forceHideLoader,
  };
}; 