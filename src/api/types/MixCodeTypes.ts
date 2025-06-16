export type TMixCodeRedeem = {
  mix_code: string;
};

export type TMixCodeRedeemResponse = {
  code: number;
  message: string;
  status: number;
  success: boolean;
};

export enum MIX_CODE_STATUS {
  SUCCESS = "SUCCESS",
  INVALID_CODE = "INVALID_CODE",
  ALREADY_USED = "ALREADY_USED",
  DAILY_LIMIT_EXCEEDED = "DAILY_LIMIT_EXCEEDED",
  ERROR = "ERROR",
} 