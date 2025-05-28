'use client'

import { aktivGrotesk } from '@/app/layout'
import AktivGroteskText from '@/components/common/AktivGroteskText'
import ArtistExploreMoreComponent from '@/components/common/ArtistExploreMoreComponent'
import ClampedAktivGroteskText from '@/components/common/ClampedAktivGroteskText'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import SvgIcons from '@/components/common/SvgIcons'
import GreenCTA from '@/components/GreenCTA'
import ClampedText from '@/components/ui/clamped-text'
import { Separator } from '@/components/ui/separator'
import { ARTIST_DATA, ICONS_NAMES } from '@/constants'
import { formatNumberToK } from '@/utils'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ArtistDetailsPage = () => {
  const [userData, setUserData] = useState<any>(null)
  const params = useParams()

  const filterUserData = (id: string) => {
    const user = ARTIST_DATA.filter((item: any) => item.id === id)
    console.log(user)
    setUserData(user[0])
  }

  useEffect(() => {
    filterUserData(params.artistId as string)
  }, [params.artistId])

  return (
    <ScreenWrapper>
      {userData !== null ? (
        <div className='relative flex flex-col items-center justify-center w-full'>
          <div className='relative w-full mb-[11px] md:mb-[24px] rounded-[10px] md:h-[372px]  h-[188px] flex justify-center items-end bg-[#11A64B]'>
            <img
              className='h-[148px] md:h-full w-[154px] md:w-auto object-cover'
              src={userData?.profile?.profileImageUrl}
            />
          </div>
          <div className='flex flex-col text-center gap-[4px] md:gap-[12px] md:mb-[24px] mb-[8px]'>
            <AktivGroteskText
              text={userData?.profile?.fullName}
              fontSize='text-[16px] md:text-[24px]'
              fontWeight='font-[700]'
            />
            <ClampedText
              text={userData?.profile?.description}
              maxLines={3}
              className={ `${aktivGrotesk.className} font-[400] text-[12px] md:text-[20px] text-center`}
              readMoreText='Read more'
              readLessText='Read less'
              readMoreClassName='text-blue-600 hover:text-blue-800 text-[12px] md:text-[20px] font-medium cursor-pointer ml-1'
              readLessClassName='text-blue-600 hover:text-blue-800 text-[12px] md:text-[20px] font-medium cursor-pointer ml-1'
            />
          </div>
          <div className='flex flex-col justify-center items-center gap-[8px] md:gap-[24px]'>
            <GreenCTA
              className=''
              fontSize='text-[12px] md:text-[18px]'
              fontWeight='font-[700] md:font-[400]'
              paddingClass='py-[9px] px-[20px] md:py-[12px] md:px-[36px]'
              text='Follow'
              onClick={() => {}}
            />
            <div className='relative flex gap-[40px] md:gap-[70px] w-full'>
              <div className='flex flex-col gap-[4px] justify-center items-center'>
                <AktivGroteskText
                  text={formatNumberToK(userData?.profile?.reactions?.laugh)}
                  fontSize='text-[16px] md:text-[20px]'
                  fontWeight='font-[700]'
                />
                <SvgIcons
                  name={ICONS_NAMES.FUNNY}
                  className='w-[18px] h-[18px]'
                />
              </div>
              <Separator className='w-[1px] md:w-[2px] bg-white h-[40px] md:h-[60px]' />
              <div className='flex flex-col gap-[4px] justify-center items-center'>
                <AktivGroteskText
                  text={formatNumberToK(2888)}
                  fontSize='text-[16px] md:text-[20px]'
                  fontWeight='font-[700]'
                />
                <AktivGroteskText
                  text='Jokes'
                  className='text-[#7A7A7A]'
                  fontSize='text-[12px] md:text-[16px]'
                  fontWeight='font-[400]'
                />
              </div>
              <Separator className='w-[1px] md:w-[2px] bg-white h-[40px] md:h-[60px]' />
              <div className='flex flex-col gap-[4px] justify-center items-center'>
                <AktivGroteskText
                  text={formatNumberToK(userData?.followers)}
                  fontSize='text-[16px] md:text-[20px]'
                  fontWeight='font-[700]'
                />
                <AktivGroteskText
                  text='Followers'
                  className='text-[#7A7A7A]'
                  fontSize='text-[12px] md:text-[16px]'
                  fontWeight='font-[400]'
                />
              </div>
            </div>
          </div>
          <ArtistExploreMoreComponent />
        </div>
      ) : (
        <>No Data...</>
      )}
    </ScreenWrapper>
  )
}

export default ArtistDetailsPage
