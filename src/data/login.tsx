import { TCMSResponse } from "@/api/types/CMSTypes";

export interface LoginData {
  loginHeading: string;
  loginOtpButton: string;
  mobileNumberPlaceholder: string;
}

export const mapLoginData = (
  cmsData: TCMSResponse["data"] | null
): LoginData => {
  const loginCMS = cmsData?.login;
  return {
    loginHeading: loginCMS?.login_heading ?? "LOG IN",
    loginOtpButton: loginCMS?.login_otp_button ?? "Get OTP",
    mobileNumberPlaceholder:
      loginCMS?.mobile_number_placeholder ?? "Mobile Number*",
  };
};

export const defaultLoginData: LoginData = {
  loginHeading: "LOG IN",
  loginOtpButton: "Get OTP",
  mobileNumberPlaceholder: "Mobile Number*",
};
