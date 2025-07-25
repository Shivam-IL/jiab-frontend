import { TCMSResponse } from '@/api/types/CMSTypes'

export interface MadeYouLolPopupData {
  madeYouLolHeading: string
  madeYouLolSubHeading: string
  madeYouLolSubHeading2: string
  madeYouLolYesButtonText: string
  madeYouLolNoButtonText: string
}

export const mapMadeYouLolPopupData = (
  cmsData: TCMSResponse['data'] | null
): MadeYouLolPopupData => {
  const popupCMS = cmsData?.made_you_lol_pop_up
  return {
    madeYouLolHeading: popupCMS?.made_you_lol_heading ?? 'Made you L🤪L?',
    madeYouLolSubHeading:
      popupCMS?.made_you_lol_sub_heading ??
      'Collect 1 Comic Coin by voting for your fav joke!',
    madeYouLolSubHeading2:
      popupCMS?.made_you_lol_sub_heading_2 ?? ' Are you sure you want to exit?',
    madeYouLolYesButtonText:
      popupCMS?.made_you_lol_yes_button_text ?? 'Yes',
    madeYouLolNoButtonText: popupCMS?.made_you_lol_no_button_text ?? 'No'
  }
}

export const defaultMadeYouLolPopupData: MadeYouLolPopupData = {
  madeYouLolHeading: 'Made you L🤪L?',
  madeYouLolSubHeading: 'Collect 1 Comic Coin by voting for your fav joke!',
  madeYouLolSubHeading2: ' Are you sure you want to exit?',
  madeYouLolYesButtonText: 'Yes',
  madeYouLolNoButtonText: 'No'
}
