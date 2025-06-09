import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCMSResponse } from "@/api/types/CMSTypes";

export interface CMSState {
  homePageContent: TCMSResponse["data"] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CMSState = {
  homePageContent: null,
  isLoading: false,
  error: null,
};

const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {
    setHomePageContent: (state, action: PayloadAction<TCMSResponse["data"]>) => {
      state.homePageContent = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setHomePageContent,
  setLoading,
  setError,
  clearError,
} = cmsSlice.actions;

export default cmsSlice.reducer; 