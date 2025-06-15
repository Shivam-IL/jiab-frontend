"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { setRouteLoading } from "@/store/global/loading.slice";
import Image from "next/image";

export default function GlobalLoader() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Get loading states from Redux store
  const { isRouteLoading, isGlobalApiLoading } = useSelector(
    (state: RootState) => state.globalLoading
  );
  const cmsLoading = useSelector((state: RootState) => state.cms.isLoading);

  // Combine all loading states
  const isApiLoading = isGlobalApiLoading ?? cmsLoading;

  useEffect(() => {
    if (pathname !== prevPathname) {
      dispatch(setRouteLoading(true));
      const timer = setTimeout(() => {
        dispatch(setRouteLoading(false));
        setPrevPathname(pathname);
      }, 500); // Adjust timing as needed

      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname, dispatch]);

  // Don't show loader on scroll-and-lol page
  const shouldShowLoader =
    !pathname.includes("/scroll-and-lol") && (isRouteLoading || isApiLoading);

  if (!shouldShowLoader) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/videos/loading.gif"
          alt="Loading..."
          className="w-[200px] h-[200px] object-contain"
          width={200}
          height={200}
          priority
        />
      </div>
    </div>
  );
}
