"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SvgIcons from "../SvgIcons";
import { ICONS_NAMES } from "@/constants";
import { aktivGrotesk } from "@/app/layout";
import SurpriseMeCTA from "@/components/SurpriseMeCTA";
import { MakeLaughExitPopup } from "@/components/ExitPopUps";
import { useGetSurpriseMeJoke } from "@/api/hooks/JokeHooks";
import { formatNumberToK } from "@/utils";
import {
  useSendGluedinUserReaction,
  useGetGluedinAssetById,
  useViewGludeinJokes,
} from "@/api/hooks/GluedinHooks";
import { ReactionType } from "@/types";
import { useGlobalLoader } from "@/hooks/useGlobalLoader";
import SerialChillerPopup from "../SerialChillerPopup";
import { CoinAnimation, useCoinAnimation } from "../CoinAnimation";
import { incrementComicCoins } from "@/store/profile/profile.slice";
import useAppDispatch from "@/hooks/useDispatch";
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder,
  ReactionCDPEventPayload,
} from "@/api/utils/cdpEvents";
import useAppSelector from "@/hooks/useSelector";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";

export interface ISurpriseMeJoke {
  artist_id: string;
  id: string;
  joke_creator: string;
  joke_genre: string;
  joke_language: string;
  like_count: number;
  thumbnail_url: string;
  title: string;
  type: string;
  url: string;
  user_reaction: {
    laugh: number;
    neutral: number;
    sad: number;
  };
  view_count: number;
  reactionType?: string;
  isReacted?: boolean;
  isLiked: boolean;
}

