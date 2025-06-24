import { TCMSResponse } from "@/api/types/CMSTypes";

export interface EasyPeasyPopupData {
  easy_me_pop_up_heading: string;
  easy_me_pop_up_sub_heading_1: string;
  easy_me_pop_up_sub_heading: string;
}

export const mapEasyPeasyPopupData = (
  cmsData: TCMSResponse["data"] | null
): EasyPeasyPopupData => {
  const popupCMS = cmsData?.easy_me_pop_up;
  return {
    easy_me_pop_up_heading:
      popupCMS?.easy_me_pop_up_heading ?? "Easy, peasy, lemon squeezy!",
    easy_me_pop_up_sub_heading_1:
      popupCMS?.easy_me_pop_up_sub_heading_1 ??
      "You've successfully referred a friend. Your points will be credited when they sign up using your unique invite code.",
    easy_me_pop_up_sub_heading:
      popupCMS?.easy_me_pop_up_sub_heading ??
      "Your points will be credited on successful sign up using the invite code",
  };
};

export const defaultEasyPeasyPopupData: EasyPeasyPopupData = {
  easy_me_pop_up_heading: "Easy, peasy, lemon squeezy!",
  easy_me_pop_up_sub_heading_1:
    "You've successfully referred a friend. Your points will be credited when they sign up using your unique invite code.",
  easy_me_pop_up_sub_heading:
    "Your points will be credited on successful sign up using the invite code",
};
