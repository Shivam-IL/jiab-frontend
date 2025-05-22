import { AxiosError, AxiosResponse } from "axios";
import apiClient from "../client";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";

export class HomeServices {
  private static instance: HomeServices;
  private token: string | null = null;

  public static getInstance(): HomeServices {
    if (!HomeServices.instance) {
      HomeServices.instance = new HomeServices();
    }
    return HomeServices.instance;
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
}
