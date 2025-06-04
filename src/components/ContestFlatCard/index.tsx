import React from "react";
import Image from "next/image";

interface ContestFlatCardProps {
  icon: string;
  title: string;
  reward: number;
  rewardText: string;
  className?: string;
}

const ContestFlatCard: React.FC<ContestFlatCardProps> = ({
  icon,
  title,
  reward,
  rewardText,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-[8px] md:p-4 p-[6px] flex items-center md:gap-4 gap-[10px] shadow-sm ${className}`}
    >
      {/* Icon Container */}
      <div className="bg-green rounded-[8px] p-3 flex-shrink-0 flex items-center justify-center md:h-[104.8px] md:w-[86.75px]">
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className="md:w-[52.05px] w-[30.04px] md:h-[52.4px] h-[40px] filter brightness-0 invert"
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
