import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import { TReferral, TReferralSendAgain } from "../types/ReferralTypes";
import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";

export class ReferralService extends MainService {
  private static instance: ReferralService;

  public static getInstance(): ReferralService {
    if (!ReferralService.instance) {
      ReferralService.instance = new ReferralService();
    }
    return ReferralService.instance;
  }

  private getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  }

  public async sendReferral({ mobile_number }: TReferral) {
    try {
      const response = await apiClient.post(
        API_ROUTES.REFERRAL.SEND_REFERRAL,
        {
          mobile_number,
        },
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data);
      }
      return ErrorResponse(data?.message || "Invalid Mobile Number");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getAllReferrals() {
    try {
      const response = await apiClient.get(API_ROUTES.REFERRAL.GET_INVITEES, {
        headers: this.getAuthHeaders(),
      });
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data);
      }
      return ErrorResponse(data?.message || "Invalid User Id");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async sendAgain({ user_id }: TReferralSendAgain) {
    try {
      const response = await apiClient.post(
        API_ROUTES.REFERRAL.SEND_AGAIN,
        {
          user_id,
        },
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data);
      }
      return ErrorResponse(data?.message || "Invalid User Id");
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
