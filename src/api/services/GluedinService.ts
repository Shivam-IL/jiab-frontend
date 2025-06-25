import { getLocalStorageItem } from "@/utils";
import apiClient from "../client";
import { API_ROUTES, LOCAL_STORAGE_KEYS } from "../client/config";
import {
  gluedinAssetByIdTransformer,
  gluedinFeedListTransformer,
  gluedinViewTransformer,
} from "../transformers/GluedinTransformers";
import {
  TGludeinFeedList,
  TGludeinHallOfLame,
  TGludeinHomePageJokeList,
  TGludeinJokes,
  TGludeinReport,
  TModifiedUGCContent,
  TUGCContent,
} from "../types/GluedinTypes";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { MainService } from "./MainService";
import gluedin from "gluedin";
import { messaging, getToken } from "@/lib/firebase";

export interface IViewData {
  userId: string;
  assetId: string;
}

export class GluedinService extends MainService {
  private static instance: GluedinService;

  public static getInstance(): GluedinService {
    if (!GluedinService.instance) {
      GluedinService.instance = new GluedinService();
    }
    return GluedinService.instance;
  }

  public getAuthHeaders() {
    const token = getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  public async generateFCMToken() {
    try {
      // Check if we're in a browser environment with Notification API
      if (typeof window === "undefined" || !("Notification" in window)) {
        console.log("Notification API not available");
        return null;
      }

      // Import setupMessaging function
      const { setupMessaging } = await import("@/lib/firebase");

      // Ensure messaging is initialized with Web Push support check
      const messagingInstance = messaging || (await setupMessaging());
      if (!messagingInstance) {
        console.log(
          "Firebase messaging not available or not supported on this device/browser"
        );
        return null;
      }

      // Check if service worker is supported
      if ("serviceWorker" in navigator) {
        // Register service worker
        await navigator.serviceWorker.register("/firebase-messaging-sw.js");

        // Request notification permission
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          // Generate FCM token
          const token = await getToken(messagingInstance, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });

          if (token) {
            console.log("FCM Token generated for signup:", token);
            // Store token in localStorage for persistence
            localStorage.setItem("fcm_token", token);
            return token;
          } else {
            console.log("No FCM token available");
            return null;
          }
        } else {
          console.log("Notification permission denied");
          return null;
        }
      } else {
        console.log("Service Worker not supported");
        return null;
      }
    } catch (error) {
      console.error("Error generating FCM token:", error);
      return null;
    }
  }

  public async GludeinLogin({
    user_id,
    accessToken,
  }: {
    user_id: string;
    accessToken: string;
  }) {
    try {
      const formData = {
        email: `${user_id}@gmail.com`,
        password: user_id,
        autoCreate: true,
        accessToken,
      };

      const gluedinLogin = new gluedin.GluedInAuthModule();
      const gluedinLoginResponse = await gluedinLogin.AuthRawData(formData);

      const response = gluedinLoginResponse?.data ?? {};
      if (response?.success) {
        return SuccessResponse(response?.result);
      } else {
        throw new Error(
          response?.statusMessage || "Failed to login with GluedIn"
        );
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to login with Gluedin";
      throw new Error(errorMessage);
    }
  }

  public async getGluedinFeedList({
    search,
    offset = 0,
    limit = 6,
    language,
    category,
    sortBy,
  }: TGludeinFeedList) {
    const feedModule = new gluedin.GluedInFeedModule();
    const labels = [];
    if (language) {
      labels.push(language);
    }
    if (category) {
      labels.push(category);
    }
    try {
      const payload = {
        c_type: "UGC",
        offset: offset,
        limit: limit,
        ugc: true,
        ...(labels.length > 0 && { labels }),
        ...(search && { search }),
        ...(sortBy && { sortBy }),
      };

      let gluedinFeedList;
      if (language || category || search || sortBy) {
        gluedinFeedList = await feedModule.filterVideos(payload);
      } else {
        gluedinFeedList = await feedModule.getFeedList(payload);
      }
      const response = gluedinFeedList?.data ?? {};

      const videoIds = response?.result?.map(
        (item: TUGCContent) => item?.videoId
      );
      const gluedinUserVoteList = await feedModule.Like(videoIds);
      const gluedinUserVoteListResponse = gluedinUserVoteList?.data ?? {};

      const getContentByIds = await apiClient.post(
        API_ROUTES.JOKES.GET_CONTENT_BY_IDS,
        {
          ids: videoIds ?? [],
        },
        {
          headers: {
            ...this.getAuthHeaders(),
          },
        }
      );
      const contentResponse = getContentByIds?.data ?? {};

      const getData = await feedModule.Reactions(videoIds);
      const gluedinUserReactionList = getData?.data;

      if (response?.success) {
        const modifiedFeedData: TModifiedUGCContent[] =
          gluedinFeedListTransformer(
            response?.result,
            gluedinUserVoteListResponse?.result,
            gluedinUserReactionList?.result,
            contentResponse?.data ?? []
          );
        return SuccessResponse(modifiedFeedData);
      }
      return ErrorResponse(
        response?.statusMessage || "Failed to get Gluedin feed list"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get Gluedin feed list";
      throw new Error(errorMessage);
    }
  }

  public async getHomePageJokeList({ sortBy }: TGludeinHomePageJokeList) {
    const feedModule = new gluedin.GluedInFeedModule();
    const offset = 0;
    const limit = 1000;
    try {
      const payload = {
        c_type: "UGC",
        ugc: true,
        offset: offset,
        limit: limit,
        ...(sortBy && { sortBy }),
      };

      const gluedinFeedList = await feedModule.filterVideos(payload);
      const response = gluedinFeedList?.data ?? {};

      const videoIds = response?.result?.map(
        (item: TUGCContent) => item?.videoId
      );
      const gluedinUserVoteList = await feedModule.Like(videoIds);
      const gluedinUserVoteListResponse = gluedinUserVoteList?.data ?? {};

      const getContentByIds = await apiClient.post(
        API_ROUTES.JOKES.GET_CONTENT_BY_IDS,
        {
          ids: videoIds ?? [],
        },
        {
          headers: {
            ...this.getAuthHeaders(),
          },
        }
      );
      const contentResponse = getContentByIds?.data ?? {};

      const getData = await feedModule.Reactions(videoIds);
      const gluedinUserReactionList = getData?.data;

      if (response?.success) {
        const modifiedFeedData: TModifiedUGCContent[] =
          gluedinFeedListTransformer(
            response?.result,
            gluedinUserVoteListResponse?.result,
            gluedinUserReactionList?.result,
            contentResponse?.data ?? []
          );
        const newModifiedFeedData = modifiedFeedData.filter(
          (item) => item.content !== ""
        );
        const newData = newModifiedFeedData?.slice(0, 6) ?? [];
        return SuccessResponse(newData);
      }
      return ErrorResponse(
        response?.statusMessage || "Failed to get Gluedin feed list"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get Gluedin feed list";
      throw new Error(errorMessage);
    }
  }

  public async getGluedinAssetById(assetId: string) {
    try {
      if (!assetId) {
        return ErrorResponse("Asset id is required");
      }
      const feedModule = new gluedin.GluedInFeedModule();
      const gluedinUserVoteList = await feedModule.Like([assetId]);
      const gluedinUserVoteListResponse = gluedinUserVoteList?.data ?? {};

      const getData = await feedModule.Reactions([assetId]);
      const gluedinUserReactionList = getData?.data;
      if (
        gluedinUserVoteListResponse?.success &&
        gluedinUserReactionList?.success
      ) {
        const transformedData = gluedinAssetByIdTransformer(
          gluedinUserVoteListResponse?.result,
          gluedinUserReactionList?.result
        );
        return SuccessResponse(transformedData);
      }
      return ErrorResponse(
        gluedinUserVoteListResponse?.statusMessage ||
          gluedinUserReactionList?.statusMessage ||
          "Failed to get Gluedin asset by id"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get Gluedin asset by id";
      throw new Error(errorMessage);
    }
  }

  public async getGluedinUserVoteList() {
    try {
      const actityvityTimelineModule = new gluedin.GluedInActivityTimeline();
      const gluedinUserVoteList =
        await actityvityTimelineModule.getActivityTimelineList({
          event: "like",
          limit: 100000,
        });

      const response = gluedinUserVoteList?.data ?? {};
      if (response?.success) {
        return SuccessResponse(response?.result);
      }
      return ErrorResponse(
        response?.statusMessage || "Failed to get Gluedin user vote list"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get Gluedin user vote list";
      throw new Error(errorMessage);
    }
  }

  public async sendGluedinUserReaction({
    assetId,
    reactionType,
    increaseComicCoin,
  }: {
    assetId: string;
    reactionType: string;
    increaseComicCoin?: boolean;
  }) {
    try {
      const authModuleObj = new gluedin.GluedInAuthModule();
      const accessToken = await authModuleObj.getAccessToken();
      if (!accessToken) {
        return ErrorResponse("Please login to react");
      }
      const actityvityTimelineModule = new gluedin.GluedInActivityTimeline();
      const gluedinUserReactionList =
        await actityvityTimelineModule.activityTimelineReact({
          assetId: assetId,
          event: "reaction",
          reactionType: reactionType,
        });
      if (increaseComicCoin) {
        const token = await this.generateFCMToken();
        const endpoint = `${API_ROUTES.JOKES.INCREASE_COMIC_COINS}?asset_id=${assetId}&type=other`;
        await apiClient.post(
          endpoint,
          {
            deviceId: token,
          },
          {
            headers: {
              ...this.getAuthHeaders(),
            },
          }
        );
      }
      const response = gluedinUserReactionList?.data ?? {};
      if (response?.success) {
        return SuccessResponse(response?.result);
      }
      return ErrorResponse(
        response?.statusMessage || "Failed to get Gluedin user reaction list"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get Gluedin user reaction list";
      throw new Error(errorMessage);
    }
  }

  public async sendVoteToGluedinAssets({
    assetId,
    genreId,
    languageId,
    type,
  }: {
    assetId: string;
    genreId?: string;
    languageId?: string;
    type?: string;
  }) {
    try {
      const authModuleObj = new gluedin.GluedInAuthModule();
      const accessToken = await authModuleObj.getAccessToken();
      const token = await this.generateFCMToken();
      if (!accessToken) {
        return ErrorResponse("Please login to react");
      }
      let endpoint = `${API_ROUTES.JOKES.INCREASE_COMIC_COINS}?type=other`;
      if (type === "vote" && genreId && languageId) {
        endpoint = `${API_ROUTES.JOKES.INCREASE_COMIC_COINS}?genre=${genreId}&language=${languageId}&type=vote`;
      }
      if (type === "vote" && assetId) {
        // Fetch content data to get the correct asset_id
        const getContentByIds = await apiClient.post(
          API_ROUTES.JOKES.GET_CONTENT_BY_IDS,
          {
            ids: [assetId],
          },
          {
            headers: {
              ...this.getAuthHeaders(),
            },
          }
        );
        const contentResponse = getContentByIds?.data ?? {};
        const contentData = contentResponse?.data ?? [];

        // Find the content with matching id (videoId) to get the asset_id
        const matchingContent = contentData.find(
          (content: { content: string; id: string }) => content.id === assetId
        );

        if (matchingContent) {
          endpoint = `${API_ROUTES.JOKES.INCREASE_COMIC_COINS}?asset_id=${matchingContent.id}&type=vote`;
        } else {
          // Fallback to original logic if content not found
          endpoint = `${API_ROUTES.JOKES.INCREASE_COMIC_COINS}?asset_id=${assetId}&type=vote`;
        }
      }
      const coinResponse = await apiClient.post(
        endpoint,
        {
          deviceId: token,
        },
        {
          headers: {
            ...this.getAuthHeaders(),
          },
        }
      );
      const coinResponseData = coinResponse?.data ?? {};

      // For voting, we need to check coin increment success
      let coinIncrementSuccess = false;
      if (type === "vote") {
        // If response status is 400, don't proceed with voting
        if (coinResponse?.status === 400) {
          return ErrorResponse(
            coinResponseData?.statusMessage ||
              "Bad request - voting not allowed"
          );
        }

        // Only trigger coin animation when response.status === 200
        if (coinResponse?.status === 200) {
          coinIncrementSuccess = true;
        } else {
          return ErrorResponse(
            coinResponseData?.statusMessage || "Failed to increase comic coins"
          );
        }
      }

      const actityvityTimelineModule = new gluedin.GluedInActivityTimeline();
      const gluedinUserVoteList =
        await actityvityTimelineModule.activityTimelineLike({
          assetId: assetId,
        });

      const response = gluedinUserVoteList?.data ?? {};
      if (response?.success) {
        // Return success with coin increment status for proper coin animation triggering
        return SuccessResponse({
          ...response?.result,
          coinIncrementSuccess,
        });
      }
      return ErrorResponse(
        response?.statusMessage || "Failed to send vote to Gluedin assets"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send vote to Gluedin assets";
      throw new Error(errorMessage);
    }
  }

  public async getGluedinCategoryList() {
    try {
      const feedModule = new gluedin.GluedInFeedModule();
      const gluedinCategoryList = await feedModule.getCategoryList({});
      const response = gluedinCategoryList?.data ?? {};
      if (response?.success) {
        return SuccessResponse(response?.result);
      }
      return ErrorResponse(
        response?.statusMessage || "Failed to get Gluedin category list"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to get Gluedin category list";
      throw new Error(errorMessage);
    }
  }

  public async viewGludeinJokes(data: TGludeinJokes) {
    try {
      const gluedinActivityTimeline = new gluedin.GluedInActivityTimeline();
      const promiseArr: IViewData[] = [];
      for await (const assetId of data.assetIds) {
        const gluedinViewResponse =
          await gluedinActivityTimeline.activityTimelineView({ assetId });
        const obj = {
          userId: gluedinViewResponse?.data?.result?.userId,
          assetId: gluedinViewResponse?.data?.result?.assetId,
        };
        console.log("obj", obj);
        promiseArr.push(obj);
      }
      console.log("promiseArr", promiseArr);
      const response = gluedinViewTransformer(promiseArr);
      return SuccessResponse(response);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to view Gluedin jokes";
      throw new Error(errorMessage);
    }
  }

  public async getHallOfLame({
    offset,
    limit,
    toDate,
    fromDate,
  }: TGludeinHallOfLame) {
    try {
      const feedModule = new gluedin.GluedInFeedModule();
      const gluedinHallOfLame = await feedModule.getJokeLeaderBoard({
        offset,
        limit,
        ...(toDate && { toDate }),
        ...(fromDate && { fromDate }),
      });
      const response = gluedinHallOfLame?.data ?? {};
      if (response?.success) {
        const data = {
          data: response?.result,
          totalPages: response?.total,
        };
        return SuccessResponse(data);
      }
      return ErrorResponse(
        response?.statusMessage || "Failed to get Hall of Lame"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get Hall of Lame";
      throw new Error(errorMessage);
    }
  }

  public async sendReportToGluedin({
    assetId,
    reason,
    userId,
    actingUserId,
  }: TGludeinReport) {
    try {
      const feedModuleObj = new gluedin.GluedInFeedModule();
      const payload = {
        userId: userId,
        actingUserId: actingUserId,
        assetId: assetId,
        reason: reason,
        event: "report",
      };
      const response = await feedModuleObj.Report(payload);
      const responseData = response?.data ?? {};
      if (responseData?.success) {
        return SuccessResponse(responseData?.result);
      }
      return ErrorResponse(
        responseData?.statusMessage || "Failed to send report to Gluedin"
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send report to Gluedin";
      throw new Error(errorMessage);
    }
  }
}
