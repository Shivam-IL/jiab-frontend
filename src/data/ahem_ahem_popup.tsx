import { TCMSResponse } from "@/api/types/CMSTypes";

export interface AhemAhemPopupData {
  pop_up_heading: string;
  pop_up_sub_heading: string;
  pop_up_button_text: string;
}

export const mapAhemAhemPopupData = (
  cmsData: TCMSResponse["data"] | null
): AhemAhemPopupData => {
  const popupCMS = cmsData?.ahem_ahem_pop_up;
  return {
    pop_up_heading: popupCMS?.pop_up_heading ?? "Ahem Ahem!",
    pop_up_sub_heading:
      popupCMS?.pop_up_sub_heading ??
      "You've exhausted your daily limit of jokes.",
    pop_up_button_text: popupCMS?.pop_up_button_text ?? "Refer Now",
  };
};

export const defaultAhemAhemPopupData: AhemAhemPopupData = {
  pop_up_heading: "Ahem Ahem!",
  pop_up_sub_heading:
    "Self-love is great, but you can't refer yourself. Refer a friend please!",
  pop_up_button_text: "Refer Now",
};
