import { createSlice } from "@reduxjs/toolkit";
import { TModifiedUGCContent } from "@/api/types/GluedinTypes";
import { REDUX_UPDATION_TYPES } from "@/constants";

export interface IUgcState {
  ugcData: TModifiedUGCContent[];
  ugcFilters: {
    search: string;
    language: string;
    category: string;
  };
  offset: number;
  limit: number;
  filterChnageId: string;
  loadMore: boolean;
}

const initialState: IUgcState = {
  ugcData: [],
  ugcFilters: {
    search: "",
    language: "",
    category: "",
  },
  offset: 1,
  limit: 6,
  filterChnageId: "",
  loadMore: false,
};

const ugcSlice = createSlice({
  name: "ugc",
  initialState,
  reducers: {
    updateUgcData: (state, action) => {
      const { ugcData } = action.payload;
      if (action.payload.type === REDUX_UPDATION_TYPES.MULTIPLE_ADDED) {
        state.ugcData = [...state.ugcData, ...ugcData];
      } else if (action.payload.type === REDUX_UPDATION_TYPES.APPENDED) {
        state.ugcData = [...state.ugcData, ...ugcData];
      } else if (
        action.payload.type === REDUX_UPDATION_TYPES.REPLACED ||
        action.payload.type === REDUX_UPDATION_TYPES.SINGLE_ADDED
      ) {
        state.ugcData = [...ugcData];
      }
    },
    updateUgcReactionData: (state, action) => {
      const { ugcData } = action.payload;
      const newUgcData = [...state.ugcData];
      const index = newUgcData.findIndex(
        (item) => item.videoId === ugcData.videoId
      );
      if (index !== -1) {
        newUgcData[index] = { ...ugcData };
      }
      state.ugcData = [...newUgcData];
    },
    updateUgcOffset: (state) => {
      state.offset = state.offset + 1;
    },
    updateUgcViewData: (state, action) => {
      const { assetIds } = action.payload;
      const newUgcData = [...state.ugcData];
      const modifiedUgcData = newUgcData?.map((item) => {
        if (assetIds?.includes(item?.videoId)) {
          return { ...item, viewsCount: item?.viewsCount + 1 };
        }
        return item;
      });
      state.ugcData = [...modifiedUgcData];
    },
    updateUgcFilters: (state, action) => {
      const { filters } = action.payload;
      state.ugcFilters = { ...state.ugcFilters, ...filters };
      state.filterChnageId = Math.random().toString();
      state.offset = 1;
      state.loadMore = false;
    },
    updateUgcLoadMore: (state) => {
      state.loadMore = true;
    },
  },
});

export const {
  updateUgcData,
  updateUgcReactionData,
  updateUgcOffset,
  updateUgcViewData,
  updateUgcFilters,
  updateUgcLoadMore,
} = ugcSlice.actions;
export default ugcSlice.reducer;
