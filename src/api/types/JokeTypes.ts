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
}

// Query params accepted by GET /joke/jokes endpoint
export interface TGetJokesParams {
  limit?: number;
  selected_joke?: string; // comma separated IDs
  preferredJokes?: string; // comma separated IDs
  language?: string; // e.g. "en", "hi"
} 