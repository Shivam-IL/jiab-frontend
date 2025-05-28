import React from "react";
import { IContentButton } from "@/interfaces";
import Image from "next/image";
const ContentButton: React.FC<IContentButton> = ({ text, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green text-white md:text-[32px] text-[12px] md:px-4 px-[28px] md:py-[25px] py-[8px] md:w-[387.88px] w-auto rounded-full flex items-center gap-[10px] justify-center font-bold"
    >
      {icon && (
        <Image
          src={icon}
          alt={text}
          width={34}
          height={34}
          className="md:w-[34px] w-[12px] md:h-[34px] h-[12px]"
        />
      )}
      {text}
    </button>
  );
};

export default ContentButton;
