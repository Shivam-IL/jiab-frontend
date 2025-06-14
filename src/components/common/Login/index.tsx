'use client'

import Input from '@/components/Input'
import LoginSignupWrapper, {
  AuthHeading
} from '@/components/LoginSignupWrapper'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import GreenCTA from '@/components/GreenCTA'
import useDispatch from '../../../hooks/useDispatch'
import useAppSelector from '@/hooks/useSelector'
import {
  updateOtpStatus,
  updateLoginModal,
  updatePhoneNumber,
  updateCrossModal
} from '@/store/auth/auth.slice'
import { useMutateRequestOTP } from '@/api/hooks/LoginHooks'
import SvgIcons from '../SvgIcons'
import { GA_EVENTS, ICONS_NAMES } from '@/constants'
import { triggerGAEvent } from '@/utils/gTagEvents'


const Login = () => {
  const {
    mutate: requestOTP,
    isPending,
    isSuccess,
    data
  } = useMutateRequestOTP()
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [error, setError] = useState<string>('')

  const dispatch = useDispatch()
  const { loginModal } = useAppSelector(state => state.auth)

  const handleClose = useCallback(() => {
    dispatch(updateLoginModal({ loginModal: false }))
  }, [dispatch, updateLoginModal])

  useEffect(() => {
    if (
      mobileNumber?.length === 10 &&
      mobileNumber?.[0] &&
      parseInt(mobileNumber[0]) < 6
    ) {
      setError('Please enter a valid 10-digit mobile number')
    } else if (
      mobileNumber?.length === 10 &&
      mobileNumber?.[0] &&
      parseInt(mobileNumber[0]) >= 6
    ) {
      setError('')
    }
  }, [mobileNumber])

  const handleGetOTP = () => {
    triggerGAEvent(GA_EVENTS.SPRITE_J24_GET_OTP)
    if (
      mobileNumber?.length !== 10 ||
      !mobileNumber?.[0] ||
      parseInt(mobileNumber[0]) < 6
    ) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }
    requestOTP({ mobile_number: mobileNumber })
  }

  const handleDataUpdation = useCallback(() => {
    if (isSuccess) {
      const otpData = data
      if (otpData?.ok) {
        dispatch(updatePhoneNumber({ phoneNumber: mobileNumber }))
        dispatch(updateOtpStatus({ otpSent: true }))
        handleClose()
      }
    }
  }, [isSuccess, data, dispatch, handleClose, mobileNumber])

  useEffect(() => {
    handleDataUpdation()
  }, [isPending, handleDataUpdation])


  return (
    <LoginSignupWrapper open={loginModal} setOpen={handleClose} logo={true}>
      <div
        className={`absolute top-[-60%]
     left-1/2 transform -translate-x-1/2`}
      >
        <Image
          src='/videos/bottle-sprite-t.gif'
          alt='sprite'
          className='h-[234.68px] w-full mt-2'
          width={134.68}
          height={234.68}
        />
      </div>
      <div className='w-full absolute top-[4px] right-[4px] flex justify-end box-border pt-[10px] pr-[10px]'>
        <button
          className='flex justify-center items-center outline-none border-none'
          onClick={() => {
            handleClose()
            dispatch(updateCrossModal({ crossModal: true }))
          }}
        >
          <SvgIcons name={ICONS_NAMES.CROSS} className='w-[16px] h-[16px]' />
        </button>
      </div>
      <div className={`flex flex-col gap-[24px] pt-[50px]`}>
        <div className='flex flex-col justify-center items-center gap-[8px]'>
          <AuthHeading title='LOG IN' />
        </div>
        <form
          onSubmit={event => {
            event.preventDefault()
          }}
          className='flex flex-col gap-[28px]'
        >
          <Input
            required={true}
            name='mobileNumber'
            value={mobileNumber}
            placeholder='Mobile Number*'
            error={error}
            onChange={(key, value) => {
              const numericValue = value?.replace(/[^0-9]/g, '')
              const valueString = numericValue?.slice(0, 10)
              setMobileNumber(valueString)
            }}
            type='text'
          />

          <GreenCTA
            disabled={isPending}
            className=''
            onClick={() => {
              handleGetOTP()
            }}
            text='Get OTP'
          />
        </form>
      </div>
    </LoginSignupWrapper>
  )
}

export default Login
