export const API_CONFIG = {
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ?? "http://13.200.122.221:8122/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const API_ROUTES = {
  AUTH: {
    REQUEST_OTP: "/auth/request-otp",
    VERIFY_OTP: "/auth/verify-otp",
    REFRESH_TOKEN: "/auth/refresh-token",
    SIGN_UP: "/auth/signup",
  },
  USER: {
    PROFILE: {
      GET: "/profile",
      EDIT: "/profile/",
    },
    ADDRESS: {
      GET: "/profile/address",
      ADD: "/profile/address",
      EDIT: "/profile/address/",
      DELETE: "/profile/address/",
    },
    BALANCE: {
      GET: "/profile/balance",
    },
    QUESTIONS: {
      POST: "/profile/questions",
    },
  },
  REFERRAL: {
    SEND_REFERRAL: "/referral",
    GET_INVITEES: "/referral/invitees",
    SEND_AGAIN: "/referral/send-again",
  },
  REFERENCE_DATA: {
    GET_FORMATS: "/reference-data/formats",
    GET_GENRES: "/reference-data/genres",
  },
  COMIC_COINS: {
    GET_COINS: "/comic-coins",
  }
};
