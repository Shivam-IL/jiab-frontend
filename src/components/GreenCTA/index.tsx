import React from "react";
import Image from "next/image";
import { IGreenCTA } from "@/interfaces";
import { aktivGrotesk } from "@/app/layout";

const GreenCTA: React.FC<IGreenCTA> = ({
  onClick,
  text,
  fontWeight = "font-[700]",
  isCoinIcon = false,
  paddingClass = "px-[24px] py-[12px] md:py-[14px]",
  fontSize = "text-[16px] md:text-[20px]",
  className = "w-full",
  disabled = false,
  children,
  childrenPosition,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${
        disabled
          ? "cursor-not-allowed bg-[#73C392] text-white"
          : isCoinIcon
          ? "hover:bg-yellow/60  bg-yellow text-black"
          : "hover:bg-[#73C392]  bg-[#11A64B] text-white"
      } ${fontSize} ${fontWeight} leading-tight transition-all duration-300 ${paddingClass} rounded-[100px] ${
        aktivGrotesk.className
      } ${isCoinIcon ? "flex items-center gap-2" : ""}`}
    >
      {childrenPosition === "left" && children}
      {text}
      {isCoinIcon && (
        <Image
          src="/assets/images/coin-final-sidebar.svg"
          alt="coin"
          width={50}
          height={50}
          className="md:w-[50px] w-[18px] md:h-[50px] h-[19px]"
        />
      )}
      {childrenPosition === "right" && children}
    </button>
  );
};

export default GreenCTA;
