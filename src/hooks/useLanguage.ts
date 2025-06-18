import { useCallback } from 'react';
import useAppSelector from './useSelector';
import useAppDispatch from './useDispatch';
import { setLanguage } from '@/store/language/language.slice';
import { useQueryClient } from '@tanstack/react-query';

export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { selectedLanguage } = useAppSelector((state) => state.language);

  const changeLanguage = useCallback((languageCode: string) => {
    // Only change if the language is actually different
    if (languageCode !== selectedLanguage) {
      dispatch(setLanguage(languageCode));
      
      // Invalidate all React Query cache to ensure fresh data with new language
      queryClient.invalidateQueries();
    }
  }, [dispatch, selectedLanguage, queryClient]);

  const getApiLocale = useCallback(() => {
    return selectedLanguage;
  }, [selectedLanguage]);

  return {
    selectedLanguage,
    changeLanguage,
    getApiLocale,
  };
}; 