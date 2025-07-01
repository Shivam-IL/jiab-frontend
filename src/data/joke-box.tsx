import { TCMSResponse } from "@/api/types/CMSTypes";

export interface JokeBoxData {
  jokeBoxHeading: string;
  jokeBoxSubHeading: string;
  hallOfLameNextPageSwitchText: string;
  filter: string;
  surpriseMe: string;
  loadMoreButtonText: string;
  loadingText: string;
  searchByName: string;
  noMoreData: string;
  vote: string;
  voted: string;
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
    loadingText: jokeBoxCMS?.Loading ?? "Loading",
    searchByName: jokeBoxCMS?.Search_by_name ?? "Search by Name...",
    noMoreData: jokeBoxCMS?.no_more_data ?? "No more data",
    vote: jokeBoxCMS?.vote ?? "Vote",
    voted: jokeBoxCMS?.voted ?? "Voted",
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
  loadingText: "Loading",
  searchByName: "Search by Name...",
  noMoreData: "No more data",
  vote: "Vote",
  voted: "Voted",
};
