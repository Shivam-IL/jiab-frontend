"use client";
import React, { useState, useEffect } from "react";
import MobileNav from "./Mobile/MobileNav";
import DesktopNav from "./Desktop/DesktopNav";
import spriteLogo from "../../../../public/header-logo.svg";
import profileImage from "../../../../public/profile-images/profile-image-guest.svg";
const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };

    // Check initially
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileNav spriteLogo={spriteLogo} profileImage={profileImage} />
      ) : (
        <DesktopNav spriteLogo={spriteLogo} profileImage={profileImage} />
      )}
    </>
  );
};

export default Navbar;
