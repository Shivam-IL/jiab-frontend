'use client'

import AktivGroteskText from '@/components/common/AktivGroteskText'
import CustomPopupWrapper from '@/components/common/CustomPopupWrapper'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import SvgIcons from '@/components/common/SvgIcons'
import {
  ICONS_NAMES,
  MOBILE_TEMP_NAVBAR_DATA,
  NEXT,
  PREV,
  REFFERAL_STATUS_POPUP_DATA,
  SEND_AGAIN_STATUS,
  STATUS,
  USER
} from '@/constants'
import useWindowWidth from '@/hooks/useWindowWidth'
import React, { useEffect, useState } from 'react'
import {
  useGetAllReferrals,
  useSendReferralAgain
} from '@/api/hooks/ReferralHooks'
import { IInviteeData } from '@/interfaces'

const SendReminderPage = () => {
  const width = useWindowWidth()

  const [sendReminder, setSendReminder] = useState<boolean>(false)

  const [page, setPage] = useState<number>(1)
  const [pages, setPages] = useState<number>(1)
  const { data: referrals } = useGetAllReferrals({ page })
  const { mutate: sendReferralAgain, data: sendReferralAgainData } =
    useSendReferralAgain()
  const [sendAgainStatus, setSendAgainStatus] = useState<string>('')

  const [data, setData] = useState<IInviteeData[]>([])

  useEffect(() => {
    if (referrals?.ok) {
      const { data } = referrals ?? {}
      const newPages = Math.ceil(data?.total / data?.page_size)
      setPages(newPages)
      const referralsData = referrals?.data?.referrals as IInviteeData[]
      setData(referralsData)
    }
  }, [referrals])

  const handleSendReferralAgain = (id: number) => {
    sendReferralAgain({ referral_id: id })
  }

  useEffect(() => {
    if (sendReferralAgainData?.ok) {
      const { status } = sendReferralAgainData?.data as { status?: string }
      setSendAgainStatus(status as string)
      setSendReminder(true)
    }
  }, [sendReferralAgainData])

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
          {data?.map((item: IInviteeData) => (
            <div
              key={item.id}
              className='flex flex-col gap-[8px] md:gap-[20px]'
            >
              <div className='bg-white flex justify-between items-center px-[12px] py-[12px] md:py-[20px] md:px-[45px] rounded-[5px] md:rounded-[20px]'>
                <div className='flex items-center gap-[16px] md:gap-[24px]'>
                  <SvgIcons
                    name={ICONS_NAMES.USER}
                    className='w-[21px] h-[21px] md:w-[24px] md:h-[28px]'
                  />
                  <AktivGroteskText
                    text={`+91-XXXXXX${item.mobile_number?.slice(6)}`}
                    fontSize='text-[12px] md:text-[20px]'
                    fontWeight='font-[400]'
                  />
                </div>
                <button
                  onClick={() => {
                    handleSendReferralAgain(item.id)
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
          ))}
          <div className='w-full flex justify-center flex-col md:flex-row items-center'>
            <div className='relative flex gap-[12px] md:gap-[16px]'>
              {page > 1 && (
                <button
                  onClick={() => {
                    if (page > 1) {
                      setPage(prev => prev - 1)
                    }
                  }}
                  className={`hover:bg-[#E0E0E0] transition-all duration-300 rounded-[100px]  border-[1px]   text-[10px] font-[700] py-[6px] px-[36px] ${
                    page > 1
                      ? 'border-black text-black'
                      : 'border-[rgba(0,0,0,0.2)] text-[rgba(0,0,0,0.2)]'
                  }`}
                >
                  <AktivGroteskText
                    text={PREV}
                    fontSize='text-[14px] md:text-[20px]'
                    fontWeight='font-[700]'
                  />
                </button>
              )}
              {pages > 1 && (
                <button
                  onClick={() => {
                    if (page < pages) {
                      setPage(prev => prev + 1)
                    }
                  }}
                  className={` hover:bg-[#E0E0E0]  ${
                    pages !== page
                      ? 'border-black text-black'
                      : 'border-[rgba(0,0,0,0.2)] text-[rgba(0,0,0,0.2)]'
                  }  transition-all duration-300 rounded-[100px] border-[1px] text-[10px] font-[700] py-[6px] px-[36px]`}
                >
                  <AktivGroteskText
                    text={NEXT}
                    fontSize='text-[14px] md:text-[20px]'
                    fontWeight='font-[700]'
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </ScreenWrapper>
      {sendReminder && sendAgainStatus === SEND_AGAIN_STATUS.SUCCESS && (
        <CustomPopupWrapper
          open={sendReminder}
          onClose={() => {
            setSendReminder(false)
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.SEND_REMINDER.ICON}
          subtitle={REFFERAL_STATUS_POPUP_DATA.SEND_REMINDER.SUB_TITLE}
        >
          <div className='flex flex-col gap-[20px]'>
            <AktivGroteskText
              fontSize='text-[16px]'
              fontWeight='font-[700]'
              className='text-[#00953B] text-center'
              text={'Code'}
            />
            <AktivGroteskText
              fontSize='text-[12px]'
              fontWeight='font-[400] text-center'
              text={
                'Your points will be credited on successful sign up using the invite code'
              }
            />
          </div>
        </CustomPopupWrapper>
      )}
      {sendReminder &&
        sendAgainStatus === SEND_AGAIN_STATUS.CANT_SEND_AGAIN_IN_A_WEEK && (
          <div className='fixed bottom-[10%] w-[100%]  flex justify-center items-center'>
            <div className='rounded-[10px] bg-[#009233] w-[90%] md:w-[50%]'>
              <AktivGroteskText
                className='self-center py-[8px] text-white text-center'
                text='You can only remind your friend once in a week!'
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
