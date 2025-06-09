import { createSlice } from "@reduxjs/toolkit";

export interface IAddressData {
  address_line_1: string;
  address_line_2: string;
  nearest_landmark: string;
  alternate_phone_number: string;
  pan_card_number: string;
  pincode: string;
  state: string;
  city: string;
  default: boolean;
}

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
  addressData: IAddressData[];
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
  addressData: [],
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
    updateAddressData: (state, action) => {
      state.addressData = [...state.addressData, action.payload.addressData];
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
  updateAddressData,
  updateCrossModal,
  updatePhoneNumber,
  updateToken,
  updateIsAuthenticated,
  updateIsFirstLogin,
  updateOtpVerified,
} = authSlice.actions;
export default authSlice.reducer;
