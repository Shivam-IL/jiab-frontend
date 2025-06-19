const API_URL: string = process.env.NEXT_PUBLIC_API_URL || "";
const AVATARS_URL: string = process.env.NEXT_PUBLIC_AVATARS_URL || "";
const GLUEDIN_API_KEY: string = process.env.NEXT_PUBLIC_GLUEDIN_API_KEY || "";
const GLUEDIN_SECRET_KEY: string =
  process.env.NEXT_PUBLIC_GLUEDIN_SECRET_KEY || "";
const GLUEDIN_LOGIN_SECRET_KEY: string =
  process.env.NEXT_PUBLIC_GLUEDIN_LOGIN_SECRET_KEY || "";
const GA_ID: string = process.env.NEXT_PUBLIC_GA_ID || "";
const INFOBIP_WHATSAPP_URL: string =
  process.env.NEXT_PUBLIC_INFOBIP_WHATSAPP_URL || "";
const CDP_CLIENT_ID: string = process.env.NEXT_PUBLIC_CDP_CLIENT_ID || "";
const CDP_BRAND_NAME: string = process.env.NEXT_PUBLIC_CDP_BRAND_NAME || "";
const CDP_USER_IDENTIFIER_TYPE: string =
  process.env.NEXT_PUBLIC_CDP_USER_IDENTIFIED_TYPE || "";
const CDP_USER_IDENTIFIER_SUB_TYPE: string =
  process.env.NEXT_PUBLIC_CDP_USER_IDENTIFIER_SUB_TYPE || "";
const CDP_API_URL: string = process.env.NEXT_PUBLIC_CDP_API_URL || "";
const CDP_API_KEY: string = process.env.NEXT_PUBLIC_CDP_API_KEY || "";


export {
  API_URL,
  AVATARS_URL,
  GLUEDIN_API_KEY,
  GLUEDIN_SECRET_KEY,
  GLUEDIN_LOGIN_SECRET_KEY,
  GA_ID,
  INFOBIP_WHATSAPP_URL,
  CDP_CLIENT_ID,
  CDP_BRAND_NAME,
  CDP_USER_IDENTIFIER_TYPE,
  CDP_USER_IDENTIFIER_SUB_TYPE,
  CDP_API_URL,
  CDP_API_KEY,
};
