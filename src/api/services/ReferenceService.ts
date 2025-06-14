import apiClient from "../client";
import { API_ROUTES } from "../client/config";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { MainService } from "./MainService";

export class ReferenceService extends MainService {
  private static instance: ReferenceService;

  public static getInstance(): ReferenceService {
    if (!ReferenceService.instance) {
      ReferenceService.instance = new ReferenceService();
    }
    return ReferenceService.instance;
  }

  public async getGenres() {
    try {
      const response = await apiClient.get(API_ROUTES.REFERENCE.GENRES);
      const responseData = response?.data ?? {};
      if (responseData?.success) {
        return SuccessResponse(responseData?.data);
      }
      return ErrorResponse(
        responseData?.statusMessage || "Failed to get genres"
      );
    } catch (error: any) {
      throw new Error(error?.message || "Failed to get genres");
    }
  }

  public async getJokesFormats() {
    try {
      const response = await apiClient.get(API_ROUTES.REFERENCE.JOKES_FORMATS);
      const responseData = response?.data ?? {};
      if (responseData?.success) {
        return SuccessResponse(responseData?.data);
      }
      return ErrorResponse(
        responseData?.statusMessage || "Failed to get Jokes formats"
      );
    } catch (error: any) {
      throw new Error(error?.message || "Failed to get Jokes formats");
    }
  }

  public async getLanguages() {
    try {
      const response = await apiClient.get(API_ROUTES.REFERENCE.LANGUAGES);
      const responseData = response?.data ?? {};
      if (responseData?.success) {
        return SuccessResponse(responseData?.data);
      }
      return ErrorResponse(
        responseData?.statusMessage || "Failed to get Languages"
      );
    } catch (error: any) {
      throw new Error(error?.message || "Failed to get Languages");
    }
  }
}
