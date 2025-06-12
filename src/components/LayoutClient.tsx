"use client";

import { ReactNode, useEffect } from "react";
import QueryClientAndReduxWrapper from "@/components/QueryClientAndReduxWrapper";
import Navbar from "@/components/common/Navbar/Navbar";
import HomePageSurpriseButton from "@/components/HomePageSurpriseButton";
import { usePathname, useSearchParams } from "next/navigation";
import MobileFooter from "@/components/common/Footer/Mobile/MobileFooter";
import DesktopFooter from "@/components/common/Footer/Desktop/DesktopFooter";
import InitialDataLoader from './common/InitialDataLoader'
import ProtectedRoutedWrapper from "./common/ProtectedRoutedWrapper";
import CMSWrapper from "./common/CMSWrapper";
import { pageview } from "@/utils/gTagEvents";

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const pathname = usePathname();

  useEffect(() => {
    pageview(window.location.pathname);
  }, [pathname]);

  return (
    <QueryClientAndReduxWrapper>
      <CMSWrapper>
        <InitialDataLoader>
          <ProtectedRoutedWrapper>
            <Navbar />
            {children}
            {/* Show Surprise button only when not on /scroll-and-lol */}
            {!pathname.includes("/scroll-and-lol") && <HomePageSurpriseButton />}

            {/* Mobile Footer */}
            <div className="block lg:hidden">
              <MobileFooter />
            </div>

            {/* Desktop Footer - visible on screens 900px and above (lg breakpoint) */}
            <div className="hidden lg:block">
              {!pathname.includes("/scroll-and-lol") && <DesktopFooter />}
            </div>
          </ProtectedRoutedWrapper>
        </InitialDataLoader>
      </CMSWrapper>
    </QueryClientAndReduxWrapper>
  );
}
