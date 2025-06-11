import { TCMSResponse } from "@/api/types/CMSTypes";

export interface HallOfLameData {
  hallOfLameHeader: string;
  hallOfLameSubHeading: string;
  weaklyTopJokes: string;
  rankHeading: string;
  jokesHeading: string;
  votesHeading: string;
  nextButtonText: string;
  surpriseMe: string | null;
}

export const mapHallOfLameData = (
  cmsData: TCMSResponse["data"] | null
): HallOfLameData => {
  const hallOfLameCMS = cmsData?.hall_of_lame;

  return {
    hallOfLameHeader: hallOfLameCMS?.hall_of_lame_header ?? "Hall of Lame",
    hallOfLameSubHeading:
      hallOfLameCMS?.hall_of_lame_sub_heading ?? "Top jokes of the week",
    weaklyTopJokes: hallOfLameCMS?.weakly_top_jokes ?? "Weekly Top Jokes",
    rankHeading: hallOfLameCMS?.rank_heading ?? "Rank",
    jokesHeading: hallOfLameCMS?.jokes_heading ?? "Jokes",
    votesHeading: hallOfLameCMS?.votes_heading ?? "Votes",
    nextButtonText: hallOfLameCMS?.Next_button_text ?? "Next",
    surpriseMe: hallOfLameCMS?.surprise_me ?? "Surprise Me",
  };
};

// Default data for SSR/hydration
export const defaultHallOfLameData: HallOfLameData = {
  hallOfLameHeader: "Hall of Lame",
  hallOfLameSubHeading: "Top jokes of the week",
  weaklyTopJokes: "Weekly Top Jokes",
  rankHeading: "Rank",
  jokesHeading: "Jokes",
  votesHeading: "Votes",
  nextButtonText: "Next",
  surpriseMe: "Surprise Me",
};
