import { ApiService } from '../services/commonService';
export declare class SAWSDKInitilize {
    private readonly apiService;
    constructor(apiService: ApiService);
    setupSDK(setObj: any): void;
}
