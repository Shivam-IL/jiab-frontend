import React from "react";
import AktivGroteskText from "../AktivGroteskText";
import ImageIconCard from "../ImageIconCard";
import { ICONS_NAMES, LOCAL_IMAGES } from "@/constants";
import { Separator } from "@/components/ui/separator";
import GreenCTA from "@/components/GreenCTA";
import { useRouter } from "next/navigation";
import useAppSelector from "@/hooks/useSelector";
import { useGetComicCoins } from "@/api/hooks/JokeHooks";
import { useComicCoinRevalidation } from "@/hooks/useComicCoinRevalidation";
import { useEffect } from "react";

const UserComicsCoinsAndRankCard = ({
  comicCoins,
  ranks,
  leaderboardButtonText,
}: {
  comicCoins: string;
  ranks: string;
  leaderboardButtonText: string;
}) => {
  const router = useRouter();
  const { current_balance, rank } = useAppSelector((state) => state.profile);
  const { selectedLanguage } = useAppSelector((state) => state.language);

  // Fetch comic coins data
  const {
    data: comicCoinsData,
    isLoading: isComicCoinsLoading,
    error,
  } = useGetComicCoins();

  // Get comic coin revalidation methods
  const { revalidateComicCoins, revalidateWithSync } =
    useComicCoinRevalidation();

  // Get comic coins value with improved fallback logic
  const getComicCoinsValue = () => {
    // If API data is available and recent, use it
    if (comicCoinsData?.data?.comic_coin !== undefined && !error) {
      return comicCoinsData.data.comic_coin;
    }
    // Otherwise fall back to Redux state
    return current_balance ?? 0;
  };

  const comicCoinsValue = getComicCoinsValue();

  // Check if rank should have reduced opacity
  const shouldReduceRankOpacity =
    !rank || rank === 0 || rank?.toString() === "--";

  // Expose revalidateComicCoins method globally for other components to use
  useEffect(() => {
    if (typeof window !== "undefined") {
      (
        window as Window & { refreshComicCoins?: () => void }
      ).refreshComicCoins = revalidateComicCoins;
    }
  }, [revalidateComicCoins]);

  // Auto-revalidate comic coins when current_balance changes in Redux
  // This ensures API data stays in sync with local increments
  useEffect(() => {
    if (current_balance > 0 && !isComicCoinsLoading) {
      // Add a small delay to avoid too frequent API calls
      const timeoutId = setTimeout(() => {
        revalidateWithSync(100); // Use sync version to keep Redux and API in sync
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [current_balance, revalidateWithSync, isComicCoinsLoading]);

  return (
    <div className="flex gap-2 md:justify-between py-3 md:pt-[24px]">
      <div className="relative flex md:gap-[50px] md:w-[75%] w-[65%]">
        <div className="relative w-[48%] md:w-[35%] flex flex-col items-center justify-between gap-[6px] md:gap-[8px]">
          <AktivGroteskText
            text={
              isComicCoinsLoading ? "--" : comicCoinsValue.toString() || "0"
            }
            className="text-black"
            fontSize={"text-[16px] md:text-[32px]"}
            fontWeight="font-[700]"
          />
          <div className="flex justify-center">
            <ImageIconCard
              itemsGapClass="gap-[5px] md:gap-[8px]"
              imageClassName="w-[12px] h-[12px] object-cover md:w-[28px] md:h-[28px]"
              image={LOCAL_IMAGES.SPRITE_GOLD}
              text={comicCoins}
              fontSize={`${selectedLanguage === 'ta' ? 'xxs:text-[7px] text-[10px] md:text-[20px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px]' : 'text-[12px] md:text-[28px]'}`}
              fontWeight="font-[700]"
              textColor="text-black"
            />
          </div>
        </div>
        <Separator className="w-[1px] md:w-[2px] bg-[#EBEBEB] h-full mx-0 px-0" />
        <div
          className={`relative w-[48%] md:w-[35%]  flex flex-col items-center justify-between gap-[6px] md:gap-[8px] ${
            shouldReduceRankOpacity ? "opacity-40" : ""
          }`}
        >
          <AktivGroteskText
            text={rank?.toString() || "--"}
            className="text-black"
            fontSize="text-[16px] md:text-[32px]"
            fontWeight="font-[700]"
          />
          <div className="flex justify-center">
            <ImageIconCard
              image=""
              itemsGapClass="gap-[5px] md:gap-[8px]"
              icon={ICONS_NAMES.RANK}
              iconClassName="w-[9px] h-[12px] md:w-[18px] md:h-[28px]"
              text={ranks}
              fontSize={`${selectedLanguage === 'ta' ? 'xxs:text-[7px] text-[10px] md:text-[20px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px]' : 'text-[12px] md:text-[28px]'}`}
              fontWeight="font-[700]"
              textColor="text-black"
            />
          </div>
        </div>
        <Separator className="w-[1px] md:w-[2px]  bg-[#EBEBEB] h-full mx-0 px-0" />
      </div>
      <div className="relative md:w-[25%] w-[35%] flex justify-end items-center">
        <GreenCTA
          className=""
          fontSize={`${selectedLanguage === 'ta' ? 'xxs:text-[7px] text-[10px] md:text-[20px] lg:text-[20px] xl:text-[20px] 2xl:text-[20px]' : 'text-[12px] md:text-[20px]'}`}
          fontWeight="font-[700] md:font-[600]"
          paddingClass="py-[8px] md:py-[20px] px-[17px] md:px-[60px] flex items-center justify-center gap-[4px] md:gap-[12px]"
          text={leaderboardButtonText}
          onClick={() => {
            router.push("/leaderboard");
          }}
          childrenPosition="left"
        />
      </div>
    </div>
  );
};

export default UserComicsCoinsAndRankCard
