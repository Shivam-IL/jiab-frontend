import { TModifiedUGCContent, TUGCContent } from "../types/GluedinTypes";
import { ErrorResponse, SuccessResponse } from "../utils/responseConvertor";

const JOKES = [
  "What is fast, loud and crunchy? A rocket chip",
  "I was going to tell you a joke about a broken pencil, but then I realized it was pointless.",
  "What did the lava say to his girlfriend? “I lava you!",
  "Why is Peter Pan always flying? Because he Neverlands",
  "Which song is this??? . 12.9999999999… . . . . . . . . . . . . . . . . . . . . “Tera, Hone Laga Hoon…",
  "Why is Peter Pan always flying? Because he Neverlands",
];

const gluedinFeedListTransformer = (
  feedData: TUGCContent[],
  voteData: any[],
  reactionData: { reaction: string; videoId: string }[],
  contentData: {
    content: string;
    id: string;
  }[]
) => {
  const newFeedData: TModifiedUGCContent[] = [];
  if (feedData?.length > 0) {
    feedData?.forEach((item) => {
      const isLiked = voteData?.includes(item?.videoId);
      let isReacted = false;
      let reactionType = "";

      const reactions = {
        sad: item?.reactions?.sad ?? 0,
        laugh: item?.reactions?.laugh ?? 0,
        neutral: item?.reactions?.neutral ?? 0,
      };

      const reactedDataIndex = reactionData?.findIndex(
        (reaction) => reaction?.videoId === item?.videoId
      );

      if (reactedDataIndex !== -1) {
        reactionType = reactionData[reactedDataIndex]?.reaction;
        isReacted = true;
      }

      const getContent = contentData?.find(
        (content) => content?.id === item?.videoId
      );
      const modifiedItem: TModifiedUGCContent = {
        ...item,
        isLiked: isLiked ? true : false,
        reactions,
        isReacted: isReacted,
        reactionType: reactionType,
        content: getContent?.content ?? JOKES[Math.floor(Math.random() * JOKES.length)],
      };
      newFeedData.push(modifiedItem);
    });
  }
  return newFeedData;
};

const gluedinAssetByIdTransformer = (voteData: any[], reactionData: any[]) => {
  return {
    isLiked: voteData?.length > 0 ? true : false,
    reactionType: reactionData?.length > 0 ? reactionData?.[0]?.reaction : "",
  };
};

const gluedinViewTransformer = (data: any) => {
  const newData = data?.map((item: any) => {
    return item?.data;
  });
  let success = false;
  const modifiedViewData = newData
    ?.filter((item: any) => {
      if (item?.success) {
        success = true;
        return true;
      }
      return false;
    })
    ?.map((item: any) => {
      return item?.result?.assetId;
    });
  if (success) {
    return SuccessResponse(modifiedViewData);
  }
  return ErrorResponse("Failed to view Gluedin jokes");
};

export {
  gluedinFeedListTransformer,
  gluedinAssetByIdTransformer,
  gluedinViewTransformer,
};
