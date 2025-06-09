import { useGetHomePageContent } from "@/api/hooks/CMSHooks";
import useAppDispatch from "@/hooks/useDispatch";
import {
  setHomePageContent,
  setLoading,
  setError,
} from "@/store/cms/cms.slice";
import { ReactNode, useEffect } from "react";

const CMSWrapper = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const {
    data: homePageData,
    isLoading,
    error,
    isSuccess,
  } = useGetHomePageContent();

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
