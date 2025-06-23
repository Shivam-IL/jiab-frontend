"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import {
  setRouteLoading,
  setGlobalApiLoading,
} from "@/store/global/loading.slice";
import Image from "next/image";

export default function GlobalLoader() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get loading states from Redux store
  const { isRouteLoading, isGlobalApiLoading } = useSelector(
    (state: RootState) => state.globalLoading
  );
  const cmsLoading = useSelector((state: RootState) => state.cms.isLoading);

  // Combine all loading states
  const isApiLoading = isGlobalApiLoading || cmsLoading;

  // Handle route changes
  useEffect(() => {
    if (pathname !== prevPathname) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      dispatch(setRouteLoading(true));

      timeoutRef.current = setTimeout(() => {
        dispatch(setRouteLoading(false));
        setPrevPathname(pathname);
        timeoutRef.current = null;
      }, 500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [pathname, prevPathname, dispatch]);

  // Safety cleanup effect to ensure loader doesn't get stuck
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      // If route loading has been true for more than 2 seconds, force clear it
      if (isRouteLoading) {
        dispatch(setRouteLoading(false));
      }
      // If global API loading has been true for more than 10 seconds, force clear it
      if (isGlobalApiLoading) {
        dispatch(setGlobalApiLoading(false));
      }
    }, 10000); // 10 second safety timeout

    return () => clearTimeout(safetyTimeout);
  }, [isRouteLoading, isGlobalApiLoading, dispatch]);

  // Additional effect to handle modal-related edge cases
  useEffect(() => {
    const handleVisibilityChange = () => {
      // If page becomes visible and loader is stuck, clear it
      if (!document.hidden && (isRouteLoading || isGlobalApiLoading)) {
        const checkStuckLoader = setTimeout(() => {
          if (isRouteLoading) {
            dispatch(setRouteLoading(false));
          }
          if (isGlobalApiLoading) {
            dispatch(setGlobalApiLoading(false));
          }
        }, 1000);

        return () => clearTimeout(checkStuckLoader);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isRouteLoading, isGlobalApiLoading, dispatch]);

  // Handle focus events to clear stuck loaders
  useEffect(() => {
    const handleFocus = () => {
      // When window regains focus, check if loader should be cleared
      setTimeout(() => {
        if (isRouteLoading && pathname === prevPathname) {
          dispatch(setRouteLoading(false));
        }
      }, 100);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [isRouteLoading, dispatch, pathname, prevPathname]);

  // Don't show loader on scroll-and-lol page
  const shouldShowLoader =
    !pathname.includes("/scroll-and-lol") && (isRouteLoading || isApiLoading);

  if (!shouldShowLoader) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/videos/loading.gif"
          alt="loader"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
