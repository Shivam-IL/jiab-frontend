import {
  resetAuth,
  updateRefreshTokenNotVerified,
} from "@/store/auth/auth.slice";
import useAppDispatch from "./useDispatch";
import { resetProfile } from "@/store/profile/profile.slice";
import { clearAllModalSessions } from "./useSessionModal";
import { useGetUserGeolocation } from "@/api/hooks/GeolocationHooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  clearLocalStoragePreservingLanguage,
  removeSessionStorageItem,
} from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "@/api/utils";
import { SESSION_STORAGE_KEYS } from "@/constants";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uniqueId, setUniqueId] = useState<string>("");
  useGetUserGeolocation({
    enabled: true,
    params: uniqueId,
  });

  const logoutHandler = () => {
    dispatch(resetAuth());
    dispatch(resetProfile());

    // Clear localStorage while preserving language data
    clearLocalStoragePreservingLanguage();

    // Clear session storage and modal sessions
    clearAllModalSessions();
    sessionStorage.clear();

    // Clear comic coin response from React Query cache
    queryClient.removeQueries({
      queryKey: [...keys.joke.getComicCoins()],
    });

    // Clear all other user-specific queries
    queryClient.removeQueries({
      queryKey: [...keys.profile.userProfileDetails()],
    });

    queryClient.removeQueries({
      queryKey: [...keys.profile.getUserBalanceAndRank()],
    });

    queryClient.removeQueries({
      queryKey: [...keys.referral.getAllReferrals()],
    });

    queryClient.removeQueries({
      queryKey: [...keys.joke.getUserSubmittedJokes()],
    });

    queryClient.removeQueries({
      queryKey: [...keys.notifications.getNotifications()],
    });

    queryClient.removeQueries({
      queryKey: [...keys.notifications.getNotificationCount()],
    });

    queryClient.removeQueries({
      queryKey: [...keys.leaderboard.getLeaderboard()],
    });

    queryClient.removeQueries({
      queryKey: [...keys.profile.getUserAddresses()],
    });

    queryClient.removeQueries({
      queryKey: [...keys.profile.getUserQuestions()],
    });

    queryClient.removeQueries({
      queryKey: [...keys.profile.getVoucherInfo()],
    });

    setUniqueId(Math.random().toString(36).substring(2, 15));
    removeSessionStorageItem(SESSION_STORAGE_KEYS.HAS_SHOWN_LOCK_MODAL);
    dispatch(updateRefreshTokenNotVerified({ refreshTokenNotVerified: true }));
    // Use Next.js router to navigate to homepage instead of page refresh
    router.push("/");
  };

  return { logoutHandler };
};

export default useLogout;
