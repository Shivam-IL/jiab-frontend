import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalLoadingState {
  isRouteLoading: boolean;
  isGlobalApiLoading: boolean;
}

const initialState: GlobalLoadingState = {
  isRouteLoading: false,
  isGlobalApiLoading: false,
};

const globalLoadingSlice = createSlice({
  name: "globalLoading",
  initialState,
  reducers: {
    setRouteLoading: (state, action: PayloadAction<boolean>) => {
      state.isRouteLoading = action.payload;
    },
    setGlobalApiLoading: (state, action: PayloadAction<boolean>) => {
      state.isGlobalApiLoading = action.payload;
    },
  },
});

export const {
  setRouteLoading,
  setGlobalApiLoading,
} = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer; 