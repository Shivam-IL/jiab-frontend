import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
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
  JokeCategoryCDPEventPayload,
  UGCFilterCDPEventPayload
} from '@/api/utils/cdpEvents'

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

  useEffect(() => {
    const modifiedLanguages = languages?.map(language => ({
      id: language.id,
      value: language.name,
      label: language.vernacual_name,
      languageCode: language.language_key
    }))
    setLanguageOptions(modifiedLanguages)
  }, [languages])

  useEffect(() => {
    const modifiedGenres = genres?.map(genre => ({
      id: genre.id,
      value: genre.genre,
      label: genre.genre
    }))
    setCategoryOptions(modifiedGenres)
  }, [genres])

  const trigger_CDP_UGC_FILTER = (language?: string, category?: string) => {
    if (language && category) {
      const languageCode =
        languageOptions.find(opt => opt.value === language)?.languageCode ?? ''
      const payload: UGCFilterCDPEventPayload =
        CDPEventPayloadBuilder.buildUGCFilterPayload(
          languageCode,
          language,
          category,
          user?.id
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
              text='Pick your chill mode'
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
                  text='Clear Filters'
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
                      : 'Select Language'}
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
                      : 'Select Category'}
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
                text='Apply'
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
