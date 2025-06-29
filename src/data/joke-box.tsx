import { TCMSResponse } from "@/api/types/CMSTypes";

export interface JokeBoxData {
  jokeBoxHeading: string;
  jokeBoxSubHeading: string;
  hallOfLameNextPageSwitchText: string;
  filter: string;
  surpriseMe: string;
  loadMoreButtonText: string;
}

export const mapJokeBoxData = (
  cmsData: TCMSResponse["data"] | null
): JokeBoxData => {
  const jokeBoxCMS = cmsData?.joke_box;

  return {
    jokeBoxHeading: jokeBoxCMS?.joke_box_heading ?? "Joke Box",
    jokeBoxSubHeading:
      jokeBoxCMS?.joke_box_sub_heading ?? "Jokes For you, Created By You",
    hallOfLameNextPageSwitchText:
      jokeBoxCMS?.hall_of_lame_next_page_switch_text ?? "Next Page",
    filter: jokeBoxCMS?.filter ?? "Filter",
    surpriseMe: jokeBoxCMS?.surprise_me ?? "Surprise Me",
    loadMoreButtonText: jokeBoxCMS?.load_more_button_text ?? "Load More",
  };
};

// Default data for SSR/hydration
export const defaultJokeBoxData: JokeBoxData = {
  jokeBoxHeading: "Joke Box",
  jokeBoxSubHeading: "Jokes For you, Created By You",
  hallOfLameNextPageSwitchText: "Next Page",
  filter: "Filter",
  surpriseMe: "Surprise Me",
  loadMoreButtonText: "Load More",
};
