import { TCMSResponse } from "@/api/types/CMSTypes";

export interface OtpData {
  otpVerification: string;
  pleaseOtpEnter: string;
  resend: string;
  submit: string;
  tryAgainIn: string;
}

export const mapOtpData = (cmsData: TCMSResponse["data"] | null): OtpData => {
  const otpCMS = cmsData?.otp;
  return {
    otpVerification: otpCMS?.otp_verification ?? "OTP VERIFICATION",
    pleaseOtpEnter:
      otpCMS?.please_otp_enter ??
      "Please enter the OTP sent to your registered mobile number",
    resend: otpCMS?.resend ?? "Resend",
    submit: otpCMS?.sumbit ?? "Submit",
    tryAgainIn: otpCMS?.try_again_in ?? "Try again in",
  };
};

export const defaultOtpData: OtpData = {
  otpVerification: "OTP VERIFICATION",
  pleaseOtpEnter: "Please enter the OTP sent to your registered mobile number",
  resend: "Resend",
  submit: "Submit",
  tryAgainIn: "Try again in",
};
