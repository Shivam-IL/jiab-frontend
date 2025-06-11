import { LOCAL_STORAGE_KEYS } from "@/api/client/config";
import { useMutateRefreshToken } from "@/api/hooks/LoginHooks";
import {
  useGetUserAddresses,
  useGetUserProfileDetails,
} from "@/api/hooks/ProfileHooks";
import { MainService } from "@/api/services/MainService";
import { REDUX_UPDATION_TYPES } from "@/constants";
import useAppDispatch from "@/hooks/useDispatch";
import { updateIsAuthenticated, updateToken } from "@/store/auth/auth.slice";
import {
  updateAddresses,
  updateBalance,
  updateBreakTheIceModal,
  updateRank,
  updateUser,
} from "@/store/profile/profile.slice";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils";
import { ReactNode, useEffect, useState } from "react";

const mainServiceInstance = MainService.getInstance();

const InitialDataLoader = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const [tokenUpdated, setTokenUpdated] = useState(false);
  const { data: userProfileData } = useGetUserProfileDetails();
  const { data: userBalanceAndRankData } = useGetUserAddresses();

  const {
    mutate: mutateRefreshToken,
    data: refreshTokenData,
    isPending: refreshTokenLoading,
  } = useMutateRefreshToken();

  useEffect(() => {
    const refreshToken = getLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (refreshToken) {
      mutateRefreshToken({ refresh_token: refreshToken });
      const userDetails = getLocalStorageItem(LOCAL_STORAGE_KEYS.USER_DETAILS);
      const addressesDetails = getLocalStorageItem(
        LOCAL_STORAGE_KEYS.ADDRESSES
      );
      if (userDetails) {
        const { rank, current_balance, user } = JSON.parse(userDetails);
        dispatch(updateRank({ rank }));
        dispatch(updateBalance({ current_balance }));
        dispatch(updateUser({ user }));
      }
      if (addressesDetails) {
        const data = JSON.parse(addressesDetails);
        dispatch(updateAddresses({ addresses: data?.addresses }));
      }
    } else {
      dispatch(updateIsAuthenticated({ isAuthenticated: false }));
      dispatch(updateBreakTheIceModal({ breakTheIceModal: true }));
      dispatch(updateToken({ token: "" }));
    }
  }, []);

  useEffect(() => {
    if (refreshTokenData?.ok) {
      const { data } = refreshTokenData ?? {};
      const { access_token, refresh_token } = data ?? {};
      dispatch(updateToken({ token: access_token }));
      mainServiceInstance.setAccessToken(access_token);
      setLocalStorageItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refresh_token);
      setLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, access_token);
      setTokenUpdated(true);
    } else if (refreshTokenData?.ok === false) {
      dispatch(updateIsAuthenticated({ isAuthenticated: false }));
      dispatch(updateBreakTheIceModal({ breakTheIceModal: true }));
      dispatch(updateToken({ token: "" }));
      localStorage.clear();
    }
  }, [refreshTokenLoading, refreshTokenData]);

  useEffect(() => {
    if (tokenUpdated) {
      setTimeout(() => {
        dispatch(updateIsAuthenticated({ isAuthenticated: true }));
        setTokenUpdated(false);
      }, 1000);
    }
  }, [tokenUpdated]);

  // Handle profile data changes
  useEffect(() => {
    if (userProfileData?.ok) {
      const { data } = userProfileData?.data ?? {};
      dispatch(updateRank({ rank: data?.rank }));
      dispatch(updateBalance({ current_balance: data?.current_balance }));
      dispatch(updateUser({ user: { ...data?.user } }));
      const localData = {
        rank: data?.rank,
        current_balance: data?.current_balance,
        user: { ...data?.user },
      };
      setLocalStorageItem(
        LOCAL_STORAGE_KEYS.USER_DETAILS,
        JSON.stringify(localData)
      );
    }
  }, [userProfileData]);

  useEffect(() => {
    if (userBalanceAndRankData?.ok) {
      const { data } = userBalanceAndRankData ?? {};
      dispatch(
        updateAddresses({
          type: REDUX_UPDATION_TYPES.MULTIPLE_ADDED,
          address: data,
        })
      );
      const localData = {
        addresses: data,
      };
      setLocalStorageItem(
        LOCAL_STORAGE_KEYS.ADDRESSES,
        JSON.stringify(localData)
      );
    }
  }, [userBalanceAndRankData]);

  return <>{children}</>;
};

export default InitialDataLoader;
