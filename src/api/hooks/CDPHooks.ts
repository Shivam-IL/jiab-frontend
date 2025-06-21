import { useMutation } from "@tanstack/react-query";
import { CDPService } from "../services/CDPService";
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

const cdpService = CDPService.getInstance();

const useSendCDPEvent = () => {
  return useMutation({
    mutationFn: (
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
    ) => cdpService.sendCDPEvent(payload),
  });
};

export { useSendCDPEvent };
