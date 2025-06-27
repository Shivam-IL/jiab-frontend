import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { CATEGORY_ID_CMS_KEY_MAPPING } from '@/constants'
import { IUgcFilterModal } from '@/interfaces'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { ChevronDown } from 'lucide-react'
import AktivGroteskText from '../common/AktivGroteskText'
import GreenCTA from '../GreenCTA'
import useAppSelector from '@/hooks/useSelector'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'
import {
  CDPEventPayloadBuilder,
  UGCFilterCDPEventPayload
} from '@/api/utils/cdpEvents'
import { useCMSData } from '@/data'

export interface IOption {
  id: number
  value: string
  label: string
  languageCode?: string
}

const UgcFilterModal: React.FC<IUgcFilterModal> = ({
  open,
  onClose,
  onApply
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [languageOptions, setLanguageOptions] = useState<IOption[]>([])
  const [categoryOptions, setCategoryOptions] = useState<IOption[]>([])

  const { genres, languages } = useAppSelector(state => state.reference)
  const { user } = useAppSelector(state => state.profile)
  const { mutate: sendCDPEvent } = useSendCDPEvent()

  const { jokeBoxFilter } = useCMSData()

  useEffect(() => {
    const modifiedLanguages = languages?.map(language => ({
      id: language.id,
      value: language.name,
      label: language.vernacual_name,
      languageCode: language.language_key
    }))
    const newModifiedLanguages = [
      {
        id: -1,
        value: jokeBoxFilter.select_language_placeholder,
        label: jokeBoxFilter.select_language_placeholder,
        languageCode: ''
      },
      ...modifiedLanguages
    ]
    setLanguageOptions(newModifiedLanguages)
  }, [languages, jokeBoxFilter])

  useEffect(() => {
    const CATEGORY_ID_CMS_KEY_MAPPING_TYPED =
      CATEGORY_ID_CMS_KEY_MAPPING as Record<number, string>
    const modifiedGenres = genres?.map(genre => {
      const key = CATEGORY_ID_CMS_KEY_MAPPING_TYPED[genre.id]
      const isValidKey = typeof key === 'string' && key in jokeBoxFilter
      return {
        id: genre.id,
        value: genre.genre,
        label: isValidKey
          ? (jokeBoxFilter[key as keyof typeof jokeBoxFilter] as string)
          : ''
      }
    })
    const newModifiedGenres = [
      {
        id: -1,
        value: jokeBoxFilter.select_category_placeholder,
        label: jokeBoxFilter.select_category_placeholder
      },
      ...modifiedGenres
    ]
    setCategoryOptions(newModifiedGenres)
  }, [genres, jokeBoxFilter])

  const trigger_CDP_UGC_FILTER = (language?: string, category?: string) => {
    if (language || category) {
      const languageCode =
        languageOptions.find(opt => opt.value === language)?.languageCode ?? ''
      const payload: UGCFilterCDPEventPayload =
        CDPEventPayloadBuilder.buildUGCFilterPayload(
          languageCode ? languageCode : 'EN',
          user?.id,
          language ?? '',
          category ?? ''
        )
      sendCDPEvent(payload)
    }
  }

  const handleApply = () => {
    if (onApply) {
      trigger_CDP_UGC_FILTER(selectedLanguage, selectedCategory)
      onApply({
        language: selectedLanguage,
        category: selectedCategory
      })
    }
    onClose()
  }

  console.log('selectedLanguage', languageOptions)
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-[343px] md:max-w-[398px] gap-0 rounded-[10px] p-0'>
        <div className='flex items-center justify-end px-[12px] py-[16px]'>
          <button
            onClick={onClose}
            className='border-none outline-none bg-transparent hover:opacity-70 transition-opacity'
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className='w-[20px] h-[20px]' />
          </button>
        </div>
        <div className='px-[20px] pb-[32px]'>
          <div className='flex flex-col'>
            <AktivGroteskText
              text={jokeBoxFilter.pick_your_filter}
              fontSize='md:text-[20px] text-[16px] leading-tight'
              fontWeight='font-[700]'
            />
            <div className='w-full flex justify-end'>
              <button
                onClick={() => {
                  setSelectedLanguage('')
                  setSelectedCategory('')
                  setIsLanguageOpen(false)
                  setIsCategoryOpen(false)
                }}
                className='border-none outline-none bg-transparent'
              >
                <AktivGroteskText
                  className='text-[#1985D3]'
                  text={jokeBoxFilter.clear_filters_tag}
                  fontSize='md:text-[20px] text-[10px] leading-tight'
                  fontWeight='font-[700]'
                />
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-[24px]'>
            <div className='flex flex-col gap-6'>
              <div className='space-y-2'>
                <div
                  className='flex items-center justify-between py-[16px] px-[20px] border-[1px] border-black rounded-full cursor-pointer'
                  onClick={() => {
                    setIsLanguageOpen(!isLanguageOpen)
                    setIsCategoryOpen(false)
                  }}
                >
                  <span className={!selectedLanguage ? 'text-black' : ''}>
                    {selectedLanguage
                      ? languageOptions.find(
                          opt => opt.value === selectedLanguage
                        )?.label
                      : jokeBoxFilter.select_language_placeholder}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isLanguageOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {isLanguageOpen && (
                  <RadioGroup
                    value={selectedLanguage}
                    onValueChange={value => {
                      if (value === jokeBoxFilter.select_language_placeholder) {
                        setSelectedLanguage('')
                        setIsLanguageOpen(false)
                        return
                      }
                      setSelectedLanguage(value)
                      setIsLanguageOpen(false)
                    }}
                    className='flex flex-col gap-[8px] px-[15px] py-[13px] border border-gray-200 rounded-[10px] '
                  >
                    {languageOptions?.length > 0 &&
                      languageOptions?.map(option => (
                        <div
                          key={option.id}
                          className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50'
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`language-${option.value}`}
                          />
                          <Label
                            htmlFor={`language-${option.value}`}
                            className='flex-grow cursor-pointer text-[12px] font-[400]'
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                )}
              </div>

              <div className='space-y-2'>
                <div
                  className='flex items-center justify-between py-[16px] px-[20px] border-[1px] border-black rounded-full cursor-pointer'
                  onClick={() => {
                    setIsCategoryOpen(!isCategoryOpen)
                    setIsLanguageOpen(false)
                  }}
                >
                  <span className={!selectedCategory ? 'text-black' : ''}>
                    {selectedCategory
                      ? categoryOptions.find(
                          opt => opt.value === selectedCategory
                        )?.label
                      : jokeBoxFilter.select_category_placeholder}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isCategoryOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {isCategoryOpen && (
                  <RadioGroup
                    value={selectedCategory}
                    onValueChange={value => {
                      if (value === jokeBoxFilter.select_category_placeholder) {
                        setSelectedCategory('')
                        setIsCategoryOpen(false)
                        return
                      }
                      setSelectedCategory(value)
                      setIsCategoryOpen(false)
                    }}
                    className='flex flex-col gap-[8px] px-[15px] py-[13px] border border-gray-200 rounded-[10px]'
                  >
                    {categoryOptions?.length > 0 &&
                      categoryOptions?.map(option => (
                        <div
                          key={option.id}
                          className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50'
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`category-${option.value}`}
                          />
                          <Label
                            htmlFor={`category-${option.value}`}
                            className='flex-grow cursor-pointer text-[12px] font-[400]'
                          >
                            {option.label}
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                )}
              </div>
            </div>

            <div className='flex w-full md:justify-center'>
              <GreenCTA
                onClick={handleApply}
                text={jokeBoxFilter.applty_button_text}
                className='w-full md:w-auto'
                paddingClass='md:px-[105px] md:py-[21px] py-[12px] '
                fontSize='md:text-[24px] text-[16px]'
                fontWeight='font-[700]'
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UgcFilterModal
