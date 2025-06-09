import axios, { AxiosInstance } from "axios";
import { CMS_API_CONFIG } from "./config";

const cmsClient: AxiosInstance = axios.create({
  baseURL: CMS_API_CONFIG.baseURL,
  timeout: CMS_API_CONFIG.timeout,
  headers: { ...CMS_API_CONFIG.headers },
});

cmsClient.interceptors.response.use(
  (response) => response,
  (error) => error.response
);

export default cmsClient; 