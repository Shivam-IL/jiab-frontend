import { AxiosError } from "axios";
import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import {
  TRefreshToken,
  TRequestOTP,
  TSignUp,
  TVerifyOTP,
} from "../types/LoginTypes";
import { MainService } from "./MainService";
import { getLocalStorageItem } from "@/utils";
import { AUTHORIZATION_TYPES } from "../client/constant";

export class LoginService extends MainService {
  private static instance: LoginService;

  public static getInstance(): LoginService {
    if (!LoginService.instance) {
      LoginService.instance = new LoginService();
    }
    return LoginService.instance;
  }

  private getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return token
      ? {
          Authorization: `${AUTHORIZATION_TYPES.BEARER} ${token}`,
        }
      : {};
  }

  public async RequestOTP({ mobile_number }: TRequestOTP) {
    try {
      const response = await apiClient.post(API_ROUTES.AUTH.REQUEST_OTP, {
        mobile_number,
      });
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data.data);
      }
      return ErrorResponse(
        data?.details?.validation_errors?.mobile_number?.[0] ||
          "Please enter a valid phone number"
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        return ErrorResponse(
          error.response?.data?.message || "Network error occurred"
        );
      }
      return ErrorResponse("An unexpected error occurred");
    }
  }

  public async VerifyOTP({ otp, mobile_number }: TVerifyOTP) {
    try {
      const response = await apiClient.post(API_ROUTES.AUTH.VERIFY_OTP, {
        otp,
        mobile_number,
      });
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data.data);
      }
      const errorArr: [string, string[]][] = Object.entries(
        data?.details?.validation_errors ?? {}
      );
      if (errorArr?.length > 0) {
        const errorMessage = errorArr[0][1][0] ?? "Please enter a valid OTP";
        return ErrorResponse(errorMessage);
      }
      return ErrorResponse(data?.message ?? "Something went wrong");
    } catch (error) {
      if (error instanceof AxiosError) {
        return ErrorResponse(
          error.response?.data?.message || "Network error occurred"
        );
      }
      return ErrorResponse("An unexpected error occurred");
    }
  }

  public async SignUp(data: TSignUp) {
    try {
      const formData: Record<string, string | number | boolean> = {};
      if (data?.avatar) {
        formData["avatar_id"] = parseInt(data.avatar as string, 10);
        formData["is_avatar"] = "true";
      }
      if (data?.referral_code) {
        formData["referral_code"] = data.referral_code;
      }
      if (data?.full_name) {
        formData["full_name"] = data.full_name;
      }
      if (data?.mobile_number) {
        formData["mobile_number"] = data.mobile_number;
      }
      if (data?.email) {
        formData["email"] = data.email;
      }
      if (data?.device_token) {
        formData["device_token"] = data.device_token;
      }
      const response = await apiClient.post(
        API_ROUTES.AUTH.SIGN_UP,
        {
          ...formData,
        },
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
      const errorEntries = Object.entries(
        responseData?.details?.validation_errors ?? {}
      );
      let errrMessage = "";
      for (const item of errorEntries) {
        const value = (Array.isArray(item[1]) ? item[1][0] : undefined) as
          | string
          | undefined;
        errrMessage = value ?? "Something Went Wrong!";
        break;
      }
      if (responseData?.message && errorEntries?.length === 0) {
        errrMessage = responseData?.message;
      }
      return ErrorResponse(errrMessage ?? "Something went wrong");
    } catch (error) {
      if (error instanceof AxiosError) {
        return ErrorResponse(
          error.response?.data?.message || "Network error occurred"
        );
      }
      return ErrorResponse("An unexpected error occurred");
    }
  }

  public async RefreshToken({ refresh_token }: TRefreshToken) {
    try {
      const response = await apiClient.post(
        API_ROUTES.AUTH.REFRESH_TOKEN,
        {
          refresh_token,
        },
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
      if (error instanceof AxiosError) {
        return ErrorResponse(
          error.response?.data?.message || "Network error occurred"
        );
      }
      return ErrorResponse("An unexpected error occurred");
    }
  }
}
