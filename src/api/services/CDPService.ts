import { AxiosError } from "axios";
import { CDP_API_URL } from "@/config";
import {
  BaseCDPEventPayload,
  LandingPageCDPEventPayload,
  RegistrationCDPEventPayload,
  LoginCDPEventPayload,
  LanguageCDPEventPayload,
  SocialMediaCDPEventPayload,
  ReactionCDPEventPayload,
  UGCSubmissionCDPEventPayload,
  JokeCategoryCDPEventPayload,
  UGCFilterCDPEventPayload,
  ReferralCompletedCDPEventPayload,
  AddressCDPEventPayload,
  ProfileCDPEventPayload,
  QuestionCDPPayload,
  TransactionCodeCDPEventPayload,
} from "../utils/cdpEvents";

export class CDPService {
  private static instance: CDPService;

  public static getInstance(): CDPService {
    if (!CDPService.instance) {
      CDPService.instance = new CDPService();
    }
    return CDPService.instance;
  }

  public async sendCDPEvent(
    payload:
      | BaseCDPEventPayload
      | LandingPageCDPEventPayload
      | RegistrationCDPEventPayload
      | LoginCDPEventPayload
      | LanguageCDPEventPayload
      | SocialMediaCDPEventPayload
      | ReactionCDPEventPayload
      | UGCSubmissionCDPEventPayload
      | JokeCategoryCDPEventPayload
      | UGCFilterCDPEventPayload
      | ReferralCompletedCDPEventPayload
      | AddressCDPEventPayload
      | ProfileCDPEventPayload
      | QuestionCDPPayload
      | TransactionCodeCDPEventPayload
  ) {
    try {
      console.log("payload", payload);
      const url = new URL(`${CDP_API_URL}.gif`);
      Object.entries(payload).forEach(([key, value]) => {
        if (key !== "user_identifiers") {
          url.searchParams.set(key, value as string);
        }
      });
      url.searchParams.set(
        "user_identifiers",
        JSON.stringify(payload.user_identifiers)
      );
      const img = new Image();
      img.src = url.toString();
    } catch (error) {
      if (error instanceof AxiosError) {
      }
    }
  }
}
