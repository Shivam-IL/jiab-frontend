import {resetAuth} from "@/store/auth/auth.slice";
import useAppDispatch from "./useDispatch";
import { resetProfile } from "@/store/profile/profile.slice";
import { clearAllModalSessions } from "./useSessionModal";
import { useGetUserGeolocation } from "@/api/hooks/GeolocationHooks";
import { useState } from "react";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const [uniqueId, setUniqueId] = useState<string>('');
  useGetUserGeolocation({
    enabled: true,
    params: uniqueId,
  });

  const logoutHandler = () => {
    dispatch(resetAuth());
    dispatch(resetProfile());
    localStorage.clear();
    clearAllModalSessions();
    sessionStorage.clear();
    setUniqueId(Math.random().toString(36).substring(2, 15));
  };

  return { logoutHandler };
};

export default useLogout;
