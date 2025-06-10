import { LOCAL_STORAGE_KEYS } from '@/api/client/config'
import { useMutateRefreshToken } from '@/api/hooks/LoginHooks'
import {
  useGetUserAddresses,
  useGetUserProfileDetails
} from '@/api/hooks/ProfileHooks'
import { MainService } from '@/api/services/MainService'
import { REDUX_UPDATION_TYPES } from '@/constants'
import useAppDispatch from '@/hooks/useDispatch'
import useAppSelector from '@/hooks/useSelector'
import { updateIsAuthenticated, updateToken } from '@/store/auth/auth.slice'
import {
  updateAddresses,
  updateBalance,
  updateRank,
  updateUser
} from '@/store/profile/profile.slice'
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  setLocalStorageItem
} from '@/utils'
import { ReactNode, useEffect, useState } from 'react'

const mainServiceInstance = MainService.getInstance()

const InitialDataLoader = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch()
  const [tokenUpdated, setTokenUpdated] = useState(false)
  const { data: userProfileData } = useGetUserProfileDetails()
  const { data: userAddressesData } = useGetUserAddresses()

  const {
    mutate: mutateRefreshToken,
    data: refreshTokenData,
    isPending: refreshTokenLoading
  } = useMutateRefreshToken()

  useEffect(() => {
    const refreshToken = getLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
    if (refreshToken) {
      mutateRefreshToken({ refresh_token: refreshToken })
      removeLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
      removeLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
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
      setTokenUpdated(true)
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
    }
  }, [userAddressesData])

  return <>{children}</>
}

export default InitialDataLoader
