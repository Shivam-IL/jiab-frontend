import { TCMSResponse } from "@/api/types/CMSTypes";

export interface NavBarData {
  explore: string;
  scrollAndLol: string;
  pjChallenge: string;
  pickYourMood: string;
  jokeBox: string;
  hallOfLame: string;
  referAFriend: string;
  haveAnInviteCode: string;
  navBarInsideExploreBannerHeading: string;
  navBarInsideExploreBannerSubHeading: string;
  textMeMaybe: string;
  contactUs: string;
  faqs: string;
  termsAndConditions: string;
  privacyPolicy: string;
  logout: string;
  home: string;
  contest: string;
  myProfile: string;
  login: string;
  comicCoins: string;
}

export const mapNavBarData = (
  cmsData: TCMSResponse["data"] | null
): NavBarData => {
  const navBarCMS = cmsData?.nav_bar;

  return {
    explore: navBarCMS?.explore ?? "Explore",
    scrollAndLol: navBarCMS?.scroll_and_lol ?? "Scroll & LOL",
    pjChallenge: navBarCMS?.pj_challenge ?? "PJ Challenge",
    pickYourMood: navBarCMS?.pick_your_mood ?? "Pick Your Mood",
    jokeBox: navBarCMS?.joke_Box ?? "Joke Box",
    hallOfLame: navBarCMS?.hall_of_lame ?? "Hall of Lame",
    referAFriend: navBarCMS?.refer_a_friend ?? "Refer a Friend",
    haveAnInviteCode: navBarCMS?.have_an_invite_code ?? "Have an Invite Code?",
    navBarInsideExploreBannerHeading:
      navBarCMS?.nav_bar_inside_explore_banner_heading ?? "Explore Banner",
    navBarInsideExploreBannerSubHeading:
      navBarCMS?.nav_bar_inside_explore_banner_sub_heading ??
      "Discover amazing content",
    textMeMaybe: navBarCMS?.text_me_maybe ?? "Text Me Maybe",
    contactUs: navBarCMS?.contact_us ?? "Contact Us",
    faqs: navBarCMS?.faqs ?? "FAQs",
    termsAndConditions: navBarCMS?.terms_and_conditions ?? "Terms & Conditions",
    privacyPolicy: navBarCMS?.privacy_policy ?? "Privacy Policy",
    logout: navBarCMS?.logout ?? "Logout",
    home: navBarCMS?.home ?? "Home",
    contest: navBarCMS?.contest ?? "Contest",
    myProfile: navBarCMS?.my_profile ?? "My Profile",
    login: navBarCMS?.login ?? "Login",
    comicCoins: navBarCMS?.comic_coins ?? "Comic Coins",
  };
};

// Default data for SSR/hydration
export const defaultNavBarData: NavBarData = {
  explore: "Explore",
  scrollAndLol: "Scroll & LOL",
  pjChallenge: "PJ Challenge",
  pickYourMood: "Pick Your Mood",
  jokeBox: "Joke Box",
  hallOfLame: "Hall of Lame",
  referAFriend: "Refer a Friend",
  haveAnInviteCode: "Have an Invite Code?",
  navBarInsideExploreBannerHeading: "Explore Banner",
  navBarInsideExploreBannerSubHeading: "Discover amazing content",
  textMeMaybe: "Text Me Maybe",
  contactUs: "Contact Us",
  faqs: "FAQs",
  termsAndConditions: "Terms & Conditions",
  privacyPolicy: "Privacy Policy",
  logout: "Logout",
  home: "Home",
  contest: "Contest",
  myProfile: "My Profile",
  login: "Login",
  comicCoins: "Comic Coins",
};
