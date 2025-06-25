import { TCMSResponse } from '@/api/types/CMSTypes'

export interface IJokeIsInPopup {
  joke_is_in_heading: string
  joke_is_in_sub_heading: string
  explore_more_button: string
}

export const mapJokesIsInPopup = (
  cmsData: TCMSResponse['data'] | null
): IJokeIsInPopup => {
  const jokeIsInData = cmsData?.joke_is_in_pop_up
  return {
    joke_is_in_heading: jokeIsInData?.joke_is_in_heading ?? 'Your joke is in!',
    joke_is_in_sub_heading:
      jokeIsInData?.joke_is_in_sub_heading ??
      "You did good, we'll take it from here. Ping you in 14 days!",
    explore_more_button: jokeIsInData?.explore_more_button ?? 'Explore More'
  }
}

export const defaultJokeIsIn: IJokeIsInPopup = {
  joke_is_in_heading: 'Your joke is in!',
  joke_is_in_sub_heading:
    "You did good, we'll take it from here. Ping you in 14 days!",
  explore_more_button: 'Explore More'
}
