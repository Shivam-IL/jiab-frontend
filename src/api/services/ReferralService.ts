import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import {
  TReferral,
  TReferralSendAgain,
  TReferralVerify,
} from "../types/ReferralTypes";
import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";
import {
  INVITE_CODE_STATUS,
  REFERRAL_CODE,
  SEND_AGAIN_STATUS,
} from "@/constants";
import { AUTHORIZATION_TYPES } from "../client/constant";

export class ReferralService extends MainService {
  private static instance: ReferralService;

  public static getInstance(): ReferralService {
    if (!ReferralService.instance) {
      ReferralService.instance = new ReferralService();
    }
    return ReferralService.instance;
  }

  private getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return token
      ? {
          Authorization: `${AUTHORIZATION_TYPES.BEARER} ${token}`,
        }
      : {};
  }

  public async sendReferral({ refer_to }: TReferral) {
    try {
      const response = await apiClient.post(
        API_ROUTES.REFERRAL.SEND_REFERRAL,
        {
          refer_to,
        },
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        const responseData = {
          status: REFERRAL_CODE.SUCCESS,
          invite_code: data?.data?.referral_code,
        };
        return SuccessResponse(responseData);
      } else if (data?.code === 1008) {
        const data = {
          status: REFERRAL_CODE.INVALID_MOBILE_NUMBER,
        };
        return SuccessResponse(data);
      } else if (data?.code === 1009) {
        const data = {
          status: REFERRAL_CODE.CANNOT_SEND_TO_SELF,
        };
        return SuccessResponse(data);
      } else if (data?.code === 1011) {
        const data = {
          status: REFERRAL_CODE.ALREADY_REFERRED,
        };
        return SuccessResponse(data);
      } else if (data?.code === 1002) {
        const data = {
          status: REFERRAL_CODE.EXISTING_USER,
        };
        return SuccessResponse(data);
      }
      return ErrorResponse(data?.message || "Invalid Mobile Number");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getAllReferrals(page: number, query?: string) {
    try {
      let endpoint = `${API_ROUTES.REFERRAL.GET_INVITEES}?page=${page}`;
      if (query) {
        endpoint += query;
      }
      const response = await apiClient.get(endpoint, {
        headers: this.getAuthHeaders(),
      });
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data?.data);
      }
      return ErrorResponse(data?.message || "Invalid User Id");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async sendAgain({ referral_id }: TReferralSendAgain) {
    try {
      const response = await apiClient.post(
        API_ROUTES.REFERRAL.SEND_AGAIN,
        {
          referral_id,
        },
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        const responseData = {
          status: SEND_AGAIN_STATUS.SUCCESS,
          code: data?.data?.referralCode ?? "",
        };
        return SuccessResponse(responseData);
      } else if (data?.code === 1002) {
        const responseData = {
          status: SEND_AGAIN_STATUS.CANT_SEND_AGAIN_IN_A_WEEK,
        };
        return SuccessResponse(responseData);
      }
      return ErrorResponse(data?.message || "Invalid User Id");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async verifyReferral({ referral_code }: TReferralVerify) {
    try {
      const response = await apiClient.post(
        API_ROUTES.REFERRAL.VERIFY_REFERRAL,
        { referral_code },
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        const responseData = {
          status: INVITE_CODE_STATUS.SUCCESS,
          phone_number: data?.data?.phone_number,
        };
        return SuccessResponse(responseData);
      } else if (data?.code === 1010) {
        const responseData = {
          status: INVITE_CODE_STATUS.INVALID_REFERRAL_CODE,
          message: data?.message,
        };
        return SuccessResponse(responseData);
      } else if (data?.code === 1002) {
        const responseData = {
          message: data?.message,
        };
        return SuccessResponse(responseData);
      }
      return ErrorResponse(data?.message || "Invalid Referral Code");
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