const SurpriseMeModal = ({
  onClose,
  genreId,
  languageId,
  pullJoke = false,
  category = "",
}: {
  onClose: () => void;
  forceShow?: boolean;
  genreId?: number;
  languageId?: number;
  surpriseMeCheck?: boolean;
  pullJoke?: boolean;
  category?: string;
}) => {
  // const { shouldShow, hasChecked } = useSessionModal(
  //   "hasShownSurpriseMe",
  //   forceShow
  // );
  const [open, setOpen] = useState<boolean>(false);
  const [makeLaughExitPopup, setMakeLaughExitPopup] = useState<boolean>(false);
  const { data: jokeData } = useGetSurpriseMeJoke(genreId, languageId);
  const [joke, setJoke] = useState<ISurpriseMeJoke | null>(null);
  const jokeId = "";
  const [reactionType, setReactionType] = useState<string>("");
  const [serialChill, setSerialChill] = useState<boolean>(false);
  useGlobalLoader();
  const { user } = useAppSelector((state) => state.profile);

  // Coin animation hook
  const { isAnimating, triggerAnimation, animationKey } = useCoinAnimation();

  const {
    mutate: mutateSendGluedinUserReaction,
    data: gluedinUserReactionData,
  } = useSendGluedinUserReaction();
  const { mutate: viewGludeinJokes, data: viewGludeinJokesData } =
    useViewGludeinJokes();
  const { data: gluedinAssetData } = useGetGluedinAssetById(jokeId);
  const dispatch = useAppDispatch();
  const { mutate: sendCDPEvent } = useSendCDPEvent();

  // Set open state based on session check
  // useEffect(() => {
  //   if (hasChecked) {
  //     if (shouldShow) {
  //       setOpen(true);
  //     } else {
  //       onClose();
  //     }
  //   }
  // }, [shouldShow, hasChecked, onClose]);

  const trigger_CDP_Pull_Joke = () => {
    if (pullJoke && category && user?.id) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildPullJokePayload(category, user?.id);
      sendCDPEvent(payload);
    }
  };

  useEffect(() => {
    if (jokeData?.ok) {
      viewGludeinJokes({ assetIds: [jokeData?.data?.id] });
      setOpen(true);
      setJoke(jokeData?.data ?? {});
      setSerialChill(false);
      trigger_CDP_Pull_Joke();
    } else if (jokeData?.ok === false) {
      setJoke(null);
      setSerialChill(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jokeData]);

  useEffect(() => {
    if (gluedinAssetData?.ok) {
      const { isLiked, reactionType } = gluedinAssetData?.data as {
        isLiked: boolean;
        reactionType: string;
      };
      setJoke((prev: ISurpriseMeJoke | null) => {
        if (!prev) return null;
        return {
          ...prev,
          isLiked: isLiked,
          reactionType: reactionType,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gluedinAssetData]);

  const handleSendGluedinUserReaction = (
    reactionType: string,
    assetId: string
  ) => {
    setReactionType(reactionType);
    mutateSendGluedinUserReaction({
      assetId: assetId,
      reactionType: reactionType,
      increaseComicCoin: true,
    });
  };

  useEffect(() => {
    if (viewGludeinJokesData?.ok && jokeData?.ok) {
      setJoke((prev: ISurpriseMeJoke | null) => {
        if (!prev) return null;
        return {
          ...prev,
          view_count: prev?.view_count + 1,
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewGludeinJokesData]);

  console.log(gluedinUserReactionData, "gluedinUserReactionData");
  useEffect(() => {
    if (gluedinUserReactionData?.ok) {
      dispatch(incrementComicCoins());
      setJoke((prev: ISurpriseMeJoke | null) => {
        if (!prev) return null;
        return {
          ...prev,
          isReacted: true,
          reactionType: reactionType,
          user_reaction: {
            ...prev.user_reaction,
            [reactionType]:
              (prev.user_reaction[
                reactionType as keyof typeof prev.user_reaction
              ] || 0) + 1,
          },
        };
      });

      // Trigger coin animation on successful reaction
      triggerAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gluedinUserReactionData]);

  // Handle modal close with proper cleanup
  const handleClose = () => {
    // forceHideLoader(); // Ensure any loading states are cleared
    setOpen(false);
    onClose();
  };

  // useEffect(() => {
  //   return () => {
  //     setJoke(null);
  //     forceHideLoader(); // Cleanup on unmount
  //   };
  // }, [forceHideLoader]);

  if (serialChill) {
    return (
      <SerialChillerPopup
        open={serialChill}
        onClose={() => {
          setSerialChill(false);
          handleClose();
        }}
      />
    );
  }

  if (!joke) {
    return <></>;
  }

  const triggerCDPEvent = (reactionType: ReactionType) => {
    if (reactionType && joke?.id && user?.id) {
      const payload: ReactionCDPEventPayload =
        CDPEventPayloadBuilder.buildReactionPayload(
          joke?.id,
          reactionType,
          user?.id
        );
      sendCDPEvent(payload);
    }
  };

  console.log(joke, "joke", open);

  if (joke) {
    return (
      <Dialog
        open={open}
        onOpenChange={() => {
          if (joke?.reactionType) {
            //modal is clicking 2
            handleClose();
          } else {
            setMakeLaughExitPopup(true);
          }
        }}
      >
        <style jsx>{`
          video:fullscreen {
            object-fit: contain !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
          }
          video:-webkit-full-screen {
            object-fit: contain !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
          }
          video:-moz-full-screen {
            object-fit: contain !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
          }
          /* Ensure video controls are fully accessible */
          video::-webkit-media-controls-panel {
            z-index: 9999 !important;
          }
          video::-webkit-media-controls {
            z-index: 9999 !important;
          }
          /* Fix playback speed dropdown scrolling */
          video::-webkit-media-controls-playback-rate-menu-button {
            z-index: 10000 !important;
            position: relative !important;
          }
          video::-webkit-media-controls-playback-rate-menu-button ul {
            z-index: 10000 !important;
            position: absolute !important;
            bottom: 100% !important;
            left: 0 !important;
            max-height: 200px !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            background: rgba(0, 0, 0, 0.9) !important;
            border-radius: 4px !important;
            padding: 8px 0 !important;
            margin-bottom: 8px !important;
            min-width: 80px !important;
            scroll-behavior: smooth !important;
            -webkit-overflow-scrolling: touch !important;
          }
          /* Force scrolling behavior */
          video::-webkit-media-controls-playback-rate-menu-button ul:hover {
            overflow-y: auto !important;
          }
          video::-webkit-media-controls-playback-rate-menu-button ul:focus {
            overflow-y: auto !important;
          }
          /* Alternative approach for better scrolling */
          video::-webkit-media-controls-playback-rate-menu-button ul {
            display: block !important;
            max-height: 200px !important;
            overflow-y: scroll !important;
            scrollbar-width: thin !important;
            scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1) !important;
          }
          /* Ensure modal doesn't clip video controls */
          [data-radix-dialog-content] {
            overflow: visible !important;
          }
          /* Video container overflow fix */
          .relative {
            overflow: visible !important;
          }
          /* Additional fixes for playback rate menu */
          video::-webkit-media-controls-playback-rate-menu-button ul li {
            padding: 4px 12px !important;
            color: white !important;
            cursor: pointer !important;
            white-space: nowrap !important;
          }
          video::-webkit-media-controls-playback-rate-menu-button ul li:hover {
            background: rgba(255, 255, 255, 0.1) !important;
          }
          /* Force scrollbar to be visible */
          video::-webkit-media-controls-playback-rate-menu-button
            ul::-webkit-scrollbar {
            width: 6px !important;
          }
          video::-webkit-media-controls-playback-rate-menu-button
            ul::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1) !important;
            border-radius: 3px !important;
          }
          video::-webkit-media-controls-playback-rate-menu-button
            ul::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3) !important;
            border-radius: 3px !important;
          }
        `}</style>
        <DialogContent className="border-none md:max-w-[353px] px-[12px] max-w-[277px] shadow-none p-0 rounded-[20px]">
          <div className="absolute border-none outline-none top-[-105px] md:top-[-100px] left-0 flex justify-center items-center w-full">
            <SvgIcons
              name={ICONS_NAMES.SURPRISE_ME}
              className="w-[145px] h-[102px] md:w-[136px] md:h-[97px]"
            />
          </div>
          <div className="flex justify-between items-start p-[12px]">
            <div className="w-[80%] relative flex gap-[10px]">
              <SvgIcons
                name={ICONS_NAMES.MAN_WITH_SEARCH}
                className="w-[23px] h-[28px]"
              />
              <div className="flex flex-col gap-[2px]">
                <p
                  className={`${aktivGrotesk.className} font-[700] md:text-[12px] text-[14px] text-[#000000]`}
                >
                  {joke?.title ?? ""}
                </p>
                <p
                  className={`${aktivGrotesk.className} font-[400] md:text-[10px] text-[12px] text-[#000000]`}
                >
                  {joke?.joke_creator ?? ""}
                </p>
              </div>
            </div>
            <button
              className="flex justify-center items-center cursor-pointer border-none outline-none"
              onClick={() => {
                if (joke?.reactionType) {
                  //modal is clicking 2
                  handleClose();
                } else {
                  setMakeLaughExitPopup(true);
                }
              }}
            >
              <SvgIcons
                name={ICONS_NAMES.CROSS}
                className="w-[20px] h-[20px]"
              />
            </button>
          </div>
          <div className="relative  max-w-[255px] md:max-w-[329px] h-[429px] md:h-[526px] ml-[11px]">
            <video
              src={joke?.url ?? ""}
              preload="auto"
              autoPlay
              controls
              disablePictureInPicture
              controlsList="nodownload"
              playsInline
              muted={false}
              webkit-playsinline=""
              x5-playsinline=""
              style={{
                width: "100%",
                height: "100%",
                aspectRatio: "9/16",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="bg-white rounded-[10px] p-[8px] mt-[14px]  pb-[12px] flex justify-between ml-[12px]">
            <div className="flex gap-[10px] md:gap-[9px] pl-[2px]">
              <SurpriseMeCTA
                name={ICONS_NAMES.FUNNY}
                isReacted={joke?.isReacted ?? false}
                disabled={
                  joke?.reactionType
                    ? joke?.reactionType !== ReactionType.LAUGH
                    : false
                }
                text={formatNumberToK(joke?.user_reaction?.laugh ?? 0)}
                onClick={() => {
                  handleSendGluedinUserReaction(ReactionType.LAUGH, joke?.id);
                  triggerCDPEvent(ReactionType.LAUGH);
                }}
              />
              <SurpriseMeCTA
                name={ICONS_NAMES.MAD}
                isReacted={joke?.isReacted ?? false}
                disabled={
                  joke?.reactionType
                    ? joke?.reactionType !== ReactionType.NEUTRAL
                    : false
                }
                text={formatNumberToK(joke?.user_reaction?.neutral ?? 0)}
                onClick={() => {
                  handleSendGluedinUserReaction(ReactionType.NEUTRAL, joke?.id);
                  triggerCDPEvent(ReactionType.NEUTRAL);
                }}
              />
              <SurpriseMeCTA
                name={ICONS_NAMES.ANGRY}
                isReacted={joke?.isReacted ?? false}
                disabled={
                  joke?.reactionType
                    ? joke?.reactionType !== ReactionType.SAD
                    : false
                }
                text={formatNumberToK(joke?.user_reaction?.sad ?? 0)}
                onClick={() => {
                  handleSendGluedinUserReaction(ReactionType.SAD, joke?.id);
                  triggerCDPEvent(ReactionType.SAD);
                }}
              />
            </div>
            <div className="pr-[10px]">
              <SurpriseMeCTA
                name={ICONS_NAMES.VIEWS}
                text={formatNumberToK(joke?.view_count ?? 0)}
                onClick={() => {}}
              />
            </div>
          </div>
        </DialogContent>

        {makeLaughExitPopup && (
          <MakeLaughExitPopup
            yesButtonClick={() => {
              console.log("yesButtonClick");
              setMakeLaughExitPopup(false);
              setOpen(false);
              onClose();
            }}
            noButtonClick={() => {
              console.log("noButtonClick");
              setMakeLaughExitPopup(false);
            }}
            open={makeLaughExitPopup}
            onClose={() => {
              setMakeLaughExitPopup(false);
            }}
            setOpen={setMakeLaughExitPopup}
          />
        )}
        {/* Coin Animation */}
        <CoinAnimation isVisible={isAnimating} animationKey={animationKey} />
      </Dialog>
    );
  }

  return null;
};

export default SurpriseMeModal;
