'use client'

import AktivGroteskText from '@/components/common/AktivGroteskText'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import GreenCTA from '@/components/GreenCTA'
import Input from '@/components/Input'
import LabeledInput from '@/components/LabeledInput'
import {
  MOBILE_TEMP_NAVBAR_DATA,
  PLEASE_ENTER_YOUR_DETAILS_TO_CLAIM_YOUR_REWARD,
  SUBMIT
} from '@/constants'
import useWindowWidth from '@/hooks/useWindowWidth'
import { IClaimFormData } from '@/types'
import React, { useState } from 'react'
import { aktivGrotesk } from '../layout'
import AddressCard from '@/components/AddressCard'
import AddressModal from '@/components/common/AddressModal'
import { ClaimSuccessPopup, ClaimExpiredPopup, ClaimAlertPopup } from '@/components/ClaimPopups'

const SubmitYourJoke = () => {
  const width = useWindowWidth()

  const [openClaimSuccessPopup, setOpenClaimSuccessPopup] = useState<boolean>(true)
  const [openClaimExpiredPopup, setOpenClaimExpiredPopup] = useState<boolean>(true)
  const [openClaimAlertPopup, setOpenClaimAlertPopup] = useState<boolean>(true)

  const [claimFormData, setClaimFormData] = useState<IClaimFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    panNumber: ''
  })

  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false)

  const handleChange = (key: string, value: string) => {
    setClaimFormData({ ...claimFormData, [key]: value })
  }

  return (
    <div className='flex flex-col gap-3'>
      <MobileTempNavBar title={MOBILE_TEMP_NAVBAR_DATA.CLAIM_FORM.TITLE} />
      <ScreenWrapper
        className={`${
          width > 750 ? 'mt-[71px] flex justify-center' : 'pb-[100px] mt-0'
        }`}
      >
        <div className='md:block hidden mb-[40px] md:mt-[71px]'>
          <AktivGroteskText
            text='CLAIM FORM'
            fontSize='md:text-[30px]'
            fontWeight='font-[700]'
          />
        </div>
        <div className='flex flex-col mt-[32px] md:mt-0 gap-[20px] md:gap-[32px]'>
          <AktivGroteskText
            text={PLEASE_ENTER_YOUR_DETAILS_TO_CLAIM_YOUR_REWARD}
            fontSize='text-[16px]'
            fontWeight='font-[700]'
          />
          <div className='flex flex-col gap-[24px] md:gap-[16px]'>
            <LabeledInput
              width='md:w-full'
              labelFontSize='text-[14px] md:text-[16px]'
              labelFontWeight='font-[400]'
              label='Full Name (As per Govt ID.)*'
            >
              <Input
                type='text'
                name='fullName'
                bgColor='bg-white'
                paddingClass='pl-[17px] md:py-[10px] py-[16px]'
                fontSize='text-[14px] md:text-[16px]'
                placeholder='Enter your full name'
                value={claimFormData.fullName}
                onChange={handleChange}
              />
            </LabeledInput>
            <LabeledInput
              width='md:w-full'
              labelFontSize='text-[14px] md:text-[16px]'
              labelFontWeight='font-[400]'
              label='Mobile Number*'
            >
              <Input
                type='text'
                name='phoneNumber'
                bgColor='bg-white'
                paddingClass='pl-[17px] md:py-[10px] py-[16px]'
                fontSize='text-[14px] md:text-[16px]'
                placeholder='Enter your mobile number'
                value={claimFormData.phoneNumber}
                onChange={handleChange}
              />
            </LabeledInput>
            <LabeledInput
              width='md:w-full'
              labelFontSize='text-[14px] md:text-[16px]'
              labelFontWeight='font-[400]'
              label='Email ID*'
            >
              <Input
                type='email'
                name='email'
                bgColor='bg-white'
                paddingClass='pl-[17px] md:py-[10px] py-[16px]'
                fontSize='text-[14px] md:text-[16px]'
                placeholder='Enter your email ID'
                value={claimFormData.email}
                onChange={handleChange}
              />
            </LabeledInput>
            <LabeledInput
              width='md:w-full'
              labelFontSize='text-[14px] md:text-[16px]'
              labelFontWeight='font-[400]'
              label='PAN Card Number*'
              tooltip={true}
              tooltipText='We require your PAN Card information for gift purposes*. This information will not be used beyond the stated purpose and will be deleted from our records post 31Dec 2024.'
            >
              <Input
                type='text'
                name='panNumber'
                bgColor='bg-white'
                paddingClass='pl-[17px] md:py-[10px] py-[16px]'
                fontSize='text-[14px] md:text-[16px]'
                placeholder='Enter your PAN card number'
                value={claimFormData.panNumber}
                onChange={handleChange}
              />
            </LabeledInput>
            <div className='flex flex-col gap-[10px] md:gap-[32px] mt-[22px]'>
              <div className='flex items-center justify-between'>
                <AktivGroteskText
                  text='Address'
                  fontSize='text-[14px] md:text-[16px]'
                  fontWeight='font-[400]'
                />
                <button
                  onClick={() => setOpenAddressModal(true)}
                  className={`${aktivGrotesk.className} md:hidden text-[14px] font-[500] text-[#00953B]`}
                >
                  + Add
                </button>
              </div>
              <div className='flex flex-col gap-[10px] md:gap-[16px]'>
                <div className='h-[149px] md:h-fit md:p-[20px] box-border px-[19px] flex justify-center bg-white rounded-[10px]'>
                  <AddressCard index={0} />
                </div>
                <div className='h-[149px] px-[19px] md:h-fit md:p-[20px] box-border flex justify-center bg-[#FEF6B3] border-[1px] border-[#CDCDCD] rounded-[10px]'>
                  <AddressCard index={1} />
                </div>
              </div>
            </div>
            <GreenCTA
              text={SUBMIT}
              onClick={() => {}}
              className='w-full md:w-auto'
              paddingClass='pt-[17px] pb-[16px] mt-[16px] md:py-[20px] md:px-[60px] md:self-center'
              fontSize='text-[16px] md:text-[20px]'
              fontWeight='font-[700]'
            />
          </div>
        </div>
        {openAddressModal && (
          <AddressModal open={openAddressModal} setOpen={setOpenAddressModal} />
        )}
        <ClaimSuccessPopup
          open={openClaimSuccessPopup}
          onClose={() => setOpenClaimSuccessPopup(false)}
        />
        <ClaimExpiredPopup
          open={openClaimExpiredPopup}
          onClose={() => setOpenClaimExpiredPopup(false)}
        />
        <ClaimAlertPopup
          open={openClaimAlertPopup}
          onClose={() => setOpenClaimAlertPopup(false)}
        />
      </ScreenWrapper>
    </div>
  )
}

export default SubmitYourJoke
