export const keys = {
  profile: {
    userProfileDetails: () => ["user-profile-details"],
    getUserAddresses: () => ["get-user-addresses"],
    getUserBalanceAndRank: () => ["get-user-balance-and-rank"],
    getUserQuestions: () => ["get-user-questions"],
    getAvatarsData: () => ["get-avatars-data"],
    getVoucherInfo: () => ["get-voucher-info"],
    updateComicCoinPopUp: () => ["update-comic-coin-pop-up"],
  },
  referral: {
    getAllReferrals: () => ["get-all-referrals"],
  },
  cms: {
    getContent: () => ["get-cms-content"],
  },
  joke: {
    getSurpriseMeJoke: () => ["get-surprise-me-joke"],
    getJokes: () => ["get-jokes"],
    getUserSubmittedJokes: () => ["get-user-submitted-jokes"],
    getComicCoins: () => ["get-comic-coins"],
  },
  leaderboard: {
    getLeaderboard: () => ["get-leaderboard"],
  },
  gluedin: {
    getGluedinFeedList: () => ["get-gluedin-feed-list"],
    getGluedinUserVoteList: () => ["get-gluedin-user-vote-list"],
    getGluedinCategoryList: () => ["get-gluedin-category-list"],
    getGluedinAssetById: () => ["get-gluedin-asset-by-id"],
    getHallOfLame: () => ["get-hall-of-lame"],
  },
  reference: {
    getGenres: () => ["get-genres"],
    getJokesFormats: () => ["get-jokes-formats"],
    getLanguages: () => ["get-languages"],
  },
  notifications: {
    getNotifications: () => ["get-notifications"],
    getNotificationCount: () => ["get-notification-count"],
  },
  geolocation: {
    getUserGeolocation: () => ["get-user-geolocation"],
    getGeolocationByIP: (ip: string) => ["get-geolocation-by-ip", ip],
    getUserIP: () => ["get-user-ip"],
  },
  report: {
    sendReport: () => ["send-report"],
  },
};
