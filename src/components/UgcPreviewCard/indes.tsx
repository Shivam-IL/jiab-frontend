import useAppSelector from '@/hooks/useSelector'
import { IJokeData } from '@/types'
import React, { useEffect, useState } from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import { useCMSData } from '@/data'
import { ICONS_NAMES, LOCAL_IMAGES } from '@/constants'
import { generateImageurl } from '@/utils'
import SvgIcons from '../common/SvgIcons'
import GreenCTA from '../GreenCTA'
import ScreenWrapper from '../common/ScreenWrapper'
import useWindowWidth from '@/hooks/useWindowWidth'
import AudioPlayer from '../common/AudioPlayer'
import VideoPlayer from '../common/VideoPlayer'

const UgcPreviewCard = ({
  jokeData,
  onSubmitJoke,
  setUgcPreview,
  errorMessage,
  setErrorMessage,
  isLoading
}: {
  jokeData: IJokeData
  onSubmitJoke: () => void
  setUgcPreview: React.Dispatch<React.SetStateAction<boolean>>
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
}) => {
  const [genreImage, setGenreImage] = useState<string>('')
  const [languageName, setLanguageName] = useState<string>('')
  const { user } = useAppSelector(state => state.profile)
  const { homePage, pjChallenge } = useCMSData()
  const { genres, languages } = useAppSelector(state => state.reference)
  const width = useWindowWidth()

  useEffect(() => {
    if (jokeData.category) {
      const genre = genres.find(genre => genre.genre === jokeData.category)
      setGenreImage(genre?.image_url ?? genres?.[0]?.image_url ?? '')
    }
  }, [jokeData.category, genres])

  useEffect(() => {
    if (jokeData.language) {
      const language = languages.find(
        language => language.language_key === jokeData.language
      )
      setLanguageName(language?.name ?? '')
    }
  }, [jokeData.language, languages])

  return (
    <ScreenWrapper
      desktopWidth='md:w-[323px] w-full'
      className={`${
        width > 750 ? 'mt-[71px] flex justify-center' : 'pb-[100px] mt-0'
      }`}
    >
      <div className='flex flex-col gap-[16.1px]'>
        <div className='md:flex md:flex-col justify-center items-center md:mt-[60px] md:mb-[45px] gap-[12px] hidden'>
          <AktivGroteskText
            text={pjChallenge.submitYourJokeHeading.toUpperCase()}
            fontSize='text-[30px]'
            fontWeight='font-[700]'
          />
          <AktivGroteskText
            text={pjChallenge.submitYourJokeSubheading}
            fontSize='text-[20px]'
            fontWeight='font-[400]'
          />
        </div>
        <div className='flex flex-col gap-[10px] md:mb-0 mb-[100px]'>
          <div className='relative  px-[20px] bg-white bg-no-repeat flex-grow-1 p-[16px] md:px-[12px] flex flex-col justify-between gap-[10px] md:rounded-[10px] rounded-[5px]'>
            <div className='flex justify-between items-center md:items-start'>
              <div className='flex w-full items-start gap-[12px]'>
                <div className='min-w-[30px] max-w-[30px] md:max-w-[30px] md:min-w-[28px] min-h-[30px] max-h-[30px] md:min-h-[28px] md:max-h-[28px] flex items-end justify-center rounded-full '>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={genreImage}
                    alt='genre'
                    className='w-full h-full object-cover relative border-none outline-none'
                  />
                </div>
                <div className='flex flex-col gap-[6.58px] md:gap-[1.58px] w-full'>
                  <div className='flex justify-between items-center flex-grow'>
                    <div className='flex flex-col justify-between'>
                      <AktivGroteskText
                        text={jokeData.title ?? ''}
                        fontSize='text-[14px]'
                        fontWeight='font-[700]'
                        className='line-clamp-1'
                      />
                      <AktivGroteskText
                        text={`${user?.name ?? ''} , ${languageName}`}
                        fontSize='text-[10px]'
                        fontWeight='font-[500]'
                      />
                    </div>
                  </div>
                  <AktivGroteskText
                    text={homePage.jokeDisclaimerText}
                    fontSize='text-[10px] md:text-[12px]'
                    fontWeight='font-[400]'
                    className='text-[#313131]  block'
                  />
                </div>
              </div>
            </div>
            <div className='relative'>
              <div
                style={{
                  backgroundImage: `url(${generateImageurl(
                    LOCAL_IMAGES.UGC_PREVIEW_BG
                  )})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                className={`relative flex flex-col w-full rounded-[5px] min-h-[261px] max-h-[340px]`}
              >
                <div
                  className={`flex-1 w-full relative flex ${
                    jokeData?.format === pjChallenge.video
                      ? ''
                      : 'items-center justify-center'
                  }`}
                  style={{ minHeight: 0 }}
                >
                  {jokeData?.format === pjChallenge.text && (
                    <div className='flex relative w-full max-h-[300px] min-h-[261px]'>
                      <SvgIcons
                        name={ICONS_NAMES.SPRITE_WITH_BUBBLE}
                        className='relative w-[40%]  min-h-[340px] max-h-[340px]'
                      />
                      <div className='relative w-[60%] flex items-center justify-center min-h-[340px] max-h-[340px]'>
                        <AktivGroteskText
                          text={jokeData?.jokeText ?? ''}
                          fontSize='text-[16px]'
                          fontWeight='font-[400]'
                          className='text-white text-start break-all'
                        />
                      </div>
                    </div>
                  )}
                  {jokeData?.format === pjChallenge.text && (
                    <div className='absolute top-[5px] right-[10px]'>
                      <SvgIcons
                        name={ICONS_NAMES.HASHTAG}
                        className='w-[46px] md:w-[60px] h-[48px] md:h-[62px]'
                      />
                    </div>
                  )}
                  {jokeData?.format === pjChallenge.image && (
                    <div className='min-h-[261px] max-h-[300px] relative'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={URL.createObjectURL(
                          jokeData?.file?.[0] ?? new Blob()
                        )}
                        alt='image'
                        className='w-auto max-h-[300px] min-h-[261px] object-cover rounded-[5px]'
                      />
                    </div>
                  )}
                  {jokeData?.format === pjChallenge.audio && (
                    <AudioPlayer
                      src={jokeData?.file?.[0] ?? new Blob()}
                      fileName={jokeData?.file?.[0]?.name ?? ''}
                    />
                  )}
                  {jokeData?.format === pjChallenge.video && (
                    <VideoPlayer src={jokeData?.file?.[0] ?? new Blob()} />
                  )}
                </div>
                <div className='w-full rounded-b-[5px] flex items-center justify-center bg-white/20 backdrop-blur-md shadow-lg min-h-[40px]'>
                  <AktivGroteskText
                    text='Preview your submission'
                    fontSize='text-[16px]'
                    fontWeight='font-[400]'
                    className='text-white'
                  />
                </div>
              </div>
            </div>
            {errorMessage !== '' && (
              <p className='text-[#FD0202] font-[400] text-start text-[12px] w-full'>
                {errorMessage}
              </p>
            )}
          </div>
          <div className='flex flex-col gap-[10px] w-full justify-center items-center'>
            <button
              onClick={() => {
                setUgcPreview(false)
                setErrorMessage('')
              }}
              className='border-[2px] w-full border-black rounded-[100px] py-[12px] md:py-[14px] flex items-center justify-center gap-[10px]'
            >
              <SvgIcons
                className='w-[12px] h-[12px]'
                name={ICONS_NAMES.RETRY}
              />
              <AktivGroteskText
                text='Retry'
                fontSize='text-[16px]'
                fontWeight='font-[600] leading-tight'
                className='text-black'
              />
            </button>
            <GreenCTA
              disabled={isLoading}
              text={pjChallenge.submitButtonText}
              fontSize='text-[16px]'
              fontWeight='font-[600]'
              onClick={() => {
                onSubmitJoke()
              }}
            />
          </div>
        </div>
      </div>
    </ScreenWrapper>
  )
}

export default UgcPreviewCard
