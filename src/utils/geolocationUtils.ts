import { IGeolocationData } from "@/api/types/GeolocationTypes";

/**
 * Get user's current location using browser geolocation API
 * This requires user permission and works only on HTTPS
 */
export const getUserCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

/**
 * Format geolocation data into a readable address string
 */
export const formatGeolocationAddress = (data: IGeolocationData): string => {
  const parts = [
    data.city,
    data.region,
    data.postal,
    data.country
  ].filter(Boolean);

  return parts.join(', ');
};

/**
 * Get a simplified location object from geolocation data
 */
export const getSimplifiedLocation = (data: IGeolocationData) => {
  return {
    ip: data.ip,
    city: data.city,
    state: data.region,
    country: data.country,
    address: data.address,
    coordinates: {
      latitude: data.latitude,
      longitude: data.longitude
    }
  };
};

/**
 * Check if geolocation data is complete
 */
export const isGeolocationDataComplete = (data: IGeolocationData): boolean => {
  return !!(data.ip && data.city && data.region && data.country);
};

/**
 * Get location summary for display
 */
export const getLocationSummary = (data: IGeolocationData): string => {
  if (!data.city && !data.region && !data.country) {
    return 'Location not available';
  }

  const parts = [data.city, data.region, data.country].filter(Boolean);
  return parts.join(', ');
}; 