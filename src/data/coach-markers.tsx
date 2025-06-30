import { TCMSResponse } from "@/api/types/CMSTypes";

export interface CoachMarkersData {
  yourGuideToJokeInabottle: string;
  checkOutAllYourNotificationHere: string;
  weSpeakManyLanguages: string;
  pickYourMood: string;
  comediansSpotlight: string;
  jokeBox: string;
  backToBase: string;
  rewardsToMakeYouGo: string;
  trackurCollectionHere: string;
  refreshringsToUnlockExclusiveContent: string;
  letsGetToKnowYouBetter: string;
  pickyourmoodSubheadingTellusWhatsAnnoyingYouToday: string;
  comediansspotlightSubheadingTapToSeeThemAll: string;
  jokeboxSubheadingAllurJokesBottledHere: string;
  exploreArrowHeading: string;
  exploreArrowSubheadingThinkOfitLikeamap: string;
  contestHeading: string;
  contestSubheadingJumpinTheRewardGame: string;
  yourOwnFunSpacezone: string;
  pickYourMoodHeading: string;
  pickyourmoodSubheadingJokesFiltered: string;
  jokeBoxHeading: string;
  jokeboxSubHeadingAllyourjokes: string;
  levelUpHeading: string;
  levelupSubHeadingCheckouthowtoCollectComiccoins: string;
  checkPreviousWinnerHeading: string;
  checkpreviouswinnerSubheadingCheckrank: string;
}

export const mapCoachMarkersData = (
  cmsData: TCMSResponse["data"] | null
): CoachMarkersData => {
  const coachMarkerCMS = cmsData?.coach_marker;

  return {
    yourGuideToJokeInabottle:
      coachMarkerCMS?.your_guide_to_joke_inabottle ??
      "Your guide to Joke in a Bottle",
    checkOutAllYourNotificationHere:
      coachMarkerCMS?.check_out_all_your_notificationhere ??
      "Check out all your notifications here",
    weSpeakManyLanguages:
      coachMarkerCMS?.we_speak_many_languages ??
      "We speak many languages, take your pick!",
    pickYourMood: coachMarkerCMS?.pick_your_mood ?? "Pick your mood",
    comediansSpotlight:
      coachMarkerCMS?.comedians_spotlight ?? "Comedians spotlight",
    jokeBox: coachMarkerCMS?.joke_box ?? "Joke box",
    backToBase: coachMarkerCMS?.back_to_base ?? "Back to base",
    rewardsToMakeYouGo:
      coachMarkerCMS?.rewards_to_make_you_go ?? "Rewards to make you go",
    trackurCollectionHere:
      coachMarkerCMS?.trackur_collection_here ?? "Track your collection here",
    refreshringsToUnlockExclusiveContent:
      coachMarkerCMS?.refreshrings_to_unlock_exclusive_content ??
      "Refresh rings to unlock exclusive content",
    letsGetToKnowYouBetter:
      coachMarkerCMS?.lets_get_to_know_you_better ??
      "Let's get to know you better",
    pickyourmoodSubheadingTellusWhatsAnnoyingYouToday:
      coachMarkerCMS?.pickyourmood_subheading_tellus_whats_annoying_you_today ??
      "Tell us what&apos;s annoying you today! 😎🌡️",
    comediansspotlightSubheadingTapToSeeThemAll:
      coachMarkerCMS?.comediansspotlight_subheading_tap_to_see_them_all ??
      "Tap to see them all",
    jokeboxSubheadingAllurJokesBottledHere:
      coachMarkerCMS?.jokebox_subheading_allur_jokes_bottled_here ??
      "All your jokes bottled here",
    exploreArrowHeading: coachMarkerCMS?.Explore_arrow_heading ?? "Explore",
    exploreArrowSubheadingThinkOfitLikeamap:
      coachMarkerCMS?.explore_arrow_subheading_think_ofit_likeamap ??
      "Think of it like a map",
    contestHeading: coachMarkerCMS?.contest_heading ?? "Contest",
    contestSubheadingJumpinTheRewardGame:
      coachMarkerCMS?.contest_subheading_jumpin_the_reward_game ??
      "Jump in the reward game",
    yourOwnFunSpacezone:
      coachMarkerCMS?.your_own_fun_spacezone ?? "Your own fun Space/zone",
    pickYourMoodHeading:
      coachMarkerCMS?.pick_your_mood_heading ?? "Pick your mood",
    pickyourmoodSubheadingJokesFiltered:
      coachMarkerCMS?.pickyourmood_subheading_jokes_filtered ??
      "Jokes filtered",
    jokeBoxHeading: coachMarkerCMS?.joke_box_heading ?? "Joke Box",
    jokeboxSubHeadingAllyourjokes:
      coachMarkerCMS?.jokebox_sub_heading_allyourjokes ??
      "All your jokes bottled here!",
    levelUpHeading: coachMarkerCMS?.level_up_heading ?? "Level up",
    levelupSubHeadingCheckouthowtoCollectComiccoins:
      coachMarkerCMS?.levelup_sub_heading_checkouthowto_collect_comiccoins ??
      "Check out how to collect comic coins",
    checkPreviousWinnerHeading:
      coachMarkerCMS?.check_previous_winner_heading ?? "Check previous winner",
    checkpreviouswinnerSubheadingCheckrank:
      coachMarkerCMS?.checkpreviouswinner_subheading_checkrank ??
      "Check out rank here",
  };
};

// Default data for SSR/hydration
export const defaultCoachMarkersData: CoachMarkersData = {
  yourGuideToJokeInabottle: "Your guide to Joke in a Bottle",
  checkOutAllYourNotificationHere: "Check out all your notifications here",
  weSpeakManyLanguages: "We speak many languages, take your pick!",
  pickYourMood: "Pick your mood",
  comediansSpotlight: "Comedians spotlight",
  jokeBox: "Joke box",
  backToBase: "Back to base",
  rewardsToMakeYouGo: "Rewards to make you go",
  trackurCollectionHere: "Track your collection here",
  refreshringsToUnlockExclusiveContent:
    "Refresh rings to unlock exclusive content",
  letsGetToKnowYouBetter: "Let's get to know you better",
  pickyourmoodSubheadingTellusWhatsAnnoyingYouToday:
    "Tell us what's annoying you today",
  comediansspotlightSubheadingTapToSeeThemAll: "Tap to see them all",
  jokeboxSubheadingAllurJokesBottledHere: "All your jokes bottled here",
  exploreArrowHeading: "Explore",
  exploreArrowSubheadingThinkOfitLikeamap: "Think of it like a map",
  contestHeading: "Contest",
  contestSubheadingJumpinTheRewardGame: "Jump in the reward game",
  yourOwnFunSpacezone: "Your own fun space zone",
  pickYourMoodHeading: "Pick your mood",
  pickyourmoodSubheadingJokesFiltered: "Jokes filtered",
  jokeBoxHeading: "Joke box",
  jokeboxSubHeadingAllyourjokes: "All your jokes",
  levelUpHeading: "Level up",
  levelupSubHeadingCheckouthowtoCollectComiccoins:
    "Check out how to collect comic coins",
  checkPreviousWinnerHeading: "Check previous winner",
  checkpreviouswinnerSubheadingCheckrank: "Check out rank here",
};
