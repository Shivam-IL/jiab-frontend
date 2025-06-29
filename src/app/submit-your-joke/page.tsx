'use client'

import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import {
  GA_EVENTS,
  ICONS_NAMES,
  LIMIT_EXCEED,
  CATEGORY_ID_CMS_KEY_MAPPING
} from '@/constants'
import useWindowWidth from '@/hooks/useWindowWidth'
import { FileType, IJokeData } from '@/types'
import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import Input from '@/components/Input'
import LabeledInput from '@/components/LabeledInput'
import ImageIconCard from '@/components/common/ImageIconCard'
import SvgIcons from '@/components/common/SvgIcons'
import AktivGroteskText from '@/components/common/AktivGroteskText'
import CustomCarousel from '@/components/common/CustomCarousel'
import { Checkbox } from '@/components/ui/checkbox'
import GreenCTA from '@/components/GreenCTA'
import {
  ApproveJokePopup,
  JokeFeaturedPopup,
  JokeNotSuitablePopup,
  JokeNotGoodEnoughPopup,
  JokeOffensivePopup
} from '@/components/JokeSubmissionPopup'
import { useCMSData } from '@/data'
import { triggerGAEvent } from '@/utils/gTagEvents'
import useAppSelector from '@/hooks/useSelector'
import { IGenre, IJokeFormat, ILanguage } from '@/store/reference'
import { useSubmitJoke } from '@/api/hooks/JokeHooks'
import { TSubmitJokeParams } from '@/api/types/JokeTypes'
import { useRouter } from 'next/navigation'
import { useCoinAnimation } from '@/components/common/CoinAnimation'
import BottleAnimation from '@/components/common/BottleAnimation'
import { CDPEventPayloadBuilder, JOKE_FORMATS } from '@/api/utils/cdpEvents'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'
import { aktivGrotesk } from '../layout'

interface FileContainerProps {
  title: string
  subtitle: string
  file: FileList | null | undefined
  removeFile: () => void
}

