import {
  CDP_USER_IDENTIFIER_SUB_TYPE,
  CDP_USER_IDENTIFIER_TYPE,
} from "@/config";
import { getCurrentEpopTime } from "@/utils/epopTimeUtils";
import { getLocalStorageItem } from "@/utils/";

// CDP Event Types
export const CDP_EVENT_TYPES = {
  PAGE_VIEW: "Page_view",
  CLICK: "Click",
  SELECT: "Select",
  ONLOAD: "OnLoad",
} as const;

export const QUESTION_ID_ANSWER_MAPPING: Record<number, string> = {
  1: "Consume_Monthly",
  2: "Consume_Occasional",
  3: "Consume_Never",
  4: "Consume_Weekly",
  5: "Consider_4",
  6: "Consider_3",
  7: "Consider_2",
  8: "Consider_1",
  9: "BrandPerception_3",
  10: "BrandPerception_2",
  11: "BrandPerception_1",
  12: "BrandPerception_1",
  13: "BrandPerception_-1",
  14: "BrandPerception_-2",
  15: "BrandPerception_-3",
};

// CDP Event Sub Types
export const CDP_EVENT_SUB_TYPES = {
  // Landing Page Events
  LANDING_PAGE_LOAD_FROM_WA: "LandingPage_Load_fromWA",
  LANDING_PAGE_LOAD: "LandingPage_Load",

  // Authentication Events
  SUBMIT_REG: "Submit_Reg",
  LOGIN: "Login",

  // Consent Events
  CONSENT_PUSH: "Consent_Push",

  // Language Events
  CHANGE_LANGUAGE: "Change_Language",

  // Social Media Events
  FOLLOW_JIAB_TWITTER: "Follow_JIAB_Twitter",
  FOLLOW_JIAB_FB: "Follow_JIAB_FB",
  FOLLOW_JIAB_WA: "Follow_JIAB_WA",
  FOLLOW_JIAB_INSTA: "Follow_JIAB_Insta",
  FOLLOW_JIAB_YT: "Follow_JIAB_YT",

  // Reaction Events
  HAHA_REACTION: "Haha_Reaction",
  MEH_REACTION: "Meh_Reaction",
  GRR_REACTION: "Grr_Reaction",

  // Surprise Me Events
  SURPRISE_ME: "Surprise_Me",

  // Referral Events
  REFER_FRIEND: "Refer_Friend",
  USE_INVITE_CODE: "Use_Invite_Code",
  REFERRAL_COMPLETED: "Referral_Completed",

  // UGC Events
  INTEREST_UGC_SUBMISSION: "Interest_UGC_Submission",
  SUBMIT_AUDIO_JOKE: "Submit_Audio_Joke",
  SUBMIT_VIDEO_JOKE: "Submit_Video_Joke",
  SUBMIT_IMAGE_JOKE: "Submit_Image_Joke",
  SUBMIT_TEXT_JOKE: "Submit_Text_Joke",

  // Joke Events
  PULL_JOKE: "Pull_Joke",
  VIEW_JOKE: "view",
  VOTE_JOKE: "vote",

  // UGC Filter Events
  UGC_FILTER: "UGC",

  // Report Events
  JOKE_REPORTED: "Joke_Reported",

  // Profile Events
  EDIT_PROFILE: "Edit_Profile",
  ADD_ADDRESS: "Add_Address",
  UPDATE_ADDRESS: "Update_Address",

  // Transaction Events
  SUBMIT_TRANSACTION_CODE: "Submit_Transaction_Code",

  // Scroll & LOL Events
  SCROLL_LOL_HAHA: "Haha_Reaction",
  SCROLL_LOL_MEH: "Meh_Reaction",
  SCROLL_LOL_GRR: "Grr_Reaction",
  SCROLL_LOL_VIEW: "View",
} as const;

// Social Media Platforms
export const SOCIAL_MEDIA_PLATFORMS = {
  TWITTER: "Twitter",
  FACEBOOK: "Facebook",
  WHATSAPP: "WhatsApp",
  INSTAGRAM: "Instagram",
  YOUTUBE: "YouTube",
} as const;

// Language Codes
export const LANGUAGE_CODES = {
  ENGLISH: "EN",
  HINDI: "HI",
} as const;

