// File types enum for better type safety
export enum FileType {
  IMAGE = "image",
  TEXT = "text",
  AUDIO = "audio",
  VIDEO = "video",
}

export enum AddressModalType {
  ADD = "add",
  EDIT = "edit",
}

export enum ReactionType {
  LAUGH = "laugh",
  SAD = "sad",
  NEUTRAL = "neutral",
}

export interface IJokeData {
  language: string;
  format: string;
  fileType: FileType;
  jokeText: string;
  accptedFormatText: string;
  acceptedFormats: string;
  title: string;
  category: string;
  file:FileList | null | undefined;
  agreeToTerms: boolean;
  size: number;
}

export interface IClaimFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  panNumber: string;
}

export interface IHallOfLameData {
  id: string
  voteCount: number
  updatedTimestamp: number
  weekNumber: number
  title: string
  jokeOwnerName: string
  labels: string[]
  thumbnailUrl: string
  videoId: string
  ownerId: string
  projectId: string
  businessId: string
  rank: number
}

export interface IHallOfLameLeaderboardTableProps {
  weeklyTopJokes: string;
  prevButtonText: string;
  nextButtonText: string;
  rank: string;
  jokes: string;
  votes: string;
  data: IHallOfLameData[];
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  offset: number;
  setToDate: React.Dispatch<React.SetStateAction<number>>;
  setFromDate: React.Dispatch<React.SetStateAction<number>>;
}



export interface IHallOfLameDisplayTableProps {
  data: IHallOfLameData[];
  rank: string;
  jokes: string;
  votes: string;
  offset: number;
    }