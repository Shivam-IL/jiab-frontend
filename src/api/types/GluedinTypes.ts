export type TGludeinLogin = {
  user_id: string;
};

export type TGludeinFeedList = {
  search?: string;
  offset?: number;
  limit?: number;
  language?: string;
  category?: string;
  filterChnageId?: string;
  sortBy?: string;
};

export type TGludeinHomePageJokeList = {
  sortBy?: string;
};

export interface TUGCContent {
  _id: string;
  videoId: string;
  topicId: string;
  userId: string;
  user: {
    userId: string;
    userName: string;
    fullName: string | null;
    localisedFullName: string | null;
    followersCount: number;
    profileImageUrl: string;
  };
  videoOwnerName: string;
  title: string;
  localisedTitle: {
    en: string;
    [key: string]: string;
  };
  description: string;
  localisedDescription: {
    en: string;
    [key: string]: string;
  };
  hashtags: string[];
  labels: string[];
  taggedUsers: string[];
  products: unknown[];
  artistsDetail: {
    fullName: string;
    userId: string;
  }[];
  contentUrls: string[];
  thumbnailUrl: string | null;
  thumbnails: {
    desktop: string | null;
    seeall: string | null;
    mobile: string | null;
  };
  reactions: {
    [reaction: string]: number;
  };
  viewsCount: number;
  likeCount: number;
  socialType: string;
  contentType: string;
  downloadUrl: string | null;
  createdTimestamp: number;
  status: string;
}

export interface TModifiedUGCContent extends TUGCContent {
  isLiked: boolean;
  isReacted?: boolean;
  reactionType?: string;
  content?: string;
  contentDataId?: string;
}

export interface TGludeinUserVote {
  assetId: string;
  genreId?: string;
  languageId?: string;
  type?: string;
}

export interface TGludeinUserReaction extends TGludeinUserVote {
  reactionType: string;
  increaseComicCoin?: boolean;
}


export type TGludeinJokes = {
  assetIds: string[];
}

export type TGludeinHallOfLame = {
  offset: number;
  limit: number;
  toDate?:number;
  fromDate?:number;
}

export type TGludeinReport = {
  userId: string,
  actingUserId: string,
  assetId: string,
  reason: string,
}