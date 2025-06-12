import { useQuery } from "@tanstack/react-query";
import { LeaderBoardService } from "../services/LeaderBoardService";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";

const leaderBoardService = LeaderBoardService.getInstance();

const useGetLeaderBoard = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  return useQuery({
    queryKey: [keys.leaderboard.getLeaderboard()],
    queryFn: () => leaderBoardService.getLeaderBoard(),
    staleTime: 0,
    enabled: isAuthenticated && token ? true : false,
  });
};

export { useGetLeaderBoard };
