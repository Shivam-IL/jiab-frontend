import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";
import { AUTHORIZATION_TYPES } from "../client/constant";
import { TSendReportParams } from "../types/ReportTypes";

export class ReportService extends MainService {
  private static instance: ReportService;

  public static getInstance(): ReportService {
    if (!ReportService.instance) {
      ReportService.instance = new ReportService();
    }
    return ReportService.instance;
  }

  private getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return token
      ? {
          Authorization: `${AUTHORIZATION_TYPES.BEARER} ${token}`,
        }
      : {};
  }

  public async SendReport(data: TSendReportParams) {
    try {
      const response = await apiClient.post(
        API_ROUTES.REPORT.SEND_REPORT,
        data,
        {
          headers: {
            ...this.getAuthHeaders(),
          },
        }
      );
      
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