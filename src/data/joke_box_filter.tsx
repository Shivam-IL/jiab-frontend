import { TCMSResponse } from '@/api/types/CMSTypes'

export interface IJokeBoxFilter {
  pick_your_filter: string
  clear_filters_tag: string
  select_language_placeholder: string
  select_category_placeholder: string
  cricket: string
  animals: string
  food: string
  colllege: string
  friends: string
  finance: string
  observation: string
  self: string
  adulting: string
  office: string
  relationships: string
  applty_button_text: string
  family: string
}

export const mapJokeBoxFilter = (
  cmsData: TCMSResponse['data'] | null
): IJokeBoxFilter => {
  const joke_box_filter = cmsData?.joke_box_filter

  return {
    pick_your_filter:
      joke_box_filter?.pick_your_filter ?? 'Pick your chill mode',
    clear_filters_tag: joke_box_filter?.clear_filters_tag ?? 'Clear Filters',
    select_language_placeholder:
      joke_box_filter?.select_language_placeholder ?? 'Select Language',
    select_category_placeholder:
      joke_box_filter?.select_category_placeholder ?? 'Select Category',
    cricket: joke_box_filter?.cricket ?? 'Cricket',
    animals: joke_box_filter?.animals ?? 'Animals',
    food: joke_box_filter?.food ?? 'Food',
    colllege: joke_box_filter?.colllege ?? 'College',
    friends: joke_box_filter?.friends ?? 'Friends',
    finance: joke_box_filter?.finance ?? 'Finance',
    observation: joke_box_filter?.observation ?? 'Observation',
    self: joke_box_filter?.self ?? 'Self',
    adulting: joke_box_filter?.adulting ?? 'Adulting',
    office: joke_box_filter?.office ?? 'Office',
    relationships: joke_box_filter?.relationships ?? 'Relationships',
    applty_button_text: joke_box_filter?.applty_button_text ?? 'Apply',
    family: joke_box_filter?.family ?? 'Family'
  }
}

// Default data for SSR/hydration
export const defaultJokeBoxFilterData: IJokeBoxFilter = {
  pick_your_filter: 'Pick your chill mode',
  clear_filters_tag: 'Clear Filters',
  select_language_placeholder: 'Select Language',
  select_category_placeholder: 'Select Category',
  cricket: 'Cricket',
  animals: 'Animals',
  food: 'Food',
  colllege: 'College',
  friends: 'Friends',
  finance: 'Finance',
  observation: 'Observation',
  self: 'Self',
  adulting: 'Adulting',
  office: 'Office',
  relationships: 'Relationships',
  applty_button_text: 'Apply',
  family: 'Family'
}
