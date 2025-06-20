import { useCallback } from "react";
import useAppSelector from "./useSelector";
import useAppDispatch from "./useDispatch";
import { setLanguage } from "@/store/language/language.slice";
import { useQueryClient } from "@tanstack/react-query";
import {
  CDPEventPayloadBuilder,
  LanguageCDPEventPayload,
} from "@/api/utils/cdpEvents";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";

export const useLanguage = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { selectedLanguage } = useAppSelector((state) => state.language);
  const { user } = useAppSelector((state) => state.profile);
  const { mutate: triggerCDPEvent } = useSendCDPEvent();

  const triggerLangChangeCDPEvent = (lang: string) => {
    console.log("triggerLangChangeCDPEvent", lang, user?.id);
    if (user?.id && lang) {
      const langCode = lang.toUpperCase();
      const payload: LanguageCDPEventPayload =
        CDPEventPayloadBuilder.buildLanguageChangePayload(
          langCode,
          user?.id ?? ""
        );
      triggerCDPEvent(payload);
    }
  };

  const changeLanguage = useCallback(
    (languageCode: string) => {
      // Only change if the language is actually different
      if (languageCode !== selectedLanguage) {
        triggerLangChangeCDPEvent(languageCode);
        dispatch(setLanguage(languageCode));

        // Invalidate all React Query cache to ensure fresh data with new language
        queryClient.invalidateQueries();
      }
    },
    [dispatch, selectedLanguage, queryClient]
  );

  const getApiLocale = useCallback(() => {
    return selectedLanguage;
  }, [selectedLanguage]);

  return {
    selectedLanguage,
    changeLanguage,
    getApiLocale,
  };
};
