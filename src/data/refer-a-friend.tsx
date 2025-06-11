import { TCMSResponse } from "@/api/types/CMSTypes";

export interface ReferAFriendData {
  broCodeHeader: string;
  broCodeSubHeader: string;
  mobileNumberTextField: string;
  referNowButton: string;
}

export const mapReferAFriendData = (
  cmsData: TCMSResponse["data"] | null
): ReferAFriendData => {
  const referAFriendCMS = cmsData?.refer_a_friend;

  return {
    broCodeHeader: referAFriendCMS?.bro_code_header ?? "Bro Code",
    broCodeSubHeader:
      referAFriendCMS?.bro_code_sub_header ??
      "Refer your friends and earn rewards",
    mobileNumberTextField:
      referAFriendCMS?.mobile_number_text_field ?? "Mobile Number",
    referNowButton: referAFriendCMS?.refer_now_button ?? "Refer Now",
  };
};

// Default data for SSR/hydration
export const defaultReferAFriendData: ReferAFriendData = {
  broCodeHeader: "Bro Code",
  broCodeSubHeader: "Refer your friends and earn rewards",
  mobileNumberTextField: "Mobile Number",
  referNowButton: "Refer Now",
};
