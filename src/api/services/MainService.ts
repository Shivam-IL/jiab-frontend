import { LOCAL_STORAGE_KEYS } from "../client/config";

export class MainService {
  private static mainInstance: MainService;
  private accessToken: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      console.log('Initial token from localStorage:', this.accessToken);
    }
  }

  public setAccessToken(accessToken: string) {
    console.log('Setting new token:', accessToken);
    this.accessToken = accessToken;
    if (accessToken) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      console.log('Token saved in localStorage:', localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN));
    } else {
      if (localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)) {  
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      }
    }
  }

  protected getAccessToken() {
    return this.accessToken;
  }

  public static getInstance(): MainService {
    if (!MainService.mainInstance) {
      MainService.mainInstance = new MainService();
    }
    return MainService.mainInstance;
  }
}
