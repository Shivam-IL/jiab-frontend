import React from "react";
import Image from "next/image";

interface ContestFlatCardProps {
  icon: string;
  title: string;
  reward: number;
  rewardText: string;
  className?: string;
  onClick?: () => void;
}

const ContestFlatCard: React.FC<ContestFlatCardProps> = ({
  icon,
  title,
  reward,
  rewardText,
  className = "",
  onClick,
}) => {
  return (
    <div
      className={`bg-white rounded-[8px] md:p-4 p-[6px] flex items-center md:gap-4 gap-[10px] shadow-sm ${
        onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""
      } ${className}`}
      onClick={onClick}
    >
      {/* Icon Container */}
      <div className="bg-green rounded-[8px] flex-shrink-0 flex items-center justify-center md:h-[104.8px] h-[48px] md:w-[86.75px] w-[40px]">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className={
            icon.includes("unique.svg")
              ? "md:w-[56px] w-[26.44px] md:h-[56px] h-[23px] md:px-0 md:py-0 md:mx-[6.78px] mx-2 md:my-[12px] my-3 filter brightness-0 invert"
              : "md:w-[52.05px] w-[23.04px] md:h-[52.4px] h-[24px] filter brightness-0 invert m-3"
          }
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:gap-[22px] gap-[0px]">
        <h3 className="text-black md:text-[20px] text-[12px] font-bold mb-2">
          {title}
        </h3>
        <div className="flex items-center gap-1">
          <div className="flex items-center justify-center">
            <Image
              src="/assets/images/coin-final-sidebar.svg"
              alt="coin"
              width={25}
              height={25}
              className="md:w-[25px] md:h-[25px] w-[14px] h-[14px]"
            />
          </div>
          <span className="text-[#666666] md:text-[16px] text-[7px] font-medium">
            {reward} {rewardText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContestFlatCard;
