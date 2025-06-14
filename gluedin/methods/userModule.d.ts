export declare class GluedInUserModule {
    private apiService;
    constructor();
    getUserDetails(userId: string): Promise<any>;
    userForgotpassword(email: string): Promise<any>;
    getUserFollowersStatus(userId: string): Promise<any>;
    editUserProfileImage(formData: any): Promise<any>;
    editUserProfile(formData: any): Promise<any>;
    userProfileList(filter: any): Promise<any>;
    changePassword(formData: any): Promise<any>;
    followUser(formData: any): Promise<any>;
    getFollowerList(filter: any): Promise<any>;
    getFollowingList(filter: any): Promise<any>;
    getUserVideoList(filter: any): Promise<any>;
    getTopProfiles(filter: any): Promise<any>;
    getUseConfig(): Promise<any>;
    getUserMetaIds(request: any): Promise<any>;
    deleteUserProfile(): Promise<any>;
    blockUser(blockUserRequest: any): Promise<any>;
    getJokeLeaderBoard(filter: any): Promise<any>;
    getMyrank(filter: any): Promise<any>;
}
