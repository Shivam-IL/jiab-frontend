import { TCMSResponse } from '@/api/types/CMSTypes'

export interface IReportPopupData {
  report_heading: string
  report_placeholder: string
  report_submit_button: string
}

export const mapReportPopupData = (
  cmsData: TCMSResponse['data'] | null
): IReportPopupData => {
  const popupCMS = cmsData?.report_pop_up
  return {
    report_heading:
      popupCMS?.report_heading ??
      'Please provide a link below so we can verify if this joke is plagiarised.',
    report_placeholder: popupCMS?.report_placeholder ?? 'Source URL*',
    report_submit_button: popupCMS?.report_submit_button ?? 'Submit'
  }
}

export const defaultReportPopupData: IReportPopupData = {
  report_heading:
    'Please provide a link below so we can verify if this joke is plagiarised.',
  report_placeholder: 'Source URL*',
  report_submit_button: 'Submit'
}
