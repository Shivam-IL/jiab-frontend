import { TCMSResponse } from '@/api/types/CMSTypes'

export interface MadeYouLolPopupData {
  made_you_lol_heading: string
  made_you_lol_sub_heading: string
  made_you_lol_sub_heading_2: string
  made_you_lol_yes_button_text: string
  made_you_lol_no_button_text: string
}

export const mapMadeYouLolPopupData = (
  cmsData: TCMSResponse['data'] | null
): MadeYouLolPopupData => {
  const popupCMS = cmsData?.made_you_lol_pop_up
  return {
    made_you_lol_heading: popupCMS?.made_you_lol_heading ?? 'Made you L🤪L?',
    made_you_lol_sub_heading:
      popupCMS?.made_you_lol_sub_heading ??
      'Collect 1 Comic Coin by voting for your fav joke!',
    made_you_lol_sub_heading_2:
      popupCMS?.made_you_lol_sub_heading_2 ?? ' Are you sure you want to exit?',
    made_you_lol_yes_button_text:
      popupCMS?.made_you_lol_yes_button_text ?? 'Yes',
    made_you_lol_no_button_text: popupCMS?.made_you_lol_no_button_text ?? 'No'
  }
}

export const defaultMadeYouLolPopupData: MadeYouLolPopupData = {
  made_you_lol_heading: 'Made you L🤪L?',
  made_you_lol_sub_heading: 'Collect 1 Comic Coin by voting for your fav joke!',
  made_you_lol_sub_heading_2: ' Are you sure you want to exit?',
  made_you_lol_yes_button_text: 'Yes',
  made_you_lol_no_button_text: 'No'
}
