import { AxiosError, AxiosResponse } from "axios";
import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";
import { AUTHORIZATION_TYPES } from "../client/constant";

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
          Authorization: `${AUTHORIZATION_TYPES.BEARER} ${token}`,
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
      console.log("joke response", response);
      const responseData = response.data;
      if (responseData?.success) {
        return SuccessResponse(responseData.data);
      }
      console.log("joke error", responseData);
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetch list of jokes for Scroll & LOL screen
   * Corresponds to GET /joke/jokes
   */
  public async GetJokes({
    limit,
    selected_joke,
    preferredJokes,
    language,
  }: import("../types/JokeTypes").TGetJokesParams = {}) {
    try {
      const queryParams = new URLSearchParams();
      if (limit) queryParams.append("limit", limit.toString());
      if (selected_joke) queryParams.append("selected_joke", selected_joke);
      if (preferredJokes) queryParams.append("preferredJokes", preferredJokes);
      if (language) queryParams.append("language", language);

      const endpoint = `${API_ROUTES.JOKES.GET_SCROLL_AND_LOL}${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const response = await apiClient.get(endpoint, {
        headers: {
          ...this.getAuthHeaders(),
        },
      });

      const responseData = response.data;
      if (responseData?.success) {
        return SuccessResponse(responseData.data);
      }
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error) {
      throw error;
    }
  }
}
