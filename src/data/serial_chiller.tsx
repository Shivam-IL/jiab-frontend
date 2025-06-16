import { TCMSResponse } from '@/api/types/CMSTypes'

export interface SerialChillerData {
  serialChillerHeading: string
  serialChillerSubHeading1: string
  serialChillerSubHeading2: string
}

export const mapSerialChillerData = (
  cmsData: TCMSResponse['data'] | null
): SerialChillerData => {
  const popupCMS = cmsData?.serial_chiller_pop_up
  return {
    serialChillerHeading:
      popupCMS?.serial_chiller_heading ?? 'Serial Chiller! 👀',
    serialChillerSubHeading1:
      popupCMS?.serial_chiller_sub_heading_1 ??
      "You've exhausted your daily limit of jokes.",
    serialChillerSubHeading2:
      popupCMS?.serial_chiller_sub_heading_2 ??
      'Come back tomorrow for more Ha-Ha-mazing jokes.'
  }
}

export const defaultSerialChillerData: SerialChillerData = {
  serialChillerHeading: 'Serial Chiller! 👀 hi',
  serialChillerSubHeading1: "You've exhausted your daily limit of jokes.",
  serialChillerSubHeading2: 'Come back tomorrow for more Ha-Ha-mazing jokes.'
}
