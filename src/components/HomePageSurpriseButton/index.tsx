import React, { useEffect, useState, useRef, useCallback } from "react";
import { GA_EVENTS, LOCAL_IMAGES } from "@/constants";
import SurpriseMeModal from "../common/SurpriseMeModal";
import { generateImageurl } from "@/utils";
import useAppSelector from "@/hooks/useSelector";
import SurpriseMeLockModal from "../common/SurpriseMeLockModal";
import { useCMSData } from "@/data";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { useGlobalLoader } from "@/hooks/useGlobalLoader";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder,
} from "@/api/utils/cdpEvents";
import { usePathname } from "next/navigation";

const HomePageSurpriseButton = () => {
  const { isAuthenticated, token, enableCoachMarks } = useAppSelector(
    (state) => state.auth
  );
  const [mounted, setMounted] = useState(false);
  const cmsData = useCMSData(mounted);
  const pathname = usePathname();
  const { forceHideLoader } = useGlobalLoader();

  // Draggable state
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ y: 0 });
  const [dragStart, setDragStart] = useState({ y: 0, startY: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [surpriseMeModal, setSurpriseMeModal] = useState<boolean>(false);
  const { selectedLanguage } = useAppSelector((state) => state.language);
  const { mutate: sendCDPEvent } = useSendCDPEvent();

  // Initialize position based on screen size
  useEffect(() => {
    if (mounted && !isInitialized) {
      const initializePosition = () => {
        const windowHeight = window.innerHeight;
        const isMobile = window.innerWidth < 768; // md breakpoint

        let initialY;
        if (isMobile) {
          // Mobile: 70% from top, but ensure it's within bounds
          initialY = windowHeight * 0.7;
        } else {
          // Desktop: 50% from top
          initialY = windowHeight * 0.5;
        }

        setPosition({ y: initialY });
        setIsInitialized(true);
      };

      initializePosition();
      window.addEventListener("resize", initializePosition);
      return () => window.removeEventListener("resize", initializePosition);
    }
  }, [mounted, isInitialized]);

  // Calculate dragging boundaries
  const getDragBoundaries = useCallback(() => {
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth < 768; // md breakpoint

    // Navbar heights (approximate)
    const navbarHeight = isMobile ? 77 : 80; // Mobile nav is around 77px, desktop around 80px
    const mobileFooterHeight = 71; // From MobileFooter component
    const desktopFooterHeight = 440; // From DesktopFooter component (h-[440px])

    const topBoundary = navbarHeight + 20; // 20px from navbar
    const bottomBoundary = isMobile
      ? windowHeight - mobileFooterHeight - 60 // 40px from mobile footer
      : windowHeight - desktopFooterHeight - 20; // 20px from desktop footer

    return { topBoundary, bottomBoundary };
  }, []);

  // Mouse event handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({
        y: e.clientY,
        startY: position.y,
      });
    },
    [position.y]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const deltaY = e.clientY - dragStart.y;
      const newY = dragStart.startY + deltaY;

      const { topBoundary, bottomBoundary } = getDragBoundaries();
      const clampedY = Math.max(topBoundary, Math.min(bottomBoundary, newY));

      setPosition({ y: clampedY });
    },
    [isDragging, dragStart, getDragBoundaries]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch event handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        y: touch.clientY,
        startY: position.y,
      });
    },
    [position.y]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const deltaY = touch.clientY - dragStart.y;
      const newY = dragStart.startY + deltaY;

      const { topBoundary, bottomBoundary } = getDragBoundaries();
      const clampedY = Math.max(topBoundary, Math.min(bottomBoundary, newY));

      setPosition({ y: clampedY });
    },
    [isDragging, dragStart, getDragBoundaries]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Adjust position on window resize
  useEffect(() => {
    const handleResize = () => {
      const { topBoundary, bottomBoundary } = getDragBoundaries();
      setPosition((prev) => ({
        y: Math.max(topBoundary, Math.min(bottomBoundary, prev.y)),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getDragBoundaries]);

  const closeSurpriseMe = () => {
    forceHideLoader(); // Ensure any loading states are cleared
    setSurpriseMeModal(false);
  };

  const { user } = useAppSelector((state) => state.profile);

  const trigerCDPSurpriseMeClick = () => {
    if (user?.id) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildSurpriseMePayload({
          user_identifier: user.id,
        });
      sendCDPEvent(payload);
    }
  };

  const openSurpriseMe = () => {
    // Only open if not dragging
    if (!isDragging) {
      setSurpriseMeModal(true);
      triggerGAEvent(GA_EVENTS.SPRITE_J24_SURPRISE_ME);
      trigerCDPSurpriseMeClick();
    }
  };

  if (pathname === "/refresh-rings") {
    return null;
  }

  if (!isInitialized) {
    return null; // Don't render until position is initialized
  }

  return (
    <>
      <button
        ref={buttonRef}
        style={{
          filter: "drop-shadow(0 4px 4px rgba(0, 0, 0, .25))",
          position: "fixed",
          top: `${position.y}px`,
          right: "10px",
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
          userSelect: "none",
          zIndex: 40,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={openSurpriseMe}
        className="border-[1px] border-[#11A64B] rounded-[100px] max-w-[98px] md:max-w-[180px] py-[8px] pl-[5px] pr-[8px] md:pl-[20px] md:pr-[18px] md:py-[10px] flex items-center bg-yellow md:leading-[16px] leading-[12px] transition-none"
      >
        <div className="relative  min-w-[25px] min-h-[25px] md:min-w-[42px]  md:min-h-[42px]  rounded-full bg-white flex items-center justify-center">
          <Image
            className="md:w-[33px] md:h-[33px] w-[20px] h-[20px]"
            src={generateImageurl(LOCAL_IMAGES.SURPRISE_ME)}
            alt="surprise me"
            width={42}
            height={42}
          />
        </div>
        <p
          className={cn(
            "text-[#11A64B] uppercase leading-tight text-center break-words whitespace-normal text-[9px] md:text-[16px] font-bold",
            {
              "text-[6px] md:text-[11px]": selectedLanguage === "kn",
              "text-[7px] md:text-[13px]": selectedLanguage === "hi",
              "xxs:text-[5px] text-[6px] lg:text-[14px] md:text-[14px] xl:text-[14px] 2xl:text-[14px] break-all":
                selectedLanguage === "ta",
            }
          )}
        >
          {cmsData.comic.surpriseMe}
        </p>
      </button>
      {surpriseMeModal && isAuthenticated && token && !enableCoachMarks && (
        <SurpriseMeModal
          onClose={() => closeSurpriseMe()}
          surpriseMeCheck={true}
        />
      )}
      {surpriseMeModal && !isAuthenticated && !token && (
        <SurpriseMeLockModal onClose={closeSurpriseMe} />
      )}
    </>
  );
};

export default HomePageSurpriseButton;
