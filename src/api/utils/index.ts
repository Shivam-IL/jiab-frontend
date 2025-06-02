export const keys = {
  profile: {
    userProfileDetails: (userId: string) => ["user-profile-details", userId],
    getUserAddresses: () => ["get-user-addresses"],
    getUserBalanceAndRank: () => ["get-user-balance-and-rank"]
  },
  referral: {
    getAllReferrals: () => ["get-all-referrals"],
  },
};
