"use client";
import React from "react";
import MobileNav from "./Mobile/MobileNav";
import DesktopNav from "./Desktop/DesktopNav";
import spriteLogo from "../../../../public/header-logo.svg";
import profileImage from "../../../../public/profile-images/profile-image-guest.svg";

const Navbar: React.FC = () => {
  return (
    <>
      {/* Mobile nav visible on smaller screens (< md breakpoint) */}
      <div className="block md:hidden">
        <MobileNav spriteLogo={spriteLogo} profileImage={profileImage} />
      </div>

      {/* Desktop nav visible on medium and larger screens (≥ md breakpoint) */}
      <div className="hidden md:block">
        <DesktopNav spriteLogo={spriteLogo} profileImage={profileImage} />
      </div>
    </>
  );
};

export default Navbar;
