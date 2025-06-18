import React, { useEffect, useState } from "react";
import SvgIcons from "../SvgIcons";
import { ICONS_NAMES, REDUX_UPDATION_TYPES } from "@/constants";
import AktivGroteskText from "../AktivGroteskText";
import SurpriseMeCTA from "@/components/SurpriseMeCTA";
import GreenCTA from "@/components/GreenCTA";
import { UgcCardProps } from "@/interfaces";
import { formatNumberToK } from "@/utils";
import {
  useSendGluedinUserReaction,
  useSendVoteToGluedinAssets,
} from "@/api/hooks/GluedinHooks";
import useAppDispatch from "@/hooks/useDispatch";
import { ReactionType } from "@/types";
import { updateUgcReactionData } from "@/store/ugc";
import VoteIsInPopup from "@/components/VoteIsInPopup";
import { usePathname, useRouter } from "next/navigation";
import ReportPopupComponent from '../ReportPopupComponent'
import { incrementComicCoins } from "@/store/profile/profile.slice";

const UgcCard: React.FC<UgcCardProps> = ({
  disclaimerText = "The content displayed above is user generated and may not reflect the opinions of Sprite®",
  item,
  onVoteSuccess,
  onReactSuccess,
  home = false,
  animation = false,
}) => {
  const dispatch = useAppDispatch();
  const { mutate: sendGluedinUserReaction, data: gludeinUserReactionData } =
    useSendGluedinUserReaction();
  const { mutate: sendVoteToGluedinAssets, data: gluedinUserVoteData } =
    useSendVoteToGluedinAssets();

  const [voteIsInPopup, setVoteIsInPopup] = useState<boolean>(false);
  const [animationStart, setAnimationStart] = useState<boolean>(false)
  const [reportPopup, setReportPopup] = useState<boolean>(false)

  const pathName = usePathname()

  const handlerUserReaction = (reactionType: ReactionType, videoId: string) => {
    if (item?.isReacted) {
      return;
    }
    sendGluedinUserReaction({
      assetId: videoId ?? "",
      reactionType: reactionType,
    });
  };

  const getLabel = (labels: string[]) => {
    let newLabel = "";
    labels?.forEach((label: string, index: number) => {
      if (index === labels?.length - 1) {
        newLabel = newLabel + label;
      } else {
        newLabel = newLabel + label + ", ";
      }
    });
    return newLabel;
  };

  useEffect(() => {
    if (gludeinUserReactionData?.ok) {
      const { reactionType } = gludeinUserReactionData?.data;
      const currentReactionCount = item?.reactions[reactionType] ?? 0;
      const currentReactionUpdated = reactionType;

      const newUGCData = {
        ...item,
        isReacted: true,
        reactionType: gludeinUserReactionData?.data?.reactionType,
        reactions: {
          ...item?.reactions,
          [currentReactionUpdated]: currentReactionCount + 1,
        },
      };
      dispatch(
        updateUgcReactionData({
          ugcData: newUGCData,
        })
      );

      // Trigger coin animation for successful reaction
      if (onReactSuccess) {
        onReactSuccess();
      }
    }
  }, [gludeinUserReactionData]);

  useEffect(() => {
    if (gluedinUserVoteData?.ok) {
      const newUGCData = {
        ...item,
        isLiked: true,
      };
      dispatch(updateUgcReactionData({ ugcData: newUGCData }))
      dispatch(incrementComicCoins())

      if (pathName !== '/user-generated-jokes') {
        console.log('pathName', pathName)
        setVoteIsInPopup(true);
      }
      dispatch(updateUgcReactionData({ ugcData: newUGCData }));

      // Trigger coin animation for successful vote
      if (onVoteSuccess) {
        onVoteSuccess();
      }
    }
  }, [gluedinUserVoteData]);

  const router = useRouter();

  useEffect(() => {
    if (animation && pathName === '/user-generated-jokes') {
    }
  }, [animation])

  return (
    <div className="relative w-full flex-grow-1 p-[16px] md:px-[12px] flex flex-col justify-between gap-[10px] md:rounded-[10px] rounded-[5px] bg-[#FFFFFF]">
      <div className="flex justify-between items-center md:items-start">
        <div className="flex w-full items-start gap-[12px]">
          <div className="min-w-[30px] md:min-w-[28px] min-h-[30px] md:min-h-[28px] flex items-end justify-center rounded-full border-[1px] border-black">
            <SvgIcons
              name={ICONS_NAMES.TRAFFIC_LIGHT}
              className="w-[13px] h-[24px]"
            />
          </div>
          <div className="flex flex-col gap-[6.58px] md:gap-[1.58px] w-full">
            <div className="flex justify-between items-center flex-grow">
              <div className="flex flex-col justify-between">
                <AktivGroteskText
                  text={item?.title ?? ""}
                  fontSize="text-[14px]"
                  fontWeight="font-[700]"
                  className='line-clamp-1'
                />
                <AktivGroteskText
                  text={`${item?.user?.fullName ?? ""} ${
                    getLabel(item?.labels ?? []) ?? ""
                  }`}
                  fontSize="text-[10px]"
                  fontWeight="font-[500]"
                />
              </div>
              <div className="flex gap-[6px]">
                <button
                  className='cursor-pointer border-none outline-none'
                  onClick={() => setReportPopup(true)}
                >
                  <AktivGroteskText
                    text="Report"
                    fontSize="text-[12px] text-[#FD0202]"
                    fontWeight="font-[400]"
                  />
                </button>
                <SvgIcons
                  name={ICONS_NAMES.REPORT}
                  className="w-[20px] h-[20px]"
                />
              </div>
            </div>
            <AktivGroteskText
              text={disclaimerText}
              fontSize="text-[10px] md:text-[12px]"
              fontWeight="font-[400]"
              className="text-[#313131]  block"
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="relative w-full h-[278px] md:h-[340px] bg-[#00953B] px-[19px] flex items-center py-[10px] gap-[34px] rounded-t-[5px]">
          <SvgIcons
            name={ICONS_NAMES.SPRITE_WITH_BUBBLE}
            className="w-[57px] md:w-[78px] h-[213px] md:h-[274px]"
          />
          {/* <SvgIcons
            name={ICONS_NAMES.HEADPHONE2}
            className='w-[87px] h-[87px]'
          /> */}
          <div className="absolute top-[5px] right-[10px]">
            <SvgIcons
              name={ICONS_NAMES.HASHTAG}
              className="w-[46px] md:w-[60px] h-[48px] md:h-[62px]"
            />
          </div>
          {/* <div className='absolute md:hidden bottom-[3px] left-[10px]'>
            <AktivGroteskText
              text='The content displayed above is user generated and may not reflect the opinions of Sprite® '
              fontSize='text-[7px]'
              fontWeight='font-[500]'
              className='text-white'
            />
          </div> */}
          <AktivGroteskText
            text={item?.content ?? ""}
            fontSize="text-[12px]"
            fontWeight="font-[400]"
            className="text-white  text-center w-[50%] absolute right-[20px] top-[45%]"
          />
        </div>
        <div className="bg-white border-x-[1px] border-b-[1px] border-[#D9D9D9] rounded-b-[5px] p-[8px] flex justify-between">
          <div className="flex gap-[10px] md:gap-[20px] pl-[10px]">
            <SurpriseMeCTA
              isReacted={item?.isReacted}
              disabled={
                item?.isReacted && item?.reactionType !== ReactionType.LAUGH
              }
              name={ICONS_NAMES.FUNNY}
              text={formatNumberToK(item?.reactions?.laugh ?? 0)}
              onClick={() =>
                handlerUserReaction(ReactionType.LAUGH, item?.videoId ?? "")
              }
            />
            <SurpriseMeCTA
              isReacted={item?.isReacted}
              disabled={
                item?.isReacted && item?.reactionType !== ReactionType.NEUTRAL
              }
              name={ICONS_NAMES.MAD}
              text={formatNumberToK(item?.reactions?.neutral ?? 0)}
              onClick={() =>
                handlerUserReaction(ReactionType.NEUTRAL, item?.videoId ?? "")
              }
            />
            <SurpriseMeCTA
              isReacted={item?.isReacted}
              disabled={
                item?.isReacted && item?.reactionType !== ReactionType.SAD
              }
              name={ICONS_NAMES.ANGRY}
              text={formatNumberToK(item?.reactions?.sad ?? 0)}
              onClick={() =>
                handlerUserReaction(ReactionType.SAD, item?.videoId ?? "")
              }
            />
          </div>
          <div className="flex gap-[12px]">
            <div className="flex items-center">
              <GreenCTA
                onClick={() => {
                  if (item?.isLiked) {
                    return;
                  }
                  if (!item?.videoId) {
                    return;
                  }
                  sendVoteToGluedinAssets({
                    assetId: item.videoId ?? "",
                  });
                }}
                text={item?.isLiked ? "Voted" : "Vote"}
                disabled={item?.isLiked ?? false}
                className="leading-tight flex items-center justify-center"
                paddingClass="px-[26px] py-[8px] md:px-[21px] md:py-[7px]"
                fontSize="text-[12px] md:text-[16px]"
                fontWeight="font-[700]"
              />
            </div>
            <SurpriseMeCTA
              name={ICONS_NAMES.VIEWS}
              text={formatNumberToK(item?.viewsCount ?? 0)}
              onClick={() => {}}
            />
            {voteIsInPopup && (
              <VoteIsInPopup
                open={voteIsInPopup}
                onClose={() => setVoteIsInPopup(false)}
                singleButtonOnClick={() => {
                  router.push("/user-generated-jokes");
                }}
              />
            )}
          </div>
        </div>
      </div>
      <ReportPopupComponent
        setOpen={setReportPopup}
        open={reportPopup}
        onClose={() => setReportPopup(false)}
      />
    </div>
  );
};

export default UgcCard;
