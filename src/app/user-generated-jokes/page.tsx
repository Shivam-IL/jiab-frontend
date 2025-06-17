"use client";

import AktivGroteskText from "@/components/common/AktivGroteskText";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import UgcComponent from "@/components/UgcComponent";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MadeYouLaughExitPopup } from "@/components/ExitPopUps";
import UgcFilter from "@/components/common/UgcFilter";
import { useCMSData } from "@/data";
import {
  useGetGluedinFeedList,
  useViewGludeinJokes,
} from "@/api/hooks/GluedinHooks";
import { resetUgcData, updateUgcData, updateUgcViewData } from "@/store/ugc";
import { REDUX_UPDATION_TYPES } from "@/constants";
import useAppDispatch from "@/hooks/useDispatch";
import useAppSelector from "@/hooks/useSelector";
import {
  CoinAnimation,
  useCoinAnimation,
} from "@/components/common/CoinAnimation";

const UserGeneratedJokes = () => {
  const router = useRouter();
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();

  // Track animation state
  const [canShowAnimation, setCanShowAnimation] = useState(false);
  const [lastLanguage, setLastLanguage] = useState<string>("");

  const { ugcData, offset, limit, ugcFilters, filterChnageId, loadMore } =
    useAppSelector((state) => state.ugc);
  const { data: gluedinFeedList } = useGetGluedinFeedList({
    offset,
    limit,
    ...ugcFilters,
    filterChnageId: filterChnageId ? filterChnageId : undefined,
  });
  const { mutate: viewGludeinJokes, data: viewGludeinJokesData } =
    useViewGludeinJokes();

  // Coin animation hook
  const { isAnimating, triggerAnimation, animationKey } = useCoinAnimation();


  useEffect(() => {
    setMounted(true);
  }, []);

  const cmsData = useCMSData(mounted);

  useEffect(() => {
    return () => {
      setIsUnmounting(true);
      dispatch(resetUgcData());
    };
  }, []);

  useEffect(() => {
    if (gluedinFeedList?.ok) {
      const assetIds = gluedinFeedList?.data?.map((item: any) => item?.videoId);
      console.log("assetIds", assetIds, filterChnageId, loadMore);
      viewGludeinJokes({ assetIds });
      dispatch(
        updateUgcData({
          type: filterChnageId
            ? loadMore
              ? REDUX_UPDATION_TYPES.MULTIPLE_ADDED
              : REDUX_UPDATION_TYPES.REPLACED
            : REDUX_UPDATION_TYPES.MULTIPLE_ADDED,
          ugcData: gluedinFeedList?.data,
        })
      );
    }
  }, [gluedinFeedList, filterChnageId]);

  useEffect(() => {
    if (viewGludeinJokesData?.ok) {
      const { data } = viewGludeinJokesData ?? {};
      dispatch(updateUgcViewData({ assetIds: data }));
    }
  }, [viewGludeinJokesData]);

  // Check if animation can be shown (24h cooldown or language change)
  useEffect(() => {
    const currentLanguage = ugcFilters.language || "default";
    const now = Date.now();
    const lastAnimationTime = localStorage.getItem("ugc_vote_animation_time");
    const lastAnimationLanguage = localStorage.getItem(
      "ugc_vote_animation_language"
    );

    // Check if language changed
    const languageChanged = lastAnimationLanguage !== currentLanguage;

    // Check if 24 hours passed (24 * 60 * 60 * 1000 = 86400000ms)
    const twentyFourHoursPassed =
      !lastAnimationTime || now - parseInt(lastAnimationTime) >= 86400000;

    // Allow animation if either condition is met
    if (languageChanged || twentyFourHoursPassed) {
      setCanShowAnimation(true);
    } else {
      setCanShowAnimation(false);
    }

    setLastLanguage(currentLanguage);
  }, [ugcFilters.language]);

  // Function to handle successful vote animation
  const handleVoteSuccess = useCallback(() => {
    if (canShowAnimation) {
      const currentLanguage = ugcFilters.language || "default";
      const now = Date.now();

      // Update localStorage with current time and language
      localStorage.setItem("ugc_vote_animation_time", now.toString());
      localStorage.setItem("ugc_vote_animation_language", currentLanguage);

      // Disable further animations until next cooldown/language change
      setCanShowAnimation(false);

      // Trigger the animation
      triggerAnimation();
    }
  }, [canShowAnimation, ugcFilters.language, triggerAnimation]);

  return (
    <ScreenWrapper>
      <div>
        <div className="flex flex-col gap-[4px] md:gap-[12px]">
          <div className="flex justify-between items-center">
            <AktivGroteskText
              fontSize="text-[16px] md:text-[30px] uppercase"
              fontWeight="font-[700]"
              text={cmsData?.jokeBox?.jokeBoxHeading}
            />
            <button onClick={() => router.push("/hall-of-lame")}>
              <AktivGroteskText
                fontSize="text-[12px] md:text-[20px]"
                fontWeight="font-[400]"
                className="text-[#11A64B] "
                text={cmsData?.jokeBox?.hallOfLameNextPageSwitchText}
              />
            </button>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-[16px] md:gap-0">
            <AktivGroteskText
              fontSize="text-[12px] md:text-[20px]"
              fontWeight="font-[400]"
              text={cmsData?.jokeBox?.jokeBoxSubHeading}
            />
            <UgcFilter filter={cmsData?.jokeBox?.filter} />
          </div>
        </div>
        <UgcComponent animation={canShowAnimation} jokesData={ugcData} onVoteSuccess={handleVoteSuccess} />
      </div>
      {isUnmounting && (
        <MadeYouLaughExitPopup
          open={isUnmounting}
          onClose={() => {
            setIsUnmounting(false);
          }}
        />
      )}

      {/* Coin Animation */}
      <CoinAnimation  isVisible={isAnimating} animationKey={animationKey} />
    </ScreenWrapper>
  );
};

export default UserGeneratedJokes;
