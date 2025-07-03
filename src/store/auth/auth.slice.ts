import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  phoneNumber: string;
  loginModal: boolean;
  isAuthenticated: boolean;
  otpSent: boolean;
  otpFilled: boolean;
  otpVerified: boolean;
  signupDone: boolean;
  crossModal: boolean;
  token: string;
  isFirstLogin: boolean;
  surpriseMe: boolean;
  gludeinIsAuthenticated: boolean;
  enableCoachMarks: boolean;
  refreshTokenNotVerified: boolean;
  pauseVideo: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  otpSent: false,
  otpFilled: false,
  otpVerified: false,
  loginModal: false,
  signupDone: false,
  crossModal: false,
  phoneNumber: "",
  token: "",
  isFirstLogin: false,
  surpriseMe: false,
  gludeinIsAuthenticated: false,
  enableCoachMarks: false,
  refreshTokenNotVerified: false,
  pauseVideo: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateOtpStatus: (state, action) => {
      state.otpSent = action.payload.otpSent;
    },
    updateOtpVerified: (state, action) => {
      state.otpVerified = action.payload.otpVerified;
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
    updateOtpFilled: (state, action) => {
      state.otpFilled = action.payload.otpFilled;
    },
    updateLoginModal: (state, action) => {
      state.loginModal = action.payload.loginModal;
    },
    updateSignupDone: (state, action) => {
      state.signupDone = action.payload.signupDone;
    },
    updateCrossModal: (state, action) => {
      state.crossModal = action.payload.crossModal;
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
    },
    updateIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    updateIsFirstLogin: (state, action) => {
      state.isFirstLogin = action.payload.isFirstLogin;
    },
    updateSurpriseMe: (state, action) => {
      state.surpriseMe = action.payload.surpriseMe;
    },
    updateGludeinIsAuthenticated: (state, action) => {
      state.gludeinIsAuthenticated = action.payload.gludeinIsAuthenticated;
    },
    updateEnableCoachMarks: (state, action) => {
      state.enableCoachMarks = action.payload.enableCoachMarks;
    },
    updateRefreshTokenNotVerified: (state, action) => {
      state.refreshTokenNotVerified = action.payload.refreshTokenNotVerified;
    },
    updatePauseVideo: (state, action) => {
      state.pauseVideo = action.payload.pauseVideo;
    },
    resetAuth: (state) => {
      state.phoneNumber = "";
      state.loginModal = false;
      state.isAuthenticated = false;
      state.otpSent = false;
      state.otpFilled = false;
      state.otpVerified = false;
      state.signupDone = false;
      state.crossModal = false;
      state.token = "";
      state.surpriseMe = true;
      state.gludeinIsAuthenticated = false;
      state.enableCoachMarks = false;
      state.refreshTokenNotVerified = false;
    },
  },
});

export const {
  updateOtpStatus,
  updateOtpFilled,
  updateLoginModal,
  updateSignupDone,
  updateCrossModal,
  updatePhoneNumber,
  updateToken,
  updateIsAuthenticated,
  updateIsFirstLogin,
  updateOtpVerified,
  resetAuth,
  updateSurpriseMe,
  updateGludeinIsAuthenticated,
  updateEnableCoachMarks,
  updateRefreshTokenNotVerified,
  updatePauseVideo,
} = authSlice.actions;
export default authSlice.reducer;
