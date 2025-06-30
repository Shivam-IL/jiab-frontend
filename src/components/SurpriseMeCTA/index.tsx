import { ISurpriseMeCTA } from "@/interfaces";
import React from "react";
import Image from "next/image";

const SurpriseMeCTA: React.FC<ISurpriseMeCTA> = ({
  name,
  text,
  onClick,
  disabled,
  isReacted,
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-[2px] ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={() => {
        if (disabled || isReacted) {
          return;
        }
        onClick();
      }}
    >
      <Image
        src={`/static/sprite/icons/${name}.svg`}
        alt={name}
        width={20}
        height={20}
        className="w-[20px] h-[20px]  md:min-w-[23px] md:min-h-[23px]"
      />
      <span
        className={` font-[500] md:text-[12px] text-[9px]`}
      >
        {text}
      </span>
    </div>
  );
};

export default SurpriseMeCTA;
