import { useGetHomePageContent } from "@/api/hooks/CMSHooks";
import useAppDispatch from "@/hooks/useDispatch";
import { useLanguage } from "@/hooks/useLanguage";
import {
  setHomePageContent,
  setLoading,
  setError,
  clearError,
} from "@/store/cms/cms.slice";
import { ReactNode, useEffect } from "react";

const CMSWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { selectedLanguage } = useLanguage();
  const {
    data: homePageData,
    isLoading,
    error,
    isSuccess,
  } = useGetHomePageContent();

  // Clear errors when language changes
  useEffect(() => {
    dispatch(clearError());
  }, [selectedLanguage, dispatch]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setError("Failed to load content"));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isSuccess && homePageData?.ok) {
      const contentData = homePageData.data;
      // Handle both single object and array responses from Strapi
      const content = Array.isArray(contentData.data)
        ? contentData.data[0]
        : contentData.data;
      if (content) {
        dispatch(setHomePageContent(content));
      }
    }
  }, [homePageData, isSuccess, dispatch]);

  return <>{children}</>;
};

export default CMSWrapper;
