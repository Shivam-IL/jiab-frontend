import { TCMSResponse } from '@/api/types/CMSTypes'

export interface IThatWasQuickData {
  heading_title: string
  sub_heading_title: string
  got_it_text: string
}

export const mapThatWasQuickData = (
  cmsData: TCMSResponse['data'] | null
): IThatWasQuickData => {
  const thatWasQuickCMS = cmsData?.that_was_quick_pop_up
  return {
    heading_title: thatWasQuickCMS?.heading_title ?? 'That was quick!',
    sub_heading_title:
      thatWasQuickCMS?.sub_heading_title ?? "You've collected 20 Comic Coins!",
    got_it_text: thatWasQuickCMS?.got_it_text ?? 'Got it'
  }
}

export const defaultThatWasQuickData: IThatWasQuickData = {
  heading_title: 'That was quick!',
  sub_heading_title: "You've collected 20 Comic Coins!",
  got_it_text: 'Got it'
}
