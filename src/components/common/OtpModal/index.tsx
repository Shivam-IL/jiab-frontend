import LoginSignupWrapper, {
  AuthHeading
} from '@/components/LoginSignupWrapper'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { aktivGrotesk } from '@/app/layout'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'
import useAppSelector from '@/hooks/useSelector'
import useAppDispatch from '@/hooks/useDispatch'
import {
  updateIsAuthenticated,
  updateIsFirstLogin,
  updateLoginModal,
  updateOtpFilled,
  updateOtpStatus,
  updateOtpVerified,
  updateToken
} from '@/store/auth/auth.slice'
import { useMutateRequestOTP, useMutateVerifyOTP } from '@/api/hooks/LoginHooks'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES, TOKEN_TYPE } from '@/constants'
import { MainService } from '@/api/services/MainService'
import { LOCAL_STORAGE_KEYS } from '@/api/client/config'
import { removeLocalStorageItem, setLocalStorageItem } from '@/utils'

const OtpModal = () => {
  const [otp, setOtp] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const mainServiceInstance = MainService.getInstance()

  const { phoneNumber } = useAppSelector(state => state.auth)
  const { mutate: requestOTP } = useMutateRequestOTP()
  const {
    mutate: verifyOTP,
    isPending,
    isSuccess,
    data: verifyOTPData
  } = useMutateVerifyOTP()

  const { otpSent, isAuthenticated } = useAppSelector(state => state.auth)

  const [counter, setCounter] = useState<string>('12')
  const [counterEnd, setCounterEnd] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (parseInt(counter, 10) > 0) {
      timer = setInterval(() => {
        setCounter(prev => {
          const newNum = parseInt(prev, 10) - 1
          if (newNum < 10) {
            return `0${newNum}`
          }
          return newNum.toString()
        })
      }, 1000)
    } else {
      setCounterEnd(true)
    }
    return () => {
      if (timer) clearInterval(timer)
    }
  }, [otpSent, counter])

  useEffect(() => {
    if (otpSent) {
      setOpen(true)
    }
  }, [otpSent])

  useEffect(() => {
    if (otp?.length === 6) {
      setError('')
    }
  }, [otp])

  const resendOTP = () => {
    if (otp?.length !== 6) {
      setError('Please enter a valid OTP')
      return
    }
    requestOTP({ mobile_number: phoneNumber })
  }

  const handlerSubmitOtp = () => {
    if (otp.length !== 6) {
      setError('Please enter a valid OTP')
      return
    }
    verifyOTP({ otp, mobile_number: phoneNumber })
  }

  useEffect(() => {
    console.log('verifyOTPData', verifyOTPData)
    if (verifyOTPData?.ok) {
      const { data: verifyTokenData } = verifyOTPData
      const token = verifyTokenData?.access_token ?? ''
      const tokenType = verifyTokenData?.token_type ?? ''
      dispatch(updateToken({ token }))
      dispatch(updateOtpVerified({ otpVerified: true }))

      if (tokenType === TOKEN_TYPE.TEMPORARY) {
        dispatch(updateIsFirstLogin({ isFirstLogin: true }))
      } else if (tokenType === TOKEN_TYPE.BEARER) {
        const refreshToken = verifyTokenData?.refresh_token ?? ''
        dispatch(updateIsFirstLogin({ isFirstLogin: false }))
        dispatch(updateIsAuthenticated({ isAuthenticated: true }))
        setLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
      }
      mainServiceInstance.setAccessToken(token)
      dispatch(updateOtpFilled({ otpFilled: true }))
      setOpen(false)
    } else if (verifyOTPData?.ok === false) {
      const { data } = verifyOTPData
      setError(data?.message ?? 'Invalid OTP')
    }
  }, [verifyOTPData, isPending])

  return (
    <LoginSignupWrapper open={open} setOpen={setOpen} logo={true}>
      <div
        className={`absolute top-[-50%] left-1/2 transform -translate-x-1/2`}
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
            setOpen(false)
            dispatch(updateIsAuthenticated({ isAuthenticated: false }))
            dispatch(updateIsFirstLogin({ isFirstLogin: false }))
            dispatch(updateOtpVerified({ otpVerified: false }))
            dispatch(updateOtpFilled({ otpFilled: false }))
            dispatch(updateLoginModal({ loginModal: false }))
            dispatch(updateOtpStatus({ otpSent: false }))
          }}
        >
          <SvgIcons name={ICONS_NAMES.CROSS} className='w-[16px] h-[16px]' />
        </button>
      </div>
      <div className={`flex flex-col gap-[24px] pt-[50px]`}>
        <div className='flex flex-col justify-center items-center md:gap-[12px] gap-[8px]'>
          <AuthHeading title='OTP VERIFICATION' />

          <p
            className={`${aktivGrotesk.className} font-[400] md:text-[16px] text-[12px] w-[80%] flex justify-center text-center`}
          >
            Please enter the OTP sent to your registered mobile number
          </p>
        </div>
        <div className='flex flex-col md:gap-[24px] gap-[28px]'>
          <div className='flex flex-col gap-[12px]'>
            <Input
              name='otp'
              value={otp}
              placeholder='OTP*'
              error={error}
              onChange={(key, value) => {
                const numericValue = value?.replace(/[^0-9]/g, '')
                const valueString = numericValue?.slice(0, 6)
                setOtp(valueString)
              }}
              type='text'
            />
            {!counterEnd && (
              <span
                className={`text-center text-[#606060] font-400 md:text-[16px] text-[12px]`}
              >
                Try Again in 00:{counter}
              </span>
            )}
            {counterEnd && (
              <button
                onClick={() => {
                  setCounterEnd(false)
                  setCounter('12')
                  resendOTP()
                }}
                className={`text-[#606060] self-center border-b-[#606060] border-b-[1px] ${aktivGrotesk.className} font-[500] text-[12px] md:text-[16px] outline-none`}
              >
                Resend
              </button>
            )}
          </div>

          <GreenCTA
            onClick={() => {
              handlerSubmitOtp()
            }}
            text='Submit'
          />
        </div>
      </div>
    </LoginSignupWrapper>
  )
}

export default OtpModal
