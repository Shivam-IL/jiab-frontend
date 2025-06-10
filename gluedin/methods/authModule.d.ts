export declare class GluedInAuthModule {
    private apiService;
    constructor();
    AuthRawData(userData: any): Promise<any>;
    SignupWithToken(userToken: string): void;
    SignupRawData(userData: any): Promise<any>;
    SignInRawData(userData: any): void;
    SignInShopifyUser(userId: string): void;
    SocialSigninData(userData: any): Promise<any>;
    SignOut(): void;
    CallSignOut(): void;
    getAccessToken(): any;
    getGuestToken(): any;
    SDKInitilize(setObj: any): void;
    setupSdk(initObj: any): void;
}
