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
  TGludeinJokes,
  TModifiedUGCContent,
} from "../types/GluedinTypes";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";
import { MainService } from "./MainService";
import gluedin from "gluedin";

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
    } catch (error: any) {
      throw new Error(error?.message || "Failed to login with Gluedin");
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
      let payload = {
        c_type: "UGC",
        offset: offset,
        limit: limit,
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

      const videoIds = response?.result?.map((item: any) => item?.videoId);
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
      console.log("contentResponse", contentResponse);

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
    } catch (error: any) {
      throw new Error(error?.message || "Failed to get Gluedin feed list");
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
    } catch (error: any) {
      throw new Error(error?.message || "Failed to get Gluedin asset by id");
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
    } catch (error: any) {
      throw new Error(error?.message || "Failed to get Gluedin user vote list");
    }
  }

  public async sendGluedinUserReaction({
    assetId,
    reactionType,
  }: {
    assetId: string;
    reactionType: string;
  }) {
    try {
      let authModuleObj = new gluedin.GluedInAuthModule();
      let accessToken = await authModuleObj.getAccessToken();
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
      const response = gluedinUserReactionList?.data ?? {};
      if (response?.success) {
        return SuccessResponse(response?.result);
      }
      return ErrorResponse(
        response?.statusMessage || "Failed to get Gluedin user reaction list"
      );
    } catch (error: any) {
      throw new Error(
        error?.message || "Failed to get Gluedin user reaction list"
      );
    }
  }

  public async sendVoteToGluedinAssets({ assetId }: { assetId: string }) {
    try {
      let authModuleObj = new gluedin.GluedInAuthModule();
      let accessToken = await authModuleObj.getAccessToken();
      if (!accessToken) {
        return ErrorResponse("Please login to react");
      }
      const actityvityTimelineModule = new gluedin.GluedInActivityTimeline();
      const gluedinUserVoteList =
        await actityvityTimelineModule.activityTimelineLike({
          assetId: assetId,
        });
      const response = gluedinUserVoteList?.data ?? {};
      if (response?.success) {
        return SuccessResponse(response?.result);
      }
      return ErrorResponse(
        response?.statusMessage || "Failed to send vote to Gluedin assets"
      );
    } catch (error: any) {
      throw new Error(
        error?.message || "Failed to send vote to Gluedin assets"
      );
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
    } catch (error: any) {
      throw new Error(error?.message || "Failed to get Gluedin category list");
    }
  }

  public async viewGludeinJokes(data: TGludeinJokes) {
    try {
      const gluedinActivityTimeline = new gluedin.GluedInActivityTimeline();
      const promiseArr = [];
      for (const assetId of data.assetIds) {
        promiseArr.push(
          gluedinActivityTimeline.activityTimelineView({ assetId })
        );
      }
      const gluedinViewResponse = await Promise.all(promiseArr);
      const response = gluedinViewTransformer(gluedinViewResponse);
      return response;
    } catch (error: any) {
      throw new Error(error?.message || "Failed to view Gluedin jokes");
    }
  }

  public async getHallOfLame({ offset, limit }: TGludeinHallOfLame) {
    try {
      const feedModule = new gluedin.GluedInFeedModule();
      const gluedinHallOfLame = await feedModule.getJokeLeaderBoard({
        offset,
        limit,
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
    } catch (error: any) {
      throw new Error(error?.message || "Failed to get Hall of Lame");
    }
  }
}
