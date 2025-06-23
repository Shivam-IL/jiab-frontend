import { TCMSResponse } from "@/api/types/CMSTypes";

export interface LeaderboardData {
  leaderboardHeading: string;
  leaderboardSubHeading: string;
  leaderboardDailyWinner: string;
  avatar: string;
  comicCoin: string;
  mobileNo: string;
  prize: string;
  rank: string;
  yourRank: string;
  noDataFoundText: string;
}

export const mapLeaderboardData = (
  cmsData: TCMSResponse["data"] | null
): LeaderboardData => {
  const leaderboardCMS = cmsData?.leaderboard;

  return {
    leaderboardHeading: leaderboardCMS?.leaderboard_heading ?? "Leaderboard",
    leaderboardSubHeading:
      leaderboardCMS?.leaderboard_sub_heading ??
      "Look who’s on top of their game",
    leaderboardDailyWinner:
      leaderboardCMS?.leaderboard_daily_winner ?? "Daily Winner",
    avatar: leaderboardCMS?.avatar ?? "Avatar",
    comicCoin: leaderboardCMS?.comic_coin ?? "Comic Coin",
    mobileNo: leaderboardCMS?.mobile_no ?? "Mobile No",
    prize: leaderboardCMS?.prize ?? "Prize",
    rank: leaderboardCMS?.rank ?? "Rank",
    yourRank: leaderboardCMS?.your_rank ?? "Your Rank",
    noDataFoundText: leaderboardCMS?.no_data_found ?? "No Data Found",
  };
};

// Default data for SSR/hydration
export const defaultLeaderboardData: LeaderboardData = {
  leaderboardHeading: "Leaderboard",
  leaderboardSubHeading: "Look who’s on top of their game",
  leaderboardDailyWinner: "Daily Winner",
  avatar: "Avatar",
  comicCoin: "Comic Coin",
  mobileNo: "Mobile No",
  prize: "Prize",
  rank: "Rank",
  yourRank: "Your Rank",
  noDataFoundText: "No Data Found",
};
