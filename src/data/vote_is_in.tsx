import { TCMSResponse } from '@/api/types/CMSTypes'

export interface VoteIsInData {
  vote_is_in_heading: string
  vote_is_in_sub_heading: string
  vote_is_in_button_text: string
}

export const mapVoteIsInData = (
  cmsData: TCMSResponse['data'] | null
): VoteIsInData => {
  const popupCMS = cmsData?.vote_is_in_pop_up
  return {
    vote_is_in_heading: popupCMS?.vote_is_in_heading ?? 'Yay!',
    vote_is_in_sub_heading:
      popupCMS?.vote_is_in_sub_heading ??
      'Your vote is in! Keep scanning, keep laughing.​',
    vote_is_in_button_text: popupCMS?.vote_is_in_button_text ?? 'View Top Jokes'
  }
}

export const defaultVoteIsInData: VoteIsInData = {
  vote_is_in_heading: 'Yay!',
  vote_is_in_sub_heading: 'Your vote is in! Keep scanning, keep laughing',
  vote_is_in_button_text: 'View Top Jokes'
}
