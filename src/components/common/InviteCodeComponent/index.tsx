import InviteCodePopupWrapper from "@/components/InviteCodePopus";
import { GA_EVENTS, INVITE_CODE_STATUS } from "@/constants/";
import React, { useEffect, useState } from "react";
import { useVerifyReferral } from "@/api/hooks/ReferralHooks";
import { triggerGAEvent } from "@/utils/gTagEvents";
import {
  CoinAnimation,
  useCoinAnimation,
} from "@/components/common/CoinAnimation";
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder,
} from "@/api/utils/cdpEvents";
import useAppSelector from "@/hooks/useSelector";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";
import { useCMSData } from "@/data";

const InviteCodeComponent = ({
  open,
  setOpen,
  onClose,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);
  const [invite2, setInvite2] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>("");

  const { mutate: verifyReferral, data: verifyReferralData } =
    useVerifyReferral();
  const [inviteCodeStatus, setInviteCodeStatus] = useState<string>("");
  const { user } = useAppSelector((state) => state.profile);
  const [error, setError] = useState<string>("");

  // Coin animation hook
  const { isAnimating, triggerAnimation, animationKey } = useCoinAnimation();
  const { mutate: sendCDPEvent } = useSendCDPEvent();

  const handleChangeInvite = (key: string, value: string) => {
    setError("");
    setInviteCode(value);
  };

  const handleVerifyReferral = () => {
    if (inviteCode === "") {
      setError("Please enter refer code.");
      return;
    }
    verifyReferral({
      referral_code: inviteCode,
      validationMessage: cmsData.validation.signupReferralCodeValidation,
    });
  };

  const triggerCDPInviteCodeEvent = () => {
    if (user?.id) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildUseInviteCodePayload({
          user_identifier: user.id,
        });
      sendCDPEvent(payload);
    }
  };

  const trigerCDPReferralCompletedEvent = (phoneNumber: string) => {
    if (user?.id && phoneNumber) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildReferralCompletedPayload(
          phoneNumber,
          user.id
        );
      sendCDPEvent(payload);
    }
  };

  console.log("verifyReferralData", verifyReferralData, onClose);
  useEffect(() => {
    if (verifyReferralData?.ok) {
      const { status, phone_number } = verifyReferralData?.data as {
        status?: string;
        phone_number?: string;
        message?: string;
      };
      setInviteCodeStatus(status as string);
      if (status === INVITE_CODE_STATUS.SUCCESS) {
        triggerCDPInviteCodeEvent();
        if (phone_number) {
          trigerCDPReferralCompletedEvent(phone_number);
        }
        setOpen(false);
        triggerAnimation();
        triggerGAEvent(GA_EVENTS.SPRITE_24_REFERRAL_CODE_SUBMIT);
      } else if (status === INVITE_CODE_STATUS.INVALID_REFERRAL_CODE) {
        if (invite2) {
          setError(cmsData.validation.signupReferralCodeValidation);
        }
        setInvite2(true);
        setOpen(false);
      } else {
        setError(cmsData.validation.signupReferralCodeValidation);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifyReferralData]);

  useEffect(() => {
    return () => {
      setError("");
      setInvite2(false);
      setOpen(false);
      setInviteCode("");
      setInviteCodeStatus("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {open && (
        <InviteCodePopupWrapper
          title={cmsData?.inviteCode?.inviteCodeHeading}
          subtitle={cmsData?.inviteCode?.inviteCodeSubHeading}
          ctaText={cmsData?.inviteCode?.inviteCodeButtonText}
          code={inviteCode}
          onChange={handleChangeInvite}
          open={open}
          onSubmit={() => {
            handleVerifyReferral();
          }}
          error={error}
          onClose={() => {
            setOpen(false);
            setInviteCode("");
            setError("");
          }}
        />
      )}
      {invite2 &&
        inviteCodeStatus === INVITE_CODE_STATUS.INVALID_REFERRAL_CODE && (
          <InviteCodePopupWrapper
            title={cmsData?.cheatCodeInvite?.cheat_code_title}
            subtitle={cmsData?.cheatCodeInvite?.cheat_code_sub_title}
            ctaText={cmsData?.cheatCodeInvite?.submit_button}
            code={inviteCode}
            error={error}
            onChange={handleChangeInvite}
            open={invite2}
            onSubmit={() => {
              handleVerifyReferral();
            }}
            onClose={() => {
              setInvite2(false);
              setInviteCode("");
              setInviteCodeStatus("");
              setError("");
            }}
          />
        )}

      {/* Coin Animation */}
      <CoinAnimation isVisible={isAnimating} animationKey={animationKey} />
    </>
  );
};

export default InviteCodeComponent;
