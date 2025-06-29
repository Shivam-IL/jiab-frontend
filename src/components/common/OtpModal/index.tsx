import LoginSignupWrapper, {
  AuthHeading
} from '@/components/LoginSignupWrapper'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { aktivGrotesk } from '@/app/layout'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'
import useAppSelector from '@/hooks/useSelector'
import useAppDispatch from '@/hooks/useDispatch'
import { useCMSData } from '@/data'
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
import {
  GA_EVENTS,
  ICONS_NAMES,
  SESSION_STORAGE_KEYS,
  TOKEN_TYPE
} from '@/constants'
import { MainService } from '@/api/services/MainService'
import { LOCAL_STORAGE_KEYS } from '@/api/client/config'
import {
  getLocalStorageItem,
  removeSessionStorageItem,
  setLocalStorageItem
} from '@/utils'

import { triggerGAEvent } from '@/utils/gTagEvents'
import { useGlobalLoader } from '@/hooks/useGlobalLoader'
import {
  CDPEventPayloadBuilder,
  LoginCDPEventPayload
} from '@/api/utils/cdpEvents'
import { ILocalGeoData } from '@/api/types/GeolocationTypes'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'

const OtpModal = () => {
  const [otp, setOtp] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [mounted, setMounted] = useState<boolean>(false)
  const errorRef = useRef(false)

  const cmsData = useCMSData(mounted)

  const mainServiceInstance = MainService.getInstance()

  const { phoneNumber } = useAppSelector(state => state.auth)
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
  const { mutate: sendCDPEvent } = useSendCDPEvent()

  const dispatch = useAppDispatch()

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const resendOTP = () => {
    showLoader()
    requestOTP({ mobile_number: phoneNumber })
  }

  const handlerSubmitOtp = () => {
    triggerGAEvent(GA_EVENTS.SPRITE_J24_OTP_SUBMIT)
    if (otp.length === 0) {
      setError(cmsData.validation.otpVerificationRequired)
      return
    }
    if (otp.length !== 6) {
      setError(cmsData.validation.otpVerificationRequired)
      return
    }
    showLoader()
    verifyOTP({ otp, mobile_number: phoneNumber })
  }

  useEffect(() => {
    if (!isPending) {
      hideLoader()
    }
  }, [isPending, hideLoader])

  const triggerLoginCDPEvent = useCallback(
    (userIdentifier: string) => {
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
    },
    [sendCDPEvent, phoneNumber]
  )

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
        removeSessionStorageItem(
          SESSION_STORAGE_KEYS.HAS_SHOWN_SERIAL_CHILL_MODAL
        )
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
      setError(cmsData.validation.otpVerificationRequired)
    }
  }, [
    verifyOTPData,
    dispatch,
    triggerLoginCDPEvent,
    mainServiceInstance,
    cmsData
  ])

  return (
    <LoginSignupWrapper open={open} setOpen={setOpen} logo={true}>
      <div
        className={`absolute top-[-42%] left-1/2 transform -translate-x-1/2`}
      >
        <Image
          src='/assets/images/bottle-sprite-t.gif'
          alt='sprite'
          className='h-[200px] w-[166px]  mt-2'
          width={166}
          height={200}
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
          <SvgIcons name={ICONS_NAMES.CROSS} className='w-[20px] h-[20px]' />
        </button>
      </div>
      <div className={`flex flex-col gap-[12px] pt-[50px]`}>
        <div className='flex flex-col justify-center items-center md:gap-[12px] gap-[4px]'>
          <AuthHeading title={cmsData.otp.otpVerification} />
          <p className='text-center text-[#000] font-400 text-[12px]'>
            {cmsData.validation.otpVerificationRequired}
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
                if (valueString?.length < 6 && errorRef.current) {
                  setError(cmsData.validation.otpVerificationRequired)
                } else {
                  setError('')
                }
                setOtp(valueString)
              }}
              type='text'
              onBlur={() => {
                if (otp?.length < 6) {
                  errorRef.current = true
                  setError(cmsData.validation.otpVerificationRequired)
                }
              }}
            />
            {!counterEnd && (
              <span
                className={`text-center text-[#606060] font-400 text-[12px]`}
              >
                {cmsData.otp.tryAgainIn} 00:{counter}
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
                {cmsData.otp.resend}
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
            text={cmsData.otp.submit}
          />
        </form>
      </div>
    </LoginSignupWrapper>
  )
}

export default OtpModal
