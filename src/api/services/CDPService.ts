import { AxiosError } from "axios";
import apiClient from "../client";
import { CDP_API_URL } from "@/config";

export class CDPService {
  private static instance: CDPService;

  public static getInstance(): CDPService {
    if (!CDPService.instance) {
      CDPService.instance = new CDPService();
    }
    return CDPService.instance;
  }

  public async sendCDPEvent(payload: any): Promise<any> {
    try {
        const url = new URL(`${CDP_API_URL}.gif`);
        Object.entries(payload).forEach(([key, value]) => {
          if(key !== 'user_identifiers'){
            url.searchParams.set(key, value as string);
          }
        });
        url.searchParams.set(
          "user_identifiers",
          JSON.stringify([
            {
              user_identifier_type: "COKE_COOKIE",
              user_identifier_sub_type: "CDS_PIXEL_COOKIE",
              user_identifier: "bd84705a-91df-55a8-a41e-4b412334145e",
            },
          ])
        );      
        const img = new Image();
        img.src = url.toString();
     
    } catch (error) {
      if (error instanceof AxiosError) {
      }
    }
  }
}
