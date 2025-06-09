import { createSlice } from "@reduxjs/toolkit";
export interface User {
  alternate_mobile: string;
  avatar_id: number;
  contest_onboarding_status: boolean;
  dob: string;
  email: string;
  gender: string;
  home_onboarding_status: boolean;
  id: string;
  ip_address: string;
  is_active: boolean;
  is_profile_complete: boolean;
  is_referral: boolean;
  last_language_selection: number;
  name: string;
  phone_number: string;
  platform_master_id: number;
  profile_percentage: number;
  profile_picture: string;
  refer_by: string;
  referral_code: string;
  refresh_token: string;
  refresh_token_expiry_time: string;
  registered_on: string;
}

export interface UserState {
  current_balance: number;
  rank: number;
  user: User;
}

const initialState: UserState = {
  current_balance: 0,
  rank: 0,
  user: {} as User,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateBalance: (state, action) => {
      state.current_balance = action.payload.current_balance;
    },
    updateRank: (state, action) => {
      state.rank = action.payload.rank;
    },
    updateUser: (state, action) => {
      const { user } = action.payload;
      const newUserData = { ...state.user, ...user };
      state.user = newUserData;
    },
  },
});

export const { updateBalance, updateRank, updateUser } = profileSlice.actions;
export default profileSlice.reducer;
