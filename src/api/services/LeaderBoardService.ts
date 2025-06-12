import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";

import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";

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
          Authorization: `Bearer ${token}`,
        }
      : {};
  }

  public async getLeaderBoard() {
    try {
      const response = await apiClient.get(
        API_ROUTES.LEADERBOARD.GET_LEADERBOARD,
        {
          headers: this.getAuthHeaders(),
        }
      );
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
