import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GLUEDIN_LOGIN_SECRET_KEY } from "@/config";
import { encryptData } from "@/utils";
import { GluedinService } from "../services/GluedinService";
import {
  TGludeinFeedList,
  TGludeinHallOfLame,
  TGludeinJokes,
  TGludeinLogin,
  TGludeinReport,
  TGludeinUserReaction,
  TGludeinUserVote,
} from "../types/GluedinTypes";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";
import { useComicCoinRevalidation } from "@/hooks/useComicCoinRevalidation";

const gluedinInstance = GluedinService.getInstance();

const useMutateGludeinLogin = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  const setData = async () => {
    const data = await encryptData(
      window.location.origin,
      GLUEDIN_LOGIN_SECRET_KEY || ""
    );
    setAccessToken(data);
  };

  useEffect(() => {
    setData();
  }, []);

  return useMutation({
    mutationFn: (data: TGludeinLogin) =>
      gluedinInstance.GludeinLogin({
        user_id: data.user_id,
        accessToken: accessToken,
      }),
    retry: 3,
  });
};

const useGetGluedinFeedList = (params: TGludeinFeedList) => {
  const { isAuthenticated, token, gludeinIsAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  return useQuery({
    queryKey: [...keys.gluedin.getGluedinFeedList(), { ...params }],
    queryFn: () => gluedinInstance.getGluedinFeedList(params),
    enabled: isAuthenticated && token && gludeinIsAuthenticated ? true : false,
    staleTime: 0,
  });
};

const useGetGluedinUserVoteList = (params: any) => {
  const { isAuthenticated, token, gludeinIsAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  return useQuery({
    queryKey: [...keys.gluedin.getGluedinUserVoteList(), { ...params }],
    queryFn: () => gluedinInstance.getGluedinUserVoteList(),
    enabled: isAuthenticated && token && gludeinIsAuthenticated ? true : false,
    staleTime: 0,
  });
};

const useSendGluedinUserReaction = () => {
  const { revalidateComicCoinsAfterDelay } = useComicCoinRevalidation();

  return useMutation({
    mutationFn: (data: TGludeinUserReaction) =>
      gluedinInstance.sendGluedinUserReaction(data),
    onSuccess: () => {
      // Revalidate comic coins when reaction is successful (reactions give coins)
      // Add delay to allow backend to process the coin increment
      revalidateComicCoinsAfterDelay(500);
    },
  });
};

const useSendVoteToGluedinAssets = () => {
  const { revalidateComicCoinsAfterDelay } = useComicCoinRevalidation();

  return useMutation({
    mutationFn: (data: TGludeinUserVote) =>
      gluedinInstance.sendVoteToGluedinAssets(data),
    onSuccess: () => {
      // Revalidate comic coins when vote is successful (votes give coins)
      // Add delay to allow backend to process the coin increment
      revalidateComicCoinsAfterDelay(500);
    },
  });
};

const useGetGluedinCategoryList = () => {
  return useQuery({
    queryKey: [...keys.gluedin.getGluedinCategoryList()],
    queryFn: () => gluedinInstance.getGluedinCategoryList(),
    staleTime: 0,
  });
};

const useGetGluedinAssetById = (assetIds: string) => {
  const { isAuthenticated, token, gludeinIsAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  return useQuery({
    queryKey: [...keys.gluedin.getGluedinAssetById(), { assetIds }],
    queryFn: () => gluedinInstance.getGluedinAssetById(assetIds),
    enabled: isAuthenticated && token && gludeinIsAuthenticated ? true : false,
    staleTime: 0,
  });
};

const useViewGludeinJokes = () => {
  return useMutation({
    mutationFn: (data: TGludeinJokes) => gluedinInstance.viewGludeinJokes(data),
  });
};

const useGetHallOfLames = (data: TGludeinHallOfLame) => {
  const { isAuthenticated, token, gludeinIsAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  return useQuery({
    queryKey: [...keys.gluedin.getHallOfLame(), { ...data }],
    queryFn: () => gluedinInstance.getHallOfLame(data),
    enabled: isAuthenticated && token && gludeinIsAuthenticated ? true : false,
    staleTime: 0,
  });
};

const useSendReportToGluedin = () => {
  return useMutation({
    mutationFn: (data: TGludeinReport) =>
      gluedinInstance.sendReportToGluedin(data),
  });
};

export {
  useMutateGludeinLogin,
  useGetGluedinFeedList,
  useGetGluedinUserVoteList,
  useSendGluedinUserReaction,
  useSendVoteToGluedinAssets,
  useGetGluedinCategoryList,
  useGetGluedinAssetById,
  useViewGludeinJokes,
  useGetHallOfLames,
  useSendReportToGluedin,
};
