import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SvgIcons from "../common/SvgIcons";
import { GA_EVENTS, ICONS_NAMES, UNIQUE_CODE_ERROR_CODES } from "@/constants";
import AktivGroteskText from "../common/AktivGroteskText";
import Input from "@/components/Input";
import GreenCTA from "@/components/GreenCTA";
import Image from "next/image";
import { useRedeemMixCode } from "@/api";
import useAppSelector from "@/hooks/useSelector";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";
import {
  CDPEventPayloadBuilder,
  TransactionCodeCDPEventPayload,
} from "@/api/utils/cdpEvents";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { useCMSData } from "@/data";

interface UniqueCodeModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface MixCodeRedeemErrorResponse {
  data: {
    code: number;
    message: string;
    status: 400 | 500;
    success: false;
  };
}

interface MixCodeRedeemSuccessResponse {
  data: {
    message: string;
    status: 200;
    success: true;
  };
}

type MixCodeRedeemResponse =
  | MixCodeRedeemSuccessResponse
  | MixCodeRedeemErrorResponse;

const UniqueCodeModal: React.FC<UniqueCodeModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDailyLimitReached, setIsDailyLimitReached] = useState(false);
  // const [coinsCollected, setCoinsCollected] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.profile);
  const { mutate: sendCDPEvent } = useSendCDPEvent();

  const redeemMixCodeMutation = useRedeemMixCode();
  const {
    uniqueCode: uniqueCodeCMSData,
    thatWasQuick: thatWasQuickCMSData,
    sorryUniqueCode: sorryUniqueCodeCMSData,
    validation: validationData,
  } = useCMSData();

  const handleChange = (
    key: string,
    value: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    // Handle both string values and change events from Input component
    const actualValue = typeof value === "string" ? value : value.target.value;

    // Only allow alphanumeric characters and limit to 10 digits
    const cleanValue = actualValue.replace(/[^A-Za-z0-9]/g, "").slice(0, 10);
    setUniqueCode(cleanValue);

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const trigger_CDP_REDEEM_MIX_CODE = (mixCode: string) => {
    if (user?.id && mixCode && user?.phone_number) {
      const phoneNumber = `+91${user.phone_number}`;
      const payload: TransactionCodeCDPEventPayload =
        CDPEventPayloadBuilder.buildTransactionCodePayload(
          phoneNumber,
          user.id
        );
      sendCDPEvent(payload);
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
      const response = (await redeemMixCodeMutation.mutateAsync({
        mix_code: uniqueCode,
      })) as unknown as MixCodeRedeemResponse;
      const result = response.data;

      if (result?.success) {
        trigger_CDP_REDEEM_MIX_CODE(uniqueCode);
        triggerGAEvent(GA_EVENTS.SPRITE_J24_UNIQUE_CODE_SUBMIT);
        setIsSuccess(true);
      } else {
        if (result.status === 400) {
          const errorCode = result.code;
          switch (errorCode) {
            case UNIQUE_CODE_ERROR_CODES.INVALID_UNIQUE_CODE:
              setError(validationData.uniqueCodeInvalidUniqueCode);
              break;
            case UNIQUE_CODE_ERROR_CODES.UNIQUE_CODE_ALREADY_REDEEMED:
              setError(validationData.uniqueCodeAlreadyRedeemed);
              break;
            case UNIQUE_CODE_ERROR_CODES.UNIQUE_CODE_EXPIRED:
              setError(validationData.uniqueCodeExpired);
              break;
            case UNIQUE_CODE_ERROR_CODES.UNIQUE_CODE_NOT_ACTIVE:
              setError(validationData.uniqueCodeNotActive);
              break;
            case UNIQUE_CODE_ERROR_CODES.FAILED_TO_REDEEM_UNIQUE_CODE:
              setError(validationData.failedToRedeemUniqueCode);
              break;
            default:
              setError(validationData.dailyLimitExceeded);
          }
        }
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
                className="w-[20px] h-[20px]"
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
                text={thatWasQuickCMSData.heading_title}
                fontSize="text-[20px]"
                fontWeight="font-[700]"
              />
              <AktivGroteskText
                text={thatWasQuickCMSData.sub_heading_title}
                fontSize="text-[16px]"
                fontWeight="font-[400]"
              />
            </div>

            <div className="flex flex-col justify-center items-center">
              <GreenCTA
                className=""
                text={thatWasQuickCMSData.got_it_text}
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
                className="w-[20px] h-[20px]"
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
                text={sorryUniqueCodeCMSData.sorry_title}
                fontSize="text-[20px] leading-[16px]"
                fontWeight="font-[700]"
              />
              <AktivGroteskText
                text={sorryUniqueCodeCMSData.sorry_sub_title}
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
                placeholder={uniqueCodeCMSData.unqiue_code_placeholder}
                readonly={true}
                bgColor="bg-[#F3F3F3]"
                className="p-1 w-[311px]"
              />

              <div className="flex flex-col justify-center items-center">
                <GreenCTA
                  className="bg-[#D0D0D1] text-[#ffffff] w-[311px]"
                  text={sorryUniqueCodeCMSData.submit_button}
                  fontSize="text-[16px] md:text-[20px]"
                  paddingClass="py-[10px] md:py-[10px] px-[28px]"
                  disabled={true}
                  onClick={() => {}}
                />
                <AktivGroteskText
                  text={sorryUniqueCodeCMSData.note_text}
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
            <SvgIcons name={ICONS_NAMES.CROSS} className="w-[20px] h-[20px]" />
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
              text={uniqueCodeCMSData.unique_code_header}
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
              placeholder={uniqueCodeCMSData.unqiue_code_placeholder}
              error={error}
            />

            <div className="flex flex-col justify-center items-center">
              <GreenCTA
                text={uniqueCodeCMSData.submit_buttom}
                fontSize="text-[16px]"
                paddingClass="py-[13.5px]"
                onClick={handleSubmit}
                disabled={isLoading || uniqueCode.trim().length !== 10}
              />
              <AktivGroteskText
                text={uniqueCodeCMSData.Note_under_submit_button}
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