// Joke Categories
export const JOKE_CATEGORIES = {
  WEDDING: "Wedding",
  FOOD: "Food",
  TRAFFIC: "Traffic",
} as const;

// Joke Formats
export const JOKE_FORMATS = {
  AUDIO: "Audio",
  VIDEO: "Video",
  IMAGE: "Image",
  TEXT: "Text",
} as const;

// Communication Preferences
export const COMMUNICATION_PREFERENCES = {
  SMS_MESSAGE: "communication_preferences/sms_message",
  PHONE_CALL: "communication_preferences/phone_call",
  EMAIL: "communication_preferences/email",
  WHATSAPP: "communication_preferences/whatsapp",
} as const;

// Base CDP Event Payload Interface
export interface BaseCDPEventPayload {
  client_id: string;
  event_type: string;
  event_sub_type: string;
  brand_name: string;
  ip_address?: string;
  user_identifiers: Array<{
    user_identifier_type: string;
    user_identifier_sub_type: string;
    user_identifier: string;
  }>;
}

export enum ReactionType {
  HAHA = "haha",
  MEH = "meh",
  GRR = "grr",
}

// Helper function to convert from types ReactionType to CDP ReactionType
export const convertReactionType = (reactionType: string): ReactionType => {
  switch (reactionType) {
    case "laugh":
      return ReactionType.HAHA;
    case "neutral":
      return ReactionType.MEH;
    case "sad":
      return ReactionType.GRR;
    default:
      return ReactionType.HAHA;
  }
};

// Extended CDP Event Payload Interfaces
export interface LandingPageCDPEventPayload extends BaseCDPEventPayload {
  phone_e164?: string;
  geo_country_code?: string;
  geo_state_province_code?: string;
  geo_city_name?: string;
  geo_postal_code?: string;
  referrer?: string;
}

export interface RegistrationCDPEventPayload extends BaseCDPEventPayload {
  phone_e164: string;
  email: string;
  first_name: string;
  targeting_age_from: number;
  [COMMUNICATION_PREFERENCES.SMS_MESSAGE]: number;
  [COMMUNICATION_PREFERENCES.PHONE_CALL]: number;
  [COMMUNICATION_PREFERENCES.EMAIL]: number;
  [COMMUNICATION_PREFERENCES.WHATSAPP]: number;
  geo_country_code: string;
  geo_state_province_code: string;
  geo_city_name: string;
  geo_postal_code: string;
}

export interface LoginCDPEventPayload extends BaseCDPEventPayload {
  phone_e164: string;
  geo_country_code: string;
  geo_state_province_code: string;
  geo_city_name: string;
  geo_postal_code: string;
}

export interface LanguageCDPEventPayload extends BaseCDPEventPayload {
  language_code: string;
}

export interface SocialMediaCDPEventPayload extends BaseCDPEventPayload {}

export interface ReactionCDPEventPayload extends BaseCDPEventPayload {
  joke_id?: string;
}

export interface UGCSubmissionCDPEventPayload extends BaseCDPEventPayload {
  language_code: string;
  first_name: string;
}

export interface JokeCategoryCDPEventPayload extends BaseCDPEventPayload {}

export interface UGCFilterCDPEventPayload extends BaseCDPEventPayload {
  language_code: string;
}

export interface ReferralCompletedCDPEventPayload extends BaseCDPEventPayload {
  // The phone number is embedded in the event_sub_type
}

export interface AddressCDPEventPayload extends BaseCDPEventPayload {
  address_line1: string;
  address_line2: string;
  address_city: string;
  address_state: string;
  geo_postal_code: string;
}

export interface ProfileCDPEventPayload extends BaseCDPEventPayload {
  first_name: string;
  email: string;
  dob: string;
  gender: string;
}

export interface QuestionCDPPayload extends BaseCDPEventPayload {
  phone_e164: string;
}

export interface TransactionCodeCDPEventPayload extends BaseCDPEventPayload {
  phone_e164: string;
  transaction_code: string;
}

// CDP Event Payload Builders
export class CDPEventPayloadBuilder {
  private static instance: CDPEventPayloadBuilder;
  private static readonly CLIENT_ID = "7397d1ab-0f3c-4ed0-a58b-819cd2e62425";
  private static readonly BRAND_NAME = "Sprite";

