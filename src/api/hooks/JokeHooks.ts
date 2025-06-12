import { useQuery } from "@tanstack/react-query";
import { JokeService } from "../services/JokeService";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";
import { TGetJokesParams } from "../types/JokeTypes";

const useGetSurpriseMeJoke = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const jokeInstance = JokeService.getInstance();
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
  const jokeInstance = JokeService.getInstance();

  return useQuery({
    queryKey: [...keys.joke.getJokes(), params],
    queryFn: () => jokeInstance.GetJokes(params),
    enabled: !!(isAuthenticated && token),
    staleTime: 0,
  });
};

export { useGetSurpriseMeJoke, useGetJokes };
