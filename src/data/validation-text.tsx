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
  reportPopupUrlValidation: string;
  signupNameContainAlphabet: string;
  signupNameTwoCharLong: string;
  signupNameIsRequired: string;
  invalidAlternateNumber: string;
  profileEditProfileEmailAlreadyInUsed: string;
  profileEditProfileInvalidEmail: string;
  profileEditProfileSelectGender: string;
  inviteCodeFirstModalEnterRefCode: string;
  wrongReferralCode: string;
  uniqueCodeAlreadyRedeemed: string;
  uniqueCodeInvalidUniqueCode: string;
  uniqueCodeExpired: string;
  uniqueCodeNotActive: string;
  failedToRedeemUniqueCode: string;
  dailyLimitExceeded: string;
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
    reportPopupUrlValidation:
      validationCMS?.reportpopup_url_validurl ?? "Please enter a valid URL",
    signupNameContainAlphabet:
      validationCMS?.signup_name_namecontainsalphabet ??
      "Name should only contain letters and spaces",
    signupNameTwoCharLong:
      validationCMS?.signup_name_nametwocharlong ??
      "Name should be at least 2 characters long",
    signupNameIsRequired:
      validationCMS?.signup_name_nameisrequired ?? "Name is required",
    invalidAlternateNumber:
      validationCMS?.invalid_alternate_number ?? "Invalid Alternate Number",
    profileEditProfileEmailAlreadyInUsed:
      validationCMS?.profile_editprofile_emailalreadyinused ??
      "Email already in use",
    profileEditProfileInvalidEmail:
      validationCMS?.profile_editprofile_invalidemail ??
      "Invalid email address",
    profileEditProfileSelectGender:
      validationCMS?.profile_editprofile_selectgender ?? "Select your gender",
    inviteCodeFirstModalEnterRefCode:
      validationCMS?.invitecode_firstmodal_enterrefcode ??
      "Please enter refer code.",
    wrongReferralCode:
      validationCMS?.wrong_referral_code ?? "Wrong referral code",
    uniqueCodeAlreadyRedeemed:
      validationCMS?.uniquecode_codealreadyredeemed ??
      "Unique code already redeemed",
    uniqueCodeInvalidUniqueCode:
      validationCMS?.uniquecode_Invaliduniquecode ?? "Invalid unique code",
    uniqueCodeExpired:
      validationCMS?.uniquecode_expired ?? "Unique code expired",
    uniqueCodeNotActive:
      validationCMS?.uniquecode_notactive ?? "Unique code not active",
    failedToRedeemUniqueCode:
      validationCMS?.uniquecode_failedtoredeem ??
      "Failed to redeem unique code",
    dailyLimitExceeded:
      validationCMS?.uniquecode_dailyredemptionlimit ??
      "Daily limit exceeded for redeeming mix code",
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
  reportPopupUrlValidation: "Please enter a valid URL",
  signupNameContainAlphabet: "Name should only contain letters and spaces",
  signupNameTwoCharLong: "Name should be at least 2 characters long",
  signupNameIsRequired: "Name is required",
  invalidAlternateNumber: "Invalid Alternate Number",
  profileEditProfileEmailAlreadyInUsed: "Email already in use",
  profileEditProfileInvalidEmail: "Invalid email address",
  profileEditProfileSelectGender: "Select your gender",
  inviteCodeFirstModalEnterRefCode: "Please enter refer code.",
  wrongReferralCode: "Wrong referral code",
  uniqueCodeAlreadyRedeemed: "Unique code already redeemed",
  uniqueCodeInvalidUniqueCode: "Invalid unique code",
  uniqueCodeExpired: "Unique code expired",
  uniqueCodeNotActive: "Unique code not active",
  failedToRedeemUniqueCode: "Failed to redeem unique code",
  dailyLimitExceeded: "Daily limit exceeded for redeeming mix code",
};
