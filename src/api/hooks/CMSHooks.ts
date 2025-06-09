import { useQuery } from "@tanstack/react-query";
import { CMSService } from "../services/CMSService";

const cmsService = CMSService.getInstance();

// Query keys for CMS
export const cmsKeys = {
  homePageContent: () => ["cms", "homePage"],
};

const useGetHomePageContent = () => {
  return useQuery({
    queryKey: cmsKeys.homePageContent(),
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