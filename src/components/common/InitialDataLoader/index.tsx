import { LOCAL_STORAGE_KEYS } from '@/api/client/config'
import { useMutateRefreshToken } from '@/api/hooks/LoginHooks'
import {
  useGetUserAddresses,
  useGetAvatarsData,
  useGetUserProfileDetails
} from '@/api/hooks/ProfileHooks'
import gluedin from 'gluedin'
import { MainService } from '@/api/services/MainService'
import { REDUX_UPDATION_TYPES } from '@/constants'
import useAppDispatch from '@/hooks/useDispatch'
import {
  updateIsAuthenticated,
  updateSurpriseMe,
  updateToken,
  updateGludeinIsAuthenticated,
  updateRefreshTokenNotVerified
} from '@/store/auth/auth.slice'
import {
  updateAddresses,
  updateAvatarsData,
  updateBalance,
  updateBreakTheIceModal,
  updateRank,
  updateReferralData,
  updateUser,
  updateUserSubmittedJokes
} from '@/store/profile/profile.slice'
import { getLocalStorageItem, setLocalStorageItem } from '@/utils'
import { ReactNode, useEffect, useState } from 'react'
import { useGetAllReferrals } from '@/api/hooks/ReferralHooks'
import { useGetLeaderBoard } from '@/api/hooks/LeaderBoardHooks'
import { updateLeaderboard } from '@/store/leaderboard'
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

const mainServiceInstance = MainService.getInstance()

const InitialDataLoader = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const [tokenUpdated, setTokenUpdated] = useState(false)
  const { data: userProfileData } = useGetUserProfileDetails()
  const { data: userAddressesData } = useGetUserAddresses()
  const { mutate: mutateGludeinLogin, data: gluedinLoginData } =
    useMutateGludeinLogin()

  let gluedInSDKInitilize = new gluedin.GluedInSDKInitilize()
  gluedInSDKInitilize.initialize({
    apiKey: process.env.NEXT_PUBLIC_GLUEDIN_API_KEY || '',
    secretKey: process.env.NEXT_PUBLIC_GLUEDIN_SECRET_KEY || ''
  })
  const { data: referralData } = useGetAllReferrals({ page: 1 })
  const { data: avatarsData } = useGetAvatarsData()
  const { data: leaderboardData } = useGetLeaderBoard()
  const { data: genresData } = useGetGenres()
  const { data: languagesData } = useGetLanguages()
  const { data: jokesFormatsData } = useGetJokesFormats()
  const { data: userSubmittedJokesData } = useGetUserSubmittedJokes()

  const {
    mutate: mutateRefreshToken,
    data: refreshTokenData,
    isPending: refreshTokenLoading
  } = useMutateRefreshToken()

  useEffect(() => {
    const refreshToken = getLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
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
      dispatch(updateIsAuthenticated({ isAuthenticated: false }))
      dispatch(updateToken({ token: '' }))
      dispatch(updateRefreshTokenNotVerified({ refreshTokenNotVerified: true }))
    }
  }, [])

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
    } else {
      localStorage.clear()
      dispatch(updateIsAuthenticated({ isAuthenticated: false }))
      dispatch(updateToken({ token: '' }))
    }
  }, [refreshTokenLoading, refreshTokenData])

  useEffect(() => {
    if (tokenUpdated) {
      setTimeout(() => {
        dispatch(updateIsAuthenticated({ isAuthenticated: true }))
        setTokenUpdated(false)
      }, 1000)
    }
  }, [tokenUpdated])

  // Handle profile data changes
  useEffect(() => {
    if (userProfileData?.ok) {
      const { data } = userProfileData?.data ?? {}
      dispatch(updateRank({ rank: data?.rank }))
      dispatch(updateBalance({ current_balance: data?.current_balance }))
      dispatch(updateUser({ user: { ...data?.user } }))
      const localData = {
        rank: data?.rank,
        current_balance: data?.current_balance,
        user: { ...data?.user }
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
  }, [userProfileData])

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
  }, [userAddressesData])

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
  }, [referralData])

  useEffect(() => {
    if (avatarsData?.ok) {
      const modifiedData = avatarsData?.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        image: item.image_url
      }))
      dispatch(updateAvatarsData({ avatarsData: modifiedData ?? [] }))
    }
  }, [avatarsData])

  useEffect(() => {
    if (gluedinLoginData?.ok) {
      dispatch(updateGludeinIsAuthenticated({ gludeinIsAuthenticated: true }))
    }
  }, [gluedinLoginData])

  useEffect(() => {
    if (leaderboardData?.ok) {
      const { data } = leaderboardData ?? {}
      dispatch(
        updateLeaderboard({
          my_rank: data?.my_rank,
          leaderboard: data?.top_users ?? []
        })
      )
    }
  }, [leaderboardData])

  useEffect(() => {
    if (genresData?.ok) {
      const { data } = genresData ?? {}
      dispatch(updateGenres({ genres: data?.data?.genres ?? [] }))
    }
  }, [genresData])

  useEffect(() => {
    if (languagesData?.ok) {
      const { data } = languagesData ?? {}
      dispatch(updateLanguages({ languages: data?.languages ?? [] }))
    }
  }, [languagesData])

  useEffect(() => {
    if (userSubmittedJokesData?.ok) {
      const { data } = userSubmittedJokesData ?? {}
      dispatch(
        updateUserSubmittedJokes({ userSubmittedJokes: data ?? [] })
      )
    }
  }, [userSubmittedJokesData])

  useEffect(() => {
    if (jokesFormatsData?.ok) {
      const { data } = jokesFormatsData ?? {}
      dispatch(updateJokesFormats({ jokesFormats: data?.formats ?? [] }))
    }
  }, [jokesFormatsData])

  return <>{children}</>
}

export default InitialDataLoader
