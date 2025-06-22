export type TEditProfile = {
  avatar_id?: number;
  dob?: string;
  email: string;
  gender?: string;
  name: string;
  is_avatar?: boolean;
};

export type TAddress = {
  address1: string;
  address2: string;
  city: string;
  is_default: boolean;
  nearest_landmark: string;
  pincode: number;
  shipping_mobile: string;
  state: string;
};

export type TAddessId = {
  address_id: number;
};

export interface IAddress extends TAddessId, TAddress {}

type TQuestion = {
  answer_id: number;
  question_id: number;
  language_id?: number;
};

export type TSubmitQuestions = {
  questions: TQuestion[];
  language_id?: number;
};
