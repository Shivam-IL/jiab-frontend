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
  surpriseMe: true,
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
} = authSlice.actions;
export default authSlice.reducer;
