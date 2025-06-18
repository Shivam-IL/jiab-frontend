import { useQueryClient } from "@tanstack/react-query";
import { keys } from "@/api/utils";
import { useCallback } from "react";

/**
 * Custom hook to handle comic coin revalidation
 * Provides centralized logic for updating comic coin data after actions that award coins
 */
export const useComicCoinRevalidation = () => {
  const queryClient = useQueryClient();

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

  const setComicCoinsQueryData = useCallback((newData: any) => {
    // Optimistically update the comic coins data
    queryClient.setQueryData([...keys.joke.getComicCoins()], newData);
  }, [queryClient]);

  const refetchComicCoins = useCallback(() => {
    // Force refetch comic coins data
    return queryClient.refetchQueries({
      queryKey: [...keys.joke.getComicCoins()],
    });
  }, [queryClient]);

  return {
    revalidateComicCoins,
    revalidateComicCoinsAfterDelay,
    setComicCoinsQueryData,
    refetchComicCoins,
  };
}; 