import { useCallback, useEffect } from 'react';
import useAppSelector from './useSelector';
import useAppDispatch from './useDispatch';
import { setLanguage, hydrateLanguage } from '@/store/language/language.slice';

export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const { selectedLanguage, isHydrated } = useAppSelector((state) => state.language);

  // Hydrate language from localStorage on client-side
  useEffect(() => {
    if (!isHydrated) {
      dispatch(hydrateLanguage());
    }
  }, [dispatch, isHydrated]);

  const changeLanguage = useCallback((languageCode: string) => {
    // Only refresh if the language is actually changing
    if (languageCode !== selectedLanguage) {
      dispatch(setLanguage(languageCode));
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
    }
  }, [dispatch, selectedLanguage]);

  const getApiLocale = useCallback(() => {
    return selectedLanguage;
  }, [selectedLanguage]);

  return {
    selectedLanguage,
    changeLanguage,
    getApiLocale,
    isHydrated,
  };
}; 