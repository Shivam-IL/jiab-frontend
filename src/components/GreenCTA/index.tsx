import React from "react";
import { IGreenCTA } from "@/interfaces";
import { aktivGrotesk } from "@/app/layout";

const GreenCTA: React.FC<IGreenCTA> = ({
  onClick,
  text,
  paddingClass = "px-[24px] py-[12px] md:py-[14px]",
  fontSize = "text-[16px] md:text-[20px]",
  fontWeight = "md:font-[500] font-[700]",
  className = "w-full",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${fontSize} ${fontWeight} leading-tight  text-white transition-all duration-300  hover:bg-[#73C392]  bg-[#11A64B] ${paddingClass} rounded-[100px] ${aktivGrotesk.className}`}
    >
      {text}
    </button>
  );
};

export default GreenCTA;
