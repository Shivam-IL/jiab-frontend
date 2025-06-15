"use client";
import React, { useState } from "react";
import Image from "next/image";
import SvgIcons from "../common/SvgIcons";
import { ICONS_NAMES } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import AktivGroteskText from "../common/AktivGroteskText";

interface WalletCardProps {
  children?: React.ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  textContent?: string;
  imageClassName?: string;
  textClassName?: string;
  containerClassName?: string;
  showInfoIcon?: boolean;
  tooltipText?: string;
}

const WalletCard = ({
  children,
  imageUrl = "/assets/images/reward-1.png",
  imageAlt = "reward-1",
  textContent = "",
  imageClassName = "object-cover rounded-[10.68px]",
  textClassName = "md:text-[24px] text-[12px] font-bold",
  containerClassName = "bg-white rounded-[10.68px] p-4 md:py-[25.63px] py-[8px] md:px-[26px] px-[8px] flex flex-col md:gap-[25.63px] gap-[8px]",
  showInfoIcon = false,
  tooltipText = "Top 5 users on the Leaderboard win this reward. Prizes announced daily at 8 P.M.",
}: WalletCardProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className={containerClassName}>
      <Image
        src={imageUrl}
        alt={imageAlt}
        width={1000}
        height={1000}
        className={imageClassName}
        priority
      />

      <div className="flex items-center gap-[4px] md:gap-[10.68px] justify-center">
        <p className={textClassName}>{textContent}</p>
        {showInfoIcon && (
          <TooltipProvider>
            <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setTooltipOpen(!tooltipOpen)}
                >
                  <SvgIcons
                    name={ICONS_NAMES.INFO}
                    className="md:w-[27px] md:h-[27px] w-[9px] h-[9px]"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={10}
                className="bg-white max-w-[280px] md:max-w-[320px] text-black p-3 md:p-4 rounded-lg shadow-lg border-[1px] border-[#00953B]"
                onPointerDownOutside={() => setTooltipOpen(false)}
              >
                <TooltipArrow className="fill-white stroke-1 stroke-[#00953B]" />
                <AktivGroteskText
                  text={tooltipText}
                  fontSize="text-[10px] md:text-[14px]"
                  fontWeight="font-[400]"
                  className="leading-tight text-black"
                />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {children}
    </div>
  );
};

export default WalletCard;
