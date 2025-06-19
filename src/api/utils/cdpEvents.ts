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

  // Consumption Questions
  CONSUME_MONTHLY: "Consume_Monthly",
  CONSUME_WEEKLY: "Consume_Weekly",
  CONSUME_OCCASIONAL: "Consume_Occasional",
  CONSUME_NEVER: "Consume_Never",

  // Consideration Questions
  CONSIDER_FIRST_CHOICE: "Consider_FirstChoice",
  CONSIDER_SERIOUSLY: "Consider_Seriously",
  CONSIDER_MAYBE: "Consider_Maybe",
  CONSIDER_NOT: "Consider_Not",

  // Feeling Questions
  FEEL_LOVE: "Feel_Love",
  FEEL_NICE: "Feel_Nice",
  FEEL_EXCELLENT: "Feel_Excellent",
  FEEL_NEUTRAL: "Feel_Neutral",
  FEEL_BAD: "Feel_Bad",
  FEEL_VERY_BAD: "Feel_VeryBad",

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
  created_dt: string;
  ip_address?: string;
  user_identifiers: Array<{
    user_identifier_type: string;
    user_identifier_sub_type: string;
    user_identifier: string;
  }>;
}

// Extended CDP Event Payload Interfaces
export interface LandingPageCDPEventPayload extends BaseCDPEventPayload {
  phone_with_countrycode?: string;
  geo_country_code?: string;
  geo_state_province_code?: string;
  geo_city_name?: string;
  geo_postal_code?: string;
  referrer?: string;
}

export interface RegistrationCDPEventPayload extends BaseCDPEventPayload {
  phone_with_countrycode: string;
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
  phone_with_countrycode: string;
  geo_country_code: string;
  geo_state_province_code: string;
  geo_city_name: string;
  geo_postal_code: string;
}

export interface LanguageCDPEventPayload extends BaseCDPEventPayload {
  language_code: string;
}

export interface SocialMediaCDPEventPayload extends BaseCDPEventPayload {
  social_media_platform: string;
}

export interface ReactionCDPEventPayload extends BaseCDPEventPayload {
  joke_id: string;
}

export interface UGCSubmissionCDPEventPayload extends BaseCDPEventPayload {
  language_code: string;
  joke_category: string;
  name: string;
  first_name: string;
}

