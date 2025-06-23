import { useQueryClient } from "@tanstack/react-query";
import { keys } from "@/api/utils";
import { useCallback } from "react";
import { IComicCoinsResponse } from "@/api/types/JokeTypes";
import useAppDispatch from "@/hooks/useDispatch";
import { updateBalance } from "@/store/profile/profile.slice";

/**
 * Custom hook to handle comic coin revalidation
 * Provides centralized logic for updating comic coin data after actions that award coins
 */
export const useComicCoinRevalidation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const revalidateComicCoins = useCallback(() => {
    // Invalidate and refetch comic coins data
    queryClient.invalidateQueries({
      queryKey: [...keys.joke.getComicCoins()],
    });
  }, [queryClient]);

  const revalidateComicCoinsAfterDelay = useCallback((delay: number = 1000) => {
    // Add a small delay to allow backend to process the coin increment
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: [...keys.joke.getComicCoins()],
      });
    }, delay);
  }, [queryClient]);

  const setComicCoinsQueryData = useCallback((newData: IComicCoinsResponse) => {
    // Optimistically update the comic coins data
    queryClient.setQueryData([...keys.joke.getComicCoins()], newData);
    
    // Also update Redux state to keep it in sync
    if (newData?.data?.comic_coin !== undefined) {
      dispatch(updateBalance({ current_balance: newData.data.comic_coin }));
    }
  }, [queryClient, dispatch]);

  const refetchComicCoins = useCallback(() => {
    // Force refetch comic coins data
    return queryClient.refetchQueries({
      queryKey: [...keys.joke.getComicCoins()],
    });
  }, [queryClient]);

  const syncComicCoinsWithRedux = useCallback(async () => {
    // Fetch latest data and sync with Redux state
    try {
      const data = await queryClient.fetchQuery({
        queryKey: [...keys.joke.getComicCoins()],
      });
      
      if (data?.data?.comic_coin !== undefined) {
        dispatch(updateBalance({ current_balance: data.data.comic_coin }));
      }
    } catch (error) {
      console.error('Failed to sync comic coins with Redux:', error);
    }
  }, [queryClient, dispatch]);

  const revalidateWithSync = useCallback((delay: number = 500) => {
    // Revalidate and sync with Redux after delay
    setTimeout(async () => {
      queryClient.invalidateQueries({
        queryKey: [...keys.joke.getComicCoins()],
      });
      
      // Wait a bit more for the invalidation to trigger refetch
      setTimeout(() => {
        syncComicCoinsWithRedux();
      }, 200);
    }, delay);
  }, [queryClient, syncComicCoinsWithRedux]);

  return {
    revalidateComicCoins,
    revalidateComicCoinsAfterDelay,
    setComicCoinsQueryData,
    refetchComicCoins,
    syncComicCoinsWithRedux,
    revalidateWithSync,
  };
}; 