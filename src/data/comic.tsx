import { TCMSResponse } from "@/api/types/CMSTypes";

export interface ComicData {
  previousWinnerBanner1Text: string;
  leaderboardButtonBanner1Text: string;
  shareALaughBanner2HeaderText: string;
  referNowButtonBanner2Text: string;
  pjChallengeBanner3Heading: string;
  pjChallengeBanner2SubHeading: string;
  pjChallengeBanner3SubSubHeading: string;
  submitToGetFeaturedButtonBanner3Text: string;
  surpriseMe: string;
  comicCoinHeader: string;
}

export const mapComicData = (
  cmsData: TCMSResponse["data"] | null
): ComicData => {
  const comicCoinsCMS = cmsData?.comic_coins;

  return {
    previousWinnerBanner1Text:
      comicCoinsCMS?.previous_winner_banner1_text ?? "Previous Winners",
    leaderboardButtonBanner1Text:
      comicCoinsCMS?.leaderboard_button_banner1_text ?? "Leaderboard",
    shareALaughBanner2HeaderText:
      comicCoinsCMS?.share_a_laugh_banner2_header_text ?? "Share a Laugh",
    referNowButtonBanner2Text:
      comicCoinsCMS?.refer_now_button_banner2_text ?? "Refer Now",
    pjChallengeBanner3Heading:
      comicCoinsCMS?.pj_challenge_banner3_heading ?? "PJ Challenge",
    pjChallengeBanner2SubHeading:
      comicCoinsCMS?.pj_challenge_banner2_sub_heading ?? "Submit Your Jokes",
    pjChallengeBanner3SubSubHeading:
      comicCoinsCMS?.pj_challenge_banner3_sub_sub_heading ?? "Get Featured",
    submitToGetFeaturedButtonBanner3Text:
      comicCoinsCMS?.submit_to_get_featured_button_banner3_text ??
      "Submit to Get Featured",
    surpriseMe: comicCoinsCMS?.surprise_me ?? "Surprise Me",
    comicCoinHeader: comicCoinsCMS?.comic_coin_header ?? "Comic Coins",
  };
};

// Default data for SSR/hydration
export const defaultComicData: ComicData = {
  previousWinnerBanner1Text: "Previous Winners",
  leaderboardButtonBanner1Text: "Leaderboard",
  shareALaughBanner2HeaderText: "Share a Laugh",
  referNowButtonBanner2Text: "Refer Now",
  pjChallengeBanner3Heading: "PJ Challenge",
  pjChallengeBanner2SubHeading: "Submit Your Jokes",
  pjChallengeBanner3SubSubHeading: "Get Featured",
  submitToGetFeaturedButtonBanner3Text: "Submit to Get Featured",
  surpriseMe: "Surprise Me",
  comicCoinHeader: "Comic Coins",
};
