import React from "react";
import MobileFooter from "./Mobile/MobileFooter";
import DesktopFooter from "./Desktop/DesktopFooter";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <>
      <div className="mobile-footer">
        <MobileFooter />
      </div>
      <div className="desktop-footer">
        <DesktopFooter />
      </div>
    </>
  );
};

export default Footer;
