export declare class GluedInVideosModule {
    private apiService;
    constructor();
    getVideosByProduct(filter: any, productId: string): Promise<any>;
    getVideoById(videoId: string): Promise<any>;
    updatePost(updateReq?: any): Promise<any>;
    deletePostById(postId: string): Promise<any>;
}
