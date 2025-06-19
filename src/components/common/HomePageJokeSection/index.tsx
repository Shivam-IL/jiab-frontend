import React, { useEffect, useState } from "react";
import UgcCard from "../UgcCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Header from "@/components/common/Header/Header";
import { useCMSData } from "@/data";
import useWindowWidth from "@/hooks/useWindowWidth";
import {
  useGetGluedinFeedList,
  useViewGludeinJokes,
} from "@/api/hooks/GluedinHooks";
import { TModifiedUGCContent } from "@/api/types/GluedinTypes";
import { resetUgcData, updateUgcViewData, updateUgcData } from "@/store/ugc";
import { REDUX_UPDATION_TYPES } from "@/constants";
import useAppDispatch from "@/hooks/useDispatch";
import useAppSelector from "@/hooks/useSelector";
import { BoxIds } from "../CircularBoxesModal";
import { DesktopBoxIds } from "../HomePageDesktopOnboarding";

const HomePageJokeSection = ({
  isClient,
  onVoteSuccess,
  onReactSuccess,
}: {
  isClient: boolean;
  onVoteSuccess?: () => void;
  onReactSuccess?: () => void;
}) => {
  const cmsData = useCMSData();
  const width = useWindowWidth();

  const { ugcData } = useAppSelector((state) => state.ugc);
  const [jokeBoxApi, setJokeBoxApi] = useState<CarouselApi>();
  const [activeTab, setActiveTab] = useState<"Latest" | "Trending">("Latest");
  const [jokeBoxCurrent, setJokeBoxCurrent] = useState(0);
  const [jokeBoxPageCount, setJokeBoxPageCount] = useState(3);

  const {
    data: jokeBoxData,
    isLoading: jokeBoxLoading,
    error: jokeBoxError,
    isFetched: isJokeBoxFetched,
  } = useGetGluedinFeedList({
    sortBy: activeTab === "Latest" ? "latest" : "popular",
    limit: 6,
    offset: 0,
  });

  const dispatch = useAppDispatch();
  const { mutate: viewGludeinJokes, data: viewGludeinJokesData } =
    useViewGludeinJokes();

  useEffect(() => {
    if (!jokeBoxApi) {
      return;
    }

    jokeBoxApi.on("select", () => {
      setJokeBoxCurrent(jokeBoxApi.selectedScrollSnap());
    });
  }, [jokeBoxApi]);

  const goToJokeBoxPage = (pageIndex: number) => {
    if (!jokeBoxApi) return;
    jokeBoxApi.scrollTo(pageIndex);
  };

  useEffect(() => {
    if (jokeBoxData?.ok && isJokeBoxFetched) {
      const { data } = jokeBoxData ?? {};
      const assetIds = data?.map((item: any) => item?.videoId);
      viewGludeinJokes({ assetIds });
      dispatch(
        updateUgcData({
          type: REDUX_UPDATION_TYPES.REPLACED,
          ugcData: data,
        })
      );
    }
  }, [jokeBoxData, isJokeBoxFetched]);

  useEffect(() => {
    if (viewGludeinJokesData?.ok) {
      const { data } = viewGludeinJokesData ?? {};
      dispatch(updateUgcViewData({ assetIds: data }));
    }
  }, [viewGludeinJokesData]);

  useEffect(() => {
    return () => {
      dispatch(resetUgcData());
    };
  }, []);

  useEffect(() => {
    if (width > 768) {
      setJokeBoxPageCount(2);
    } else {
      setJokeBoxPageCount(6);
    }
  }, [width]);

  useEffect(() => {
    if (activeTab) {
      setJokeBoxCurrent(0);
    }
  }, [activeTab]);

  useEffect(() => {
    if (jokeBoxApi) {
      jokeBoxApi.scrollTo(jokeBoxCurrent);
    }
  }, [jokeBoxCurrent, jokeBoxApi]);

  return (
    <>
      {/* Joke Box */}
      <Header
        title={cmsData.homePage.jokeBoxHeading}
        className="md:mt-[58px] md:mb-[24px] mt-[20px] mb-[16px]"
        viewAllUrl="/user-generated-jokes"
        viewAllButtonText={cmsData.homePage.viewAllButtonText}
        description={cmsData.homePage.jokeBoxSubheading}
      />
      {isClient && (
        <div id={BoxIds.JOKE_BOX} className="md:mx-0 mx-4 mt-[20px] mb-[20px]">
          <div
            id={DesktopBoxIds.JOKE_BOX}
            className="flex justify-center w-full"
          >
            <div className="flex items-center bg-white rounded-full mb-4 p-1 relative">
              <div
                className={`absolute transition-all duration-300 ease-in-out top-1 h-[calc(100%-8px)] rounded-full bg-green ${
                  activeTab === "Latest"
                    ? "left-1 right-[50%]"
                    : "left-[50%] right-1"
                }`}
              />
              <button
                onClick={() => setActiveTab("Latest")}
                className={`min-w-[80px] px-6 h-[36px] flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 relative z-10 flex-1 ${
                  activeTab === "Latest"
                    ? "text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {cmsData.homePage.latestButtonText}
              </button>
              <button
                onClick={() => setActiveTab("Trending")}
                className={`min-w-[80px] px-6 h-[36px] flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 relative z-10 flex-1 ${
                  activeTab === "Trending"
                    ? "text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {cmsData.homePage.trendingButtonText}
              </button>
            </div>
          </div>

          <div className="flex justify-start overflow-x-scroll scrollbar-hide md:gap-[8px] gap-4">
            {width < 768 ? (
              <Carousel
                setApi={setJokeBoxApi}
                opts={{
                  align: "start",
                  loop: false,
                  skipSnaps: true,
                  slidesToScroll: 1,
                }}
                className="w-full"
              >
                <CarouselContent className="w-full">
                  {ugcData?.length > 0 &&
                    ugcData?.map((item: TModifiedUGCContent, index: number) => (
                      <CarouselItem key={item._id} className="basis-auto">
                        <div className="max-w-[350px] flex mx-auto h-full">
                          <UgcCard
                            home={true}
                            disclaimerText={cmsData.homePage.jokeDisclaimerText}
                            item={item}
                            onVoteSuccess={onVoteSuccess}
                            onReactSuccess={onReactSuccess}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <>
                <Carousel
                  setApi={setJokeBoxApi}
                  opts={{
                    align: "start",
                    loop: true,
                    skipSnaps: false,
                    slidesToScroll: width > 768 ? 3 : 1,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="w-full">
                    {ugcData?.length > 0 &&
                      ugcData?.map(
                        (item: TModifiedUGCContent, index: number) => (
                          <CarouselItem key={item._id} className="basis-1/3">
                            <div className="w-full flex mx-auto h-full">
                              <UgcCard
                                home={true}
                                disclaimerText={
                                  cmsData.homePage.jokeDisclaimerText
                                }
                                item={item}
                                onVoteSuccess={onVoteSuccess}
                                onReactSuccess={onReactSuccess}
                              />
                            </div>
                          </CarouselItem>
                        )
                      )}
                  </CarouselContent>
                </Carousel>
              </>
            )}
          </div>
          {
            <div className="flex justify-center md:gap-2 gap-[1.77px] mt-[8px]">
              {Array.from({ length: jokeBoxPageCount }).map((_, index) => (
                <button
                  key={`joke-slide-${index}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === jokeBoxCurrent
                      ? "w-[17.73px] bg-black"
                      : "w-[8.86px] bg-gray-300"
                  }`}
                  onClick={() => goToJokeBoxPage(index)}
                  aria-label={`Go to joke page ${index + 1}`}
                />
              ))}
            </div>
          }
        </div>
      )}
    </>
  );
};

export default HomePageJokeSection;
