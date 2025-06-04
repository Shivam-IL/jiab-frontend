import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IInviteCodePopup } from "@/interfaces";
import React from "react";
import SvgIcons from "../common/SvgIcons";
import { ICONS_NAMES } from "@/constants";
import AktivGroteskText from "../common/AktivGroteskText";
import Input from "@/components/Input";
import GreenCTA from "@/components/GreenCTA";

const InviteCodePopupWrapper: React.FC<IInviteCodePopup> = ({
  open,
  onClose,
  title,
  subtitle,
  ctaText,
  code,
  onChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[343px] md:max-w-[401px] gap-0 rounded-[10px] p-0">
        <div className="flex justify-end pt-[12px]  pr-[16px] md:pr-[18px]">
          <button
            onClick={() => {
              onClose();
            }}
            className="p-0 self-end"
          >
            <SvgIcons
              name={ICONS_NAMES.CROSS}
              className="w-[13px] h-[13px] md:w-[14px] md:h-[12px]"
            />
          </button>
        </div>
        <div className="w-full px-[22px] md:px-[16px] pt-[29.78px] md:pt-[18px] pb-[23px] flex flex-col gap-[30px] md:gap-[24px]">
          <div className=" relative flex flex-col gap-[8px] md:gap-[12px] text-center items-center">
            <AktivGroteskText
              text={title}
              fontSize="text-[20px] md:text-[24px]"
              fontWeight="font-[700]"
            />
            <AktivGroteskText
              text={subtitle}
              fontSize="text-[16px] md:text-[20px]"
              fontWeight="font-[400]"
            />
          </div>
          <div className="flex flex-col gap-[28px]">
            <Input
              name="inviteCode"
              type="text"
              value={code}
              fontSize="text-[14px] md:text-[16px]"
              onChange={onChange}
              placeholder="Enter Invite Code"
            />
            <GreenCTA
              text={ctaText}
              className="w-full"
              fontSize="text-[16px] md:text-[20px]"
              paddingClass="py-[16px] md:py-[14px] px-[24px]"
              onClick={() => {
                onClose();
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCodePopupWrapper;
