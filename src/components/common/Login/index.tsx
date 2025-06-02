'use client'

import { aktivGrotesk } from '@/app/layout'
import Input from '@/components/Input'
import LoginSignupWrapper, {
  AuthHeading
} from '@/components/LoginSignupWrapper'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import GreenCTA from '@/components/GreenCTA'
import useDispatch from '../../../hooks/useDispatch'
import useAppSelector from '@/hooks/useSelector'
import {
  updateOtpStatus,
  updateLoginModal,
  updatePhoneNumber
} from '@/store/auth/auth.slice'
import { useMutateRequestOTP } from '@/api/hooks/LoginHooks'

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

  const handleClose = () => {
    dispatch(updateLoginModal({ loginModal: false }))
  }

  useEffect(() => {
    // Skip validation if number is empty
    if (!mobileNumber) {
      setError('')
      return
    }

    const timeoutId = setTimeout(() => {
      // Check if it's a valid 10-digit number
      if (!/^\d{10}$/.test(mobileNumber)) {
        setError('Please enter a valid 10-digit mobile number')
      } else {
        setError('')
      }
    }, 500)

    // Cleanup timeout on component unmount or when mobileNumber changes
    return () => clearTimeout(timeoutId)
  }, [mobileNumber])

  const handleGetOTP = () => {
    requestOTP({ mobile_number: mobileNumber })
  }

  const handleDataUpdation = () => {
    if (isSuccess) {
      const otpData = data
      const { data: responseData } = otpData
      if (otpData?.ok) {
        dispatch(updatePhoneNumber({ phoneNumber: mobileNumber }))
        dispatch(updateOtpStatus({ otpSent: true }))
        handleClose()
      }
    }
  }

  useEffect(() => {
    handleDataUpdation()
  }, [isPending])

  console.log(data, isPending, isSuccess)

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
      <div className={`flex flex-col gap-[24px] pt-[50px]`}>
        <div className='flex flex-col justify-center items-center gap-[8px]'>
          <AuthHeading title='LOGIN' />
        </div>
        <div className='flex flex-col gap-[28px]'>
          <Input
            required={true}
            name='mobileNumber'
            value={mobileNumber}
            placeholder='Mobile Number*'
            error={error}
            onChange={(key, value) => {
              setMobileNumber(value)
            }}
            type='text'
          />

          <GreenCTA
            className=''
            onClick={() => {
              handleGetOTP()
            }}
            text='Get OTP'
          />
        </div>
      </div>
    </LoginSignupWrapper>
  )
}

export default Login
