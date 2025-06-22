"use client";

import { ReactNode, useEffect } from "react";
import QueryClientAndReduxWrapper from "@/components/QueryClientAndReduxWrapper";
import Navbar from "@/components/common/Navbar/Navbar";
import HomePageSurpriseButton from "@/components/HomePageSurpriseButton";
import { usePathname } from "next/navigation";
import MobileFooter from "@/components/common/Footer/Mobile/MobileFooter";
import DesktopFooter from "@/components/common/Footer/Desktop/DesktopFooter";
import InitialDataLoader from "./common/InitialDataLoader";
import ProtectedRoutedWrapper from "./common/ProtectedRoutedWrapper";
import CMSWrapper from "./common/CMSWrapper";
import GlobalLoader from "./common/GlobalLoader";
import FCMProvider from "./FCMProvider";
import { pageview } from "@/utils/gTagEvents";
import BreakTheIceComponent from "./BreakTheIceComponent";

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({
  children,
}: Readonly<LayoutClientProps>) {
  const pathname = usePathname();

  useEffect(() => {
    pageview(window.location.pathname);
  }, [pathname]);

  return (
    <QueryClientAndReduxWrapper>
      <FCMProvider>
        <CMSWrapper>
          <InitialDataLoader>
            <ProtectedRoutedWrapper>
              <Navbar />
              {children}
              {/* Show Surprise button only when not on /scroll-and-lol or /notification */}
              {!pathname.includes("/scroll-and-lol") &&
                !pathname.includes("/notifications") && (
                  <HomePageSurpriseButton />
                )}

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
          <BreakTheIceComponent />
        </CMSWrapper>
      </FCMProvider>
      {/* Global Loading Component */}
      <GlobalLoader />
    </QueryClientAndReduxWrapper>
  );
}
