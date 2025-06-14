import LoginSignupWrapper, {
  AuthHeading
} from '@/components/LoginSignupWrapper'
import React, { useEffect, useState } from 'react'
import { aktivGrotesk } from '@/app/layout'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'
import EditProfileImage from '@/components/EditProfileImage'
import useAppDispatch from '@/hooks/useDispatch'
import useAppSelector from '@/hooks/useSelector'
import {
  updateIsAuthenticated,
  updateIsFirstLogin,
  updateOtpFilled,
  updateOtpStatus,
  updatePhoneNumber,
  updateToken,
  updateEnableCoachMarks,
  updateCrossModal
} from '@/store/auth/auth.slice'
import SvgIcons from '../SvgIcons'
import { GA_EVENTS, ICONS_NAMES, TOKEN_TYPE } from '@/constants'
import { MainService } from '@/api/services/MainService'
import { useMutateSignUp } from '@/api/hooks/LoginHooks'
import { setLocalStorageItem } from '@/utils'
import { LOCAL_STORAGE_KEYS } from '@/api/client/config'
import { triggerGAEvent } from '@/utils/gTagEvents'

interface IUserData {
  avatar: string
  name: string
  number: string
  email: string
  invite_code: string
  agree: boolean
}

const Signup = () => {
  const mainServiceInstance = MainService.getInstance()

  const [open, setOpen] = useState<boolean>(true)
  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [inviteCodeError, setInviteCodeError] = useState<string>('')
  const [acceptTermsError, setAcceptTermsError] = useState<string>('')
  const [editProfileImage, setEditProfileImage] = useState<boolean>(false)

  const { isFirstLogin, phoneNumber, otpVerified } = useAppSelector(
    state => state.auth
  )
  const {
    mutate: signupToCoke,
    isPending,
    data: signupData
  } = useMutateSignUp()

  const [userData, setUserData] = useState<IUserData>({
    avatar: '',
    name: '',
    number: '',
    email: '',
    invite_code: '',
    agree: false
  })

  const [selectedAvatar, setSelectedAvatar] = useState<string>('')
  const { avatarsData } = useAppSelector(state => state.profile)

  const dispatch = useAppDispatch()

  const handleChange = (key: string, value: string | boolean) => {
    setEditProfileImage(false)
    setUserData({ ...userData, [key]: value })
  }

  const handleContainerClick = () => {
    if (editProfileImage) {
      setEditProfileImage(false)
    }
  }

  // Name validation
  useEffect(() => {
    if (!userData.name) {
      setNameError('')
      return
    }

    const timeoutId = setTimeout(() => {
      if (userData.name.length < 2) {
        setNameError('Name should be at least 2 characters long')
      } else if (!/^[a-zA-Z\s]*$/.test(userData.name)) {
        setNameError('Name should only contain letters and spaces')
      } else {
        setNameError('')
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [userData.name])

  // Email validation
  useEffect(() => {
    if (!userData.email) {
      setEmailError('')
      return
    }

    const timeoutId = setTimeout(() => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      if (!emailRegex.test(userData.email)) {
        setEmailError('Please enter a valid email address')
      } else {
        setEmailError('')
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [userData.email])

  useEffect(() => {
    if (avatarsData?.length > 0) {
      const avatar = avatarsData.find(
        (avatar: any) => avatar?.id?.toString() === userData?.avatar?.toString()
      )
      setSelectedAvatar(avatar?.image ?? '')
    }
  }, [userData.avatar])

  const isFormValid = () => {
    if (userData?.name === '') {
      setNameError('Please enter a valid name.')
    }
    if (userData?.email === '') {
      setEmailError('Please enter a valid Email ID.')
    }
    if (!userData?.agree) {
      setAcceptTermsError('Please accept the terms and conditions')
      return false
    }

    return (
      userData.name.length > 0 &&
      userData.email.length > 0 &&
      !nameError &&
      !emailError
    )
  }

  useEffect(() => {
    if (userData?.agree) {
      setAcceptTermsError('')
    }
  }, [userData?.agree])

  const removeAuthentication = () => {
    dispatch(updateIsFirstLogin({ isFirstLogin: false }))
    dispatch(updateIsAuthenticated({ isAuthenticated: false }))
    dispatch(updateOtpFilled({ otpFilled: false }))
    dispatch(updateOtpStatus({ otpSent: false }))
    dispatch(updatePhoneNumber({ phoneNumber: '' }))
    dispatch(updateToken({ token: '' }))
    dispatch(updateIsFirstLogin({ isFirstLogin: false }))
    mainServiceInstance.setAccessToken('')
  }

  useEffect(() => {
    if (isFirstLogin) {
      setUserData({
        ...userData,
        number: `+91-${phoneNumber}`
      })
    }
  }, [isFirstLogin])

  useEffect(() => {
    if (!otpVerified) {
      removeAuthentication()
    }
  }, [otpVerified])

  const handleSignup = () => {
    setEditProfileImage(false)
    triggerGAEvent(GA_EVENTS.SPRITE_J24_SIGNUP)
    if (isFormValid()) {
      const formData = {
        avatar: userData.avatar,
        email: userData.email,
        full_name: userData.name,
        mobile_number: phoneNumber,
        referral_code: userData.invite_code ?? ''
      }
      signupToCoke(formData)
    }
  }

  useEffect(() => {
    if (signupData?.ok) {
      const { data } = signupData
      const tokenType = data?.token_type ?? ''
      if (
        data?.access_token &&
        tokenType === TOKEN_TYPE.BEARER &&
        data?.refresh_token !== ''
      ) {
        setLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data?.access_token)
        setLocalStorageItem(
          LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
          data?.refresh_token
        )
        dispatch(updateToken({ token: data?.access_token }))
        mainServiceInstance.setAccessToken(data?.access_token)
        dispatch(updateIsAuthenticated({ isAuthenticated: true }))
        dispatch(updateIsFirstLogin({ isFirstLogin: false }))
        dispatch(updateEnableCoachMarks({ enableCoachMarks: true }))
        setOpen(false)
      }
    }
  }, [signupData])

  return (
    <LoginSignupWrapper
      open={open}
      setOpen={() => {
        setOpen(false)
        if (isFirstLogin) {
          removeAuthentication()
        }
      }}
      logo={true}
    >
      <div
        className={`flex flex-col gap-[24px] pt-[28px]`}
        onClick={handleContainerClick}
      >
        <div className='w-full absolute top-[4px] right-[4px] flex justify-end box-border pt-[10px] pr-[10px]'>
          <button
            className='flex justify-center items-center outline-none border-none'
            onClick={() => {
              setOpen(false)
              if (isFirstLogin) {
                removeAuthentication()
              }
            }}
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className='w-[16px] h-[16px]' />
          </button>
        </div>
        <div className='flex flex-col justify-center items-center gap-[8px]'>
          <AuthHeading title='Sign Up' />

          <p
            className={`${aktivGrotesk.className} font-[400] text-[#313131] md:text-[20px] text-[16px] w-[80%] flex justify-center text-center`}
          >
            Let&apos;s break the ice
          </p>
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <EditProfileImage
              name='avatar'
              image={selectedAvatar}
              editProfileImage={editProfileImage}
              setEditProfileImage={setEditProfileImage}
              onChange={handleChange}
            />
          </div>
        </div>
        <form
          onSubmit={event => {
            event.preventDefault()
          }}
          className='flex flex-col gap-[20px]'
          onClick={() => setEditProfileImage(false)}
        >
          <Input
            required={true}
            name='name'
            value={userData.name}
            placeholder='Full Name'
            onChange={handleChange}
            type='text'
            error={nameError}
          />
          <Input
            name='number'
            required={true}
            value={userData.number}
            placeholder='Mobile Number*'
            onChange={handleChange}
            type='text'
            readonly={true}
          />
          <Input
            name='email'
            required={true}
            value={userData.email}
            placeholder='Email ID'
            onChange={handleChange}
            type='email'
            error={emailError}
          />
          <Input
            name='invite_code'
            value={userData.invite_code}
            placeholder='Referral Invite Code'
            onChange={handleChange}
            type='text'
            error={inviteCodeError}
          />
          <div className='flex items-start gap-[8px]'>
            <input
              name='agree'
              checked={userData.agree}
              onChange={e => handleChange('agree', e.target.checked)}
              className='relative top-[2px] w-4 h-4 cursor-pointer accent-[#003087]'
              type='checkbox'
            />
            <span
              className={`${aktivGrotesk.className} font-[400] text-[12px]`}
            >
              I hereby state that I am older than 18 years of age and agree to
              the{' '}
              <span className='text-[#003087] font-[700] cursor-pointer'>
                Terms and Conditions
              </span>{' '}
              and{' '}
              <span className='font-[700] text-[#003087] cursor-pointer'>
                Privacy Policy
              </span>
              .
            </span>
          </div>
          {acceptTermsError && (
            <span className='text-[#FD0202] font-[400] text-[12px]'>
              {acceptTermsError}
            </span>
          )}
        </form>
        <GreenCTA
          onClick={() => {
            handleSignup()
          }}
          text='Submit'
        />
      </div>
    </LoginSignupWrapper>
  )
}

export default Signup
