'use client'

import AnnouncingWinnerTimer from '@/components/AnnouncingWinnerTimer'
import AktivGroteskText from '@/components/common/AktivGroteskText'
import HelpUsToKnowYourBetter from '@/components/common/HelpUsToKnowYourBetter'
import ImageIconCard from '@/components/common/ImageIconCard'
import ReferAFriend from '@/components/common/ReferAFriend'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import UserAddressCard from '@/components/common/UserAddressCard'
import UserComicsCoinsAndRankCard from '@/components/common/UserComicsCoinsAndRankCard'
import GreenCTA from '@/components/GreenCTA'
import ProfileCard from '@/components/ProfileCard'
import { Separator } from '@/components/ui/separator'
import UserGeneratedJokecComponent from '@/components/UserGeneratedJokecComponent'
import { ICONS_NAMES, LOCAL_IMAGES } from '@/constants'
import React from 'react'

const ProfilePage = () => {
  return (
    <ScreenWrapper>
      <div className='flex flex-col gap-2'>
        <AnnouncingWinnerTimer />
        <ProfileCard />
        <UserComicsCoinsAndRankCard />
        <div className='flex flex-col gap-[24px] md:gap-[40px]'>
          <UserAddressCard />
          <ReferAFriend />
          <HelpUsToKnowYourBetter />
          <UserGeneratedJokecComponent />
        </div>
      </div>
    </ScreenWrapper>
  )
}

export default ProfilePage
