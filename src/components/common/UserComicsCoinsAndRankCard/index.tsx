import React from 'react'
import AktivGroteskText from '../AktivGroteskText'
import ImageIconCard from '../ImageIconCard'
import { ICONS_NAMES, LOCAL_IMAGES } from '@/constants'
import { Separator } from '@/components/ui/separator'
import GreenCTA from '@/components/GreenCTA'
import { useRouter } from 'next/navigation'

const UserComicsCoinsAndRankCard = () => {
  const router = useRouter()
  return (
    <div className='flex gap-2 md:justify-between py-3 md:pt-[24px]'>
      <div className='relative flex md:gap-[50px] md:w-auto w-[60%]'>
        <div className='relative w-[50%] md:w-auto flex flex-col items-center justify-between gap-[6px] md:gap-[8px]'>
          <AktivGroteskText
            text='2800'
            className='text-black'
            fontSize='text-[16px] md:text-[24px]'
            fontWeight='font-[700]'
          />
          <div className='flex justify-center'>
            <ImageIconCard
              itemsGapClass='gap-[5px] md:gap-[8px]'
              imageClassName='w-[12px] h-[12px] object-cover md:w-[28px] md:h-[28px]'
              image={LOCAL_IMAGES.SPRITE_GOLD}
              text='Comic Coins'
              fontSize='text-[12px] md:text-[20px]'
              fontWeight='font-[400]'
              textColor='text-black'
            />
          </div>
        </div>
        <Separator className='w-[1px] md:w-[2px] bg-[#EBEBEB] h-full mx-0 px-0' />
        <div className='relative w-[50%] md:w-auto flex flex-col items-center justify-between gap-[6px] md:gap-[8px]'>
          <AktivGroteskText
            text='100'
            className='text-black'
            fontSize='text-[16px] md:text-[24px]'
            fontWeight='font-[700]'
          />
          <div className='flex justify-center'>
            <ImageIconCard
              itemsGapClass='gap-[5px] md:gap-[8px]'
              icon={ICONS_NAMES.RANK}
              iconClassName='w-[9px] h-[12px] md:w-[18px] md:h-[24px]'
              text='Rank'
              fontSize='text-[12px] md:text-[20px]'
              fontWeight='font-[400]'
              textColor='text-black'
            />
          </div>
        </div>
        <Separator className='w-[1px] md:w-[2px]  bg-[#EBEBEB] h-full mx-0 px-0' />
      </div>
      <div className='relative w-[40%] flex justify-end items-center'>
        <GreenCTA
          className=''
          fontSize='text-[12px] md:text-[20px]'
          fontWeight='font-[700] md:font-[600]'
          paddingClass='py-[5px] md:py-[20px] px-[16px] md:px-[60px]'
          text='Leaderboard'
          onClick={() => {
            router.push('/leaderboard')
          }}
        />
      </div>
    </div>
  )
}

export default UserComicsCoinsAndRankCard
