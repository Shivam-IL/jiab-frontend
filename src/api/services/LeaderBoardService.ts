import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";

import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";
import { AUTHORIZATION_TYPES } from "../client/constant";

export class LeaderBoardService extends MainService {
  private static instance: LeaderBoardService;

  public static getInstance(): LeaderBoardService {
    if (!LeaderBoardService.instance) {
      LeaderBoardService.instance = new LeaderBoardService();
    }
    return LeaderBoardService.instance;
  }

  private getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return token
      ? {
          Authorization: `${AUTHORIZATION_TYPES.BEARER} ${token}`,
        }
      : {};
  }

  public async getLeaderBoard(date?: string) {
    try {
      const endpoint = date
        ? `${API_ROUTES.LEADERBOARD.GET_LEADERBOARD}?date=${date}`
        : API_ROUTES.LEADERBOARD.GET_LEADERBOARD;
      const response = await apiClient.get(endpoint, {
        headers: this.getAuthHeaders(),
      });
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data?.data);
      }
      return ErrorResponse(data?.message);
    } catch (error) {
      throw error;
    }
  }
}
