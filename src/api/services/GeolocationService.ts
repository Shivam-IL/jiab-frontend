import { setLocalStorageItem } from "@/utils";
import { IGeolocationData, ILocalGeoData } from "../types/GeolocationTypes";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { LOCAL_STORAGE_KEYS } from "../client/config";

export class GeolocationService {
  private static instance: GeolocationService;

  public static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
    }
    return GeolocationService.instance;
  }

  public async getUserGeolocation() {
    try {
      // First get the IP address
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const userIP = ipData.ip;

      // Then get geolocation data for the IP
      const geoResponse = await fetch(`https://ipapi.co/${userIP}/json/`);
      const geoData = await geoResponse.json();

      if (geoData && geoData.ip) {
        const geolocationData: IGeolocationData = {
          ip: geoData.ip,
          city: geoData.city || "",
          region: geoData.region || "",
          country: geoData.country || "",
          countryCode: geoData.countryCode || "",
          timezone: geoData.timezone || "",
          latitude: geoData.lat || 0,
          longitude: geoData.lon || 0,
          isp: geoData.isp || "",
          org: geoData.org || "",
          postal: geoData.postal || "",
        };
        const localGeoData: ILocalGeoData = {
          geo_country_code: geoData?.countryCode ?? "IN",
          geo_state_province_code: geoData?.region,
          geo_city_name: geoData?.city,
          geo_postal_code: geoData?.postal ?? "",
          ip_address: geoData?.ip,
        };
        setLocalStorageItem(
          LOCAL_STORAGE_KEYS.USER_GEOLOCATION,
          JSON.stringify(localGeoData)
        );
        return SuccessResponse<IGeolocationData>(geolocationData);
      } else {
        return ErrorResponse("Unable to fetch geolocation data");
      }
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
      return ErrorResponse("Failed to fetch geolocation data");
    }
  }
}
