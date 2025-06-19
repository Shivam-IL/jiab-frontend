import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SvgIcons from "../common/SvgIcons";
import { ICONS_NAMES, LOCAL_IMAGES } from "@/constants";
import AktivGroteskText from "../common/AktivGroteskText";
import Input from "@/components/Input";
import GreenCTA from "@/components/GreenCTA";
import Image from "next/image";
import { useRedeemMixCode, MIX_CODE_STATUS } from "@/api";

interface UniqueCodeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// No longer needed - API validation will handle this

const UniqueCodeModal: React.FC<UniqueCodeModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDailyLimitReached, setIsDailyLimitReached] = useState(false);
  const [coinsCollected, setCoinsCollected] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const redeemMixCodeMutation = useRedeemMixCode();

  const handleChange = (key: string, value: string) => {
    // Only allow alphanumeric characters and limit to 6 digits
    const cleanValue = value.replace(/[^A-Za-z0-9]/g, "").slice(0, 6);
    setUniqueCode(cleanValue);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async () => {
    if (!uniqueCode.trim()) {
      setError("Please enter a code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await redeemMixCodeMutation.mutateAsync({
        mix_code: uniqueCode,
      });

      if (result.ok) {
        const data = result.data as any;

        switch (data.status) {
          case MIX_CODE_STATUS.SUCCESS:
            setCoinsCollected(20); // Default coins for successful redemption
            setIsSuccess(true);
            break;
          case MIX_CODE_STATUS.DAILY_LIMIT_EXCEEDED:
            setIsDailyLimitReached(true);
            break;
          case MIX_CODE_STATUS.INVALID_CODE:
            setError("Please enter a valid unique code");
            break;
          case MIX_CODE_STATUS.ALREADY_USED:
            setError("Used code entered. Please try again with new code");
            break;
          default:
            setError(data.message ?? "An error occurred");
        }
      } else {
        const message = (result as any).message ?? "Failed to redeem code";
        setError(message.charAt(0).toUpperCase() + message.slice(1));
      }
    } catch (error) {
      console.log(error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setUniqueCode("");
    setError("");
    setIsSuccess(false);
    setIsDailyLimitReached(false);
    onClose();
  };

  const handleGotIt = () => {
    handleClose();
    if (onSuccess) {
      onSuccess();
    }
  };

  // Success State
  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleGotIt}>
        <DialogContent className="max-w-[343px] md:max-w-[401px] gap-0 rounded-[10px] p-0">
          <div className="flex justify-end pt-[12px] pr-[16px] md:pr-[18px]">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleGotIt();
              }}
              className="p-2 cursor-pointer bg-transparent rounded-full border-none outline-none"
              type="button"
            >
              <SvgIcons
                name={ICONS_NAMES.CROSS}
                className="w-[13px] h-[13px] md:w-[14px] md:h-[12px]"
              />
            </button>
          </div>
          <div className="w-full px-[22px] md:px-[16px] pt-[29.78px] md:pt-[18px] pb-[23px] flex flex-col gap-[30px] md:gap-[24px] items-center">
            {/* Success Icon */}
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/sprite-gold.png"
                alt="Sprite Gold"
                width={48}
                height={48}
              />
            </div>

            <div className="flex flex-col gap-[8px] md:gap-[12px] text-center items-center">
              <AktivGroteskText
                text="That was quick!"
                fontSize="text-[20px]"
                fontWeight="font-[700]"
              />
              <AktivGroteskText
                text={`You've collected ${coinsCollected} Comic Coins!`}
                fontSize="text-[16px]"
                fontWeight="font-[400]"
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <GreenCTA
                className=""
                text="Got it"
                fontSize="text-[16px] md:text-[20px]"
                paddingClass="py-[10px] md:py-[10px] px-[28px]"
                onClick={handleGotIt}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Daily Limit Reached State
  if (isDailyLimitReached) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-[343px] gap-0 rounded-[10px] p-0 h-[337px]">
          <div className="flex justify-end mt-[-10px] mr-[7.86px]">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Close button clicked"); // Debug log
                handleClose();
              }}
              className="p-2 cursor-pointer bg-transparent rounded-full border-none outline-none z-50"
              type="button"
            >
              <SvgIcons
                name={ICONS_NAMES.CROSS}
                className="w-[12.14px] h-[12.1px]"
              />
            </button>
          </div>
          <div className="w-full flex flex-col gap-[16px] justify-center items-center mt-[-58px]">
            {/* Sprite Bottle Icon */}
            <div className="flex justify-center">
              <div className="flex items-center justify-center">
                <Image
                  src="/other-svgs/sorry.svg"
                  alt="Sprite Bottle"
                  width={56}
                  height={56}
                />
              </div>
            </div>

            <div className="flex flex-col gap-[8px] max-w-[265px] items-center justify-center text-center">
              <AktivGroteskText
                text="Sorry!"
                fontSize="text-[20px] leading-[16px]"
                fontWeight="font-[700]"
              />
              <AktivGroteskText
                text="You've reached your daily limit of 5 unique code entries!"
                fontSize="text-[16px] leading-[20px]"
                fontWeight="font-[400]"
              />
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
              className="flex flex-col gap-[28px]"
            >
              <Input
                name="uniqueCode"
                type="text"
                value={uniqueCode}
                fontSize="text-[14px]"
                onChange={handleChange}
                placeholder="Enter Unique Code here"
                readonly={true}
                bgColor="bg-[#F3F3F3]"
                className="p-1 w-[311px]"
              />

              <div className="flex flex-col justify-center items-center">
                <GreenCTA
                  className="bg-[#D0D0D1] text-[#ffffff] w-[311px]"
                  text="Submit"
                  fontSize="text-[16px] md:text-[20px]"
                  paddingClass="py-[10px] md:py-[10px] px-[28px]"
                  disabled={true}
                  onClick={() => {}}
                />
                <AktivGroteskText
                  text="Note: You can enter up to 5 codes in a day!"
                  fontSize="text-[10px] md:text-[12px]"
                  fontWeight="font-[400]"
                  className="text-[rgba(0,0,0,0.5)] mt-[8px]"
                />
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Default State (Initial and Error States)
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[343px] rounded-[10px] p-0 flex flex-col gap-[16px]">
        <div className="flex justify-end pt-[12px]  pr-[16px] md:pr-[18px]">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Close button clicked"); // Debug log
              handleClose();
            }}
            className="p-2 cursor-pointer bg-transparent hover:bg-gray-100 rounded-full border-none outline-none"
            type="button"
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className="w-[12.29px] h-[12.64px]" />
          </button>
        </div>
        <div className="w-full px-[22px] md:px-[16px] pt-[12px] pb-[23px] flex flex-col gap-[16px] mt-[-30px]">
          {/* Sprite Bottle Icon */}
          <div className="flex justify-center">
            <Image
              src="/videos/promo-code.gif"
              alt="Sprite Bottle"
              width={89}
              height={89}
            />
          </div>

          <div className="flex flex-col gap-[8px] md:gap-[12px] text-center items-center">
            <AktivGroteskText
              text="Enter the unique code from behind the label of a Sprite® bottle"
              fontSize="text-[16px]"
              fontWeight="font-[400]"
            />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="flex flex-col gap-[20px]"
          >
            <Input
              name="uniqueCode"
              type="text"
              value={uniqueCode}
              fontSize="text-[14px]"
              onChange={handleChange}
              placeholder="Enter Unique Code here"
              error={error}
            />

            <div className="flex flex-col justify-center items-center">
              <GreenCTA
                className=""
                text={isLoading ? "Submitting..." : "Submit"}
                fontSize="text-[16px]"
                paddingClass="py-[13.5px] px-[128.5px]"
                onClick={handleSubmit}
                disabled={isLoading || !uniqueCode.trim()}
              />
              <AktivGroteskText
                text="Note: You can enter up to 5 codes in a day!"
                fontSize="text-[10px] md:text-[12px]"
                fontWeight="font-[400]"
                className="text-[rgba(0,0,0,0.5)] mt-[8px]"
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UniqueCodeModal;
