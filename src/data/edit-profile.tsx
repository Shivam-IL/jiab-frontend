import { TCMSResponse } from "@/api/types/CMSTypes";

export interface EditProfileData {
  personalInfoHeading: string;
  personalInfoSubHeading: string;
  fullNamePlaceholder: string;
  emailIdPlaceholder: string;
  mobileNumberPlaceholder: string;
  genderMale: string;
  genderFemale: string;
  genderOthers: string;
  genderPreferNotToSay: string;
}

export const defaultEditProfileData: EditProfileData = {
  personalInfoHeading: "PERSONAL INFORMATION",
  personalInfoSubHeading: "Please check and confirm your personal details",
  fullNamePlaceholder: "Full Name",
  emailIdPlaceholder: "Email ID",
  mobileNumberPlaceholder: "Mobile Number*",
  genderMale: "Male",
  genderFemale: "Female",
  genderOthers: "Other",
  genderPreferNotToSay: "Prefer Not to Say",
};

export const mapEditProfileData = (
  cmsData: TCMSResponse["data"] | null
): EditProfileData => {
  const editProfileCMS = cmsData?.edit_profile;

  return {
    personalInfoHeading:
      editProfileCMS?.personal_info_heading ??
      defaultEditProfileData.personalInfoHeading,
    personalInfoSubHeading:
      editProfileCMS?.personal_info_sub_heading ??
      defaultEditProfileData.personalInfoSubHeading,
    fullNamePlaceholder:
      editProfileCMS?.full_name_placeholder ??
      defaultEditProfileData.fullNamePlaceholder,
    emailIdPlaceholder:
      editProfileCMS?.email_id_placeholder ??
      defaultEditProfileData.emailIdPlaceholder,
    mobileNumberPlaceholder:
      editProfileCMS?.mobile_number_placeholder ??
      defaultEditProfileData.mobileNumberPlaceholder,
    genderMale:
      editProfileCMS?.gender_male ?? defaultEditProfileData.genderMale,
    genderFemale:
      editProfileCMS?.gender_female ?? defaultEditProfileData.genderFemale,
    genderOthers:
      editProfileCMS?.gender_others ?? defaultEditProfileData.genderOthers,
    genderPreferNotToSay:
      editProfileCMS?.gender_prefer_not_to_say ??
      defaultEditProfileData.genderPreferNotToSay,
  };
};
