import { TCMSResponse } from '@/api/types/CMSTypes'

export interface ISorryUniqueCodeData {
  sorry_title: string
  sorry_sub_title: string
  submit_button: string
  note_text: string
}

export const mapSorryUniqueCodeData = (
  cmsData: TCMSResponse['data'] | null
): ISorryUniqueCodeData => {
  const thatWasQuickCMS = cmsData?.sorry_pop_up
  return {
    sorry_title: thatWasQuickCMS?.sorry_title ?? 'Sorry!',
    sorry_sub_title:    
      thatWasQuickCMS?.sorry_sub_title ??
      "You've reached your daily limit of 5 unique code entries!",
    submit_button: thatWasQuickCMS?.submit_button ?? 'Submit ',
    note_text:
      thatWasQuickCMS?.note_text ??
      'Note: You can enter up to 5 codes in a day!'
  }
}

export const defaultSorryUniqueCodeData: ISorryUniqueCodeData = {
  sorry_title: 'Sorry!',
  sorry_sub_title: "You've reached your daily limit of 5 unique code entries!",
  submit_button: 'Submit ',
  note_text: 'Note: You can enter up to 5 codes in a day!'
}
