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
      className={`bg-white rounded-[8px] md:p-[15px] p-[6px] flex items-center md:gap-[10px] gap-[10px] shadow-sm ${
        onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""
      } ${className}`}
      onClick={onClick}
    >
      {/* Icon Container */}
      <div className="bg-green rounded-[5px] flex-shrink-0 flex items-center justify-center md:h-[117px] h-[57px] md:w-[107.19px] w-[51px]">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className={
            icon.includes("unique.svg")
              ? "md:w-[85.38px] w-[41px] md:h-[77px] h-[32px]"
              : "md:w-[75.17px] w-[35.13px] md:h-[80.47px] h-[36px]"
          }
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:gap-[16px] gap-[8px]">
        <h3 className="text-black md:text-[20px] md:leading-[24px] text-[10px] leading-[14px] font-bold">
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
          <span className="text-[#313131] md:text-[16px] text-[7px] font-medium">
            <span className="font-bold text-black">{reward}</span> {rewardText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContestFlatCard;
