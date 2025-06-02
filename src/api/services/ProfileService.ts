import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES } from "../client/config";
import {
  IAddress,
  TAddessId,
  TAddress,
  TEditProfile,
  TSubmitQuestions,
} from "../types/ProfileTypes";
import { MainService } from "./MainService";

export class ProfileService extends MainService {
  private static instance: ProfileService;
  private token: string | null = this.getAccessToken() ?? null;

  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService();
    }
    return ProfileService.instance;
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

  public async getUserProfileDetails(userId: string) {
    try {
      const endpoint = `${API_ROUTES.USER.PROFILE.GET}?userId=${userId}`;
      const response = await apiClient.get(endpoint, {
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

  public async editUserProfileDetails(userData: TEditProfile) {
    try {
      const response = await apiClient.put(
        API_ROUTES.USER.PROFILE.EDIT,
        { ...userData },
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

  public async getUserAddresses() {
    try {
      const response = await apiClient.get(API_ROUTES.USER.ADDRESS.GET, {
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

  public async addNewAddress(addressData: TAddress) {
    try {
      const response = await apiClient.post(
        API_ROUTES.USER.ADDRESS.ADD,
        { ...addressData },
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data);
      }
      return ErrorResponse(data?.message || "Invalid Address Data");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async editAddress(addressData: IAddress) {
    try {
      const endpoint = `${API_ROUTES.USER.ADDRESS.EDIT}/${addressData.address_id}`;
      const response = await apiClient.put(
        endpoint,
        { ...addressData },
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data);
      }
      return ErrorResponse(data?.message || "Invalid Address Data");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async deleteAddress({ address_id }: TAddessId) {
    try {
      const endpoint = `${API_ROUTES.USER.ADDRESS.DELETE}/${address_id}`;
      const response = await apiClient.delete(endpoint, {
        headers: this.getAuthHeaders(),
      });
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data);
      }
      return ErrorResponse(data?.message || "Invalid Address Data");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getUserBalanceAndRank() {
    try {
      const response = await apiClient.get(API_ROUTES.USER.BALANCE.GET, {
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

  public async submitUserQuestions({ questions }: TSubmitQuestions) {
    try {
      const response = await apiClient.post(
        API_ROUTES.USER.QUESTIONS.POST,
        { ...questions },
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data);
      }
      return ErrorResponse(data?.message || "Invalid Questions Data");
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
