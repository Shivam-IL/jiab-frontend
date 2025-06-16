import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import { TMixCodeRedeem, MIX_CODE_STATUS } from "../types/MixCodeTypes";
import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";
import { AUTHORIZATION_TYPES } from "../client/constant";

export class MixCodeService extends MainService {
  private static instance: MixCodeService;

  public static getInstance(): MixCodeService {
    if (!MixCodeService.instance) {
      MixCodeService.instance = new MixCodeService();
    }
    return MixCodeService.instance;
  }

  private getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return token
      ? {
          Authorization: `${AUTHORIZATION_TYPES.BEARER} ${token}`,
        }
      : {};
  }

  public async redeemMixCode({ mix_code }: TMixCodeRedeem) {
    try {
      const response = await apiClient.post(
        `${API_ROUTES.MIX_CODE.REDEEM}?mix_code=${encodeURIComponent(mix_code)}`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      
      if (data?.success) {
        const responseData = {
          status: MIX_CODE_STATUS.SUCCESS,
          message: data?.message ?? "Code redeemed successfully",
        };
        return SuccessResponse(responseData);
      } else if (data?.code === 1012) {
        // Daily limit exceeded
        const responseData = {
          status: MIX_CODE_STATUS.DAILY_LIMIT_EXCEEDED,
          message: data?.message ?? "Daily mix code limit exceeded (max 5 per day)",
        };
        return SuccessResponse(responseData);
      } else if (data?.code === 1013) {
        // Invalid mix code
        const responseData = {
          status: MIX_CODE_STATUS.INVALID_CODE,
          message: data?.message ?? "Please enter a valid unique code",
        };
        return SuccessResponse(responseData);
      } else if (data?.code === 1014) {
        // Already used code
        const responseData = {
          status: MIX_CODE_STATUS.ALREADY_USED,
          message: data?.message ?? "Used code entered. Please try again with new code",
        };
        return SuccessResponse(responseData);
      }
      
      return ErrorResponse(data?.message ?? "Failed to redeem mix code");
    } catch (error) {
      throw new Error(error as string);
    }
  }
} 