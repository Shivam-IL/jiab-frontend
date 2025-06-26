"use client";
import React from "react";
import Image from "next/image";
import AktivGroteskText from "@/components/common/AktivGroteskText";
import GreenCTA from "@/components/GreenCTA";
import { ICONS_NAMES } from "@/constants";

interface RedeemSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  comicCoinsEarned?: number;
}

const RedeemSuccessPopup: React.FC<RedeemSuccessPopupProps> = ({
  isOpen,
  onClose,
  comicCoinsEarned = 20,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4">
      <div className="bg-white rounded-[5px] w-full max-w-[401px] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2"
          aria-label="Close popup"
        >
          <Image
            src={`/static/sprite/icons/${ICONS_NAMES.CROSS}.svg`}
            alt="Close"
            width={24}
            height={24}
            className="w-[24px] h-[24px] text-black"
          />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center p-6 md:p-8 pt-12">
          {/* Sprite Logo */}
          <div className="mb-[24px]">
            <Image
              src="/assets/images/sprite-gold.png"
              alt="Sprite Reward"
              width={86}
              height={86}
              className="w-[86px] h-[86px] object-contain"
            />
          </div>

          {/* Success Message */}
          <div className="md:mb-[12px] mb-[8px]">
            <AktivGroteskText
              text="That was quick!"
              fontSize="md:text-[24px] text-[20px]"
              fontWeight="font-[700]"
              className="text-black"
            />
          </div>

          {/* Comic Coins Message */}
          <div className="md:mb-[34px] mb-[20px]">
            <AktivGroteskText
              text={`You've collected ${comicCoinsEarned} Comic Coins!`}
              fontSize="md:text-[20px] text-[16px]"
              fontWeight="font-[400]"
              className="text-black"
            />
          </div>

          {/* Note */}
          <div className="md:mb-8 mb-[16px] px-2">
            <p className="text-[14px] text-[#666666] leading-[16px] max-w-[364px]">
              Note: This hour&apos;s PhonePe vouchers are already won by other
              participants. Try again next hour with a new unique code for this
              reward.
            </p>
          </div>

          {/* Got it button */}
          <GreenCTA
            text="Got it"
            onClick={onClose}
            paddingClass="py-[12px] px-[60px] md:py-[16px] md:px-[80px]"
            fontSize="text-[16px] md:text-[20px]"
            fontWeight="font-[600]"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RedeemSuccessPopup;
