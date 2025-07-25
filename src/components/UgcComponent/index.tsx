import React, { useState, useEffect } from "react";
import SvgIcons from "../common/SvgIcons";
import { ICONS_NAMES } from "@/constants";
import AktivGroteskText from "../common/AktivGroteskText";
import UgcCard from "../common/UgcCard";
import { Dialog, DialogContent } from "../ui/dialog";
import GreenCTA from "../GreenCTA";
import { IUgcComponent } from "@/interfaces";
import { TModifiedUGCContent } from "@/api/types/GluedinTypes";
import useAppDispatch from "@/hooks/useDispatch";
import { updateUgcLoadMore, updateUgcOffset } from "@/store/ugc";
import useAppSelector from "@/hooks/useSelector";
import { useCMSData } from "@/data";

const UgcComponent: React.FC<IUgcComponent> = ({
  isUnmounting,
  jokesData,
  onVoteSuccess,
  isLoadingGluedinFeedList = false,
  noMoreData = false,
}) => {
  const [mounted, setMounted] = useState(false);
  const cmsData = useCMSData(mounted);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [showExitModal, setShowExitModal] = useState(false);
  const { filterChnageId } = useAppSelector((state) => state.ugc);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isUnmounting) {
      setShowExitModal(true);
    }
  }, [isUnmounting]);


  return (
    <div className="py-[16px] md:py-[24px]">
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-[16px] xl:gap-x-[60px] md:gap-x-[45px] md:gap-y-[24px]">
        {jokesData?.map((item: TModifiedUGCContent, index: number) => (
          <UgcCard
            item={item}
            key={index}
            onVoteSuccess={onVoteSuccess}
            voteCDP={true}
          />
        ))}
      </div>
      {jokesData?.length === 0 && (
        <div className="flex justify-center items-center md:mt-[32px] mt-[16px]">
          <AktivGroteskText
            text={cmsData.jokeBox.noMoreData}
            fontSize="text-[16px]"
            fontWeight="font-[700]"
          />
        </div>
      )}
      <div className="flex justify-center items-center md:mt-[32px] mt-[16px]">
        {!noMoreData && (
          <GreenCTA
            text={cmsData.jokeBox.loadMoreButtonText}
            disabled={isLoadingGluedinFeedList}
            className="leading-tight"
            paddingClass="px-[36px] py-[8px] md:py-[8px] md:px-[16px] border-[1px]"
            fontSize="md:text-[16px] text-[14px]"
            fontWeight="font-[700]"
            onClick={() => {
              if (filterChnageId !== "") {
                dispatch(updateUgcLoadMore());
              }

              dispatch(updateUgcOffset());
            }}
          />
        )}
      </div>

      <Dialog open={showExitModal} onOpenChange={setShowExitModal}>
        <DialogContent className="max-w-[343px] rounded-[10px] py-[16px] px-[16px]">
          <div className="flex items-center justify-end pb-[8px]">
            <button
              onClick={() => setShowExitModal(false)}
              className="border-none outline-none bg-transparent hover:opacity-70 transition-opacity"
            >
              <SvgIcons
                name={ICONS_NAMES.CROSS}
                className="w-[20px] h-[20px]"
              />
            </button>
          </div>
          <div className="flex flex-col gap-[24px]">
            <AktivGroteskText
              text="Are you sure you want to leave?"
              fontSize="text-[16px]"
              fontWeight="font-[700]"
            />
            <AktivGroteskText
              text="Your selected filters will be lost."
              fontSize="text-[12px]"
              fontWeight="font-[400]"
              className="text-gray-600"
            />
            <div className="flex flex-col gap-[12px]">
              <GreenCTA
                onClick={() => {
                  // Apply filters before unmounting
                  setShowExitModal(false);
                }}
                text="Apply and Exit"
                className="w-full"
                paddingClass="pt-[19px] pb-[14px]"
                fontSize="text-[16px]"
                fontWeight="font-[700]"
              />
              <button
                onClick={() => {
                  setShowExitModal(false);
                }}
                className="w-full border border-gray-200 rounded-full pt-[19px] pb-[14px] hover:bg-gray-50"
              >
                <AktivGroteskText
                  text="Exit Without Applying"
                  fontSize="text-[16px]"
                  fontWeight="font-[700]"
                  className="text-gray-600"
                />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UgcComponent;
