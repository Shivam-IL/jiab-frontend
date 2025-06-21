import { useState, useEffect } from 'react';
import { useGetUserGeolocation } from '@/api/hooks/GeolocationHooks';
import { getSimplifiedLocation, isGeolocationDataComplete } from '@/utils/geolocationUtils';
import { IGeolocationData } from '@/api/types/GeolocationTypes';

interface UserLocation {
  ip: string;
  city: string;
  state: string;
  country: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isComplete: boolean;
}

interface UseUserLocationReturn {
  location: UserLocation | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom hook to get user's location information including IP, city, state, country, and address
 * 
 * @param autoFetch - Whether to automatically fetch location data on mount (default: true)
 * @returns Object containing location data, loading state, error state, and refetch function
 * 
 * @example
 * ```tsx
 * const { location, isLoading, error } = useUserLocation();
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error}</div>;
 * 
 * return (
 *   <div>
 *     <p>IP: {location?.ip}</p>
 *     <p>City: {location?.city}</p>
 *     <p>State: {location?.state}</p>
 *     <p>Country: {location?.country}</p>
 *     <p>Address: {location?.address}</p>
 *   </div>
 * );
 * ```
 */
export const useUserLocation = (autoFetch: boolean = true): UseUserLocationReturn => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    data: geolocationResponse,
    isLoading,
    error: geolocationError,
    refetch
  } = useGetUserGeolocation({enabled: autoFetch,params: 'userGeolocation'});

  useEffect(() => {
    if (geolocationResponse?.ok && geolocationResponse.data) {
      const geolocationData: IGeolocationData = geolocationResponse.data as IGeolocationData;
      const simplifiedLocation = getSimplifiedLocation(geolocationData);
      const isComplete = isGeolocationDataComplete(geolocationData);

      setLocation({
        ...simplifiedLocation,
        isComplete
      });
      setError(null);
    } else if (geolocationError) {
      setError('Failed to fetch location data');
      setLocation(null);
    }
  }, [geolocationResponse, geolocationError]);

  const handleRefetch = () => {
    setError(null);
    refetch();
  };

  return {
    location,
    isLoading,
    error,
    refetch: handleRefetch
  };
};

/**
 * Hook to get just the user's IP address
 */
export const useUserIP = (autoFetch: boolean = true) => {
  const { location, isLoading, error, refetch } = useUserLocation(autoFetch);
  
  return {
    ip: location?.ip || null,
    isLoading,
    error,
    refetch
  };
};

/**
 * Hook to get user's city, state, and country
 */
export const useUserLocationBasic = (autoFetch: boolean = true) => {
  const { location, isLoading, error, refetch } = useUserLocation(autoFetch);
  
  return {
    city: location?.city || null,
    state: location?.state || null,
    country: location?.country || null,
    isLoading,
    error,
    refetch
  };
}; 