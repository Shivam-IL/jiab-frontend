// File types enum for better type safety
export enum FileType {
  IMAGE = "image",
  TEXT = "text",
  AUDIO = "audio",
  VIDEO = "video",
}

export interface IJokeData {
  language: string;
  format: string;
  fileType: FileType;
  jokeText: string;
  acceptedFormats: string;
  title: string;
  category: string;
  file: [];
  agreeToTerms: boolean;
}

export interface IClaimFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  panNumber: string;
}
