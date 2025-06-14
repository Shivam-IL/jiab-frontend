"use client";

import { useEffect } from "react";
import useFCMToken from "@/hooks/useFCMToken";
import useAppSelector from "@/hooks/useSelector";

interface FCMProviderProps {
  children: React.ReactNode;
}

const FCMProvider: React.FC<FCMProviderProps> = ({ children }) => {
  const { isAuthenticated, token: authToken } = useAppSelector(
    (state) => state.auth
  );
  const {
    token: fcmToken,
    isLoading,
    error,
    isRegistered,
    isRegistering,
    isAuthenticated: fcmAuthState,
  } = useFCMToken();

  useEffect(() => {
    if (isAuthenticated && authToken) {
      console.log(
        "[FCMProvider] User authenticated, FCM will initialize automatically"
      );
    } else {
      console.log("[FCMProvider] User not authenticated, FCM disabled");
    }
  }, [isAuthenticated, authToken]);

  useEffect(() => {
    if (fcmToken && isRegistered && isAuthenticated) {
      console.log(
        "[FCMProvider] FCM Token registered successfully:",
        fcmToken.substring(0, 20) + "..."
      );
    }
  }, [fcmToken, isRegistered, isAuthenticated]);

  useEffect(() => {
    if (error) {
      console.error("[FCMProvider] FCM Error:", error);

      // Only show critical errors to user, not authentication warnings
      if (
        error.includes("Firebase messaging not available") ||
        error.includes("Service Worker registration failed")
      ) {
        // You can show a toast notification here if needed
        console.warn(
          "[FCMProvider] Critical FCM error that may need user attention:",
          error
        );
      }
    }
  }, [error]);

  useEffect(() => {
    if (isLoading || isRegistering) {
      console.log("[FCMProvider] FCM operation in progress...", {
        isLoading,
        isRegistering,
      });
    }
  }, [isLoading, isRegistering]);

  // Log authentication state sync
  useEffect(() => {
    if (isAuthenticated !== fcmAuthState) {
      console.log("[FCMProvider] Auth state sync:", {
        appAuth: isAuthenticated,
        fcmAuth: fcmAuthState,
      });
    }
  }, [isAuthenticated, fcmAuthState]);

  return <>{children}</>;
};

export default FCMProvider;
