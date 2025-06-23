import { LOCAL_STORAGE_KEYS } from '@/api/client/config'
import { useMutateRefreshToken } from '@/api/hooks/LoginHooks'
import {
  useGetUserAddresses,
  useGetAvatarsData,
  useGetUserProfileDetails,
  useChangeChatLanguage
} from '@/api/hooks/ProfileHooks'
import gluedin from 'gluedin'
import { MainService } from '@/api/services/MainService'
import {
  LANGUAGE_IDS,
  MNEMONICS_TO_ID,
  REDUX_UPDATION_TYPES,
  SESSION_STORAGE_KEYS
} from '@/constants'
import useAppDispatch from '@/hooks/useDispatch'
import {
  updateIsAuthenticated,
  updateSurpriseMe,
  updateToken,
  updateGludeinIsAuthenticated,
  updateRefreshTokenNotVerified,
  updateLoginModal,
  updateIsFirstLogin,
  updateOtpVerified,
  updateOtpFilled
} from '@/store/auth/auth.slice'
import {
  updateAddresses,
  updateAvatarsData,
  updateBalance,
  updateRank,
  updateReferralData,
  updateUser,
  updateUserSubmittedJokes
} from '@/store/profile/profile.slice'
import {
  getLocalStorageItem,
  setLocalStorageItem,
  getSessionStorageItem
} from '@/utils'
import { ReactNode, useEffect, useState } from 'react'
import { useGetAllReferrals } from '@/api/hooks/ReferralHooks'
import { useMutateGludeinLogin } from '@/api/hooks/GluedinHooks'
import {
  useGetGenres,
  useGetJokesFormats,
  useGetLanguages
} from '@/api/hooks/ReferenceHooks'
import {
  updateGenres,
  updateJokesFormats,
  updateLanguages
} from '@/store/reference'
import { useGetUserSubmittedJokes } from '@/api/hooks/JokeHooks'
import { clearAllModalSessions } from '@/hooks/useSessionModal'
import { usePathname, useSearchParams } from 'next/navigation'
import useAppSelector from '@/hooks/useSelector'
import { setLanguage } from '@/store/language/language.slice'
import { useGetUserGeolocation } from '@/api/hooks/GeolocationHooks'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder,
  LandingPageCDPEventPayload
} from '@/api/utils/cdpEvents'
import { ILocalGeoData } from '@/api/types/GeolocationTypes'

const mainServiceInstance = MainService.getInstance()

