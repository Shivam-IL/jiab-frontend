import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import {
  IAddress,
  TAddessId,
  TAddress,
  TEditProfile,
  TSubmitQuestions,
} from "../types/ProfileTypes";
import { MainService } from "./MainService";
import { AUTHORIZATION_TYPES } from "../client/constant";

export class ProfileService extends MainService {
  private static instance: ProfileService;

  public static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService();
    }
    return ProfileService.instance;
  }

  private getAuthHeaders() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return token
      ? {
          Authorization: `${AUTHORIZATION_TYPES.BEARER} ${token}`,
        }
      : {};
  }

  public async getUserProfileDetails() {
    try {
      const response = await apiClient.get(API_ROUTES.USER.PROFILE.GET, {
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
      const formData = new FormData();
      formData.append("name", userData.name);
      if (userData?.dob) {
        formData.append("dob", userData.dob);
      }
      formData.append("email", userData.email);
      if (userData?.gender) {
        formData.append("gender", userData.gender);
      }
      if (userData?.avatar_id) {
        formData.append("avatar_id", userData.avatar_id.toString());
      }

      if (userData?.pfImage) {
        formData.append("profile_image", userData.pfImage);
        formData.append("is_profile", "true");
      } else if (userData?.avatar_id) {
        formData.append("is_avatar", "true");
      }
      const response = await apiClient.patch(
        API_ROUTES.USER.PROFILE.EDIT,
        formData,
        {
          headers: {
            ...this.getAuthHeaders(),
            "Content-Type": "multipart/form-data",
          },
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
        return SuccessResponse(data?.data);
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
        return SuccessResponse(data?.data);
      }
      return ErrorResponse(data?.message || "Invalid Address Data");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async editAddress(addressData: IAddress) {
    try {
      const endpoint = `${API_ROUTES.USER.ADDRESS.EDIT}${addressData.address_id}`;
      const response = await apiClient.put(
        endpoint,
        { ...addressData },
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data?.data);
      }
      return ErrorResponse(data?.message || "Invalid Address Data");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async deleteAddress({ address_id }: TAddessId) {
    try {
      const endpoint = `${API_ROUTES.USER.ADDRESS.DELETE}${address_id}`;
      const response = await apiClient.delete(endpoint, {
        headers: this.getAuthHeaders(),
      });
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data?.data);
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

  public async getUserQuestions() {
    try {
      const response = await apiClient.get(API_ROUTES.USER.QUESTIONS.GET, {
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

  public async submitUserQuestions({ questions }: TSubmitQuestions) {
    try {
      const endpoint = `${API_ROUTES.USER.QUESTIONS.POST}${questions?.[0]?.question_id}`;
      const response = await apiClient.post(endpoint, questions, {
        headers: this.getAuthHeaders(),
      });
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data?.data);
      }
      return ErrorResponse(data?.message || "Invalid Questions Data");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getAvatarsData() {
    try {
      const response = await apiClient.get(API_ROUTES.USER.AVATAR, {
        headers: this.getAuthHeaders(),
      });
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data?.data?.data ?? []);
      }
      return ErrorResponse(data?.message || "Invalid Avatars Data");
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getPincodeData(pincode: string) {
    try {
      const response = await apiClient.get(
        API_ROUTES.USER.ADDRESS.PINCODE_AUTOFILL + pincode,
        {
          headers: this.getAuthHeaders(),
        }
      );
      const data = response.data;
      if (data?.success) {
        return SuccessResponse(data?.data);
      }
      return ErrorResponse(data?.message || "Invalid Pincode Data");
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