const FileContainer = forwardRef<HTMLDivElement, FileContainerProps>(
  ({ title, subtitle, file, removeFile }, ref) => {
    const handleClick = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.click()
      }
    }

    return (
      <>
        <div
          ref={ref}
          className='w-full md:mt-[24px] mt-[8px] relative h-[110px] md:h-[195px] flex flex-col justify-center items-center bg-[#9BD4B1] border-[1px] border-[#11A64B] rounded-[10px] cursor-pointer'
        >
          {file && (
            <div
              className='w-full relative flex justify-end cursor-pointer mt-[12px] md:pt-0 px-[16px] z-10'
              onClick={removeFile}
            >
              <SvgIcons
                name={ICONS_NAMES.CROSS2}
                className='w-[12px] h-[12px]  text-black fill-black stroke-black'
              />
            </div>
          )}
          <div
            onClick={handleClick}
            className='flex flex-col w-full justify-center items-center gap-[8px] md:gap-[16px]'
          >
            <SvgIcons
              className='w-[40px] h-[40px] md:w-[69px] md:h-[69px]'
              name={file ? ICONS_NAMES.SUCCESS : ICONS_NAMES.UPLOAD_FILE}
            />
            <div className='flex flex-col justify-center items-center'>
              {!file && (
                <>
                  <AktivGroteskText
                    text={title}
                    fontSize='text-[14px] md:text-[20px]'
                    fontWeight='font-[700]'
                  />
                  <AktivGroteskText
                    text={subtitle}
                    fontSize='text-[10px] md:text-[16px]'
                    fontWeight='font-[400]'
                  />
                </>
              )}
              {file && file?.length > 0 && (
                <>
                  <AktivGroteskText
                    text={'File Name'}
                    fontSize='text-[14px] md:text-[20px]'
                    fontWeight='font-[700]'
                  />
                  <AktivGroteskText
                    text={file?.[0]?.name ?? ''}
                    fontSize='text-[14px] md:text-[20px]'
                    fontWeight='font-[700]'
                    className='text-center'
                  />
                </>
              )}
              {!file && title.includes('Image') && (
                <AktivGroteskText
                  text='Preferred Dimensions : Square'
                  fontSize='text-[8px] md:text-[14px]'
                  fontWeight='font-[400]'
                />
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
)

FileContainer.displayName = 'FileContainer'

const SubmitYourJoke = () => {
  const [mounted, setMounted] = useState(false)
  const cmsData = useCMSData(mounted)
  const width = useWindowWidth()
  const [openApproveJokePopup, setOpenApproveJokePopup] =
    useState<boolean>(false)
  const [openJokeFeaturedPopup, setOpenJokeFeaturedPopup] =
    useState<boolean>(false)
  const [openJokeNotSuitablePopup, setOpenJokeNotSuitablePopup] =
    useState<boolean>(false)
  const [openJokeNotGoodEnoughPopup, setOpenJokeNotGoodEnoughPopup] =
    useState<boolean>(false)
  const [openJokeOffensivePopup, setOpenJokeOffensivePopup] =
    useState<boolean>(false)

  const [languageData, setLanguageData] = useState<
    {
      id: number
      name: string
      value: string
      label: string
    }[]
  >([])
  const [formatData, setFormatData] = useState<
    {
      id: number
      name: string
      value: string
      title: string
      acceptedFormats: string
      accptedFormatText: string
      icon: string
      label: string
      size: number
    }[]
  >([])
  const [categoryData, setCategoryData] = useState<
    {
      id: number
      name: string
      value: string
      image: string
    }[]
  >([])

  const { languages, genres, jokesFormats } = useAppSelector(
    state => state.reference
  )
  const { user } = useAppSelector(state => state.profile)

  const {
    mutate: submitJoke,
    isPending,
    data: submitJokeData
  } = useSubmitJoke()
  const [submitJokeError, setSubmitJokeError] = useState<boolean>(false)
  const [formError, setFormError] = useState<{
    format: string
    language: string
    title: string
    joke: string
    agreeToTerms: string
  }>({
    format: '',
    language: '',
    title: '',
    joke: '',
    agreeToTerms: ''
  })

  const FORMAT_OPTIONS = useMemo(
    () => [
      {
        icon: ICONS_NAMES.IMAGE,
        label: cmsData.pjChallenge.image,
        iconClassName: 'w-[31px] h-[39px]',
        acceptedFormats: '.jpg,.jpeg,.png',
        title: cmsData.pjChallenge.imageClickableHeading,
        accptedFormatText: cmsData.pjChallenge.imageClickableSubHeading,
        name: 'Image',
        size: 1
      },
      {
        icon: ICONS_NAMES.TEXT,
        title: cmsData.pjChallenge.textClickableHeading,
        iconClassName: 'w-[39px] h-[40px]',
        label: cmsData.pjChallenge.text,
        accptedFormatText: '',
        acceptedFormats: '.txt',
        name: 'Text',
        size: 1
      },
      {
        icon: ICONS_NAMES.HEADPHONE,
        title: cmsData.pjChallenge.audioClickableHeading,
        iconClassName: 'w-[41px] h-[40px]',
        label: cmsData.pjChallenge.audio,
        accptedFormatText: cmsData.pjChallenge.audioClickableSubheading,
        acceptedFormats: '.mp3,.wav',
        name: 'Audio',
        size: 50
      },
      {
        icon: ICONS_NAMES.VIDEO,
        title: cmsData.pjChallenge.videoHeading,
        iconClassName: 'w-[49px] h-[39px]',
        accptedFormatText: cmsData.pjChallenge.videoSubHeading,
        label: cmsData.pjChallenge.video,
        acceptedFormats: '.mp4',
        name: 'Video',
        size: 50
      }
    ],
    [cmsData]
  )

  const [errorMessage, setErrorMessage] = useState<string>('')
  const { mutate: sendCDPEvent } = useSendCDPEvent()

  const isFormValid = () => {
    let formValid = true
    if (!jokeData.format) {
      setFormError(prev => ({ ...prev, format: 'Format is required' }))
      formValid = false
    }
    if (!jokeData.language) {
      setFormError(prev => ({
        ...prev,
        language: cmsData.validation.pjChallengeLanguageRequired
      }))
      formValid = false
    }
    if (!jokeData.title) {
      setFormError(prev => ({
        ...prev,
        title: cmsData.validation.pjChallengeTitleRequired
      }))
      formValid = false
    }
    if (!jokeData.agreeToTerms) {
      setFormError(prev => ({
        ...prev,
        agreeToTerms: cmsData.validation.pjChallengeTandcAcceptance
      }))
      formValid = false
    }
    if (jokeData.format !== FORMAT_OPTIONS?.[1].label && !jokeData.file) {
      setFormError(prev => ({
        ...prev,
        joke: cmsData.validation.pjChallengeFileRequired
      }))
      formValid = false
      return false
    }
    if (
      jokeData.format === FORMAT_OPTIONS?.[1]?.label &&
      jokeData.jokeText === ''
    ) {
      setFormError(prev => ({
        ...prev,
        joke: cmsData.validation.pjChallengeJokeRequired
      }))
      formValid = false
    }

    return formValid
  }

  const router = useRouter()

  const handleSubmitJoke = () => {
    if (!isFormValid()) {
      console.log('form is not valid')
      return
    } else {
      setFormError(prev => ({
        ...prev,
        format: '',
        language: '',
        title: '',
        joke: '',
        agreeToTerms: ''
      }))
    }
    setErrorMessage('')
    const genreId =
      categoryData.find(item => item.name === jokeData.category)?.id ?? 0

    const languageId =
      languageData.find(item => item?.value === jokeData?.language)?.id ?? 0

    const format =
      formatData.find(item => item.label === jokeData.format)?.title ?? ''

    const payload: TSubmitJokeParams = {
      format: format,
      joke_genre_id: genreId,
      language_id: languageId,
      title: jokeData.title,
      file: jokeData.file as unknown as FileList,
      jokeText: jokeData.jokeText
    }
    triggerAnimation()
    submitJoke(payload)
  }

  useEffect(() => {
    if (submitJokeData?.ok) {
      let format = ''
      if (
        jokeData.format.toLowerCase() ===
        cmsData.pjChallenge.image.toLowerCase()
      ) {
        triggerGAEvent(GA_EVENTS.SPRITE_J24_IMAGE_JOKE_SUBMIT)
        format = JOKE_FORMATS.IMAGE as string
      } else if (
        jokeData.format.toLowerCase() === cmsData.pjChallenge.text.toLowerCase()
      ) {
        triggerGAEvent(GA_EVENTS.SPRITE_J24_TEXT_JOKE_SUBMIT)
        format = JOKE_FORMATS.TEXT as string
      } else if (
        jokeData.format.toLowerCase() ===
        cmsData.pjChallenge.audio.toLowerCase()
      ) {
        triggerGAEvent(GA_EVENTS.SPRITE_J24_AUDIO_JOKE_SUBMIT)
        format = JOKE_FORMATS.AUDIO as string
      } else if (
        jokeData.format.toLowerCase() ===
        cmsData.pjChallenge.video.toLowerCase()
      ) {
        triggerGAEvent(GA_EVENTS.SPRITE_J24_VIDEO_JOKE_SUBMIT)
        format = JOKE_FORMATS.VIDEO as string
      }
      const payload = CDPEventPayloadBuilder.buildUGCSubmissionPayload({
        format,
        languageCode: jokeData.language,
        firstName: user?.name ?? '',
        user_identifier: user?.id ?? ''
      })
      console.log('payload', payload)
      sendCDPEvent(payload)
      setOpenApproveJokePopup(true)
    } else if (submitJokeData?.ok === false) {
      const { data } = submitJokeData as unknown as {
        data: { message?: string; type?: string }
        message?: string
      }
      if (data?.type === LIMIT_EXCEED) {
        setSubmitJokeError(true)
        setTimeout(() => {
          setSubmitJokeError(false)
        }, 3000)
      } else {
        setErrorMessage(data?.message as string)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitJokeData])

  useEffect(() => {
    if (genres?.length > 0) {
      const CATEGORY_ID_CMS_KEY_MAPPING_TYPED =
        CATEGORY_ID_CMS_KEY_MAPPING as Record<number, string>

      const modifiedGenres = genres?.map((item: IGenre) => {
        const key = CATEGORY_ID_CMS_KEY_MAPPING_TYPED[item.id]
        const isValidKey =
          typeof key === 'string' && key in cmsData.jokeBoxFilter
        const mappedName = isValidKey
          ? (cmsData.jokeBoxFilter[
              key as keyof typeof cmsData.jokeBoxFilter
            ] as string)
          : item.genre // fallback to original genre name

        return {
          id: item.id,
          name: mappedName,
          value: item.genre, // Keep original for API calls
          image: item.image_url
        }
      })
      setCategoryData(modifiedGenres)
    }
  }, [genres, cmsData.jokeBoxFilter, cmsData])

  useEffect(() => {
    if (languages?.length > 0) {
      console.log('languages', languages)
      const modifiedLanguages = languages?.map((item: ILanguage) => {
        return {
          id: item.id,
          name: item.name,
          value: item.language_key,
          label: item?.vernacual_name ?? ''
        }
      })
      console.log('modifiedLanguages', modifiedLanguages)
      setLanguageData(modifiedLanguages)
    }
  }, [languages])

  const { isAnimating, triggerAnimation, animationKey, hideAnimation } =
    useCoinAnimation()

  useEffect(() => {
    if (jokesFormats?.length > 0 && FORMAT_OPTIONS?.length > 0) {
      console.log('jokesFormats', jokesFormats)
      const modifiedJokesFormats = FORMAT_OPTIONS?.map(item => {
        const filterItem = jokesFormats?.find(
          (format: IJokeFormat) => format.title === item.name
        )

        return {
          ...item,
          id: filterItem?.id ?? 0,
          title: filterItem?.title ?? '',
          value: filterItem?.value ?? ''
        }
      })
      setFormatData(modifiedJokesFormats)
    }
  }, [jokesFormats, cmsData, FORMAT_OPTIONS])

  useEffect(() => {
    setMounted(true)
  }, [])
  const [jokeData, setJokeData] = useState<IJokeData>({
    language: '',
    format: cmsData.pjChallenge.image.toLowerCase(),
    fileType: FileType.IMAGE,
    acceptedFormats: '.jpg,.jpeg,.png',
    accptedFormatText: cmsData.pjChallenge.imageClickableSubHeading,
    jokeText: '',
    title: '',
    file: null,
    category: '',
    agreeToTerms: false,
    size: 1
  })

  const fileRef = useRef<HTMLInputElement>(null)

  // Helper function to validate file format
  const validateFileFormat = (file: File, acceptedFormats: string): boolean => {
    if (!acceptedFormats) return true

    const fileName = file.name.toLowerCase()
    const fileExtension = fileName
      .substring(fileName.lastIndexOf('.'))
      .toLowerCase()

    // Parse accepted formats (e.g., ".jpg,.jpeg,.png" or ".mp3,.wav")
    const allowedExtensions = acceptedFormats
      .split(',')
      .map(format => format.trim().toLowerCase())
      .filter(format => format.startsWith('.'))

    return allowedExtensions.some(ext => fileExtension === ext)
  }

  const handleChange = (
    key: string,
    value: string | boolean | FileList | null | number
  ) => {
    if (key === 'title') {
      const valueString = value?.toString()?.slice(0, 30)?.trimStart()
      setJokeData(prev => ({ ...prev, [key]: valueString ?? '' }))
    } else if (key === 'jokeText') {
      const valueString = value?.toString()?.slice(0, 200)?.trimStart()
      setJokeData(prev => ({ ...prev, [key]: valueString ?? '' }))
    } else if (key === 'category') {
      setJokeData(prev => {
        if (prev.category === value) {
          return { ...prev, category: '' }
        }
        return { ...prev, category: value as string }
      })
    } else if (key === 'file') {
      const MAX_FILE_SIZE_MB = jokeData.size
      const file = value as FileList

      if (!file || file.length === 0) {
        setJokeData(prev => ({ ...prev, file: null }))
        return
      }

      const selectedFile = file[0]
      const fileSizeMB = selectedFile.size / (1024 * 1024)

      const getFormat = FORMAT_OPTIONS.find(
        item => item.label === jokeData.format
      )
      // Check file size
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        let message = 'File size should not exceed'
        if (getFormat?.name === 'Image') {
          message = cmsData.pjChallenge.imageFileUploadLimit ?? ''
        } else if (getFormat?.name === 'Audio') {
          message = cmsData.pjChallenge.audioFileUploadLimit ?? ''
        } else if (getFormat?.name === 'Video') {
          message = cmsData.pjChallenge.videoFileUploadLimit ?? ''
        }
        alert(`${message}`)
        setJokeData(prev => ({ ...prev, file: null }))
        if (fileRef.current) {
          fileRef.current.value = ''
        }
        return
      }

      // Check file format
      if (!validateFileFormat(selectedFile, jokeData.acceptedFormats)) {
        let message = 'Invalid Format'
        if (getFormat?.name === 'Image') {
          message = cmsData.pjChallenge.imageAlert ?? ''
        } else if (getFormat?.name === 'Audio') {
          message = cmsData.pjChallenge.audioAlert ?? ''
        } else if (getFormat?.name === 'Video') {
          message = cmsData.pjChallenge.videoAlert ?? ''
        }
        alert(`${message}`)
        setJokeData(prev => ({ ...prev, file: null }))
        if (fileRef.current) {
          fileRef.current.value = ''
        }
        return
      }

      setJokeData(prev => ({ ...prev, file: file }))
    } else {
      setJokeData(prev => ({ ...prev, [key]: value ?? '' }))
    }
  }

  useEffect(() => {
    setJokeData(prev => ({
      ...prev,
      format: formatData?.length > 0 ? formatData[0]?.label : '',
      acceptedFormats:
        formatData?.length > 0 ? formatData[0]?.acceptedFormats : '',
      accptedFormatText:
        formatData?.length > 0 ? formatData[0]?.accptedFormatText : '',
      size: formatData?.length > 0 ? formatData[0]?.size : 1
    }))
  }, [cmsData, formatData])

  useEffect(() => {
    if (jokeData.language) {
      setFormError(prev => ({
        ...prev,
        language: ''
      }))
    }
    if (jokeData.title) {
      setFormError(prev => ({
        ...prev,
        title: ''
      }))
    }
    if (jokeData.agreeToTerms) {
      setFormError(prev => ({
        ...prev,
        agreeToTerms: ''
      }))
    }
    if (jokeData.format) {
      setFormError(prev => ({
        ...prev,
        format: ''
      }))
    }
    if (jokeData.jokeText || jokeData.file) {
      setFormError(prev => ({
        ...prev,
        joke: ''
      }))
    }
  }, [jokeData])

  return (
    <div className='flex flex-col gap-3'>
      <MobileTempNavBar
        title={cmsData.pjChallenge.submitYourJokeHeading}
        subtitle={cmsData.pjChallenge.submitYourJokeSubheading}
      />
      <ScreenWrapper
        className={`${
          width > 750 ? 'mt-[71px] flex justify-center' : 'pb-[100px] mt-0'
        }`}
      >
        <div className='md:flex md:flex-col justify-center items-center md:mt-[60px] md:mb-[86px] gap-[12px] hidden'>
          <AktivGroteskText
            text={cmsData.pjChallenge.submitYourJokeHeading.toUpperCase()}
            fontSize='text-[30px]'
            fontWeight='font-[700]'
          />
          <AktivGroteskText
            text={cmsData.pjChallenge.submitYourJokeSubheading}
            fontSize='text-[20px]'
            fontWeight='font-[400]'
          />
        </div>
        <form
          onSubmit={event => {
            event.preventDefault()
          }}
          className='md:mt-0 flex flex-col md:justify-center md:items-center gap-[24px] md:gap-[32px]'
        >
          <LabeledInput
            labelClassName='md:text-center'
            label={cmsData.pjChallenge.selectLanguage}
          >
            <div className='relative'>
              <select
                className={`w-full cursor-pointer border border-transparent outline-none text-[14px] md:text-[18px] font-[400] ${aktivGrotesk.className} md:py-[10px] md:px-[17px] pl-[16px] pr-[40px] py-[16px] bg-white rounded-[100px] transition-all duration-200 hover:border-gray-200 focus:border-[#11A64B] focus-visible:border-[#11A64B] appearance-none`}
                name='language'
                value={jokeData.language}
                onChange={e => handleChange('language', e.target.value)}
              >
                <option value=''>
                  {cmsData.pjChallenge.selectLanguageDropbox}
                </option>
                {languageData?.map(item => {
                  return (
                    <option key={item.id} value={item.value}>
                      {item.label}
                    </option>
                  )
                })}
              </select>
              <div className='absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <svg
                  width='12'
                  height='8'
                  viewBox='0 0 12 8'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 1L6 6L11 1'
                    stroke='#666'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
            {formError.language !== '' && (
              <span className='text-[#FD0202] font-[400] text-[12px]'>
                {formError.language}
              </span>
            )}
          </LabeledInput>
          <LabeledInput
            labelClassName='md:text-center'
            width='w-full'
            label={cmsData.pjChallenge.selectFormat}
          >
            <div className='flex w-full  md:flex-row md:justify-center'>
              <div className='flex w-full md:w-[600px]   justify-between'>
                {formatData?.length > 0 &&
                  formatData?.map(item => {
                    return (
                      <button
                        key={item.id}
                        type='button'
                        className='w-1/4'
                        onClick={() => {
                          handleChange('format', item.label)
                          handleChange('acceptedFormats', item.acceptedFormats)
                          handleChange(
                            'accptedFormatText',
                            item.accptedFormatText
                          )
                          handleChange('file', null)
                          handleChange('size', item.size)
                        }}
                      >
                        <ImageIconCard
                          key={item.label}
                          boxWidth=''
                          image={''}
                          itemsGapClass='md:gap-[0px]'
                          fontSize='text-[10px] md:text-[14px]'
                          fontWeight='font-[500] md:font-[400]'
                          iconClassName={
                            'w-[31px] h-[39px] md:w-[43px] md:h-[56px]'
                          }
                          className={`${
                            item?.label?.toLowerCase() ===
                            jokeData?.format?.toLowerCase()
                              ? 'border-[2px] border-[#009639]'
                              : ''
                          } max-w-[86px] box-border min-h-[86px] md:min-w-[120px] md:min-h-[120px] flex flex-col justify-center items-center bg-white px-[24px] py-[9px] rounded-[10px]`}
                          icon={item.icon}
                          text={item.label}
                        />
                      </button>
                    )
                  })}
              </div>
              {formError.format !== '' && (
                <span className='text-[#FD0202] font-[400] text-[12px] md:text-center'>
                  {formError.format}
                </span>
              )}
            </div>
            {jokeData.format.toLowerCase() !==
              cmsData.pjChallenge.text.toLowerCase() && (
              <div className='relative'>
                <FileContainer
                  removeFile={() => {
                    handleChange('file', null)
                    if (fileRef.current) {
                      fileRef.current.value = ''
                    }
                  }}
                  ref={fileRef}
                  file={jokeData.file}
                  title={
                    FORMAT_OPTIONS.find(item => item.label === jokeData.format)
                      ?.title ?? ''
                  }
                  subtitle={jokeData.accptedFormatText}
                />
                <input
                  ref={fileRef}
                  hidden
                  type='file'
                  accept={jokeData.acceptedFormats}
                  onChange={event => {
                    if (event.target.files?.length === 0) {
                      return
                    }
                    handleChange('file', event.target.files)
                  }}
                />
              </div>
            )}
            {jokeData.format.toLowerCase() ===
              cmsData.pjChallenge.text.toLowerCase() && (
              <div>
                <div className='flex flex-col gap-[8px]'>
                  <AktivGroteskText
                    className='w-full md:text-center'
                    text={cmsData.pjChallenge.textClickableHeading}
                    fontSize='md:text-[16px] text-[14px]'
                    fontWeight='font-[700]'
                  />
                  <Input
                    name='jokeText'
                    type='textarea'
                    bgColor='bg-[#9BD4B1]'
                    paddingClass='p-[12px]'
                    borderRadius='rounded-[10px]'
                    fontSize='text-[12px] md:text-[20px] font-[400]'
                    className=''
                    rows={6}
                    onChange={handleChange}
                    value={jokeData.jokeText}
                    placeholder={cmsData.pjChallenge.textClickablePlaceholder}
                    errorClassName='md:text-center'
                  />
                </div>
                <AktivGroteskText
                  text={cmsData.pjChallenge.textClickableTextLimit}
                  className='text-[rgba(0,0,0,0.5)] mt-[10px] md:mt-[12px]'
                  fontSize='text-[8px] md:text-[16px]'
                  fontWeight='font-[400]'
                />
              </div>
            )}
            {formError.joke !== '' && (
              <span className='text-[#FD0202] font-[400] text-[12px] md:text-center'>
                {formError.joke}
              </span>
            )}
          </LabeledInput>
          <LabeledInput
            labelClassName='md:text-center'
            label={cmsData.pjChallenge.title}
          >
            <Input
              bgColor='bg-white'
              name='title'
              type='text'
              onChange={handleChange}
              value={jokeData.title}
              error={formError.title}
              paddingClass='md:p-[16px] py-[19px] px-[16px]'
              placeholder={cmsData.pjChallenge.titleJokeTitleTextSpace}
              errorClassName='md:text-center'
            />
            <AktivGroteskText
              text={cmsData.pjChallenge.titleJokeTitleCharacterLimitText}
              className='w-full md:text-center'
              fontSize='text-[8px] md:text-[12px]'
              fontWeight='font-[400]'
            />
          </LabeledInput>
          <LabeledInput
            labelClassName='md:text-center'
            width='md:max-w-[720px] lg:max-w-[920px]'
            label={cmsData.pjChallenge.category}
          >
            <CustomCarousel>
              {categoryData?.map(item => {
                return (
                  <div
                    onClick={() => handleChange('category', item.name)}
                    key={item.id}
                  >
                    <ImageIconCard
                      key={item.name}
                      boxWidth=''
                      imageUrl={item.image}
                      itemsGapClass='gap-[8px]'
                      fontSize='text-[12px] md:text-[14px]'
                      fontWeight='font-[400]'
                      iconClassName={
                        'w-[31px] h-[39px] md:w-[55px] md:h-[56px]'
                      }
                      imageClassName='md:max-w-[48px] md:max-h-[48px] md:min-w-[48px] md:min-h-[48px] min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] object-fill'
                      className={`cursor-pointer ${
                        item.name.toLowerCase() ===
                        jokeData.category.toLowerCase()
                          ? 'border-[1px] border-[#11A64B]'
                          : ''
                      } text-center max-w-[86px] min-h-[86px] max-h-[86px] box-border md:max-w-[120px] md:min-h-[120px] flex-col justify-center items-center bg-white px-[24px] py-[9px] rounded-[10px]`}
                      text={item.name}
                    />
                  </div>
                )
              })}
            </CustomCarousel>
          </LabeledInput>
          <div className='flex gap-[8px] items-start'>
            <Checkbox
              className='w-[16px] h-[16px] md:top-[3px] relative'
              name='agreeToTerms'
              id='agreeToTerms'
              checked={jokeData.agreeToTerms}
              onCheckedChange={() =>
                handleChange('agreeToTerms', !jokeData.agreeToTerms)
              }
            />
            <label htmlFor='agreeToTerms' className='cursor-pointer'>
              <AktivGroteskText
                text={cmsData.pjChallenge.termsAndConditions}
                fontSize='text-[12px] md:text-[16px] leading-tight'
                fontWeight='font-[400]'
              />
            </label>
          </div>
          {formError.agreeToTerms !== '' && (
            <span className='text-[#FD0202] font-[400] text-start text-[12px] w-full '>
              {formError.agreeToTerms}
            </span>
          )}
          {errorMessage !== '' && (
            <p className='text-[#FD0202] font-[400] text-start text-[12px] w-full'>
              {errorMessage}
            </p>
          )}
          <div className='flex flex-col justify-center items-center gap-[4px]'>
            <GreenCTA
              onClick={() => {
                handleSubmitJoke()
              }}
              disabled={isPending}
              className='w-full md:w-[480px]'
              fontSize='text-[16px] md:text-[32px]'
              fontWeight='font-[400]'
              text={
                isPending
                  ? 'Submitting...'
                  : cmsData.pjChallenge.submitButtonText
              }
              paddingClass='pt-[17px] pb-[12px] md:py-[24px]'
            />
            <AktivGroteskText
              text={cmsData.pjChallenge.allFieldsAreMandatory}
              fontWeight='font-[400] md:font-[700]'
              fontSize='text-[8px] md:text-[14px]'
            />
          </div>
        </form>
      </ScreenWrapper>
      {openApproveJokePopup && (
        <ApproveJokePopup
          open={openApproveJokePopup}
          singleButtonOnClick={() => {
            setJokeData({
              format: cmsData.pjChallenge.image,
              fileType: FileType.IMAGE,
              acceptedFormats: '.jpg,.jpeg,.png',
              accptedFormatText: cmsData.pjChallenge.imageClickableSubHeading,
              file: null,
              jokeText: '',
              title: '',
              category: '',
              agreeToTerms: false,
              language: '',
              size: 1
            })
            if (fileRef.current) {
              fileRef.current.value = ''
            }
            setOpenApproveJokePopup(false)
            router.push('/user-generated-jokes')
          }}
          onClose={() => {
            setJokeData({
              format: cmsData.pjChallenge.image,
              fileType: FileType.IMAGE,
              acceptedFormats: '.jpg,.jpeg,.png',
              accptedFormatText: cmsData.pjChallenge.imageClickableSubHeading,
              file: null,
              jokeText: '',
              title: '',
              category: '',
              agreeToTerms: false,
              language: '',
              size: 1
            })
            if (fileRef.current) {
              fileRef.current.value = ''
            }
            setOpenApproveJokePopup(false)
          }}
        />
      )}
      {openJokeFeaturedPopup && (
        <JokeFeaturedPopup
          open={openJokeFeaturedPopup}
          onClose={() => {
            setOpenJokeFeaturedPopup(false)
            setOpenJokeNotSuitablePopup(true)
          }}
        />
      )}
      {openJokeNotSuitablePopup && (
        <JokeNotSuitablePopup
          open={openJokeNotSuitablePopup}
          onClose={() => {
            setOpenJokeNotSuitablePopup(false)
            setOpenJokeNotGoodEnoughPopup(true)
          }}
        />
      )}
      {openJokeNotGoodEnoughPopup && (
        <JokeNotGoodEnoughPopup
          open={openJokeNotGoodEnoughPopup}
          onClose={() => {
            setOpenJokeNotGoodEnoughPopup(false)
            setOpenJokeOffensivePopup(true)
          }}
        />
      )}
      {isAnimating && isPending && (
        <BottleAnimation
          onAnimationEnd={hideAnimation}
          isVisible={isAnimating}
          animationKey={animationKey}
        />
      )}
      {openJokeOffensivePopup && (
        <JokeOffensivePopup
          open={openJokeOffensivePopup}
          onClose={() => {
            setOpenJokeOffensivePopup(false)
            setOpenApproveJokePopup(false)
          }}
        />
      )}
      {submitJokeError && (
        <div className='fixed bottom-[10%] w-[100%]  flex justify-center items-center'>
          <div className='rounded-[10px] bg-[#009233] w-[90%] md:w-[50%]'>
            <AktivGroteskText
              className='self-center py-[8px] text-white text-center'
              text='You can only submit 5 jokes per day!'
              fontSize='text-[12px] md:text-[16px]'
              fontWeight='font-[400]'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmitYourJoke
