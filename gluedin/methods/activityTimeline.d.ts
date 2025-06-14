export declare class GluedInActivityTimeline {
    private apiService;
    constructor();
    getActivityTimelineList(filter: any): Promise<any>;
    getActivityTimelineCommentList(filter: any): Promise<any>;
    getActivityTimelineCommentReplyList(filter: any): Promise<any>;
    getActivityTimelineUserDetails(filter: any): Promise<any>;
    activityTimelineLike(postData: any): Promise<any>;
    activityTimelineBookmark(postData: any): Promise<any>;
    activityTimelineUnLike(postData: any): Promise<any>;
    activityTimelineView(postData: any): Promise<any>;
    activityTimelineDeleteComment(filter: any): Promise<any>;
    activityTimelineUpdateComment(postData: any): Promise<any>;
    activityTimelineAddComment(postData: any): Promise<any>;
    activityTimelineShare(postData: any): Promise<any>;
    activityTimelineReact(postData: any): Promise<any>;
    activityTimelineUnlock(postData: any): Promise<any>;
}
