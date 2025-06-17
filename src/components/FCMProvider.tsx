"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useFCM, FCMHookResult } from "@/hooks/useFCM";

interface FCMContextType extends FCMHookResult {}

const FCMContext = createContext<FCMContextType | null>(null);

export const useFCMContext = () => {
  const context = useContext(FCMContext);
  if (!context) {
    throw new Error("useFCMContext must be used within FCMProvider");
  }
  return context;
};

interface FCMProviderProps {
  children: ReactNode;
}

export default function FCMProvider({ children }: FCMProviderProps) {
  const fcm = useFCM();

  useEffect(() => {
    // Auto-initialize FCM and request permission when component mounts
    const initializeFCM = async () => {
      if (fcm.isSupported) {
        if (fcm.permission === "default") {
          // Automatically request permission on website load
          console.log("Auto-requesting notification permission...");
          await fcm.requestPermission();
        } else if (fcm.permission === "granted" && !fcm.token) {
          // If permission is already granted but no token, get the token
          await fcm.getRegistrationToken();
        }
      }
    };

    // Add a small delay to ensure the app has loaded properly
    const timer = setTimeout(() => {
      initializeFCM();
    }, 1000);

    return () => clearTimeout(timer);
  }, [fcm.isSupported, fcm.permission]);

  // Store token in localStorage when it changes (optional)
  useEffect(() => {
    if (fcm.token) {
      localStorage.setItem("fcm-token", fcm.token);
      console.log("FCM token stored:", fcm.token);
    }
  }, [fcm.token]);

  return <FCMContext.Provider value={fcm}>{children}</FCMContext.Provider>;
}
