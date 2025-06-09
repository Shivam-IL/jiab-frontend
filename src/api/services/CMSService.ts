import { AxiosError } from "axios";
import cmsClient from "../client/cmsClient";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES } from "../client/config";

export class CMSService {
  private static instance: CMSService;

  public static getInstance(): CMSService {
    if (!CMSService.instance) {
      CMSService.instance = new CMSService();
    }
    return CMSService.instance;
  }

  public async getHomePageContent(): Promise<any> {
    try {
      const response = await cmsClient.get(API_ROUTES.CMS.GET_HOME_PAGE_CONTENT);
      const data = response.data;
      
      // Strapi typically returns data in this format
      if (data && (data.data || Array.isArray(data))) {
        return SuccessResponse(data);
      }
      
      return ErrorResponse("No content found");
    } catch (error) {
      if (error instanceof AxiosError) {
        return ErrorResponse(
          error.response?.data?.message || "Failed to fetch CMS content"
        );
      }
      return ErrorResponse("An unexpected error occurred while fetching CMS content");
    }
  }
} 