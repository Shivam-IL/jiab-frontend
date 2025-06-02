export type TRequestOTP = {
  mobile_number: string;
};

export type TVerifyOTP = {
  otp: string;
  mobile_number: string;
};

export type TSignUp = {
  avatar: string;
  email: string;
  full_name: string;
  mobile_number: string;
  referral_code: string;
};

export type TRefreshToken = {
  refresh_token: string;
};
