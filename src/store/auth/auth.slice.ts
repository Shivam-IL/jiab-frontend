import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: null;
  phoneNumber: string;
  otp: string;
  loginModal: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  otpSent: boolean;
  otpFilled: boolean;
  signupDone: boolean;
  crossModal: boolean;
  addressData: any[];
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  otp: "",
  otpSent: false,
  otpFilled: false,
  loginModal: false,
  signupDone: false,
  crossModal: false,
  addressData: [],
  phoneNumber: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateOtpStatus: (state, action) => {
      state.otpSent = action.payload.otpSent;
    },
    updatePhoneNumber: (state, action) => {
      state.phoneNumber = action.payload.phoneNumber;
    },
    updateOtp: (state, action) => {
      state.otp = action.payload.otp;
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
    updateAddressData: (state, action) => {
      state.addressData = [...state.addressData, action.payload.addressData];
    },
    updateCrossModal: (state, action) => {
      state.crossModal = action.payload.crossModal;
    },
  },
});

export const {
  updateOtpStatus,
  updateOtpFilled,
  updateLoginModal,
  updateSignupDone,
  updateAddressData,
  updateCrossModal,
  updateOtp,
  updatePhoneNumber,
} = authSlice.actions;
export default authSlice.reducer;
