import React from "react";
import MobileFooter from "./Mobile/MobileFooter";
import DesktopFooter from "./Desktop/DesktopFooter";

const Footer: React.FC = () => {
  return (
    <>
      {/* Mobile Footer - visible on screens under 900px (lg breakpoint) */}
      <div className="block lg:hidden">
        <MobileFooter />
      </div>
      {/* Desktop Footer - visible on screens 900px and above (lg breakpoint) */}
      <div className="hidden lg:block">
        <DesktopFooter />
      </div>
    </>
  );
};

export default Footer;
