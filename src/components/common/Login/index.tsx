'use client'

import { aktivGrotesk } from '@/app/layout'
import Input from '@/components/Input'
import LoginSignupWrapper, { AuthHeading } from '@/components/LoginSignupWrapper'
import React, { useEffect, useState } from 'react'
import sprite from '../../../../public/other-svgs/sprite.svg'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import GreenCTA from '@/components/GreenCTA'
import useDispatch from '../../../hooks/useDispatch'
import { updateOtpStatus } from '@/store/auth/auth.slice'

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [open, setOpen] = useState<boolean>(true)

  const dispatch = useDispatch()

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

  return (
    <LoginSignupWrapper open={open} setOpen={setOpen} logo={true}>
      <div
        className={`absolute top-[-60%]
     left-1/2 transform -translate-x-1/2`}
      >
        <Image src={sprite} alt='sprite' />
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
            onClick={() => {
              dispatch(updateOtpStatus({ otpSent: true }))
              setOpen(false)
            }}
            text='Get OTP'
          />
        </div>
      </div>
    </LoginSignupWrapper>
  )
}

export default Login
