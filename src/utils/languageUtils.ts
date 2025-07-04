import { MNEMONICS_TO_ID } from "@/constants";

/**
 * Converts a language mnemonic (e.g., "en", "hi", "ta") to its corresponding language ID
 * @param languageMnemonic - Language mnemonic like "en", "hi", "ta", etc.
 * @returns Language ID (numeric) or 1 (English) as default
 */
export const convertLanguageMnemonicToId = (languageMnemonic: string): number => {
  return MNEMONICS_TO_ID[languageMnemonic as keyof typeof MNEMONICS_TO_ID] ?? 1;
};

/**
 * Gets the language ID for the currently selected language
 * @param selectedLanguage - The selected language mnemonic from Redux store
 * @returns Language ID (numeric) or 1 (English) as default
 */
export const getLanguageId = (selectedLanguage: string): number => {
  return convertLanguageMnemonicToId(selectedLanguage);
}; 