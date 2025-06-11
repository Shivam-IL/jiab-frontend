import { TCMSResponse } from "@/api/types/CMSTypes";

export interface ContestData {
  textBelowGiftBox: string;
  previousWinnerListButtonText: string;
  excitingNewRewardsText: string;
  comingSoon: string;
  surpriseMe: string;
}

export const mapContestData = (
  cmsData: TCMSResponse["data"] | null
): ContestData => {
  const contestCMS = cmsData?.contest;

  return {
    textBelowGiftBox: contestCMS?.text_below_gift_box ?? "Win amazing prizes!",
    previousWinnerListButtonText:
      contestCMS?.previous_winner_list_button_text ?? "Previous Winner List",
    excitingNewRewardsText:
      contestCMS?.exciting_new_rewards_text ?? "Exciting New Rewards",
    comingSoon: contestCMS?.coming_soon ?? "Coming Soon",
    surpriseMe: contestCMS?.surprise_me ?? "Surprise Me",
  };
};

// Default data for SSR/hydration
export const defaultContestData: ContestData = {
  textBelowGiftBox: "Win amazing prizes!",
  previousWinnerListButtonText: "Previous Winners",
  excitingNewRewardsText: "Exciting New Rewards",
  comingSoon: "Coming Soon",
  surpriseMe: "Surprise Me",
};
