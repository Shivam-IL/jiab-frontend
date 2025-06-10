'use client'

import AktivGroteskText from '@/components/common/AktivGroteskText'
import CustomPopupWrapper from '@/components/common/CustomPopupWrapper'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import SvgIcons from '@/components/common/SvgIcons'
import {
  ICONS_NAMES,
  MOBILE_TEMP_NAVBAR_DATA,
  REFFERAL_STATUS_POPUP_DATA,
  STATUS,
  USER
} from '@/constants'
import useWindowWidth from '@/hooks/useWindowWidth'
import React, { useState } from 'react'

const SendReminderPage = () => {
  const width = useWindowWidth()

  const [sendReminder, setSendReminder] = useState<boolean>(false)
  const [sendReminderCount, setSendReminderCount] = useState<number>(0)

  return (
    <div className='flex flex-col gap-3'>
      <MobileTempNavBar title={MOBILE_TEMP_NAVBAR_DATA.SEND_REMINDER.TITLE} />
      <ScreenWrapper
        className={`${width > 750 ? 'mt-[71px] flex justify-center' : 'mt-0'}`}
      >
        <div className='relative w-full md:flex hidden justify-center items-center md:mb-[24px]'>
          <AktivGroteskText
            className='uppercase leading-tight'
            text='Send Reminder'
            fontSize='text-[30px]'
            fontWeight='font-[700]'
          />
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
              <button
                onClick={() => {
                  setSendReminder(true)
                  setSendReminderCount(prev => prev + 1)
                  setTimeout(() => {
                    setSendReminder(false)
                  }, 4000)
                }}
                className='flex flex-col items-center justify-center'
              >
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
      {sendReminder && sendReminderCount < 2 && (
        <CustomPopupWrapper
          open={sendReminder}
          onClose={() => {
            setSendReminder(false)
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.EASY.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.EASY.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.EASY.SUB_TITLE}
        >
          <div className='flex flex-col gap-[20px]'>
            <AktivGroteskText
              fontSize='text-[16px]'
              fontWeight='font-[700]'
              className='text-[#00953B] text-center'
              text={REFFERAL_STATUS_POPUP_DATA.EASY.SECOND_TEXT}
            />
            <AktivGroteskText
              fontSize='text-[12px]'
              fontWeight='font-[400] text-center'
              text={REFFERAL_STATUS_POPUP_DATA.EASY.THIRD_TEXT}
            />
          </div>
        </CustomPopupWrapper>
      )}
      {sendReminderCount >1 &&  sendReminder && (
        <div className='fixed bottom-[10%] w-[100%]  flex justify-center items-center'>
          <div className='rounded-[10px] bg-[#009233] w-[90%] md:w-[50%]'>
            <AktivGroteskText
              className='self-center py-[8px] text-white text-center'
              text='You can only remind your friend three times!'
              fontSize='text-[12px] md:text-[16px]'
              fontWeight='font-[400]'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default SendReminderPage
