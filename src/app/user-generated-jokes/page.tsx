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
import { TModifiedUGCContent } from "@/api/types/GluedinTypes";
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

  const { ugcData, offset, limit, ugcFilters, filterChnageId, loadMore } =
    useAppSelector((state) => state.ugc);
  const { data: gluedinFeedList, isLoading: isLoadingGluedinFeedList } =
    useGetGluedinFeedList({
      offset,
      limit,
      ...ugcFilters,
      filterChnageId: filterChnageId ? filterChnageId : undefined,
    });
  const { mutate: viewGludeinJokes, data: viewGludeinJokesData } =
    useViewGludeinJokes();
  const [noMoreData, setNoMoreData] = useState(false);
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
  }, [dispatch]);

  useEffect(() => {
    if (gluedinFeedList?.ok) {
      const { data } = gluedinFeedList ?? {};
      const assetIds = gluedinFeedList?.data?.map(
        (item: TModifiedUGCContent) => item?.videoId
      );
      viewGludeinJokes({ assetIds });

      if (data?.length === 0) {
        setNoMoreData(true);
      } else {
        setNoMoreData(false);
      }
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
  }, [gluedinFeedList, filterChnageId, dispatch, viewGludeinJokes, loadMore]);

  useEffect(() => {
    if (viewGludeinJokesData?.ok) {
      const { data } = viewGludeinJokesData ?? {};
      dispatch(updateUgcViewData({ assetIds: data }));
    }
  }, [viewGludeinJokesData, dispatch]);

  // Function to handle successful vote animation
  const handleVoteSuccess = useCallback(() => {
    triggerAnimation();
  }, [triggerAnimation]);

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
            <UgcFilter
              text={cmsData?.jokeBox?.filter}
              filter={cmsData?.jokeBox?.filter}
            />
          </div>
        </div>
        <UgcComponent
          noMoreData={noMoreData}
          isLoadingGluedinFeedList={isLoadingGluedinFeedList}
          jokesData={ugcData}
          onVoteSuccess={handleVoteSuccess}
        />
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
      <CoinAnimation isVisible={isAnimating} animationKey={animationKey} />
    </ScreenWrapper>
  );
};

export default UserGeneratedJokes;
