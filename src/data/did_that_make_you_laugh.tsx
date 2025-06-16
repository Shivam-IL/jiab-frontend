import { TCMSResponse } from '@/api/types/CMSTypes'

export interface DidThatMakeYouLaughData {
  didThatMakeYouLaughHeading: string
  didThatMakeYouLaughSubHeading1: string
  didThatMakeYouLaughSubHeading2: string
  didThatMakeYouLaughYesButton: string
  didThatMakeYouLaughNoButton: string
}

export const mapDidThatMakeYouLaughData = (
  cmsData: TCMSResponse['data'] | null
): DidThatMakeYouLaughData => {
  const popupCMS = cmsData?.surprise_me_pop_up
  return {
    didThatMakeYouLaughHeading:
      popupCMS?.surprise_me_pop_up_heading ?? 'Did that make you 😂,😑 or 😡 ?',
    didThatMakeYouLaughSubHeading1:
      popupCMS?.surprise_me_pop_up_sub_heading_1 ??
      "Don't forget to react to the joke and collect Comic Coins!",
    didThatMakeYouLaughSubHeading2:
      popupCMS?.surprise_me_pop_up_sub_heading_2 ??
      'Are you sure you want to exit?',
    didThatMakeYouLaughYesButton:
      popupCMS?.surprise_me_pop_up_yes_button ?? 'Yes',
    didThatMakeYouLaughNoButton: popupCMS?.surprise_me_pop_up_no_button ?? 'No'
  }
}

export const defaultDidThatMakeYouLaughData: DidThatMakeYouLaughData = {
  didThatMakeYouLaughHeading: 'Did that make you 😂,😑 or 😡 ??',
  didThatMakeYouLaughSubHeading1:
    "Don't forget to react to the joke and collect Comic Coins!",
  didThatMakeYouLaughSubHeading2: 'Are you sure you want to exit?',
  didThatMakeYouLaughYesButton: 'Yes',
  didThatMakeYouLaughNoButton: 'No'
}