  public static getInstance(): CDPEventPayloadBuilder {
    if (!CDPEventPayloadBuilder.instance) {
      CDPEventPayloadBuilder.instance = new CDPEventPayloadBuilder();
    }
    return CDPEventPayloadBuilder.instance;
  }

  private static getBasePayload(
    eventType: string,
    eventSubType: string,
    userIdentifier: string
  ): BaseCDPEventPayload {
    return {
      client_id: this.CLIENT_ID,
      event_type: eventType,
      event_sub_type: eventSubType,
      brand_name: this.BRAND_NAME,
      user_identifiers: [
        {
          user_identifier_type: CDP_USER_IDENTIFIER_TYPE,
          user_identifier_sub_type: CDP_USER_IDENTIFIER_SUB_TYPE,
          user_identifier: userIdentifier, // This should be dynamic
        },
      ],
    };
  }

  // Landing Page Events
  public static buildLandingPageFromWAPayload(data: {
    phone_e164?: string;
    geo_country_code?: string;
    geo_state_province_code?: string;
    geo_city_name?: string;
    geo_postal_code?: string;
    referrer?: string;
    ip_address?: string;
    user_identifier: string;
  }): LandingPageCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.PAGE_VIEW,
        CDP_EVENT_SUB_TYPES.LANDING_PAGE_LOAD_FROM_WA,
        data.user_identifier
      ),
      ...data,
    };
  }

  public static buildLandingPagePayload(data: {
    geo_country_code?: string;
    geo_state_province_code?: string;
    geo_city_name?: string;
    geo_postal_code?: string;
    ip_address?: string;
    user_identifier: string;
  }): LandingPageCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.PAGE_VIEW,
        CDP_EVENT_SUB_TYPES.LANDING_PAGE_LOAD,
        data.user_identifier
      ),
      geo_country_code: data.geo_country_code,
      geo_state_province_code: data.geo_state_province_code,
      geo_city_name: data.geo_city_name,
      geo_postal_code: data.geo_postal_code,
      ip_address: data.ip_address,
    };
  }

  // Registration Event
  public static buildRegistrationPayload(data: {
    phone_e164: string;
    email: string;
    first_name: string;
    geo_country_code: string;
    geo_state_province_code: string;
    geo_city_name: string;
    geo_postal_code: string;
    ip_address?: string;
    user_identifier: string;
  }): RegistrationCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        CDP_EVENT_SUB_TYPES.SUBMIT_REG,
        data.user_identifier
      ),
      phone_e164: data.phone_e164,
      email: data.email,
      first_name: data.first_name,
      targeting_age_from: 18,
      [COMMUNICATION_PREFERENCES.SMS_MESSAGE]: 1,
      [COMMUNICATION_PREFERENCES.PHONE_CALL]: 1,
      [COMMUNICATION_PREFERENCES.EMAIL]: 1,
      [COMMUNICATION_PREFERENCES.WHATSAPP]: 1,
      geo_country_code: data.geo_country_code,
      geo_state_province_code: data.geo_state_province_code,
      geo_city_name: data.geo_city_name,
      geo_postal_code: data.geo_postal_code,
      ip_address: data.ip_address,
    };
  }

  // Login Event
  public static buildLoginPayload(data: {
    phone_e164: string;
    geo_country_code: string;
    geo_state_province_code: string;
    geo_city_name: string;
    geo_postal_code: string;
    ip_address?: string;
    user_identifier: string;
  }): LoginCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        CDP_EVENT_SUB_TYPES.LOGIN,
        data.user_identifier
      ),
      phone_e164: data.phone_e164,
      geo_country_code: data.geo_country_code,
      geo_state_province_code: data.geo_state_province_code,
      geo_city_name: data.geo_city_name,
      geo_postal_code: data.geo_postal_code,
      ip_address: data.ip_address,
    };
  }

  // Push Consent Event
  public static buildPushConsentPayload(data: {
    user_identifier: string;
  }): BaseCDPEventPayload {
    return this.getBasePayload(
      CDP_EVENT_TYPES.CLICK,
      CDP_EVENT_SUB_TYPES.CONSENT_PUSH,
      data.user_identifier
    );
  }

  // Language Change Event
  public static buildLanguageChangePayload(
    languageCode: string,
    user_identifier: string
  ): LanguageCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.SELECT,
        CDP_EVENT_SUB_TYPES.CHANGE_LANGUAGE,
        user_identifier
      ),
      language_code: languageCode,
    };
  }

  // Social Media Events
  public static buildSocialMediaPayload(
    eventSubType: string,
    user_identifier: string
  ): SocialMediaCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubType,
        user_identifier
      ),
    };
  }

  // Reaction Events
  public static buildReactionPayload(
    jokeId: string,
    reactionType: string,
    user_identifier: string
  ): ReactionCDPEventPayload {
    const cdpReactionType = convertReactionType(reactionType);
    const eventSubTypeMap = {
      [ReactionType.HAHA]: `${CDP_EVENT_SUB_TYPES.HAHA_REACTION}_${jokeId}`,
      [ReactionType.MEH]: `${CDP_EVENT_SUB_TYPES.MEH_REACTION}_${jokeId}`,
      [ReactionType.GRR]: `${CDP_EVENT_SUB_TYPES.GRR_REACTION}_${jokeId}`,
    };

    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubTypeMap[cdpReactionType],
        user_identifier
      ),
      joke_id: jokeId,
    };
  }

  // Surprise Me Event
  public static buildSurpriseMePayload({
    user_identifier,
  }: {
    user_identifier: string;
  }): BaseCDPEventPayload {
    return this.getBasePayload(
      CDP_EVENT_TYPES.CLICK,
      CDP_EVENT_SUB_TYPES.SURPRISE_ME,
      user_identifier
    );
  }

  // Referral Events
  public static buildReferFriendPayload({
    user_identifier,
  }: {
    user_identifier: string;
  }): BaseCDPEventPayload {
    return this.getBasePayload(
      CDP_EVENT_TYPES.CLICK,
      CDP_EVENT_SUB_TYPES.REFER_FRIEND,
      user_identifier
    );
  }

  public static buildUseInviteCodePayload({
    user_identifier,
  }: {
    user_identifier: string;
  }): BaseCDPEventPayload {
    return this.getBasePayload(
      CDP_EVENT_TYPES.CLICK,
      CDP_EVENT_SUB_TYPES.USE_INVITE_CODE,
      user_identifier
    );
  }

  public static buildReferralCompletedPayload(
    phoneNumber: string,
    user_identifier: string
  ): ReferralCompletedCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        `${CDP_EVENT_SUB_TYPES.REFERRAL_COMPLETED}_${phoneNumber}`,
        user_identifier
      ),
    };
  }

  // UGC Events
  public static buildUGCInterestPayload({
    user_identifier,
  }: {
    user_identifier: string;
  }): BaseCDPEventPayload {
    return this.getBasePayload(
      CDP_EVENT_TYPES.CLICK,
      CDP_EVENT_SUB_TYPES.INTEREST_UGC_SUBMISSION,
      user_identifier
    );
  }

  public static buildUGCSubmissionPayload(data: {
    format: string;
    languageCode: string;
    firstName: string;
    user_identifier: string;
  }): UGCSubmissionCDPEventPayload {
    const eventSubTypeMap = {
      [JOKE_FORMATS.AUDIO]: `${CDP_EVENT_SUB_TYPES.SUBMIT_AUDIO_JOKE}_Language_Genre`,
      [JOKE_FORMATS.VIDEO]: `${CDP_EVENT_SUB_TYPES.SUBMIT_VIDEO_JOKE}_Language_Genre`,
      [JOKE_FORMATS.IMAGE]: `${CDP_EVENT_SUB_TYPES.SUBMIT_IMAGE_JOKE}_Language_Genre`,
      [JOKE_FORMATS.TEXT]: `${CDP_EVENT_SUB_TYPES.SUBMIT_TEXT_JOKE}_Language_Genre`,
    };

    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubTypeMap[data.format as keyof typeof eventSubTypeMap],
        data.user_identifier
      ),
      language_code: data.languageCode.toUpperCase(),
      first_name: data.firstName,
    };
  }

  // Joke Events
  public static buildPullJokePayload(
    category: string,
    user_identifier: string
  ): JokeCategoryCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        `${CDP_EVENT_SUB_TYPES.PULL_JOKE}_${category}`,
        user_identifier
      ),
    };
  }

  public static buildViewJokePayload(
    jokeId: string,
    user_identifier: string
  ): ReactionCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        `${CDP_EVENT_SUB_TYPES.VIEW_JOKE}_${jokeId}`,
        user_identifier
      ),
    };
  }

  public static buildVoteJokePayload(
    jokeId: string,
    user_identifier: string
  ): ReactionCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        `${CDP_EVENT_SUB_TYPES.VOTE_JOKE}_${jokeId}`,
        user_identifier
      ),
    };
  }

  // UGC Filter Event
  public static buildUGCFilterPayload(
    languageCode: string,
    user_identifier: string,
    language?: string,
    category?: string,
  ): UGCFilterCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        `${CDP_EVENT_SUB_TYPES.UGC_FILTER}_${language ?? ''}_${category ?? ''}`,
        user_identifier
      ),
      language_code: languageCode.toUpperCase() ?? "",
    };
  }

  // Report Event
  public static buildJokeReportedPayload({
    user_identifier,
  }: {
    user_identifier: string;
  }): BaseCDPEventPayload {
    return this.getBasePayload(
      CDP_EVENT_TYPES.ONLOAD,
      CDP_EVENT_SUB_TYPES.JOKE_REPORTED,
      user_identifier
    );
  }

  // Profile Events
  public static buildEditProfilePayload(data: {
    first_name: string;
    email: string;
    dob: string;
    gender: string;
    user_identifier: string;
  }): ProfileCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        CDP_EVENT_SUB_TYPES.EDIT_PROFILE,
        data.user_identifier
      ),
      first_name: data.first_name,
      email: data.email,
      dob: data.dob,
      gender: data.gender,
    };
  }

  // Address Events
  public static buildAddAddressPayload(data: {
    address_line1: string;
    address_line2: string;
    address_city: string;
    address_state: string;
    geo_postal_code: string;
    user_identifier: string;
  }): AddressCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        CDP_EVENT_SUB_TYPES.ADD_ADDRESS,
        data.user_identifier
      ),
      address_line1: data.address_line1,
      address_line2: data.address_line2,
      address_city: data.address_city,
      address_state: data.address_state,
      geo_postal_code: data.geo_postal_code,
    };
  }

  public static buildUpdateAddressPayload(data: {
    address_line1: string;
    address_line2: string;
    address_city: string;
    address_state: string;
    geo_postal_code: string;
    user_identifier: string;
  }): AddressCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        CDP_EVENT_SUB_TYPES.UPDATE_ADDRESS,
        data.user_identifier
      ),
      ...data,
    };
  }

  // Consumption Question Events
  public static buildQuestionPayload(
    optionId: number,
    phoneNumber: string,
    user_identifier: string
  ): QuestionCDPPayload {
    const eventSubType = QUESTION_ID_ANSWER_MAPPING[optionId];
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubType,
        user_identifier
      ),
      phone_e164: `+91${phoneNumber}`,
    };
  }

  // Transaction Code Event
  public static buildTransactionCodePayload(
    phoneNumber: string,
    transactionCode: string,
    user_identifier: string
  ): TransactionCodeCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        CDP_EVENT_SUB_TYPES.SUBMIT_TRANSACTION_CODE,
        user_identifier
      ),
      phone_e164: phoneNumber,
      transaction_code: transactionCode,
    };
  }

  // Scroll & LOL Events
  public static buildScrollLOLReactionPayload(
    jokeId: string,
    reactionType: "haha" | "meh" | "grr",
    user_identifier: string
  ): ReactionCDPEventPayload {
    const eventSubTypeMap = {
      haha: `${CDP_EVENT_SUB_TYPES.SCROLL_LOL_HAHA}${jokeId}`,
      meh: `${CDP_EVENT_SUB_TYPES.SCROLL_LOL_MEH}${jokeId}`,
      grr: `${CDP_EVENT_SUB_TYPES.SCROLL_LOL_GRR}${jokeId}`,
    };

    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubTypeMap[reactionType],
        user_identifier
      ),
      joke_id: jokeId,
    };
  }

  public static buildScrollLOLViewPayload(
    jokeId: string,
    user_identifier: string
  ): ReactionCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        `${CDP_EVENT_SUB_TYPES.SCROLL_LOL_VIEW}${jokeId}`,
        user_identifier
      ),
      joke_id: jokeId,
    };
  }
}
