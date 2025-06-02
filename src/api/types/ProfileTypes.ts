export type TEditProfile = {
  avatar_id: number;
  dob: string;
  email: string;
  gender: string;
  name: string;
};

export type TAddress = {
  address_line_1: string;
  address_line_2?: string;
  alternate_phone_number?: string;
  city: string;
  country: string;
  is_default: boolean;
  nearest_landmark?: string;
  pan_card_number: string;
  state: string;
  zip_code: string;
};

export type TAddessId = {
  address_id: number;
};

export interface IAddress extends TAddessId, TAddress {}

type TQuestion = {
  answer_id: number;
  question_id: number;
};

export type TSubmitQuestions = {
  questions: TQuestion[];
};
