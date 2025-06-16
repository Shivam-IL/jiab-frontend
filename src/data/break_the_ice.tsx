import { TCMSResponse } from "@/api/types/CMSTypes";

export interface BreakTheIceData {
  breakTheIceHeading: string;
  breakTheIceSubHeading1: string;
  breakTheIceSubHeading2: string;
  breakTheIceYesButton: string;
  breakTheIceNoButton: string;
}

export const mapBreakTheIceData = (
  cmsData: TCMSResponse["data"] | null
): BreakTheIceData => {
  const popupCMS = cmsData?.break_the_ice_complete_profile_pop_up;
  return {
    breakTheIceHeading: popupCMS?.break_the_ice_heading ?? "Break the ice, maybe?",
    breakTheIceSubHeading1: popupCMS?.break_the_ice_sub_heading_1 ?? "Earn 5 Comic Coins by completing your profile",
    breakTheIceSubHeading2: popupCMS?.break_the_ice_sub_heading_2 ?? "Are you sure you want to exit?",
    breakTheIceYesButton: popupCMS?.break_the_ice_yes_button ?? "Yes",
    breakTheIceNoButton: popupCMS?.break_the_ice_no_button ?? "No",
  };
};

export const defaultBreakTheIceData: BreakTheIceData = {
  breakTheIceHeading: "Break the ice, maybe?",
  breakTheIceSubHeading1: "Earn 5 Comic Coins by completing your profile",
  breakTheIceSubHeading2: "Are you sure you want to exit?",
  breakTheIceYesButton: "Yes",
  breakTheIceNoButton: "No",
}; 