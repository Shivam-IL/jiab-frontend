import {
  updateIsAuthenticated,
  updateOtpStatus,
  updateOtpFilled,
  updateIsFirstLogin,
  resetAuth,
} from "@/store/auth/auth.slice";
import useAppDispatch from "./useDispatch";
import { resetProfile } from "@/store/profile/profile.slice";
import { clearAllModalSessions } from "./useSessionModal";

const useLogout = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(resetAuth());
    dispatch(resetProfile());
    localStorage.clear();
    clearAllModalSessions();
    sessionStorage.clear();
  };

  return { logoutHandler };
};

export default useLogout;
