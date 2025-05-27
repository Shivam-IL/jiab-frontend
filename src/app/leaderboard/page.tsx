'use client'

import AnnouncingWinnerTimer from '@/components/AnnouncingWinnerTimer'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import LeaderBoardTable from '@/components/LeaderBoardTable'
import { MOBILE_TEMP_NAVBAR_DATA } from '@/constants'
import useWindowWidth from '@/hooks/useWindowWidth'
import React from 'react'

const index = () => {
  const width = useWindowWidth()
  return (
    <div className='flex flex-col gap-3'>
      <MobileTempNavBar
        title={MOBILE_TEMP_NAVBAR_DATA.LEADERBOARD.TITLE}
        subtitle={MOBILE_TEMP_NAVBAR_DATA.LEADERBOARD.SUB_TITLE}
      />
      <ScreenWrapper
        className={`${width > 750 ? 'mt-[71px] flex justify-center' : 'mt-0'}`}
      >
        <div className='flex flex-col gap-[16.1px]'>
          <AnnouncingWinnerTimer />
          <LeaderBoardTable />
        </div>
      </ScreenWrapper>
    </div>
  )
}

export default index
