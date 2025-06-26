import { TCMSResponse } from "@/api/types/CMSTypes";

export interface SendAgainPopupData {
  heading: string;
  sub_heading: string;
}

export const mapSendAgainPopupData = (
  cmsData: TCMSResponse["data"] | null
): SendAgainPopupData => {
  const popupCMS = cmsData?.send_again_pop_up;
  return {
    heading: popupCMS?.heading ?? "We've sent your friend a reminder! Your points will be on the way once they join with your code.",
    sub_heading: popupCMS?.sub_heading ?? "Your points will be credited on successful sign up using the invite code",
  };
};

export const defaultSendAgainPopupData: SendAgainPopupData = {
  heading: "We've sent your friend a reminder! Your points will be on the way once they join with your code.",
  sub_heading: "Your points will be credited on successful sign up using the invite code",  
};
