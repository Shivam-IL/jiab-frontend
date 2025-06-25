import { TCMSResponse } from '@/api/types/CMSTypes'

export interface ICheatCodeInviteData {
  cheat_code_title: string
  cheat_code_sub_title: string
  submit_button: string
}

export const mapCheatCodeInviteData = (
  cmsData: TCMSResponse['data'] | null
): ICheatCodeInviteData => {
  const cheatCodeInviteCMS = cmsData?.cheat_code_invide_code

  return {
    cheat_code_title:
      cheatCodeInviteCMS?.cheat_code_title ?? 'Cheat codes not allowed! 🚫',
    cheat_code_sub_title:
      cheatCodeInviteCMS?.cheat_code_sub_title ??
      "You've entered a used referral code. Please enter a valid code to proceed!",
    submit_button: cheatCodeInviteCMS?.submit_button ?? 'Submit'
  }
}

// Default data for SSR/hydration
export const defaultCheatCodeInviteData: ICheatCodeInviteData = {
  cheat_code_title: 'Cheat codes not allowed! 🚫',
  cheat_code_sub_title:
    "You've entered a used referral code. Please enter a valid code to proceed!",
  submit_button: 'Submit'
}
