import apiClient from "../client";
import { SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import { TMixCodeRedeem } from "../types/MixCodeTypes";
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
        return SuccessResponse({
          success: true,
          status: 200,
          message: data?.message ?? "Code redeemed successfully",
        });
      } else {
        return SuccessResponse({
          success: false,
          status: 400,
          code: data?.code,
          message: data?.message,
        });
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
} 