import { TCMSResponse } from "@/api/types/CMSTypes";

export interface SignupData {
  full_name: string;
  email_id: string;
  referral_invite_code: string;
  term_condition_privacy_policy: string;
  submit: string;
  sign_up: string;
  let_break_the_ice: string;
}

export const defaultSignupData: SignupData = {
  full_name: "Full Name",
  email_id: "Email ID",
  referral_invite_code: "Referral Invite Code",
  term_condition_privacy_policy:
    "I hereby state that I am older than 18 years of age and agree to the Terms & Conditions and Privacy Policy.",
  submit: "Submit",
  sign_up: "SIGN UP",
  let_break_the_ice: "Let's break the ice",
};

export const mapSignupData = (
  cmsData: TCMSResponse["data"] | null
): SignupData => {
  if (!cmsData?.signup) {
    return defaultSignupData;
  }

  return {
    full_name: cmsData.signup.full_name || defaultSignupData.full_name,
    email_id: cmsData.signup.email_id || defaultSignupData.email_id,
    referral_invite_code:
      cmsData.signup.referral_invite_code ||
      defaultSignupData.referral_invite_code,
    term_condition_privacy_policy:
      cmsData.signup.term_condition_privacy_policy ||
      defaultSignupData.term_condition_privacy_policy,
    submit: cmsData.signup.submit || defaultSignupData.submit,
    sign_up: cmsData.signup.sign_up || defaultSignupData.sign_up,
    let_break_the_ice:
      cmsData.signup.let_break_the_ice || defaultSignupData.let_break_the_ice,
  };
};
