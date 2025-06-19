import React, { useEffect, useState } from "react";
import CustomPopupWrapper from "../CustomPopupWrapper";
import {
  GA_EVENTS,
  REFER_NOW_MODAL_DATA,
  REFERRAL_CODE,
  REFFERAL_STATUS_POPUP_DATA,
} from "@/constants";
import AktivGroteskText from "../AktivGroteskText";
import ReferNowModal from "../ReferNowModal";
import { useSendReferral } from "@/api/hooks/ReferralHooks";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { useCMSData } from "@/data";

const ReferNowComponent = ({
  open,
  onClose,
  setOpen,
  setReferralCode,
}: {
  open: boolean;
  onClose: () => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setReferralCode?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open2, setOpen2] = useState<boolean>(false);
  const [open3, setOpen3] = useState<boolean>(false);

  const [referStatus1, setReferStatus1] = useState<boolean>(false);
  const [referStatus2, setReferStatus2] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [referStatus, setReferStatus] = useState<string>("");
  const [inviteCode, setInviteCode] = useState<string>("");

  const { mutate: sendReferral, data: sendReferralData } = useSendReferral();

  const handleChange = (key: string, value: string) => {
    if (value?.length === 10 && parseInt(value?.[0]) >= 6) {
      if (open2) {
        const numericValue = value?.replace(/[^0-9]/g, "");
        const valueString = numericValue?.slice(0, 10);
        setPhoneNumber(valueString);
        setOpen2(false);
        setOpen?.(true);
        setError("");
        return;
      }
    }

    if (value?.length === 10 && parseInt(value?.[0]) < 6) {
      setError("Please enter a valid 10 digit mobile number");
    }

    const numericValue = value?.replace(/[^0-9]/g, "");
    const valueString = numericValue?.slice(0, 10);
    setPhoneNumber(valueString);
  };

  const submitReferNow = () => {
    if (phoneNumber?.length < 10) {
      setError("Please enter a valid 10 digit mobile number");
      setOpen2(true);
      setOpen?.(false);
    }

    sendReferral({
      refer_to: phoneNumber,
    });
  };

  useEffect(() => {
    if (sendReferralData?.ok) {
      const { status } = sendReferralData?.data as {
        status: string;
        invite_code?: string;
      };
      setReferStatus(status);
      if (status === REFERRAL_CODE.SUCCESS) {
        setReferStatus1(true);
        setOpen2(false);
        setOpen3(false);

        setInviteCode((sendReferralData?.data as any)?.invite_code ?? "");
        if (setReferralCode) {
          setReferralCode((sendReferralData?.data as any)?.invite_code ?? "");
        }
        onClose();
      } else if (status === REFERRAL_CODE.ALREADY_REFERRED) {
        setReferStatus2(true);
        setOpen2(false);
        setOpen3(false);
        setReferStatus1(false);

        onClose();
      } else if (status === REFERRAL_CODE.CANNOT_SEND_TO_SELF) {
        setOpen3(true);
        setOpen2(false);

        setReferStatus1(false);
        setReferStatus2(false);
        onClose();
      } else if (status === REFERRAL_CODE.INVALID_MOBILE_NUMBER) {
        setOpen2(true);
        setOpen3(false);
        setReferStatus1(false);
        setReferStatus2(false);
        onClose();
      }
    }
  }, [sendReferralData]);

  useEffect(() => {
    return () => {
      setPhoneNumber("");
    };
  }, []);

  const { easyPeasy, ahemAhem, tryingToPrankUs, referAFriend } = useCMSData();

  return (
    <>
      {open && (
        <ReferNowModal
          title={referAFriend.broCodeHeader}
          subtitle={referAFriend.broCodeSubHeader}
          ctaText={referAFriend.referNowButton}
          placeholder={referAFriend.mobileNumberTextField}
          phoneNumber={phoneNumber}
          onChange={handleChange}
          open={open}
          onSubmit={() => {
            triggerGAEvent(GA_EVENTS.SPRITE_J24_REFER_NOW);
            submitReferNow();
          }}
          error={error}
          onClose={() => {
            onClose();
            setPhoneNumber("");
          }}
        />
      )}
      {referStatus === REFERRAL_CODE.INVALID_MOBILE_NUMBER && open2 && (
        <ReferNowModal
          title={tryingToPrankUs.prank_us_heading}
          subtitle={tryingToPrankUs.prank_us_sub_heading}
          ctaText={tryingToPrankUs.prank_us_button_text}
          phoneNumber={phoneNumber}
          placeholder={referAFriend.mobileNumberTextField}
          onChange={handleChange}
          error={error}
          onSubmit={() => {
            submitReferNow();
          }}
          open={open2}
          onClose={() => {
            onClose();
            setPhoneNumber("");
            setOpen2(false);
          }}
        />
      )}
      {referStatus === REFERRAL_CODE.CANNOT_SEND_TO_SELF && open3 && (
        <ReferNowModal
          title={ahemAhem.pop_up_heading}
          subtitle={ahemAhem.pop_up_sub_heading}
          ctaText={ahemAhem.pop_up__button_text}
          phoneNumber={phoneNumber}
          placeholder={referAFriend.mobileNumberTextField}
          onSubmit={() => {
            submitReferNow();
          }}
          onChange={handleChange}
          open={open3}
          onClose={() => {
            setOpen3(false);
            setPhoneNumber("");
          }}
        />
      )}
      {referStatus === REFERRAL_CODE.SUCCESS && referStatus1 && (
        <CustomPopupWrapper
          open={referStatus1}
          onClose={() => {
            setReferStatus1(false);
            setPhoneNumber("");
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.EASY.ICON}
          title={easyPeasy.easy_me_pop_up_heading}
          subtitle={easyPeasy.easy_me_pop_up_sub_heading_1}
        >
          <div className="flex flex-col gap-[20px]">
            <AktivGroteskText
              fontSize="text-[16px]"
              fontWeight="font-[700]"
              className="text-[#00953B] text-center"
              text={`"${inviteCode}"`}
            />
            <AktivGroteskText
              fontSize="text-[12px]"
              fontWeight="font-[400] text-center"
              text={easyPeasy.easy_me_pop_up_sub_heading}
            />
          </div>
        </CustomPopupWrapper>
      )}
      {referStatus === REFERRAL_CODE.ALREADY_REFERRED && referStatus2 && (
        <CustomPopupWrapper
          open={referStatus2}
          onClose={() => {
            setReferStatus2(false);
            setPhoneNumber("");
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SUB_TITLE}
          singleButton={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SINGLE_BUTTON}
          singleButtonText={
            REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SINGLE_BUTTON_TEXT
          }
          singleButtonOnClick={() => {
            setReferStatus2(false);
            setOpen?.(true);
          }}
        />
      )}
    </>
  );
};

export default ReferNowComponent;
