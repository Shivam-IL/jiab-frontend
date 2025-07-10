import { store } from "@/store";

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const CMS_API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_STRAPI_API_URL ?? "",
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
  USER_GEOLOCATION: "userGeolocation",
};

// Helper function to get current locale from Redux store
export const getCurrentLocale = (): string => {
  const state = store.getState();
  return state.language.selectedLanguage;
};

export const getCurrentLanguage = (): string => {
  const state = store.getState();
  return state.language.selectedLanguage;
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
      POST: "/profile/questions",
      GET: "/profile/questions",
    },
    CHANGE_CHAT_LANG: "/profile/change-chat-language",
    MY_WALLET: {
      GET_VOOCHER_INFO: "/voucher/info",
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
    GET_COINS: "/comic-coin",
  },
  JOKES: {
    GET_SCROLL_AND_LOL: "/joke/jokes",
    GET_SURPRISE_ME: "/joke/surprise-me",
    SUBMIT_JOKE: "/joke/ugc/submit",
    GET_USER_SUBMITTED_JOKES: "/joke/ugc/profile-content",
    GET_CONTENT_BY_IDS: "/joke/ugc/content-by-ids",
    INCREASE_COMIC_COINS: "/comic-coin/increment",
    GET_HALL_OF_LAME_ARTIST: "/joke/ugc/content-artist",
    POST_REACTION_ON_REEL: "/joke/reel-reaction",
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
  MIX_CODE: {
    REDEEM: "/mix-code/redeem",
  },
  NOTIFICATIONS: {
    GET_NOTIFICATIONS: "/notifications/",
    GET_NOTIFICATION_COUNT: "/notifications/count",
    REGISTER_DEVICE: "/notifications/register-device",
    MARK_AS_READ: "/notifications/mark-as-read",
  },
  REPORT: {
    SEND_REPORT: "/joke/ugc/plagiarize_content",
  },
};
