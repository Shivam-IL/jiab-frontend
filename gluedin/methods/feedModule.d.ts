export declare class GluedInFeedModule {
    private apiService;
    constructor();
    ValidateUser(userToken: any): Promise<void>;
    getFeedList(filter: any): Promise<any>;
    getFeedListV2(filter: any): Promise<any>;
    searchVideo(filter: any): Promise<any>;
    getCategoryList(filter: any): Promise<any>;
    getSignedUrl(filter: any): Promise<any>;
    uploadContent(postData: any): Promise<any>;
    Like(feedId: any): Promise<any>;
    Reactions(feedId: any): Promise<any>;
    View(feedId: any): Promise<any>;
    CommentList(filter: any): Promise<any>;
    DeleteComment(filter: any): Promise<any>;
    UpdateComment(postData: any): Promise<any>;
    Share(userToken: string): Promise<void>;
    Report(formData: any): Promise<any>;
    ReportReason(): Promise<any>;
    filterVideos(filter: any): Promise<any>;
    getJokeLeaderBoard(filter: any): Promise<any>;
    getMyrank(filter: any): Promise<any>;
    getScheduledVideo(filter: any): Promise<any>;
    getTaggedVideo(filter: any): Promise<any>;
    getCreatorLeaderBoard(filter: any): Promise<any>;
}
