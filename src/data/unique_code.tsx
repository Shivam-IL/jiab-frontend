import { TCMSResponse } from '@/api/types/CMSTypes'

export interface IUniqueCodeData {
  unique_code_header: string
  unqiue_code_placeholder: string
  submit_buttom: string
  Note_under_submit_button: string
  incorrect_code: string
  same_unique_code: string
}

export const mapUniqueCodeData = (
  cmsData: TCMSResponse['data'] | null
): IUniqueCodeData => {
  const uniqueCodeCMS = cmsData?.unique_code
  return {
    unique_code_header:
      uniqueCodeCMS?.unique_code_header ??
      'Enter the unique code from behind the label of a Sprite® bottle',
    unqiue_code_placeholder:
      uniqueCodeCMS?.unqiue_code_placeholder ?? 'Enter Unique Code here',
    submit_buttom: uniqueCodeCMS?.submit_buttom ?? 'Submit',
    Note_under_submit_button:
      uniqueCodeCMS?.Note_under_submit_button ??
      'Note: You can enter up to 5 codes in a day!',
    incorrect_code:
      uniqueCodeCMS?.incorrect_code ?? "You've entered an incorrect code",
    same_unique_code:
      uniqueCodeCMS?.same_unique_code ?? "You've entered a same unique code"
  }
}

export const defaultUniqueCodeData: IUniqueCodeData = {
  unique_code_header:
    'Enter the unique code from behind the label of a Sprite® bottle',
  unqiue_code_placeholder: 'Enter Unique Code here',
  submit_buttom: 'Submit',
  Note_under_submit_button: 'Note: You can enter up to 5 codes in a day!',
  incorrect_code: "You've entered an incorrect code",
  same_unique_code: "You've entered a same unique code"
}
