import { TCMSResponse } from "@/api/types/CMSTypes";

export interface ScrollAndLolData {
  scrollAndLolHeading: string;
  scrollAndLolLastPageContent: string;
  scrollAndLolLastPageContentHeading: string;
  scrollAndLolLastPageContentSubheading: string;
  breakingNews: string;
  serialChiller: string;
  exhaustHeading: string;
  exhaustSubheading: string;
}

export const mapScrollAndLolData = (
  cmsData: TCMSResponse["data"] | null
): ScrollAndLolData => {
  const scrollAndLolCMS = cmsData?.scroll_and_lol;

  return {
    scrollAndLolHeading:
      scrollAndLolCMS?.Scroll_and_LOL_heading ?? "Scroll & LOL",
    scrollAndLolLastPageContent:
      scrollAndLolCMS?.Scroll_and_LOL_lastpage_content ?? "That's all for now!",
    scrollAndLolLastPageContentHeading:
      scrollAndLolCMS?.Scroll_and_LOL_lastpage_content_heading ??
      "You've reached the end",
    scrollAndLolLastPageContentSubheading:
      scrollAndLolCMS?.Scroll_and_LOL_lastpage_content_subheading ??
      "Check back later for more content",
    breakingNews:
      scrollAndLolCMS?.Scroll_and_LOL_lastpage_content_heading ??
      "BREAKING NEWS",
    serialChiller:
      scrollAndLolCMS?.Scroll_and_LOL_lastpage_content_subheading ??
      "We have a 'Serial Chiller' on the loose, and it's you!",
    exhaustHeading:
      scrollAndLolCMS?.exhaust_heading ??
      "You've LOL-ed your way through all our jokes in this language.",
    exhaustSubheading:
      scrollAndLolCMS?.exhaust_sub_heading ??
      "Switch languages to scroll through more HaHa-amazing Jokes!",
  };
};

// Default data for SSR/hydration
export const defaultScrollAndLolData: ScrollAndLolData = {
  scrollAndLolHeading: "Scroll & LOL",
  scrollAndLolLastPageContent: "That's all for now!",
  scrollAndLolLastPageContentHeading: "You've reached the end",
  scrollAndLolLastPageContentSubheading: "Check back later for more content",
  breakingNews: "BREAKING NEWS",
  serialChiller: "We have a 'Serial Chiller' on the loose, and it's you!",
  exhaustHeading:
    "You've LOL-ed your way through all our jokes in this language.",
  exhaustSubheading:
    "Switch languages to scroll through more HaHa-amazing Jokes!",
};
