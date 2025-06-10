import { createSlice } from "@reduxjs/toolkit";


export interface AuthState {
  user: null;
  phoneNumber: string;
  loginModal: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  otpSent: boolean;
  otpFilled: boolean;
  otpVerified: boolean;
  signupDone: boolean;
  crossModal: boolean;
  token: string;
  isFirstLogin: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
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
} = authSlice.actions;
export default authSlice.reducer;
