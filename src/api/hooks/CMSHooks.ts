import { useQuery } from "@tanstack/react-query";
import { CMSService } from "../services/CMSService";
import { useLanguage } from "@/hooks/useLanguage";

const cmsService = CMSService.getInstance();

// Query keys for CMS - now includes locale
export const cmsKeys = {
  homePageContent: (locale: string) => ["cms", "homePage", locale],
};

const useGetHomePageContent = () => {
  const { selectedLanguage } = useLanguage();
  
  return useQuery({
    queryKey: cmsKeys.homePageContent(selectedLanguage),
    queryFn: () => cmsService.getHomePageContent(),
    staleTime: 10 * 60 * 1000, // 10 minutes - CMS content doesn't change frequently
    gcTime: 15 * 60 * 1000, // 15 minutes cache time
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

export {
  useGetHomePageContent,
}; 