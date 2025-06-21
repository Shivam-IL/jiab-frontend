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
  updateSurpriseMe,
  updateToken
} from '@/store/auth/auth.slice'
import { useMutateRequestOTP, useMutateVerifyOTP } from '@/api/hooks/LoginHooks'
import SvgIcons from '../SvgIcons'
import { GA_EVENTS, ICONS_NAMES, TOKEN_TYPE } from '@/constants'
import { MainService } from '@/api/services/MainService'
import { LOCAL_STORAGE_KEYS } from '@/api/client/config'
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem
} from '@/utils'

import { triggerGAEvent } from '@/utils/gTagEvents'
import { useGlobalLoader } from '@/hooks/useGlobalLoader'
import {
  CDPEventPayloadBuilder,
  LandingPageCDPEventPayload,
  LoginCDPEventPayload
} from '@/api/utils/cdpEvents'
import { ILocalGeoData } from '@/api/types/GeolocationTypes'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'

const OtpModal = () => {
  const [otp, setOtp] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const mainServiceInstance = MainService.getInstance()

  const { phoneNumber } = useAppSelector(state => state.auth)
  const { user } = useAppSelector(state => state.profile)
  const { mutate: requestOTP } = useMutateRequestOTP()
  const {
    mutate: verifyOTP,
    isPending,
    data: verifyOTPData
  } = useMutateVerifyOTP()
  const { showLoader, hideLoader } = useGlobalLoader()

  const { otpSent } = useAppSelector(state => state.auth)

  const [counter, setCounter] = useState<string>('59')
  const [counterEnd, setCounterEnd] = useState<boolean>(false)
  const [otpVerified, setOtpVerified] = useState<boolean>(false)
  const { mutate: sendCDPEvent } = useSendCDPEvent()

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
    showLoader()
    requestOTP({ mobile_number: phoneNumber })
  }

  const handlerSubmitOtp = () => {
    triggerGAEvent(GA_EVENTS.SPRITE_J24_OTP_SUBMIT)
    if (otp.length === 0) {
      setError('Please enter the OTP sent to your registered mobile number')
      return
    }
    if (otp.length !== 6) {
      setError('Please enter the OTP sent to your registered mobile number')
      return
    }
    showLoader()
    verifyOTP({ otp, mobile_number: phoneNumber })
  }

  useEffect(() => {
    if (!isPending) {
      hideLoader()
    }
  }, [isPending])

  const triggerLoginCDPEvent = (userIdentifier: string) => {
    const geoLocationData = JSON.parse(
      getLocalStorageItem(LOCAL_STORAGE_KEYS.USER_GEOLOCATION) ?? '{}'
    ) as ILocalGeoData
    console.log('geoLocationData', geoLocationData)
    const payload: LoginCDPEventPayload =
      CDPEventPayloadBuilder.buildLoginPayload({
        phone_e164: `+91${phoneNumber}`,
        user_identifier: userIdentifier,
        ...geoLocationData
      })
    sendCDPEvent(payload)
  }

  useEffect(() => {
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
        setLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
        dispatch(updateSurpriseMe({ surpriseMe: true }))
        //TODO: Have to Add user Id
        triggerLoginCDPEvent(verifyTokenData?.user_id ?? '')
      }
      mainServiceInstance.setAccessToken(token)
      dispatch(updateOtpFilled({ otpFilled: true }))
      dispatch(updateOtpVerified({ otpVerified: true }))
      dispatch(updateIsAuthenticated({ isAuthenticated: true }))
      setOpen(false)
    } else if (verifyOTPData?.ok === false) {
      const { data } = verifyOTPData
      setError(data?.message ?? 'Invalid OTP')
    }
  }, [verifyOTPData, isPending])

  return (
    <LoginSignupWrapper open={open} setOpen={setOpen} logo={true}>
      <div
        className={`absolute top-[-42%] left-1/2 transform -translate-x-1/2`}
      >
        <img
          src='/assets/images/bottle-sprite-t.gif'
          alt='sprite'
          className='h-[200px] w-[166px]  mt-2'
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
      <div className={`flex flex-col gap-[12px] pt-[50px]`}>
        <div className='flex flex-col justify-center items-center md:gap-[12px] gap-[4px]'>
          <AuthHeading title='OTP VERIFICATION' />
          <p className='text-center text-[#000] font-400 text-[12px]'>
            Please enter the OTP sent to your
            <br />
            registered mobile number
          </p>
        </div>
        <form
          onSubmit={event => {
            event.preventDefault()
          }}
          className='flex flex-col gap-[12px]'
        >
          <div className='flex flex-col gap-[10px]'>
            <Input
              name='otp'
              value={otp}
              placeholder='OTP*'
              onChange={(key, value) => {
                const numericValue = value?.replace(/[^0-9]/g, '')
                const valueString = numericValue?.slice(0, 6)
                setOtp(valueString)
              }}
              type='text'
            />
            {!counterEnd && (
              <span
                className={`text-center text-[#606060] font-400 text-[12px]`}
              >
                Try Again in 00:{counter}
              </span>
            )}
            {counterEnd && (
              <button
                onClick={() => {
                  triggerGAEvent(GA_EVENTS.SPRITE_J24_RESEND_OTP)
                  setCounterEnd(false)
                  setCounter('59')
                  resendOTP()
                }}
                className={`text-[#606060] self-center border-b-[#606060] border-b-[1px] ${aktivGrotesk.className} font-[500] text-[13px] md:text-[16px] outline-none`}
              >
                Resend
              </button>
            )}
            {error && (
              <span
                className={`text-center text-red font-400 text-[12px] mt-[4px]`}
              >
                {error}
              </span>
            )}
          </div>

          <GreenCTA
            paddingClass='px-[24px] py-[16px]'
            borderRadius='rounded-[112px]'
            fontSize='text-[14px] md:text-[16.5px]'
            onClick={() => {
              handlerSubmitOtp()
            }}
            text='Submit'
          />
        </form>
      </div>
    </LoginSignupWrapper>
  )
}

export default OtpModal
