"use client";

import { ReactNode } from "react";
import QueryClientAndReduxWrapper from "@/components/QueryClientAndReduxWrapper";
import Navbar from "@/components/common/Navbar/Navbar";
import HomePageSurpriseButton from "@/components/HomePageSurpriseButton";
import { usePathname } from "next/navigation";
import MobileFooter from "@/components/common/Footer/Mobile/MobileFooter";
import DesktopFooter from "@/components/common/Footer/Desktop/DesktopFooter";
import InitialDataLoader from './common/InitialDataLoader'
import ProtectedRoutedWrapper from "./common/ProtectedRoutedWrapper";
import CMSWrapper from "./common/CMSWrapper";

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const pathname = usePathname();
  const isScrollAndLolPage = pathname === "/scroll-and-lol";

  return (
    <QueryClientAndReduxWrapper>
      <CMSWrapper>
        <InitialDataLoader>
        <ProtectedRoutedWrapper>
            <Navbar />
            {children}
            {/* Show Surprise button only when not on /scroll-and-lol */}
            {!isScrollAndLolPage && <HomePageSurpriseButton />}

            {/* Mobile Footer */}
            <div className="block lg:hidden">
              <MobileFooter />
            </div>

            {/* Desktop Footer - visible on screens 900px and above (lg breakpoint) */}
            <div className="hidden lg:block">
              {!isScrollAndLolPage && <DesktopFooter />}
            </div>
          </ProtectedRoutedWrapper>
      </InitialDataLoader>
      </CMSWrapper>
    </QueryClientAndReduxWrapper>
  );
}
