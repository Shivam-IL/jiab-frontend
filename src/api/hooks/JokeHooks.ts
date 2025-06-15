import { useMutation, useQuery } from "@tanstack/react-query";
import { JokeService } from "../services/JokeService";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";
import { TGetJokesParams, TSubmitJokeParams } from "../types/JokeTypes";

const jokeInstance = JokeService.getInstance();
const useGetSurpriseMeJoke = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  return useQuery({
    queryKey: [...keys.joke.getSurpriseMeJoke()],
    queryFn: () => jokeInstance.GetSurpriseMe(),
    enabled: !!(isAuthenticated && token),
    staleTime: 0,
  });
};

// Hook to fetch list of jokes for Scroll & LOL screen
const useGetJokes = (params: TGetJokesParams = {}) => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: [...keys.joke.getJokes(), params],
    queryFn: () => jokeInstance.GetJokes(params),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 0,
  });
};

const useSubmitJoke = () => {
  return useMutation({
    mutationFn: (data: TSubmitJokeParams) => jokeInstance.SubmitJoke(data),
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

export {
  useGetSurpriseMeJoke,
  useGetJokes,
  useSubmitJoke,
  useGetUserSubmittedJokes,
};
