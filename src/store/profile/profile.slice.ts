import { REDUX_UPDATION_TYPES } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";

export interface IUserAddressData {
  id: number;
  address1: string;
  address2: string;
  city: string;
  is_default: boolean;
  nearest_landmark: string;
  pincode: number;
  shipping_mobile: string;
  state: string;
}

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
  addresses: IUserAddressData[];
}

const initialState: UserState = {
  current_balance: 0,
  rank: 0,
  user: {} as User,
  addresses: [],
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
    updateAddresses: (state, action) => {
      const { type, address } = action.payload;
      let newAddresses = [...state.addresses];
      if (type === REDUX_UPDATION_TYPES.SINGLE_ADDED) {
        const checkDefaultInNewAddresses = address?.[0]?.is_default ?? false;
        if (checkDefaultInNewAddresses) {
          const indexOfDefaultAddress = newAddresses.findIndex(
            (address) => address.is_default
          );
          if (indexOfDefaultAddress !== -1) {
            const newIndexData = { ...newAddresses[indexOfDefaultAddress] };
            newIndexData.is_default = false;
            newAddresses[indexOfDefaultAddress] = newIndexData;
          }
        }
        const addressData = address?.[0];
        newAddresses.push(addressData);
      } else if (type === REDUX_UPDATION_TYPES.MULTIPLE_ADDED) {
        newAddresses.push(...address);
      }
      state.addresses = [...newAddresses];
    },
    deleteAddress: (state, action) => {
      const { addressId } = action.payload;
      const newAddresses = [...state.addresses];
      const filteredAddresses = newAddresses?.filter(
        (address) => address.id !== addressId
      );
      state.addresses = [...filteredAddresses];
    },
    editAddress: (state, action) => {
      const { addressId, address } = action.payload;
      const newAddresses = [...state.addresses];
      if (address?.is_default) {
        const indexOfDefaultAddress = newAddresses.findIndex(
          (address) => address.is_default
        );
        if (indexOfDefaultAddress !== -1) {
          const newIndexData = { ...newAddresses[indexOfDefaultAddress] };
          newIndexData.is_default = false;
          newAddresses[indexOfDefaultAddress] = newIndexData;
        }
      }
      const indexOfAddress = newAddresses.findIndex(
        (address) => address.id === addressId
      );
      newAddresses[indexOfAddress] = address;
      state.addresses = [...newAddresses];
    },
  },
});

export const {
  updateBalance,
  updateRank,
  updateUser,
  updateAddresses,
  deleteAddress,
  editAddress,
} = profileSlice.actions;
export default profileSlice.reducer;
