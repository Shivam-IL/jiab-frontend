"use client";

import Input from "@/components/Input";
import LoginSignupWrapper, {
  AuthHeading,
} from "@/components/LoginSignupWrapper";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import GreenCTA from "@/components/GreenCTA";
import useDispatch from "../../../hooks/useDispatch";
import useAppSelector from "@/hooks/useSelector";
import {
  updateOtpStatus,
  updateLoginModal,
  updatePhoneNumber,
  updateCrossModal,
} from "@/store/auth/auth.slice";
import { useMutateRequestOTP } from "@/api/hooks/LoginHooks";
import SvgIcons from "../SvgIcons";
import { GA_EVENTS, ICONS_NAMES } from "@/constants";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { useGlobalLoader } from "@/hooks/useGlobalLoader";
import { useCMSData } from "@/data";

const Login = () => {
  const {
    mutate: requestOTP,
    isPending,
    isSuccess,
    data,
  } = useMutateRequestOTP();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { showLoader, hideLoader } = useGlobalLoader();
  const [mounted, setMounted] = useState(false);
  const cmsData = useCMSData(mounted);

  const dispatch = useDispatch();
  const { loginModal } = useAppSelector((state) => state.auth);

  const handleClose = useCallback(() => {
    dispatch(updateLoginModal({ loginModal: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateLoginModal]);

  useEffect(() => {
    if (
      mobileNumber?.length === 10 &&
      mobileNumber?.[0] &&
      parseInt(mobileNumber[0]) < 6
    ) {
      setError("Please enter a valid 10-digit mobile number");
    } else if (
      mobileNumber?.length === 10 &&
      mobileNumber?.[0] &&
      parseInt(mobileNumber[0]) >= 6
    ) {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileNumber]);

  const handleGetOTP = () => {
    triggerGAEvent(GA_EVENTS.SPRITE_J24_GET_OTP);
    if (
      mobileNumber?.length !== 10 ||
      !mobileNumber?.[0] ||
      parseInt(mobileNumber[0]) < 6
    ) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    showLoader();
    requestOTP({ mobile_number: mobileNumber });
  };

  const handleDataUpdation = useCallback(() => {
    if (isSuccess) {
      const otpData = data;
      if (otpData?.ok) {
        dispatch(updatePhoneNumber({ phoneNumber: mobileNumber }));
        dispatch(updateOtpStatus({ otpSent: true }));
        handleClose();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, dispatch, handleClose, mobileNumber]);

  useEffect(() => {
    if (!isPending) {
      hideLoader();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  useEffect(() => {
    handleDataUpdation();
  }, [isPending, handleDataUpdation]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LoginSignupWrapper open={loginModal} setOpen={handleClose} logo={true}>
      <div
        className={`absolute top-[-50%]
     left-1/2 transform -translate-x-1/2`}
      >
        <Image
          src="/assets/images/bottle-sprite-t.gif"
          alt="sprite"
          className="h-[200px] w-[166px] mt-2"
          width={166}
          height={200}
        />
      </div>
      <div className="w-full absolute top-[4px] right-[4px] flex justify-end box-border pt-[10px] pr-[10px]">
        <button
          className="flex justify-center items-center outline-none border-none"
          onClick={() => {
            handleClose();
            dispatch(updateCrossModal({ crossModal: true }));
          }}
        >
          <SvgIcons name={ICONS_NAMES.CROSS} className="w-[16px] h-[16px]" />
        </button>
      </div>
      <div className={`flex flex-col gap-[24px] pt-[50px]`}>
        <div className="flex flex-col justify-center items-center gap-[8px]">
          <AuthHeading title={cmsData.login.loginHeading} />
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="flex flex-col gap-[28px]"
        >
          <Input
            required={true}
            name="mobileNumber"
            value={mobileNumber}
            placeholder={cmsData.login.mobileNumberPlaceholder}
            error={error}
            onChange={(key, value) => {
              const numericValue = (value as unknown as string)?.replace(
                /[^0-9]/g,
                ""
              );
              const valueString = numericValue?.slice(0, 10);
              setMobileNumber(valueString);
            }}
            type="text"
          />

          <GreenCTA
            disabled={isPending}
            className=""
            borderRadius="rounded-[112px]"
            fontSize="text-[14px] md:text-[16.5px]"
            onClick={() => {
              handleGetOTP();
            }}
            text={cmsData.login.loginOtpButton}
          />
        </form>
      </div>
    </LoginSignupWrapper>
  );
};

export default Login;
