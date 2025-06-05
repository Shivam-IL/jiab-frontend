import { AxiosError, AxiosResponse } from "axios";
import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES } from "../client/config";
import {
  TRefreshToken,
  TRequestOTP,
  TSignUp,
  TVerifyOTP,
} from "../types/LoginTypes";
import { MainService } from "./MainService";

interface ValidationErrors {
  validation_errors?: Record<string, string[]>;
}

interface RequestOTPResponse {
  success: boolean;
  data: {
    message: string;
  };
  details?: ValidationErrors;
}

interface VerifyOTPResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    user_id: string;
  };
  details?: ValidationErrors;
  message?: string;
}

interface SignUpResponse {
  success: boolean;
  data: {
    user_id: string;
    message: string;
  };
  message?: string;
}

interface RefreshTokenResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
  };
  message?: string;
}

export class LoginService extends MainService {
  private static instance: LoginService;
  private token: string | null = this.getAccessToken() ?? null;

  public static getInstance(): LoginService {
    if (!LoginService.instance) {
      LoginService.instance = new LoginService();
    }
    return LoginService.instance;
  }

  public setToken(token: string) {
    this.token = token;
  }

  private getAuthHeaders() {
    return this.token
      ? {
          Authorization: `Bearer ${this.token}`,
        }
      : {};
  }

  public async RequestOTP({ mobile_number }: TRequestOTP) {
    try {
      const response: AxiosResponse<RequestOTPResponse> = await apiClient.post(API_ROUTES.AUTH.REQUEST_OTP, {
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
        return ErrorResponse(error.response?.data?.message || "Network error occurred");
      }
      return ErrorResponse("An unexpected error occurred");
    }
  }

  public async VerifyOTP({ otp, mobile_number }: TVerifyOTP) {
    try {
      const response: AxiosResponse<VerifyOTPResponse> = await apiClient.post(API_ROUTES.AUTH.VERIFY_OTP, {
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
        return ErrorResponse(error.response?.data?.message || "Network error occurred");
      }
      return ErrorResponse("An unexpected error occurred");
    }
  }

  public async SignUp(data: TSignUp) {
    try {
      const response: AxiosResponse<SignUpResponse> = await apiClient.post(
        API_ROUTES.AUTH.SIGN_UP,
        {
          ...data,
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
        return ErrorResponse(error.response?.data?.message || "Network error occurred");
      }
      return ErrorResponse("An unexpected error occurred");
    }
  }

  public async RefreshToken({ refresh_token }: TRefreshToken) {
    try {
      const response: AxiosResponse<RefreshTokenResponse> = await apiClient.post(API_ROUTES.AUTH.REFRESH_TOKEN, {
        refresh_token,
      });
      const responseData = response.data;
      if (responseData?.success) {
        return SuccessResponse(responseData.data);
      }
      return ErrorResponse(responseData?.message ?? "Something went wrong");
    } catch (error) {
      if (error instanceof AxiosError) {
        return ErrorResponse(error.response?.data?.message || "Network error occurred");
      }
      return ErrorResponse("An unexpected error occurred");
    }
  }
}
