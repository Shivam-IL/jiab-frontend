import { useQuery } from "@tanstack/react-query";
import { JokeService } from "../services/JokeService";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";

const useGetSurpriseMeJoke = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const jokeInstance = JokeService.getInstance();
  return useQuery({
    queryKey: [...keys.joke.getSurpriseMeJoke()],
    queryFn: () => jokeInstance.GetSurpriseMe(),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 0,
  });
};

export { useGetSurpriseMeJoke };
