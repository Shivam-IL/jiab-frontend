export declare class ApiService {
    getExternalAPI(urlSegment: string): Promise<import("axios").AxiosResponse<any>>;
    getAPI(urlSegment: string): Promise<import("axios").AxiosResponse<any>>;
    getAPIWithGuestToken(urlSegment: string): Promise<import("axios").AxiosResponse<any>>;
    sleep(ms: number): Promise<unknown>;
    getAPIWithAccessToken(urlSegment: string): Promise<import("axios").AxiosResponse<any>>;
    postAPI(urlSegment: string, formdata: any): Promise<import("axios").AxiosResponse<any>>;
    postAPIWithAccessToken(urlSegment: string, formdata: any): Promise<import("axios").AxiosResponse<any>>;
    postAPIWithGuestAccessToken(urlSegment: string, formdata: any): Promise<import("axios").AxiosResponse<any>>;
    getAPIWithGuestAccessToken(urlSegment: string): Promise<import("axios").AxiosResponse<any>>;
    putAPIWithAccessToken(urlSegment: string, formdata: any): Promise<import("axios").AxiosResponse<any>>;
    deleteAPIWithAccessToken(urlSegment: string, formdata?: any): Promise<import("axios").AxiosResponse<any>>;
    getAccessToken(): Promise<any>;
    getGuestAccessToken(): Promise<any>;
    sdkInitilizeCall(initObj: any): Promise<import("axios").AxiosResponse<any>>;
    initializeShopifySDK(): Promise<import("axios").AxiosResponse<any>>;
    getDeviceId(): any;
    getEncrptedKey(inputString: string, secretKey: string): string;
    refreshAccessToken(accessToken: string, formdata: any): Promise<import("axios").AxiosResponse<any>>;
}
declare const _default: {
    ApiService: typeof ApiService;
};
export default _default;
