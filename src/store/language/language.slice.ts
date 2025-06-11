import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILanguageState {
  selectedLanguage: string;
  isHydrated: boolean;
}

// Always start with default language to avoid hydration mismatch
const initialState: ILanguageState = {
  selectedLanguage: 'en', // Always default to English initially
  isHydrated: false,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedLanguage', action.payload);
      }
    },
    hydrateLanguage: (state) => {
      // This will be called on client-side to load from localStorage
      if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && savedLanguage !== state.selectedLanguage) {
          state.selectedLanguage = savedLanguage;
        }
        state.isHydrated = true;
      }
    },
  },
});

export const { setLanguage, hydrateLanguage } = languageSlice.actions;
export default languageSlice.reducer; 