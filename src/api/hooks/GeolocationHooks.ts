import { useQuery } from "@tanstack/react-query";
import { GeolocationService } from "../services/GeolocationService";
import { keys } from "../utils";

const geolocationService = GeolocationService.getInstance();

/**
 * Hook to get user's IP address and geolocation data
 */
export const useGetUserGeolocation = ({
  enabled = true,
  params,
}: {
  enabled: boolean;
  params: string;
}) => {
  return useQuery({
    queryKey: [keys.geolocation.getUserGeolocation(), params],
    queryFn: () => geolocationService.getUserGeolocation(),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
