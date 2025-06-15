'use client'

import { useGetLeaderBoard } from '@/api/hooks/LeaderBoardHooks'
import AktivGroteskText from '@/components/common/AktivGroteskText'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import LeaderBoardTable from '@/components/LeaderBoardTable'
import { MOBILE_TEMP_NAVBAR_DATA } from '@/constants'
import useWindowWidth from '@/hooks/useWindowWidth'
import React from 'react'

const Leaderboard = () => {
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
          <div className='md:flex md:flex-col justify-center items-center md:mt-[37px] md:mb-[8px] gap-[12px] hidden'>
            <AktivGroteskText
              text={MOBILE_TEMP_NAVBAR_DATA.LEADERBOARD.TITLE}
              fontSize='text-[30px]'
              fontWeight='font-[700]'
            />
            <AktivGroteskText
              text={MOBILE_TEMP_NAVBAR_DATA.LEADERBOARD.SUB_TITLE}
              fontSize='text-[20px]'
              fontWeight='font-[400]'
            />
          </div>
          <LeaderBoardTable />
        </div>
      </ScreenWrapper>
    </div>
  )
}

export default Leaderboard
