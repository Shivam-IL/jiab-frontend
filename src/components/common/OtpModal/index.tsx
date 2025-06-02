import LoginSignupWrapper, {
  AuthHeading
} from '@/components/LoginSignupWrapper'
import React, { useEffect, useState } from 'react'
import sprite from '../../../../public/other-svgs/sprite.svg'
import Image from 'next/image'
import { aktivGrotesk } from '@/app/layout'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'
import useAppSelector from '@/hooks/useSelector'
import useAppDispatch from '@/hooks/useDispatch'
import { updateOtpFilled } from '@/store/auth/auth.slice'
import { useMutateRequestOTP, useMutateVerifyOTP } from '@/api/hooks/LoginHooks'

const OtpModal = () => {
  const [otp, setOtp] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)

  const { phoneNumber } = useAppSelector(state => state.auth)
  const {
    mutate: requestOTP,
    isPending: requestOTPIsPending,
    isSuccess: requestOTPIsSuccess,
    data: requestOTPData
  } = useMutateRequestOTP()
  const { mutate: verifyOTP, isPending, isSuccess, data } = useMutateVerifyOTP()

  const { otpSent } = useAppSelector(state => state.auth)

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
    if (!otp) {
      setError('')
      return
    }

    const timeoutId = setTimeout(() => {
      // Check if it's a valid 10-digit number
      if (!/^\d{6}$/.test(otp)) {
        setError('Please enter a valid OTP')
      } else {
        setError('')
      }
    }, 500)

    // Cleanup timeout on component unmount or when mobileNumber changes
    return () => clearTimeout(timeoutId)
  }, [otp])

  const resendOTP = () => {
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
    if (isPending && isSuccess) {
      const { data: responseData } = data
      console.log(responseData)
        dispatch(updateOtpFilled({ otpFilled: true }))
        setOpen(false)
    }
  }, [isPending, isSuccess])
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
                setOtp(value)
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
                className={`text-[#606060] self-center border-b-[#606060] border-b-[1px] ${aktivGrotesk.className} font-[500] text-[12px] outline-none`}
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
