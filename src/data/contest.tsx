import { TCMSResponse } from "@/api/types/CMSTypes";

export interface ContestData {
  textBelowGiftBox: string;
  previousWinnerListButtonText: string;
  excitingNewRewardsText: string;
  comingSoon: string;
  surpriseMe: string;
  giftBoxTheContestIsOver: string;
  howToGatherComicCoins: string;
  banner1Header: string;
  banner1Content: string;
  banner2Header: string;
  banner2Content: string;
  banner3Header: string;
  banner3Content: string;
  banner4Header: string;
  banner4Content: string;
  banner5Header: string;
  banner5Content: string;
  banner6Header: string;
  banner6Content: string;
  banner7Header: string;
  banner7Content: string;
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
      contestCMS?.exciting_new_rewards_coming_soon_text ?? "Exciting New Rewards",
    comingSoon: contestCMS?.exciting_new_rewards_coming_soon_text ?? "Coming Soon",
    surpriseMe: contestCMS?.surprise_me ?? "Surprise Me",
    giftBoxTheContestIsOver:
      contestCMS?.gift_box_the_contest_is_over ?? "The contest is over",
    howToGatherComicCoins:
      contestCMS?.how_to_gather_comic_coins ?? "How to gather comic coins",
    banner1Header: contestCMS?.banner_1_header ?? "Banner 1 Header",
    banner1Content: contestCMS?.banner_1_content ?? "Banner 1 Content",
    banner2Header: contestCMS?.banner_2_header ?? "Banner 2 Header",
    banner2Content: contestCMS?.banner_2_content ?? "Banner 2 Content",
    banner3Header: contestCMS?.banner_3_header ?? "Banner 3 Header",
    banner3Content: contestCMS?.banner_3_content ?? "Banner 3 Content",
    banner4Header: contestCMS?.banner_4_header ?? "Banner 4 Header",
    banner4Content: contestCMS?.banner_4_content ?? "Banner 4 Content",
    banner5Header: contestCMS?.banner_5_header ?? "Banner 5 Header",
    banner5Content: contestCMS?.banner_5_content ?? "Banner 5 Content",
    banner6Header: contestCMS?.banner_6_header ?? "Banner 6 Header",
    banner6Content: contestCMS?.banner_6_content ?? "Banner 6 Content",
    banner7Header: contestCMS?.banner_7_header ?? "Banner 7 Header",
    banner7Content: contestCMS?.banner_7_content ?? "Banner 7 Content",
  };
};

// Default data for SSR/hydration
export const defaultContestData: ContestData = {
  textBelowGiftBox: "Win amazing prizes!",
  previousWinnerListButtonText: "Previous Winners",
  excitingNewRewardsText: "Exciting New Rewards",
  comingSoon: "Coming Soon",
  surpriseMe: "Surprise Me",
  giftBoxTheContestIsOver: "The contest is over",
  howToGatherComicCoins: "How to gather comic coins",
  banner1Header: "Banner 1 Header",
  banner1Content: "Banner 1 Content",
  banner2Header: "Banner 2 Header",
  banner2Content: "Banner 2 Content",
  banner3Header: "Banner 3 Header",
  banner3Content: "Banner 3 Content",
  banner4Header: "Banner 4 Header",
  banner4Content: "Banner 4 Content",
  banner5Header: "Banner 5 Header",
  banner5Content: "Banner 5 Content",
  banner6Header: "Banner 6 Header",
  banner6Content: "Banner 6 Content",
  banner7Header: "Banner 7 Header",
  banner7Content: "Banner 7 Content",
};
