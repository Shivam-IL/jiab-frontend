import { TCMSResponse } from "@/api/types/CMSTypes";

export interface HomePageData {
  surpriseMeText: string;
  scrollAndLolText: string;
  viewAllButtonText: string;
  pickYourMoodHeading: string;
  pickYourMoodSubheading: string;
  pjChallengeHeading: string;
  pjChallengeSubheading: string;
  pjBannerSubmitButtonText: string;
  jokeBoxHeading: string;
  jokeBoxSubheading: string;
  latestButtonText: string;
  trendingButtonText: string;
  jokeDisclaimerText: string;
  followSprite: string;
}

export const mapHomePageData = (
  cmsData: TCMSResponse["data"] | null
): HomePageData => {
  const homePageCMS = cmsData?.home_page;

  return {
    surpriseMeText: homePageCMS?.suprise_me_text ?? "Surprise Me",
    scrollAndLolText: homePageCMS?.scroll_and_lol_text ?? "Scroll & LOL",
    viewAllButtonText: homePageCMS?.view_all_button_text ?? "View All",
    pickYourMoodHeading:
      homePageCMS?.pick_your_mood_heading ?? "Pick your mood",
    pickYourMoodSubheading:
      homePageCMS?.pick_your_modd_subheading ??
      "Pick your Delulu, Get your Solulu",
    pjChallengeHeading: homePageCMS?.pj_challenge_heading ?? "PJ Challenge",
    pjChallengeSubheading:
      homePageCMS?.pj_challenge_subheading ??
      "Submit your jokes and get featured",
    pjBannerSubmitButtonText:
      homePageCMS?.pj_banner_submit_button_text ?? "Submit Your Joke",
    jokeBoxHeading: homePageCMS?.joke_box_heading ?? "Joke Box",
    jokeBoxSubheading:
      homePageCMS?.joke_box_subheading ?? "Jokes For you, Created By You",
    latestButtonText: homePageCMS?.latest_button_text ?? "Latest",
    trendingButtonText: homePageCMS?.trending_button_text ?? "Trending",
    jokeDisclaimerText:
      homePageCMS?.joke_disclamer_text ??
      "The content displayed above is user generated and may not reflect the opinions of Sprite®",
    followSprite: homePageCMS?.follow_sprite ?? "Follow Sprite",
  };
};

// Default data for SSR/hydration
export const defaultHomePageData: HomePageData = {
  surpriseMeText: "Surprise Me",
  scrollAndLolText: "Scroll & LOL",
  viewAllButtonText: "View All",
  pickYourMoodHeading: "Pick your mood",
  pickYourMoodSubheading: "Pick your Delulu, Get your Solulu",
  pjChallengeHeading: "PJ Challenge",
  pjChallengeSubheading: "Submit your jokes and get featured",
  pjBannerSubmitButtonText: "Submit Your Joke",
  jokeBoxHeading: "Joke Box",
  jokeBoxSubheading: "Jokes For you, Created By You",
  latestButtonText: "Latest",
  trendingButtonText: "Trending",
  jokeDisclaimerText: "All jokes are user-generated content",
  followSprite: "Follow Sprite",
};
