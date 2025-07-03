import useAppSelector from '@/hooks/useSelector'
import { IJokeData } from '@/types'
import React, { useEffect, useState } from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import { useCMSData } from '@/data'

const UgcPreviewCard = ({
  jokeData,
  onSubmitJoke
}: {
  jokeData: IJokeData
  onSubmitJoke: () => void
}) => {
  const [genreImage, setGenreImage] = useState<string>('')
  const { user } = useAppSelector(state => state.profile)
  const { homePage } = useCMSData()
  const { genres } = useAppSelector(state => state.reference)

  useEffect(() => {
    if (jokeData.category) {
      const genre = genres.find(genre => genre.genre === jokeData.category)
      setGenreImage(genre?.image_url ?? '')
    }
  }, [jokeData.category, genres])

  return (
    <div className='relative px-[20px] bg-white bg-no-repeat w-full flex-grow-1 p-[16px] md:px-[12px] flex flex-col justify-between gap-[10px] md:rounded-[10px] rounded-[5px]'>
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
                  text={`${user?.name ?? ''} , ${jokeData?.language}`}
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
          className={`relative  w-full h-[278px] md:h-[340px] bg-[#00953B] flex items-center gap-[34px] rounded-t-[5px]`}
        ></div>
      </div>
    </div>
  )
}

export default UgcPreviewCard
