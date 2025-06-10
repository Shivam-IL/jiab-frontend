import { IReferNowModal } from '@/interfaces'
import React, { useState } from 'react'
import CustomPopupWrapper from '../CustomPopupWrapper'
import { REFER_NOW_MODAL_DATA, REFFERAL_STATUS_POPUP_DATA } from '@/constants'
import AktivGroteskText from '../AktivGroteskText'
import ReferNowModal from '../ReferNowModal'
import { useSendReferral } from '@/api/hooks/ReferralHooks'

const ReferNowComponent = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const [open2, setOpen2] = useState<boolean>(false)
  const [open3, setOpen3] = useState<boolean>(false)

  const [referStatus1, setReferStatus1] = useState<boolean>(false)
  const [referStatus2, setReferStatus2] = useState<boolean>(false)
  const [referStatus3, setReferStatus3] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const {
    mutate: sendReferral,
    isPending,
    data: sendReferralData
  } = useSendReferral()

  const handleChange = (key: string, value: string) => {
    setPhoneNumber(value)
  }

  const submitReferNow = () => {
    sendReferral({
      mobile_number: phoneNumber
    })
  }

  console.log(sendReferralData)

  return (
    <div>
      {open && (
        <ReferNowModal
          title={REFER_NOW_MODAL_DATA.DEFAULT.title}
          subtitle={REFER_NOW_MODAL_DATA.DEFAULT.subtitle}
          ctaText={REFER_NOW_MODAL_DATA.DEFAULT.ctaText}
          phoneNumber={phoneNumber}
          onChange={handleChange}
          open={open}
          onSubmit={() => {
            submitReferNow()
          }}
          onClose={() => {
            onClose()
            setOpen2(true)
          }}
        />
      )}
      {open2 && (
        <ReferNowModal
          title={REFER_NOW_MODAL_DATA.PRANK_US.title}
          subtitle={REFER_NOW_MODAL_DATA.PRANK_US.subtitle}
          ctaText={REFER_NOW_MODAL_DATA.PRANK_US.ctaText}
          phoneNumber={phoneNumber}
          onChange={handleChange}
          onSubmit={() => {
            setOpen2(false)
            setOpen3(true)
          }}
          open={open2}
          onClose={() => {
            setOpen2(false)
            setOpen3(true)
          }}
        />
      )}
      {open3 && (
        <ReferNowModal
          title={REFER_NOW_MODAL_DATA.SELF_LOVE.title}
          subtitle={REFER_NOW_MODAL_DATA.SELF_LOVE.subtitle}
          ctaText={REFER_NOW_MODAL_DATA.SELF_LOVE.ctaText}
          phoneNumber={phoneNumber}
          onSubmit={() => {
            setOpen3(false)
            setReferStatus1(true)
          }}
          onChange={handleChange}
          open={open3}
          onClose={() => {
            setOpen3(false)
            setReferStatus1(true)
          }}
        />
      )}
      {referStatus1 && (
        <CustomPopupWrapper
          open={referStatus1}
          onClose={() => {
            setReferStatus1(false)
            setReferStatus2(true)
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
      {referStatus2 && (
        <CustomPopupWrapper
          open={referStatus2}
          onClose={() => {
            setReferStatus2(false)
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SUB_TITLE}
          singleButton={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SINGLE_BUTTON}
          singleButtonText={
            REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SINGLE_BUTTON_TEXT
          }
          singleButtonOnClick={() => {
            setReferStatus2(false)
            setReferStatus3(true)
          }}
        />
      )}
      {referStatus3 && (
        <CustomPopupWrapper
          open={referStatus3}
          onClose={() => {
            setReferStatus3(false)
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.SUB_TITLE}
          singleButton={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.SINGLE_BUTTON}
          singleButtonText={
            REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.SINGLE_BUTTON_TEXT
          }
          singleButtonOnClick={() => {
            setReferStatus3(false)
          }}
        />
      )}
    </div>
  )
}

export default ReferNowComponent
