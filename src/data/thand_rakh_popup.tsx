import { TCMSResponse } from '@/api/types/CMSTypes'

export interface IThandRakhPopupData {
  thand_rakh_heading: string
  thand_rakh_subheading: string
  thand_rakh_explore_button: string
}

export const mapThandRakhPopupData = (
  cmsData: TCMSResponse['data'] | null
): IThandRakhPopupData => {
  const popupCMS = cmsData?.thand_rakh_pop_up
  return {
    thand_rakh_heading: popupCMS?.thand_rakh_heading ?? 'We heard you!',
    thand_rakh_subheading:
      popupCMS?.thand_rakh_subheading ??
      "Thand Rakh, we'll get this sorted soon!",
    thand_rakh_explore_button:
      popupCMS?.thand_rakh_explore_button ?? 'Explore More'
  }
}

export const defaultThandRakhPopupData: IThandRakhPopupData = {
  thand_rakh_heading: 'We heard you!',
  thand_rakh_subheading: "Thand Rakh, we'll get this sorted soon!",
  thand_rakh_explore_button: 'Explore More'
}
