import { TCMSResponse } from "@/api/types/CMSTypes";

export interface MyProfileData {
  comicCoins: string;
  rank: string;
  leaderboardButtonText: string;
  addressTextField: string;
  addClickableText: string;
  referToFriendHeader: string;
  referNowButtonText: string;
  prevButtonText: string;
  nextButtonText: string;
  surpriseMe: string;
  saveButtonText: string;
  user: string;
  sendReminder: string;
  status: string;
  myReferrals: string;
  referAnother: string;
  helpUsKnowMore: string;
}

export const mapMyProfileData = (
  cmsData: TCMSResponse["data"] | null
): MyProfileData => {
  const myProfileCMS = cmsData?.my_profile;

  return {
    comicCoins: myProfileCMS?.comic_coins ?? "Comic Coins",
    rank: myProfileCMS?.rank ?? "Rank",
    leaderboardButtonText:
      myProfileCMS?.leaderboard_button_text ?? "Leaderboard",
    addressTextField: myProfileCMS?.address_text_field ?? "Address",
    addClickableText: myProfileCMS?.add_clickable_text ?? "Add",
    referToFriendHeader:
      myProfileCMS?.refer_to_friend_header ?? "Refer to Friend",
    referNowButtonText: myProfileCMS?.refer_now_button_text ?? "Refer Now",
    prevButtonText: myProfileCMS?.prev_button_text ?? "Previous",
    nextButtonText: myProfileCMS?.next_button_text ?? "Next",
    surpriseMe: myProfileCMS?.surprise_me ?? "Surprise Me",
    saveButtonText: myProfileCMS?.save_button_text ?? "Save",
    user: myProfileCMS?.user ?? "User",
    sendReminder: myProfileCMS?.send_reminder ?? "Send Reminder",
    status: myProfileCMS?.statu_s ?? "Status",
    myReferrals: myProfileCMS?.my_referrals ?? "My Referrals",
    referAnother: myProfileCMS?.refer_another ?? "Refer Another",
    helpUsKnowMore: myProfileCMS?.help_us_know_more ?? "Help Us Know More",
  };
};

// Default data for SSR/hydration
export const defaultMyProfileData: MyProfileData = {
  comicCoins: "Comic Coins",
  rank: "Rank",
  leaderboardButtonText: "Leaderboard",
  addressTextField: "Address",
  addClickableText: "Add",
  referToFriendHeader: "Refer to Friend",
  referNowButtonText: "Refer Now",
  prevButtonText: "Previous",
  nextButtonText: "Next",
  surpriseMe: "Surprise Me",
  saveButtonText: "Save",
  user: "User",
  sendReminder: "Send Reminder",
  status: "Status",
  myReferrals: "My Referrals",
  referAnother: "Refer Another",
  helpUsKnowMore: "Help Us Know More",
};
