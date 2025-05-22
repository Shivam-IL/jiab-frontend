import axios, { AxiosInstance } from "axios";
import { API_CONFIG } from "./config";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: { ...API_CONFIG.headers, "ngrok-skip-browser-warning": "true" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(error?.message)
  }
);

export default apiClient;
