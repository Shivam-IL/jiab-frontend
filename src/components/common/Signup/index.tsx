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
  updateEnableCoachMarks
} from '@/store/auth/auth.slice'
import SvgIcons from '../SvgIcons'
import {
  GA_EVENTS,
  ICONS_NAMES,
  LOCAL_KEYS,
  SESSION_STORAGE_KEYS,
  TOKEN_TYPE
} from '@/constants'
import { MainService } from '@/api/services/MainService'
import { useMutateSignUp } from '@/api/hooks/LoginHooks'
import {
  clearSessionStorage,
  getLocalStorageItem,
  getSessionStorageItem,
  removeSessionStorageItem,
  setLocalStorageItem,
  setSessionStorageItem
} from '@/utils'
import { LOCAL_STORAGE_KEYS } from '@/api/client/config'
import { triggerGAEvent } from '@/utils/gTagEvents'
import { messaging, getToken } from '@/lib/firebase'
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder,
  RegistrationCDPEventPayload
} from '@/api/utils/cdpEvents'
import { ILocalGeoData } from '@/api/types/GeolocationTypes'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'
import { useRouter } from 'next/navigation'

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
  const { mutate: signupToCoke, data: signupData } = useMutateSignUp()

  const [userData, setUserData] = useState<IUserData>({
    avatar: '',
    name: '',
    number: '',
    email: '',
    invite_code: '',
    agree: false
  })

  const [error, setError] = useState<string>('')

  const [selectedAvatar, setSelectedAvatar] = useState<string>('')
  const { avatarsData } = useAppSelector(state => state.profile)
  const [fcmToken, setFcmToken] = useState<string>('')
  const { mutate: sendCDPEvent } = useSendCDPEvent()

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

  const router = useRouter()

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

  const trigerrSignupCDP = (userId: string, phoneNumber: string) => {
    const geoLocationData = JSON.parse(
      getLocalStorageItem(LOCAL_STORAGE_KEYS.USER_GEOLOCATION) ?? '{}'
    ) as ILocalGeoData
    const payload: RegistrationCDPEventPayload =
      CDPEventPayloadBuilder.buildRegistrationPayload({
        phone_e164: `+91${phoneNumber}`,
        email: userData.email,
        first_name: userData.name,
        ...geoLocationData,
        user_identifier: userId
      })
    sendCDPEvent(payload)
  }

  // Generate FCM token for push notifications
  useEffect(() => {
    const generateFCMToken = async () => {
      try {
        if (!messaging) {
          console.log('Firebase messaging not available')
          return
        }

        // Check if service worker is supported
        if ('serviceWorker' in navigator) {
          // Register service worker
          await navigator.serviceWorker.register('/firebase-messaging-sw.js')

          // Request notification permission
          const permission = await Notification.requestPermission()

          if (permission === 'granted') {
            // Generate FCM token
            const token = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
            })

            if (token) {
              console.log('FCM Token generated for signup:', token)
              setFcmToken(token)
              // Store token in localStorage for persistence
              localStorage.setItem('fcm_token', token)
            } else {
              console.log('No FCM token available')
            }
          } else {
            console.log('Notification permission denied')
          }
        }
      } catch (error) {
        console.error('Error generating FCM token:', error)
      }
    }

    // Only generate token during signup process
    if (isFirstLogin && phoneNumber) {
      generateFCMToken()
    }
  }, [isFirstLogin, phoneNumber])

  const handleSignup = () => {
    setError('')
    setEditProfileImage(false)
    triggerGAEvent(GA_EVENTS.SPRITE_J24_SIGNUP)
    if (isFormValid()) {
      const formData = {
        avatar: userData.avatar,
        email: userData.email,
        full_name: userData.name,
        mobile_number: phoneNumber,
        referral_code: userData.invite_code ?? '',
        device_token: fcmToken || '' // Include FCM device token
      }
      signupToCoke(formData)
    }
  }

  const trigerReferCompleteCDpEvent = (
    referee_mobile_number: string,
    userId: string
  ) => {
    if (referee_mobile_number && userId) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildReferralCompletedPayload(
          referee_mobile_number,
          userId
        )
      sendCDPEvent(payload)
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
        setLocalStorageItem(LOCAL_KEYS.CONTEST_TOUR, 'true')
        setOpen(false)
        removeSessionStorageItem(SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE)
        trigerrSignupCDP(data?.user_id ?? '', data?.phone_number ?? '')
        if (data?.referral_phone_number) {
          trigerReferCompleteCDpEvent(
            data?.referral_phone_number,
            data?.user_id
          )
        }
      }
    } else if (signupData?.ok === false) {
      const { message } = signupData as any
      setError(message)
    }
  }, [signupData])

  useEffect(() => {
    if (getSessionStorageItem(SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE)) {
      const data = JSON.parse(
        getSessionStorageItem(SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE) ?? '{}'
      )
      if (data.phoneNumber) {
        setUserData({
          ...userData,
          number: `+91-${data.phoneNumber}`
        })
        dispatch(updatePhoneNumber({ phoneNumber: data.phoneNumber }))
      }
    }
  }, [])

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
              clearSessionStorage()
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
              id='agree'
              checked={userData.agree}
              onChange={e => handleChange('agree', e.target.checked)}
              className='relative top-[2px] w-4 h-4 cursor-pointer accent-[#003087]'
              type='checkbox'
            />
            <label
              htmlFor='agree'
              className={`${aktivGrotesk.className} font-[400] text-[12px] cursor-pointer`}
            >
              I hereby state that I am older than 18 years of age and agree to
              the{' '}
              <span className='text-[#003087] font-[700] cursor-pointer'>
                <button
                  type='button'
                  onClick={() => {
                    const data = {
                      accessToken: getLocalStorageItem(
                        LOCAL_STORAGE_KEYS.ACCESS_TOKEN
                      ),
                      phoneNumber: phoneNumber
                    }
                    setSessionStorageItem(
                      SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE,
                      JSON.stringify(data)
                    )
                    router.push('/terms-and-conditions')
                  }}
                >
                  Terms and Conditions
                </button>
              </span>{' '}
              and{' '}
              <span className='font-[700] text-[#003087] cursor-pointer'>
                <button
                  type='button'
                  onClick={() => {
                    const data = {
                      accessToken: getLocalStorageItem(
                        LOCAL_STORAGE_KEYS.ACCESS_TOKEN
                      ),
                      phoneNumber: phoneNumber
                    }
                    setSessionStorageItem(
                      SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE,
                      JSON.stringify(data)
                    )
                    router.push('/privacy-policy')
                  }}
                >
                  Privacy Policy
                </button>
              </span>
              .
            </label>
          </div>
          {acceptTermsError && (
            <span className='text-[#FD0202] font-[400] text-[12px]'>
              {acceptTermsError}
            </span>
          )}
          {error && (
            <span className='text-[#FD0202] font-[400] text-[12px]'>
              {error}
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
