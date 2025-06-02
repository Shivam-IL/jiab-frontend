export class MainService {
  private static mainInstance: MainService;
  private accessToken: string | null = null;

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
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
