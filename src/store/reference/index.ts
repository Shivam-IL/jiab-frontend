import { createSlice } from "@reduxjs/toolkit";

export interface IGenre {
  emoji_index: number;
  emoji_is_active: boolean;
  genre: string;
  genre_emoticon: string;
  id: number;
  image_url: string;
  is_active: boolean;
}

export interface IJokeFormat {
  id: number;
  name: string;
}

export interface ILanguage {
  id: number;
  is_active: boolean;
  language_key: string;
  name: string;
}

export interface IReferenceState {
  genres: IGenre[];
  jokesFormats: IJokeFormat[];
  languages: ILanguage[];
}

const initialState: IReferenceState = {
  genres: [],
  jokesFormats: [],
  languages: [],
};

const referenceSlice = createSlice({
  name: "reference",
  initialState,
  reducers: {
    updateGenres: (state, action) => {
      const { genres } = action.payload;
      state.genres = [...genres];
    },
    updateJokesFormats: (state, action) => {
      const { jokesFormats } = action.payload;
      state.jokesFormats = [...jokesFormats];
    },
    updateLanguages: (state, action) => {
      const { languages } = action.payload;
      state.languages = [...languages];
    },
  },
});

export const { updateGenres, updateJokesFormats, updateLanguages } =
  referenceSlice.actions;
export default referenceSlice.reducer;
