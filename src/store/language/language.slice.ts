import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LANGUAGE_MNEMONICS } from '@/constants';

export interface ILanguageState {
  selectedLanguage: string;
}

// Start with default language - Redux Persist will handle rehydration
const initialState: ILanguageState = {
  selectedLanguage: LANGUAGE_MNEMONICS.ENGLISH,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer; 