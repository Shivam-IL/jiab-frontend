export interface IGeolocationData {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  timezone: string;
  latitude: number;
  longitude: number;
  isp: string;
  org: string;
  postal: string;
}

export interface ILocalGeoData{
  geo_country_code: string;
  geo_state_province_code: string;
  geo_city_name: string;
  geo_postal_code: string;
  ip_address: string;
}