const InitialDataLoader = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const [tokenUpdated, setTokenUpdated] = useState(false)
  const { data: userProfileData } = useGetUserProfileDetails()
  const { data: userAddressesData } = useGetUserAddresses()
  const { mutate: mutateGludeinLogin, data: gluedinLoginData } =
    useMutateGludeinLogin()

  const searchParams = useSearchParams()
  const refreshTokenFromParams = searchParams.get('refresh')
  const langKey = searchParams.get('lang')

  const gluedInSDKInitilize = new gluedin.GluedInSDKInitilize()
  gluedInSDKInitilize.initialize({
    apiKey: process.env.NEXT_PUBLIC_GLUEDIN_API_KEY || '',
    secretKey: process.env.NEXT_PUBLIC_GLUEDIN_SECRET_KEY || ''
  })
  const { data: referralData } = useGetAllReferrals({ page: 1 })
  const { data: avatarsData } = useGetAvatarsData()
  const { data: genresData } = useGetGenres()
  const { data: languagesData } = useGetLanguages()
  const { data: jokesFormatsData } = useGetJokesFormats()
  const { data: userSubmittedJokesData } = useGetUserSubmittedJokes()
  useGetUserGeolocation({
    enabled: true,
    params: 'userGeolocation'
  })
  const { mutate: mutateChangeChatLanguage } = useChangeChatLanguage()
  const { selectedLanguage } = useAppSelector(state => state.language)

  const {
    mutate: mutateRefreshToken,
    data: refreshTokenData,
    isPending: refreshTokenLoading
  } = useMutateRefreshToken()
  const { mutate: sendCDPEvent } = useSendCDPEvent()

  const trigerConsentPush = (userId: string) => {
    if (userId && Notification.permission === 'granted') {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildPushConsentPayload({
          user_identifier: userId
        })
      sendCDPEvent(payload)
    }
  }

  useEffect(() => {
    const signupKeepAlive = getSessionStorageItem(
      SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE
    )
    if (signupKeepAlive && pathname === '/') {
      const { accessToken } = JSON.parse(signupKeepAlive)
      if (accessToken) {
        dispatch(updateOtpFilled({ otpFilled: true }))
        mainServiceInstance.setAccessToken(accessToken)
        dispatch(updateToken({ token: accessToken }))
        setLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken)
        dispatch(updateIsFirstLogin({ isFirstLogin: true }))
        dispatch(updateOtpVerified({ otpVerified: true }))
        dispatch(updateIsAuthenticated({ isAuthenticated: true }))
      }
    }
  }, [pathname, dispatch])

  useEffect(() => {
    if (langKey) {
      const langCode =
        LANGUAGE_IDS[langKey as unknown as keyof typeof LANGUAGE_IDS] ?? 1
      dispatch(setLanguage(langCode))
    }
  }, [langKey, dispatch])

  useEffect(() => {
    const refreshToken =
      getLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN) ??
      refreshTokenFromParams
    if (refreshToken) {
      mutateRefreshToken({ refresh_token: refreshToken })
      const userDetails = getLocalStorageItem(LOCAL_STORAGE_KEYS.USER_DETAILS)
      const addressesDetails = getLocalStorageItem(LOCAL_STORAGE_KEYS.ADDRESSES)
      if (userDetails) {
        const { rank, current_balance, user } = JSON.parse(userDetails)
        dispatch(updateRank({ rank }))
        dispatch(updateBalance({ current_balance }))
        dispatch(updateUser({ user }))
      }
      if (addressesDetails) {
        const data = JSON.parse(addressesDetails)
        dispatch(updateAddresses({ addresses: data?.addresses }))
      }
    } else {
      if (
        getSessionStorageItem(SESSION_STORAGE_KEYS.SIGNUP_KEEP_ALIVE) &&
        pathname === '/'
      ) {
        dispatch(updateIsAuthenticated({ isAuthenticated: true }))
      } else {
        dispatch(updateIsAuthenticated({ isAuthenticated: false }))
      }
      dispatch(updateToken({ token: '' }))
      dispatch(updateRefreshTokenNotVerified({ refreshTokenNotVerified: true }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTokenFromParams])

  useEffect(() => {
    if (refreshTokenData?.ok) {
      const { data } = refreshTokenData ?? {}
      const { access_token, refresh_token } = data ?? {}
      dispatch(updateToken({ token: access_token }))
      mainServiceInstance.setAccessToken(access_token)
      setLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refresh_token)
      setLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, access_token)
      dispatch(updateSurpriseMe({ surpriseMe: true }))
      setTokenUpdated(true)
    } else if (refreshTokenData?.ok === false) {
      localStorage.clear()
      dispatch(updateIsAuthenticated({ isAuthenticated: false }))
      if (refreshTokenFromParams) {
        dispatch(updateLoginModal({ loginModal: true }))
      }
      dispatch(updateToken({ token: '' }))
      clearAllModalSessions()
    }
  }, [refreshTokenLoading, refreshTokenData, dispatch, refreshTokenFromParams])

  useEffect(() => {
    if (tokenUpdated) {
      setTimeout(() => {
        dispatch(updateIsAuthenticated({ isAuthenticated: true }))
        setTokenUpdated(false)
      }, 1000)
    }
  }, [tokenUpdated, dispatch])

  // Handle profile data changes
  useEffect(() => {
    if (userProfileData?.ok) {
      const geoLocationData = JSON.parse(
        getLocalStorageItem(LOCAL_STORAGE_KEYS.USER_GEOLOCATION) ?? '{}'
      ) as ILocalGeoData
      console.log('geoLocationData', geoLocationData)
      const { data } = userProfileData?.data ?? {}
      dispatch(updateRank({ rank: data?.rank }))
      dispatch(updateBalance({ current_balance: data?.current_balance }))
      dispatch(updateUser({ user: { ...data?.user } }))
      const localData = {
        rank: data?.rank,
        current_balance: data?.current_balance,
        user: { ...data?.user }
      }
      trigerConsentPush(data?.user?.id)
      if (refreshTokenFromParams) {
        const payload: LandingPageCDPEventPayload =
          CDPEventPayloadBuilder.buildLandingPageFromWAPayload({
            user_identifier: data?.user?.id,
            ...geoLocationData,
            referrer: window.location.href,
            phone_e164: `+91${data?.user?.phone_number}`
          })
        sendCDPEvent(payload)
      } else {
        const payload: LandingPageCDPEventPayload =
          CDPEventPayloadBuilder.buildLandingPagePayload({
            user_identifier: data?.user?.id,
            ...geoLocationData
          })
        sendCDPEvent(payload)
      }
      if (data?.user?.id) {
        const user_id = data.user.id
        mutateGludeinLogin({ user_id })
      }
      setLocalStorageItem(
        LOCAL_STORAGE_KEYS.USER_DETAILS,
        JSON.stringify(localData)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfileData, dispatch])

  useEffect(() => {
    if (userAddressesData?.ok) {
      const { data } = userAddressesData ?? {}
      dispatch(
        updateAddresses({
          type: REDUX_UPDATION_TYPES.MULTIPLE_ADDED,
          address: data
        })
      )
      const localData = {
        addresses: data
      }
      setLocalStorageItem(
        LOCAL_STORAGE_KEYS.ADDRESSES,
        JSON.stringify(localData)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddressesData, dispatch])

  useEffect(() => {
    if (referralData?.ok) {
      const { data } = referralData ?? {}
      dispatch(
        updateReferralData({
          referral_data: data?.referral_data ?? [],
          type: REDUX_UPDATION_TYPES.MULTIPLE_ADDED
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referralData, dispatch])

  useEffect(() => {
    if (avatarsData?.ok) {
      const modifiedData = avatarsData?.data?.map(
        (item: { id: number; name: string; image_url: string }) => ({
          id: item.id,
          name: item.name,
          image: item.image_url
        })
      )
      dispatch(updateAvatarsData({ avatarsData: modifiedData ?? [] }))
    }
  }, [avatarsData, dispatch])

  useEffect(() => {
    if (gluedinLoginData?.ok) {
      dispatch(updateGludeinIsAuthenticated({ gludeinIsAuthenticated: true }))
    }
  }, [gluedinLoginData, dispatch])

  useEffect(() => {
    if (genresData?.ok) {
      const { data } = genresData ?? {}
      dispatch(updateGenres({ genres: data?.data?.genres ?? [] }))
    }
  }, [genresData, dispatch])

  useEffect(() => {
    if (languagesData?.ok) {
      const { data } = languagesData ?? {}
      dispatch(updateLanguages({ languages: data?.languages ?? [] }))
    }
  }, [languagesData, dispatch])

  useEffect(() => {
    if (userSubmittedJokesData?.ok) {
      const { data } = userSubmittedJokesData ?? {}
      dispatch(updateUserSubmittedJokes({ userSubmittedJokes: data ?? [] }))
    }
  }, [userSubmittedJokesData, dispatch])

  useEffect(() => {
    if (jokesFormatsData?.ok) {
      const { data } = jokesFormatsData ?? {}
      dispatch(updateJokesFormats({ jokesFormats: data?.formats ?? [] }))
    }
  }, [jokesFormatsData, dispatch])

  useEffect(() => {
    if (selectedLanguage && isAuthenticated) {
      const languageId =
        MNEMONICS_TO_ID[selectedLanguage as keyof typeof MNEMONICS_TO_ID]
      if (languageId) {
        mutateChangeChatLanguage(languageId.toString())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage, isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('pathname', pathname)
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH)
      sessionStorage.removeItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
    }
  }, [pathname, isAuthenticated])

  return <>{children}</>
}

export default InitialDataLoader
