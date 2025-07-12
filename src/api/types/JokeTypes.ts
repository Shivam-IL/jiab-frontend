export interface IUserReaction {
  laugh: number;
  neutral: number;
  sad: number;
}

export interface IJoke {
  artist_id: string;
  id: string;
  joke_creator: string;
  joke_genre: string;
  joke_language: string;
  like_count: number;
  thumbnail_url: string;
  title: string;
  type: string;
  url: string;
  user_reaction: IUserReaction;
  view_count: number;
  genre_image?: string;
}

// Query params accepted by GET /joke/jokes endpoint
export interface TGetJokesParams {
  limit?: number;
  selected_joke?: string; // comma separated IDs
  preferredJokes?: string; // comma separated IDs
  language?: string; // e.g. "en", "hi"
  type?: "home" | "scroll"; // e.g. "home", "scroll"
}

export type TSubmitJokeParams = {
  format: string;
  joke_genre_id: number;
  language_id: number;
  title: string;
  file: FileList;
  jokeText?: string;
};

// Comic Coins API response types
export interface IComicCoinsData {
  comic_coin: number;
  created_at: string;
  updated_at: string;
}

export interface IComicCoinsResponse {
  data: IComicCoinsData;
  message: string;
  status: number;
  success: boolean;
}

export interface IReelReaction {
  assetId: string;
  reaction: string;
}
