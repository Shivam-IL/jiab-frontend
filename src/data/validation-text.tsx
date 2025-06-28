import { TCMSResponse } from "@/api/types/CMSTypes";

export interface ValidationData {
  loginMobileNumberRequired: string;
  otpVerificationRequired: string;
  signupNameRequired: string;
  signupEmailValidation: string;
  signupTandcAcceptance: string;
  signupReferralCodeValidation: string;
  pjChallengeLanguageRequired: string;
  pjChallengeFileRequired: string;
  pjChallengeTitleRequired: string;
  pjChallengeTandcAcceptance: string;
  pjChallengeJokeRequired: string;
  editProfileAgeValidation: string;
  plusAddMyProfileAddress1Required: string;
  plusAddMyProfilePincodeRequired: string;
  plusAddMyProfileStateRequired: string;
  plusAddMyProfileCityError: string;
  referAFriendUserAlreadyExistError: string;
}

export const mapValidationData = (
  cmsData: TCMSResponse["data"] | null
): ValidationData => {
  const validationCMS = cmsData?.validations_translation;
  return {
    loginMobileNumberRequired:
      validationCMS?.login_mobilenumber_numberrequired ??
      "Please enter a valid 10-digit mobile number",
    otpVerificationRequired:
      validationCMS?.otp_verification_otpsentrequired ??
      "Please enter the OTP sent to your registered mobile number",
    signupNameRequired:
      validationCMS?.signup_name_namerequired ?? "Please enter a valid name.",
    signupEmailValidation:
      validationCMS?.signup_emailid_emailidvalidation ??
      "Please enter a valid email address",
    signupTandcAcceptance:
      validationCMS?.signup_tandc_tandcacceptance ??
      "Please accept the terms and conditions",
    signupReferralCodeValidation:
      validationCMS?.signup_referralcode_referralcodevalidation ??
      "Invalid referral code",
    pjChallengeLanguageRequired:
      validationCMS?.pjchallenge_language_languagerequired ??
      "Language is required",
    pjChallengeFileRequired:
      validationCMS?.pjchallenge_file_filerequired ?? "File is required",
    pjChallengeTitleRequired:
      validationCMS?.pjchallenge_title_titlerequired ?? "Title is required",
    pjChallengeTandcAcceptance:
      validationCMS?.pjchallenge_tandc_tandcacceptance ??
      "You must agree to the terms and conditions",
    pjChallengeJokeRequired:
      validationCMS?.pjchallenge_joke_jokerequired ?? "Joke is required",
    editProfileAgeValidation:
      validationCMS?.editprofile_age_agevalidation ??
      "Sorry, you are below 18 years of age.",
    plusAddMyProfileAddress1Required:
      validationCMS?.plusaddmyprofile_address1_address1required ??
      "Address Line 1 is required",
    plusAddMyProfilePincodeRequired:
      validationCMS?.plusaddmyprofile_pincode_pincoderequired ??
      "Invalid Pincode",
    plusAddMyProfileStateRequired:
      validationCMS?.plusaddmyprofile_state_staterequired ??
      "State is required",
    plusAddMyProfileCityError:
      validationCMS?.plusaddmyprofile_city_cityerror ?? "City is required",
    referAFriendUserAlreadyExistError:
      validationCMS?.referafriend_brocodewefollow_userexist_useralreadyexisterror ??
      "Referred User already Exist",
  };
};

export const defaultValidationData: ValidationData = {
  loginMobileNumberRequired: "Please enter a valid 10-digit mobile number",
  otpVerificationRequired:
    "Please enter the OTP sent to your registered mobile number",
  signupNameRequired: "Please enter a valid name.",
  signupEmailValidation: "Please enter a valid email address",
  signupTandcAcceptance: "Please accept the terms and conditions",
  signupReferralCodeValidation: "Invalid referral code",
  pjChallengeLanguageRequired: "Language is required",
  pjChallengeFileRequired: "File is required",
  pjChallengeTitleRequired: "Title is required",
  pjChallengeTandcAcceptance: "You must agree to the terms and conditions",
  pjChallengeJokeRequired: "Joke is required",
  editProfileAgeValidation: "Sorry, you are below 18 years of age.",
  plusAddMyProfileAddress1Required: "Address 1 is required",
  plusAddMyProfilePincodeRequired: "Pincode not found",
  plusAddMyProfileStateRequired: "State is required",
  plusAddMyProfileCityError: "City is required",
  referAFriendUserAlreadyExistError: "Referred User already Exist",
};
