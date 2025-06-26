"use client";
import React, { useState } from "react";
import AktivGroteskText from "@/components/common/AktivGroteskText";
import GreenCTA from "@/components/GreenCTA";
import { ICONS_NAMES } from "@/constants";
import Image from "next/image";

interface PhonePeVoucherPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  voucherCode?: string;
  pin?: string;
  expiryDate?: string;
  onRedeem?: () => void;
  onShare?: () => void;
}

const PhonePeVoucherPopup: React.FC<PhonePeVoucherPopupProps> = ({
  isOpen,
  onClose,
  description = "Here's a pocket-sized perk just for you. Grab this Rs.10 PhonePe voucher now!",
  voucherCode = "AJ5739EY93HYS",
  pin = "315724",
  expiryDate = "31st Dec 2024",
  onRedeem,
  onShare,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(voucherCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleCopyPin = async () => {
    try {
      await navigator.clipboard.writeText(pin);
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2000);
    } catch (err) {
      console.error("Failed to copy PIN:", err);
    }
  };

  const handleRedeemClick = () => {
    if (onRedeem) {
      onRedeem();
    }
  };

  const handleShareClick = () => {
    if (onShare) {
      onShare();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white md:rounded-[5px] rounded-[10px] max-w-[400px] w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
        >
          <Image
            src={`/static/sprite/icons/${ICONS_NAMES.CROSS}.svg`}
            className="w-4 h-4"
            alt={ICONS_NAMES.CROSS}
            width={16}
            height={16}
          />
        </button>

        {/* Header Banner */}
        <div className="mt-[14.5px] px-[12px]">
          <Image
            src="/other-svgs/reward-popup.svg"
            alt="PhonePe"
            width={120}
            height={60}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center md:mb-[20px] mb-[12px]">
            <AktivGroteskText
              text="It's Yours!"
              fontSize="text-[20px] md:text-[24px]"
              fontWeight="font-[700]"
              className="md:mb-2 mb-[4px] md:leading-[28px] leading-[20px]"
            />
            <p className="md:text-[20px] text-[16px] leading-[24px] text-gray-700">
              {description}
            </p>
          </div>

          {/* Voucher Code */}
          <div className="mb-4 flex justify-center">
            <div className="md:border-[3px] border-[2px] border-dashed border-green flex items-center justify-between md:h-[46px] h-[37px] rounded-[9.42px] md:w-full w-[239px]">
              <div className="flex-1">
                <AktivGroteskText
                  text={voucherCode}
                  fontSize="md:text-[18px] text-[14px]"
                  fontWeight="font-[700]"
                  className="text-left m-4 leading-[16px]"
                />
              </div>
              <GreenCTA
                text={copiedCode ? "COPIED!" : "COPY CODE"}
                onClick={handleCopyCode}
                paddingClass="md:py-[14px] py-[10px] md:h-[46px] h-[37px] md:w-[117px] w-[91px]"
                fontSize="md:text-[16px] text-[12px]"
                className="mr-[-4px]"
                borderRadius="rounded-tr-[9.42px] rounded-br-[9.42px]"
              />
            </div>
          </div>

          {/* PIN */}
          <div className="md:mb-6 mb-[12px] flex justify-center">
            <div className="md:border-[3px] border-[2px] border-dashed border-green flex items-center justify-between md:h-[46px] h-[37px] rounded-[9.42px] md:w-full w-[239px]">
              <div className="flex-1">
                <AktivGroteskText
                  text={pin}
                  fontSize="md:text-[18px] text-[14px]"
                  fontWeight="font-[700]"
                  className="text-left m-4 leading-[16px]"
                />
              </div>
              <GreenCTA
                text={copiedPin ? "COPIED!" : "COPY PIN"}
                onClick={handleCopyPin}
                paddingClass="md:py-[14px] py-[10px] md:h-[46px] h-[37px] md:w-[117px] w-[91px]"
                fontSize="md:text-[16px] text-[12px]"
                className="mr-[-4px]"
                borderRadius="rounded-tr-[9.42px] rounded-br-[9.42px]"
              />
            </div>
          </div>

          {/* Redeem Button */}
          <div className="text-center md:mb-4 mb-[8px]">
            <GreenCTA
              text="Redeem Now"
              onClick={handleRedeemClick}
              paddingClass="md:py-[12px] py-[8px] md:px-[16px] px-[12px]"
              fontSize="md:text-[16px] text-[12px]"
              className="w-[100%] md:max-w-[132px] max-w-[99px]"
            />
          </div>

          {/* Expiry Date */}
          <div className="text-center md:mb-4 mb-[16px]">
            <p className="md:text-[16px] text-[12px] text-gray-600 leading-[20px]">
              Last date to redeem:{" "}
              <span className="text-green font-semibold">{expiryDate}</span>
            </p>
          </div>

          {/* Share Button */}
          <div className="text-center">
            <button
              onClick={handleShareClick}
              className="text-green underline md:text-[16px] text-[12px] font-semibold hover:text-green transition-colors leading-[16px]"
            >
              Share with Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePeVoucherPopup;
