export declare class GluedInRewardsModule {
    private apiService;
    constructor();
    getCouponsList(filter: any): Promise<any>;
    getCouponCode(couponId: any): Promise<any>;
    getPointHistory(filter: any): Promise<any>;
    getMyCoupons(filter: any): Promise<any>;
}
