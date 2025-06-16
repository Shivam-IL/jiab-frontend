import { TCMSResponse } from '@/api/types/CMSTypes'

export interface TryingToPrankUsPopupData {
  prank_us_heading: string
  prank_us_sub_heading: string
  prank_us_button_text: string
}

export const mapTryingToPrankUsPopupData = (
  cmsData: TCMSResponse['data'] | null
): TryingToPrankUsPopupData => {
  const popupCMS = cmsData?.trying_to_prank_us_pop_up
  return {
    prank_us_heading: popupCMS?.prank_us_heading ?? 'Trying to prank us?',
    prank_us_sub_heading:
      popupCMS?.prank_us_sub_heading ??
      'This number is not valid. 🙅‍♂️ Retry or refer another friend to collect Comic Coins',
    prank_us_button_text: popupCMS?.prank_us_button_text ?? 'Refer Now'
  }
}

export const defaultTryingToPrankUsPopupData: TryingToPrankUsPopupData = {
  prank_us_heading: 'Trying to prank us?',
  prank_us_sub_heading:
    'This number is not valid. 🙅‍♂️ Retry or refer another friend to collect Comic Coins',
  prank_us_button_text: 'Refer Now'
}
