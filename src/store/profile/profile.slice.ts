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
  profile_image?: string;
  userImage?: string;
}

export interface IReferralData {
  id: number;
  mobile_number: string;
  status: string;
}

export interface IAvatarsData {
  id: number;
  name: string;
  image: string;
}

export interface IUserSubmittedJoke {
  content_url: string;
  date: string;
  format: string;
  id: string;
  status: string;
  thumbnail_url: string;
  title: string;
}

export interface UserState {
  current_balance: number;
  rank: number;
  user: User;
  addresses: IUserAddressData[];
  referral_data: IReferralData[];
  breakTheIceModal: boolean;
  avatarsData: IAvatarsData[];
  userSubmittedJokes: IUserSubmittedJoke[];
}

const initialState: UserState = {
  current_balance: 0,
  rank: 0,
  breakTheIceModal: false,
  user: {
    alternate_mobile: "",
    avatar_id: 0,
    contest_onboarding_status: false,
    dob: "",
    email: "",
    gender: "",
    home_onboarding_status: false,
    id: "",
    ip_address: "",
    is_active: false,
    is_profile_complete: false,
    is_referral: false,
    last_language_selection: 0,
    name: "",
    phone_number: "",
    platform_master_id: 0,
    profile_percentage: 0,
    profile_picture: "",
    refer_by: "",
    referral_code: "",
    refresh_token: "",
    refresh_token_expiry_time: "",
    registered_on: "",
  } as User,
  addresses: [],
  referral_data: [],
  avatarsData: [],
  userSubmittedJokes: [],
};

// Utility function to remove duplicates by 'id'
function removeDuplicatesById<T extends { id: string | number }>(arr: T[]): T[] {
  const seen = new Set<string | number>();
  return arr.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

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

      let userImage = "";
      if (user?.avatar_id) {
        const imageData = state.avatarsData?.find(
          (avatar) => avatar.id === user?.avatar_id
        );
        if (imageData) {
          userImage = imageData?.image;
        }
      }
      if (user?.profile_picture) {
        userImage = user?.profile_picture;
      }
      let gender = "";
      if (user?.gender) {
        if (user?.gender === 1) {
          gender = "male";
        } else if (user?.gender === 2) {
          gender = "female";
        } else if (user?.gender === 3) {
          gender = "other";
        } else if (user?.gender === 4) {
          gender = "Prefer not to say";
        }
      }
      const newUserData = {
        ...state.user,
        ...user,
        gender,
        userImage,
      };
      state.user = { ...newUserData };
    },
    updateAddresses: (state, action) => {
      const { type, address } = action.payload;
      const newAddresses = [...state.addresses];
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
      state.addresses = [...removeDuplicatesById(newAddresses)]
    },
    deleteAddress: (state, action) => {
      const { addressId } = action.payload;
      const newAddresses = [...state.addresses];
      const filteredAddresses = newAddresses?.filter(
        (address) => address.id !== addressId
      );
      state.addresses = [...removeDuplicatesById(filteredAddresses)];
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
      state.addresses = [...removeDuplicatesById(newAddresses)]
    },
    updateDefaultAddress: (state, action) => {
      const { addressId } = action.payload;
      const newAddresses = [...state.addresses];
      console.log("newAddresses", newAddresses);
      const indexOfAddress = newAddresses.findIndex(
        (address) => address.id === addressId
      );
      const currentDefaultAddress = newAddresses.findIndex(
        (address) => address.is_default
      );
      if (currentDefaultAddress !== -1) {
        console.log("currentDefaultAddress", currentDefaultAddress);
        const newIndexData = { ...newAddresses[currentDefaultAddress] };
        newIndexData.is_default = false;
        newAddresses[currentDefaultAddress] = newIndexData;
      }
      if (indexOfAddress !== -1) {
        console.log("indexOfAddress", indexOfAddress);
        const newIndexData = { ...newAddresses[indexOfAddress] };
        newIndexData.is_default = true;
        newAddresses[indexOfAddress] = newIndexData;
      }
      state.addresses = [...removeDuplicatesById(newAddresses)]
    },
    resetProfile: (state) => {
      state.current_balance = 0;
      state.rank = 0;
      state.user = {
        alternate_mobile: "",
        avatar_id: 0,
        contest_onboarding_status: false,
        dob: "",
        email: "",
        gender: "",
        home_onboarding_status: false,
        id: "",
        ip_address: "",
        is_active: false,
        is_profile_complete: false,
        is_referral: false,
        last_language_selection: 0,
        name: "",
        phone_number: "",
        platform_master_id: 0,
        profile_percentage: 0,
        profile_picture: "",
        refer_by: "",
        referral_code: "",
        refresh_token: "",
        refresh_token_expiry_time: "",
        registered_on: "",
      };
      state.addresses = [];
    },
    updateBreakTheIceModal: (state, action) => {
      state.breakTheIceModal = action.payload.breakTheIceModal;
    },
    updateReferralData: (state, action) => {
      const { referral_data, type } = action.payload;
      const newReferralData = [...state.referral_data];
      if (type === REDUX_UPDATION_TYPES.SINGLE_ADDED) {
        newReferralData.push(...referral_data);
      } else if (type === REDUX_UPDATION_TYPES.MULTIPLE_ADDED) {
        newReferralData.push(...referral_data);
      }
      state.referral_data = [...newReferralData];
    },
    updateAvatarsData: (state, action) => {
      const { avatarsData } = action.payload;
      state.avatarsData = [...avatarsData];
    },
    updateUserSubmittedJokes: (state, action) => {
      const { userSubmittedJokes } = action.payload;
      state.userSubmittedJokes = [...userSubmittedJokes];
    },
    incrementComicCoins: (state) => {
      state.current_balance = state.current_balance
        ? state.current_balance + 1
        : 1;
    },
  },
});

export const {
  updateBalance,
  updateRank,
  updateUser,
  updateDefaultAddress,
  updateAddresses,
  deleteAddress,
  editAddress,
  resetProfile,
  updateBreakTheIceModal,
  updateReferralData,
  updateAvatarsData,
  updateUserSubmittedJokes,
  incrementComicCoins,
} = profileSlice.actions;
export default profileSlice.reducer;
