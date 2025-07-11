import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { JokeService } from "../services/JokeService";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";
import {
  IReelReaction,
  TGetJokesParams,
  TSubmitJokeParams,
} from "../types/JokeTypes";
import { useComicCoinRevalidation } from "@/hooks/useComicCoinRevalidation";
import { MNEMONICS_TO_ID } from "@/constants";
import {
  useGetNotifications,
  useGetNotificationCount,
} from "./NotificationHooks";
import { convertLanguageMnemonicToId } from "@/utils/languageUtils";

const jokeInstance = JokeService.getInstance();
const useGetSurpriseMeJoke = (genreId?: number, languageId?: number) => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const { selectedLanguage } = useAppSelector((state) => state.language);
  const languageNewId =
    MNEMONICS_TO_ID[selectedLanguage as keyof typeof MNEMONICS_TO_ID] ?? 1;
  console.log("languageNewId", languageNewId, languageId);
  return useQuery({
    queryKey: [...keys.joke.getSurpriseMeJoke(), genreId, languageNewId],
    queryFn: () => jokeInstance.GetSurpriseMe(genreId, languageNewId),
    enabled: !!(isAuthenticated && token),
    staleTime: 0,
  });
};

// Hook to fetch list of jokes for Scroll & LOL screen
const useGetJokes = (params: TGetJokesParams = {}) => {
  // Convert language mnemonic to language ID if language is provided
  const modifiedParams = { ...params };
  if (params.language) {
    const languageId = convertLanguageMnemonicToId(params.language);
    modifiedParams.language = languageId.toString();
  }

  return useQuery({
    queryKey: [...keys.joke.getJokes(), modifiedParams],
    queryFn: () => jokeInstance.GetJokes(modifiedParams),
    staleTime: 0,
  });
};

const useSubmitJoke = () => {
  const { revalidateWithSync } = useComicCoinRevalidation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TSubmitJokeParams) => jokeInstance.SubmitJoke(data),
    onSuccess: () => {
      // Revalidate comic coins when joke submission is successful
      // Add delay to allow backend to process any potential coin rewards
      revalidateWithSync(500);
      // Also invalidate user submitted jokes list
      queryClient.invalidateQueries({
        queryKey: [...keys.joke.getUserSubmittedJokes()],
      });
    },
    retry: 3,
  });
};

const useGetUserSubmittedJokes = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  return useQuery({
    queryKey: [...keys.joke.getUserSubmittedJokes()],
    queryFn: () => jokeInstance.getUserSubmittedJokes(),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 0,
  });
};

const useGetComicCoins = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  // Fetch notifications when comic coins are fetched
  const { refetch: refetchNotifications } = useGetNotifications({
    page_number: 1,
    page_size: 10,
  });

  // Fetch notification count when comic coins are fetched
  const { refetch: refetchNotificationCount } = useGetNotificationCount();

  return useQuery({
    queryKey: [...keys.joke.getComicCoins()],
    queryFn: async () => {
      const result = await jokeInstance.GetComicCoins();

      // Fetch notifications when comic coins are successfully fetched
      if (result?.ok && isAuthenticated && token) {
        console.log("Fetching notifications after comic coins fetch");
        refetchNotifications();
        refetchNotificationCount();
      }

      return result;
    },
    enabled: isAuthenticated && token ? true : false,
    staleTime: 30 * 1000, // Consider data fresh for 30 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus to avoid unnecessary calls
    refetchOnMount: true, // Refetch when component mounts
    refetchOnReconnect: true, // Refetch when reconnecting to internet
  });
};

const usePostReelReaction = () => {
  return useMutation({
    mutationFn: (data: IReelReaction) => jokeInstance.PostReelReaction(data),
  });
};

const useActivateConsumption = () => {
  return useMutation({
    mutationFn: ({ joke_id }: { joke_id: string }) =>
      jokeInstance.ActivateConsumption({ joke_id }),
  });
};

export {
  useGetSurpriseMeJoke,
  useGetJokes,
  useSubmitJoke,
  useGetUserSubmittedJokes,
  useGetComicCoins,
  usePostReelReaction,
  useActivateConsumption,
};
