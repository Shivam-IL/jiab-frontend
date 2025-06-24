import { TCMSResponse } from "@/api/types/CMSTypes";

export interface SameReferPopupData {
  trying_to_heading: string;
  trying_to_sub_heading: string;
  refer_another_pop_up: string;
}

export const mapSameReferPopupData = (
  cmsData: TCMSResponse["data"] | null
): SameReferPopupData => {
  const popupCMS = cmsData?.trying_to_get_one_past_pop_up;
  return {
    trying_to_heading:
      popupCMS?.trying_to_heading ?? "Trying to get one past us?",
    trying_to_sub_heading:
      popupCMS?.trying_to_sub_heading ??
      "You've already referred this person. 👐 Try sending them a reminder, instead!",
    refer_another_pop_up: popupCMS?.refer_another_pop_up ?? "Refer Another",
  };
};

export const defaultSameReferPopupData: SameReferPopupData = {
  trying_to_heading: "Trying to get one past us?",
  trying_to_sub_heading:
    "You've already referred this person. 👐 Try sending them a reminder, instead!",
  refer_another_pop_up: "Refer Another",
};
