import { IScreenWrapper } from "@/interfaces";
import React from "react";

const ScreenWrapper: React.FC<IScreenWrapper> = ({
  children,
  className = "mt-20",
  desktopWidth = "",
}) => {
  return (
    <div
      className={`w-full mb-16 md:mb-0  mx-auto min-h-[100vh] relative flex justify-center p-[16px] bg-[#F2F2F2] ${className}`}
    >
      <div className={`relative container ${desktopWidth}  w-full`}>
        {children}
      </div>
    </div>
  );
};

export default ScreenWrapper;
