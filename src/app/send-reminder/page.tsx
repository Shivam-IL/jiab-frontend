'use client'

import AktivGroteskText from '@/components/common/AktivGroteskText'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import SvgIcons from '@/components/common/SvgIcons'
import { ICONS_NAMES, MOBILE_TEMP_NAVBAR_DATA, STATUS, USER } from '@/constants'
import useWindowWidth from '@/hooks/useWindowWidth'
import React from 'react'

const SendReminderPage = () => {
  const width = useWindowWidth()
  return (
    <div className='flex flex-col gap-3'>
      <MobileTempNavBar title={MOBILE_TEMP_NAVBAR_DATA.SEND_REMINDER.TITLE} />
      <ScreenWrapper
        className={`${width > 750 ? 'mt-[71px] flex justify-center' : 'mt-0'}`}
      >
        <div className='relative w-full md:flex hidden justify-center items-center md:mb-[24px]'>
          <AktivGroteskText text='Send Reminder' fontSize='text-[30px]' fontWeight='font-[700]' />
        </div>
        <div className='flex flex-col gap-[16px] md:gap-[24px]'>
          <div className='flex justify-between px-[12px] py-[12px] md:px-[45px] md:py-[22px] bg-[#FFE200] rounded-[5px] md:rounded-[20px]'>
            <AktivGroteskText
              text={USER}
              fontSize='text-[12px] md:text-[24px]'
              fontWeight='font-[700]'
            />
            <AktivGroteskText
              text={STATUS}
              fontSize='text-[12px] md:text-[24px]'
              fontWeight='font-[700]'
            />
          </div>
          <div className='flex flex-col gap-[8px] md:gap-[20px]'>
            <div className='bg-white flex justify-between items-center px-[12px] py-[12px] md:py-[20px] md:px-[45px] rounded-[5px] md:rounded-[20px]'>
              <div className='flex items-center gap-[16px] md:gap-[24px]'>
                <SvgIcons
                  name={ICONS_NAMES.USER}
                  className='w-[21px] h-[21px] md:w-[24px] md:h-[28px]'
                />
                <AktivGroteskText
                  text='+91-XXXXXX8888'
                  fontSize='text-[12px] md:text-[20px]'
                  fontWeight='font-[400]'
                />
              </div>
              <button className='flex flex-col items-center justify-center'>
                <AktivGroteskText
                  className='text-[#1985D3]'
                  text='Send Again'
                  fontSize='text-[12px] md:text-[20px]'
                  fontWeight='font-[400]'
                />
              </button>
            </div>
          </div>
        </div>
      </ScreenWrapper>
    </div>
  )
}

export default SendReminderPage