export interface JokeCategoryCDPEventPayload extends BaseCDPEventPayload {
  mood_type: string;
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

export interface ConsumptionQuestionCDPEventPayload
  extends BaseCDPEventPayload {
  phone_with_countrycode: string;
}

export interface TransactionCodeCDPEventPayload extends BaseCDPEventPayload {
  phone_with_countrycode: string;
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
      created_dt: getCurrentEpopTime(),
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
    phone_with_countrycode?: string;
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
      ...data,
    };
  }

  // Registration Event
  public static buildRegistrationPayload(data: {
    phone_with_countrycode: string;
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
      phone_with_countrycode: data.phone_with_countrycode,
      email: data.email,
      first_name: data.first_name,
      targeting_age_from: 18,
      [COMMUNICATION_PREFERENCES.SMS_MESSAGE]:1,
      [COMMUNICATION_PREFERENCES.PHONE_CALL]:1,
      [COMMUNICATION_PREFERENCES.EMAIL]:1,
      [COMMUNICATION_PREFERENCES.WHATSAPP]:1,
      geo_country_code: data.geo_country_code,
      geo_state_province_code: data.geo_state_province_code,
      geo_city_name: data.geo_city_name,
      geo_postal_code: data.geo_postal_code,
      ip_address: data.ip_address,
    };
  }

  // Login Event
  public static buildLoginPayload(data: {
    phone_with_countrycode: string;
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
      ...data,
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
    platform: string,
    user_identifier: string
  ): SocialMediaCDPEventPayload {
    const eventSubTypeMap = {
      [SOCIAL_MEDIA_PLATFORMS.TWITTER]: CDP_EVENT_SUB_TYPES.FOLLOW_JIAB_TWITTER,
      [SOCIAL_MEDIA_PLATFORMS.FACEBOOK]: CDP_EVENT_SUB_TYPES.FOLLOW_JIAB_FB,
      [SOCIAL_MEDIA_PLATFORMS.WHATSAPP]: CDP_EVENT_SUB_TYPES.FOLLOW_JIAB_WA,
      [SOCIAL_MEDIA_PLATFORMS.INSTAGRAM]: CDP_EVENT_SUB_TYPES.FOLLOW_JIAB_INSTA,
      [SOCIAL_MEDIA_PLATFORMS.YOUTUBE]: CDP_EVENT_SUB_TYPES.FOLLOW_JIAB_YT,
    };

    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubTypeMap[platform as keyof typeof eventSubTypeMap],
        user_identifier
      ),
      social_media_platform: platform,
    };
  }

  // Reaction Events
  public static buildReactionPayload(
    jokeId: string,
    reactionType: "haha" | "meh" | "grr",
    user_identifier: string
  ): ReactionCDPEventPayload {
    const eventSubTypeMap = {
      haha: `${CDP_EVENT_SUB_TYPES.HAHA_REACTION}_${jokeId}`,
      meh: `${CDP_EVENT_SUB_TYPES.MEH_REACTION}_${jokeId}`,
      grr: `${CDP_EVENT_SUB_TYPES.GRR_REACTION}_${jokeId}`,
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
    category: string;
    name: string;
    firstName: string;
    user_identifier: string;
  }): UGCSubmissionCDPEventPayload {
    const eventSubTypeMap = {
      [JOKE_FORMATS.AUDIO]: `${CDP_EVENT_SUB_TYPES.SUBMIT_AUDIO_JOKE}_${data.languageCode}_${data.category}`,
      [JOKE_FORMATS.VIDEO]: `${CDP_EVENT_SUB_TYPES.SUBMIT_VIDEO_JOKE}_${data.languageCode}_${data.category}`,
      [JOKE_FORMATS.IMAGE]: `${CDP_EVENT_SUB_TYPES.SUBMIT_IMAGE_JOKE}_${data.languageCode}_${data.category}`,
      [JOKE_FORMATS.TEXT]: `${CDP_EVENT_SUB_TYPES.SUBMIT_TEXT_JOKE}_${data.languageCode}_${data.category}`,
    };

    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubTypeMap[data.format as keyof typeof eventSubTypeMap],
        data.user_identifier
      ),
      language_code: data.languageCode,
      joke_category: data.category,
      name: data.name,
      first_name: data.firstName,
    };
  }

  // Joke Events
  public  static buildPullJokePayload(
    category: string,
    user_identifier: string
  ): JokeCategoryCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        `${CDP_EVENT_SUB_TYPES.PULL_JOKE}_${category}`,
        user_identifier
      ),
      mood_type: category,
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
      joke_id: jokeId,
    };
  }

  public static buildVoteJokePayload(
    jokeId: string,
    user_identifier: string
  ): ReactionCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        `${CDP_EVENT_SUB_TYPES.VOTE_JOKE}${jokeId}`,
        user_identifier
      ),
      joke_id: jokeId,
    };
  }

  // UGC Filter Event
  public static buildUGCFilterPayload(
    languageCode: string,
    category: string,
    user_identifier: string
  ): BaseCDPEventPayload {
    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        `${CDP_EVENT_SUB_TYPES.UGC_FILTER}_${languageCode}_${category}`,
        user_identifier
      ),
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
      ...data,
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
      ...data,
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
  public static buildConsumptionQuestionPayload(
    consumptionType: "monthly" | "weekly" | "occasional" | "never",
    phoneNumber: string,
    user_identifier: string
  ): ConsumptionQuestionCDPEventPayload {
    const eventSubTypeMap = {
      monthly: CDP_EVENT_SUB_TYPES.CONSUME_MONTHLY,
      weekly: CDP_EVENT_SUB_TYPES.CONSUME_WEEKLY,
      occasional: CDP_EVENT_SUB_TYPES.CONSUME_OCCASIONAL,
      never: CDP_EVENT_SUB_TYPES.CONSUME_NEVER,
    };

    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubTypeMap[consumptionType],
        user_identifier
      ),
      phone_with_countrycode: phoneNumber,
    };
  }

  // Consideration Question Events
  public static buildConsiderationQuestionPayload(
    considerationType: "firstChoice" | "seriously" | "maybe" | "not",
    phoneNumber: string,
    user_identifier: string
  ): ConsumptionQuestionCDPEventPayload {
    const eventSubTypeMap = {
      firstChoice: CDP_EVENT_SUB_TYPES.CONSIDER_FIRST_CHOICE,
      seriously: CDP_EVENT_SUB_TYPES.CONSIDER_SERIOUSLY,
      maybe: CDP_EVENT_SUB_TYPES.CONSIDER_MAYBE,
      not: CDP_EVENT_SUB_TYPES.CONSIDER_NOT,
    };

    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubTypeMap[considerationType],
        user_identifier
      ),
      phone_with_countrycode: phoneNumber,
    };
  }

  // Feeling Question Events
  public static buildFeelingQuestionPayload(
    feelingType: "love" | "nice" | "excellent" | "neutral" | "bad" | "veryBad",
    phoneNumber: string,
    user_identifier: string
  ): ConsumptionQuestionCDPEventPayload {
    const eventSubTypeMap = {
      love: CDP_EVENT_SUB_TYPES.FEEL_LOVE,
      nice: CDP_EVENT_SUB_TYPES.FEEL_NICE,
      excellent: CDP_EVENT_SUB_TYPES.FEEL_EXCELLENT,
      neutral: CDP_EVENT_SUB_TYPES.FEEL_NEUTRAL,
      bad: CDP_EVENT_SUB_TYPES.FEEL_BAD,
      veryBad: CDP_EVENT_SUB_TYPES.FEEL_VERY_BAD,
    };

    return {
      ...this.getBasePayload(
        CDP_EVENT_TYPES.CLICK,
        eventSubTypeMap[feelingType],
        user_identifier
      ),
      phone_with_countrycode: phoneNumber,
    };
  }

  // Transaction Code Event
  public  static buildTransactionCodePayload(
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
      phone_with_countrycode: phoneNumber,
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
