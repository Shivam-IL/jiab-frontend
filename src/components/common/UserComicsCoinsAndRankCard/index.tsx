import React from "react";
import AktivGroteskText from "../AktivGroteskText";
import ImageIconCard from "../ImageIconCard";
import { ICONS_NAMES, LOCAL_IMAGES } from "@/constants";
import { Separator } from "@/components/ui/separator";
import GreenCTA from "@/components/GreenCTA";
import { useRouter } from "next/navigation";
import useAppSelector from "@/hooks/useSelector";
import { useGetComicCoins } from "@/api/hooks/JokeHooks";

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

  // Fetch comic coins data
  const {
    data: comicCoinsData,
    isLoading: isComicCoinsLoading,
  } = useGetComicCoins();

  // Get comic coins value with fallback
  const comicCoinsValue =
    comicCoinsData?.data?.comic_coin ?? current_balance ?? 0;

  return (
    <div className="flex gap-2 md:justify-between py-3 md:pt-[24px]">
      <div className="relative flex md:gap-[50px] md:w-[75%] w-[65%]">
        <div className="relative w-[48%] md:w-[35%] flex flex-col items-center justify-between gap-[6px] md:gap-[8px]">
          <AktivGroteskText
            text={
              isComicCoinsLoading ? "--" : comicCoinsValue.toString() || "0"
            }
            className="text-black"
            fontSize="text-[16px] md:text-[32px]"
            fontWeight="font-[700]"
          />
          <div className="flex justify-center">
            <ImageIconCard
              itemsGapClass="gap-[5px] md:gap-[8px]"
              imageClassName="w-[12px] h-[12px] object-cover md:w-[28px] md:h-[28px]"
              image={LOCAL_IMAGES.SPRITE_GOLD}
              text={comicCoins}
              fontSize="text-[12px] md:text-[28px]"
              fontWeight="font-[700]"
              textColor="text-black"
            />
          </div>
        </div>
        <Separator className="w-[1px] md:w-[2px] bg-[#EBEBEB] h-full mx-0 px-0" />
        <div className="relative w-[48%] md:w-[35%]  flex flex-col items-center justify-between gap-[6px] md:gap-[8px]">
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
              fontSize="text-[12px] md:text-[28px]"
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
          fontSize="text-[12px] md:text-[20px]"
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

export default UserComicsCoinsAndRankCard;
