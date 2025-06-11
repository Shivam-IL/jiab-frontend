import {
  updateIsAuthenticated,
  updateOtpStatus,
  updateOtpFilled,
  updateIsFirstLogin,
  resetAuth,
} from "@/store/auth/auth.slice";
import { LOCAL_STORAGE_KEYS } from "@/api/client/config";
import { updateToken } from "@/store/auth/auth.slice";
import useAppDispatch from "./useDispatch";
import { removeLocalStorageItem } from "@/utils/index";
import { resetProfile } from "@/store/profile/profile.slice";

const useLogout = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(resetAuth());
    dispatch(resetProfile());
    localStorage.clear();
  };

  return { logoutHandler };
};

export default useLogout;
