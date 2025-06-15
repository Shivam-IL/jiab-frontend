import { store } from "@/store";
import { LANGUAGE_MNEMONICS } from "@/constants";

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const CMS_API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "http://13.200.122.221:8121/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER_DETAILS: "userDetails",
  ADDRESSES: "addressesDetails",
};

// Helper function to get current locale from Redux store
export const getCurrentLocale = (): string => {
  const state = store.getState();
  return state.language.selectedLanguage;
};

export const getCurrentLanguage = (): string => {
  const language = localStorage.getItem("selectedLanguage");
  return language ?? LANGUAGE_MNEMONICS.ENGLISH;
};

export const API_ROUTES = {
  AUTH: {
    REQUEST_OTP: "/auth/request-otp",
    VERIFY_OTP: "/auth/verify-otp",
    REFRESH_TOKEN: "/auth/refresh-token",
    SIGN_UP: "/auth/signup",
  },
  USER: {
    AVATAR: "/avatars/",
    PROFILE: {
      GET: "/profile/",
      EDIT: "/profile/",
    },
    ADDRESS: {
      GET: "/profile/address",
      ADD: "/profile/address",
      EDIT: "/profile/address/",
      DELETE: "/profile/address/",
      PINCODE_AUTOFILL: "/location/pincode?pincode=",
    },
    BALANCE: {
      GET: "/profile/balance",
    },
    QUESTIONS: {
      POST: "/profile/questions/",
      GET: "/profile/questions",
    },
  },
  REFERRAL: {
    SEND_REFERRAL: "/referral/",
    GET_INVITEES: "/referral/invitees",
    SEND_AGAIN: "/referral/send-again",
    VERIFY_REFERRAL: "/referral/verify",
  },
  REFERENCE_DATA: {
    GET_FORMATS: "/reference-data/formats",
    GET_GENRES: "/reference-data/genres",
  },
  COMIC_COINS: {
    GET_COINS: "/comic-coins",
  },
  JOKES: {
    GET_SCROLL_AND_LOL: "/joke/jokes",
    GET_SURPRISE_ME: "/joke/surprise-me",
    SUBMIT_JOKE: "/joke/ugc/submit",
    GET_USER_SUBMITTED_JOKES: "/joke/ugc/profile-content",
    GET_CONTENT_BY_IDS: "/joke/ugc/content-by-ids",
    INCREASE_COMIC_COINS: "/comic-coin/increment",
  },
  CMS: {
    GET_HOME_PAGE_CONTENT: () =>
      `/site-content?populate=*&locale=${getCurrentLocale()}`,
  },
  LEADERBOARD: {
    GET_LEADERBOARD: "/leaderboard",
  },
  REFERENCE: {
    GENRES: "/reference-data/genres",
    JOKES_FORMATS: "/reference-data/formats",
    LANGUAGES: "/reference-data/languages",
  },
};
