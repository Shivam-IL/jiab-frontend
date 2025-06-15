import React from 'react'
import { IUserGeneratedJokeCard } from '@/interfaces'
import Image from 'next/image'
import AktivGroteskText from '../AktivGroteskText'
import { LOCAL_IMAGES, PENDING } from '@/constants'
import { generateImageurl } from '@/utils'

const UserGeneratedJokeCard: React.FC<IUserGeneratedJokeCard> = ({
  image,
  title,
  date,
  status
}) => {
  console.log(status)
  return (
    <div className='w-full bg-white rounded-[5px] md:rounded-[20px] px-[8px] py-[12px] md:px-[24px] md:py-[24px] flex items-center  gap-[16px] md:gap-[40px]'>
      <div
        className={`min-w-[57px] max-w-[57px] w-full h-full md:min-w-[153px] md:max-w-[153px] md:min-h-[153px] md:max-h-[153px] rounded-[3px] md:rounded-[8px] relative bg-[#11A64B]`}
      >
        {image && (
          <img
            className='rounded-[3px] md:rounded-[8px] object-cover w-full h-full relative'
            src={generateImageurl(LOCAL_IMAGES.USER_JOKE_IMAGE)}
            alt='joke'
          />
        )}
      </div>
      <div className='w-full flex flex-col gap-[9px] md:gap-[20px]'>
        <AktivGroteskText
          text={title}
          fontSize='text-[12px] md:text-[32px]'
          fontWeight='font-[700]'
        />
        <div className='flex justify-between items-center'>
          <AktivGroteskText
            text={`Date: ${date}`}
            fontSize='text-[10px] md:text-[24px]'
            fontWeight='font-[400]'
          />
          <AktivGroteskText
            text={status ?? PENDING}
            fontSize='text-[10px] capitalize md:text-[24px]'
            fontWeight='font-[400]'
          />
        </div>
      </div>
    </div>
  )
}

export default UserGeneratedJokeCard
