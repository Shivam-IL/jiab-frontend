import { AxiosError, AxiosResponse } from "axios";
import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";

export class JokeService extends MainService {
  private static instance: JokeService;

  public static getInstance(): JokeService {
    if (!JokeService.instance) {
      JokeService.instance = new JokeService();
    }
    return JokeService.instance;
  }

  private getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  }

  public async GetSurpriseMe() {
    try {
      const endpoint = `${API_ROUTES.JOKES.GET_SURPRISE_ME}?genre=1&language=1`;
      const response = await apiClient.get(endpoint, {
        headers: {
          ...this.getAuthHeaders(),
        },
      });
      console.log('joke response', response)
      const responseData = response.data;
      if (responseData?.success) {
        return SuccessResponse(responseData.data);
      }
      console.log('joke error', responseData)
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error) {
      throw error;
    }
  }
}
