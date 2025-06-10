import React from "react";
import { IContentButton } from "@/interfaces";
import Image from "next/image";
const ContentButton: React.FC<IContentButton> = ({ text, onClick, icon, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-green text-white md:text-[32px] text-[12px] rounded-full flex items-center md:gap-[16px] gap-[8.06px] justify-center font-medium ${className}`}
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
