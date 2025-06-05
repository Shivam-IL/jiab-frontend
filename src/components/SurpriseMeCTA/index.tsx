import { ISurpriseMeCTA } from "@/interfaces";
import React from "react";
import SvgIcons from "../common/SvgIcons";
import { aktivGrotesk } from "@/app/layout";

const SurpriseMeCTA: React.FC<ISurpriseMeCTA> = ({ name, text }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[2px]">
      <SvgIcons
        name={name}
        className="w-[20px] h-[20px]  md:min-w-[30px] md:min-h-[30px]"
      />
      <span
        className={`${aktivGrotesk.className} font-[500] md:text-[16px] text-[9px]`}
      >
        {text}
      </span>
    </div>
  );
};

export default SurpriseMeCTA;
