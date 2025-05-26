import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: null;
  loginModal: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  otpSent: boolean;
  otpFilled: boolean;
  signupDone: boolean;
  addressData: any[];
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  otpSent: false,
  otpFilled: false,
  loginModal: false,
  signupDone: false,
  addressData:[]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateOtpStatus: (state, action) => {
      state.otpSent = action.payload.otpSent;
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
  },
});

export const {
  updateOtpStatus,
  updateOtpFilled,
  updateLoginModal,
  updateSignupDone,
  updateAddressData,
} = authSlice.actions;
export default authSlice.reducer;
