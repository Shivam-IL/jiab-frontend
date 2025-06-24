import React, { useEffect, useState } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import AktivGroteskText from '../AktivGroteskText'
import SurpriseMeCTA from '@/components/SurpriseMeCTA'
import GreenCTA from '@/components/GreenCTA'
import { UgcCardProps } from '@/interfaces'
import { formatNumberToK } from '@/utils'
import {
  useSendGluedinUserReaction,
  useSendVoteToGluedinAssets
} from '@/api/hooks/GluedinHooks'
import useAppDispatch from '@/hooks/useDispatch'
import { ReactionType } from '@/types'
import { updateUgcReactionData } from '@/store/ugc'
import VoteIsInPopup from '@/components/VoteIsInPopup'
import { usePathname, useRouter } from 'next/navigation'
import ReportPopupComponent from '../ReportPopupComponent'
import { incrementComicCoins } from '@/store/profile/profile.slice'
import useAppSelector from '@/hooks/useSelector'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder,
  ReactionCDPEventPayload
} from '@/api/utils/cdpEvents'
import VideoModal from '@/components/VideoModal'

enum UGCReactionType {
  HAHA = 'haha',
  MEH = 'meh',
  GRR = 'grr'
}

const UgcCard: React.FC<UgcCardProps> = ({
  disclaimerText = 'The content displayed above is user generated and may not reflect the opinions of Sprite®',
  item,
  onVoteSuccess,
  home = false,
  animation = false,
  voteCDP = false
}) => {
  const dispatch = useAppDispatch()
  const { mutate: sendGluedinUserReaction, data: gludeinUserReactionData } =
    useSendGluedinUserReaction()
  const { mutate: sendVoteToGluedinAssets, data: gluedinUserVoteData } =
    useSendVoteToGluedinAssets()

  const [text, setText] = useState<string>('')
  const { ugcFilters } = useAppSelector(state => state.ugc)
  const { genres } = useAppSelector(state => state.reference)
  const [genreImage, setGenreImage] = useState<string>('')

  const [voteIsInPopup, setVoteIsInPopup] = useState<boolean>(false)
  const [reportPopup, setReportPopup] = useState<boolean>(false)
  const { user } = useAppSelector(state => state.profile)
  const { mutate: sendCDPEvent } = useSendCDPEvent()
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false)

  const pathName = usePathname()

  const handlerUserReaction = (reactionType: ReactionType, videoId: string) => {
    if (item?.isReacted) {
      return
    }
    sendGluedinUserReaction({
      assetId: videoId ?? '',
      reactionType: reactionType
    })
  }

  useEffect(() => {
    if (item) {
      const imageUrl =
        genres?.find(genre => genre.genre === item?.labels?.[1])?.image_url ??
        genres?.[0]?.image_url
      setGenreImage(imageUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  const getLabel = (labels: string[]) => {
    let newLabel = ''
    labels?.forEach((label: string, index: number) => {
      if (index === labels?.length - 1) {
        newLabel = newLabel + label
      } else {
        newLabel = newLabel + label + ', '
      }
    })
    return newLabel
  }

  const trigger_CDP_VOTE_JOKES = (jokeId: string) => {
    console.log('jokeId', jokeId)
    console.log('user?.id', user?.id)
    console.log('voteCDP', voteCDP)
    if (jokeId && user?.id && voteCDP) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildVoteJokePayload(jokeId, user?.id)
      sendCDPEvent(payload)
    }
  }

  console.log('home', home)

  useEffect(() => {
    if (gludeinUserReactionData?.ok) {
      const { reactionType } = gludeinUserReactionData?.data
      const currentReactionCount = item?.reactions[reactionType] ?? 0
      const currentReactionUpdated = reactionType

      const newUGCData = {
        ...item,
        isReacted: true,
        reactionType: gludeinUserReactionData?.data?.reactionType,
        reactions: {
          ...item?.reactions,
          [currentReactionUpdated]: currentReactionCount + 1
        }
      }
      dispatch(
        updateUgcReactionData({
          ugcData: newUGCData
        })
      )

      // No coin animation for reactions - removing onReactSuccess call
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gludeinUserReactionData])

  useEffect(() => {
    if (gluedinUserVoteData?.ok) {
      const newUGCData = {
        ...item,
        isLiked: true
      }
      dispatch(updateUgcReactionData({ ugcData: newUGCData }))

      // Only trigger coin animation if coin increment API was successful
      const coinIncrementSuccess =
        gluedinUserVoteData?.data?.coinIncrementSuccess
      if (coinIncrementSuccess) {
        dispatch(incrementComicCoins())

        // Trigger coin animation only for successful coin increment (200 response)
        if (onVoteSuccess) {
          onVoteSuccess()
        }
      }

      if (pathName !== '/user-generated-jokes') {
        setVoteIsInPopup(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gluedinUserVoteData])

  const router = useRouter()

  useEffect(() => {
    if (animation && pathName === '/user-generated-jokes') {
    }
  }, [animation, pathName])

  const getText = async (content: string) => {
    try {
      const res = await fetch(
        `/api/proxy-text?url=${encodeURIComponent(content)}`
      )
      const data = await res.text()
      setText(data)
    } catch {
      setText('')
    }
  }

  useEffect(() => {
    if (item?.contentType === 'text' && item?.content) {
      getText(item.content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  const triggerReactionCDPEvent = (reactionType: UGCReactionType) => {
    if (reactionType && item?.videoId && user?.id) {
      const payload: ReactionCDPEventPayload =
        CDPEventPayloadBuilder.buildReactionPayload(
          item?.videoId,
          reactionType,
          user?.id
        )
      sendCDPEvent(payload)
    }
  }


  return (
    <div className='relative w-full flex-grow-1 p-[16px] md:px-[12px] flex flex-col justify-between gap-[10px] md:rounded-[10px] rounded-[5px] bg-[#FFFFFF]'>
      <div className='flex justify-between items-center md:items-start'>
        <div className='flex w-full items-start gap-[12px]'>
          <div className='min-w-[30px] max-w-[30px] md:max-w-[30px] md:min-w-[28px] min-h-[30px] max-h-[30px] md:min-h-[28px] md:max-h-[28px] flex items-end justify-center rounded-full '>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={genreImage}
              alt='genre'
              className='w-full h-full object-cover relative border-none outline-none'
            />
          </div>
          <div className='flex flex-col gap-[6.58px] md:gap-[1.58px] w-full'>
            <div className='flex justify-between items-center flex-grow'>
              <div className='flex flex-col justify-between'>
                <AktivGroteskText
                  text={item?.title ?? ''}
                  fontSize='text-[14px]'
                  fontWeight='font-[700]'
                  className='line-clamp-1'
                />
                <AktivGroteskText
                  text={`${item?.user?.fullName ?? ''} ${
                    getLabel(item?.labels ?? []) ?? ''
                  }`}
                  fontSize='text-[10px]'
                  fontWeight='font-[500]'
                />
              </div>
              <div className='flex gap-[6px]'>
                <button
                  className='cursor-pointer flex gap-[6px] border-none outline-none'
                  onClick={() => setReportPopup(true)}
                >
                  <AktivGroteskText
                    text='Report'
                    fontSize='text-[12px] text-[#FD0202]'
                    fontWeight='font-[400]'
                  />
                  <SvgIcons
                    name={ICONS_NAMES.REPORT}
                    className='w-[20px] h-[20px]'
                  />
                </button>
              </div>
            </div>
            <AktivGroteskText
              text={disclaimerText}
              fontSize='text-[10px] md:text-[12px]'
              fontWeight='font-[400]'
              className='text-[#313131]  block'
            />
          </div>
        </div>
      </div>
      <div className='relative'>
        <div
          className={`relative  w-full h-[278px] md:h-[340px] bg-[#00953B] ${
            item?.contentType === 'image' ? '' : 'px-[19px] py-[10px]'
          } flex items-center gap-[34px] rounded-t-[5px]`}
        >
          {item?.contentType !== 'image' && item?.content && (
            <SvgIcons
              name={ICONS_NAMES.SPRITE_WITH_BUBBLE}
              className='w-[57px] md:w-[78px] h-[213px] md:h-[274px]'
            />
          )}
          {/* <SvgIcons
            name={ICONS_NAMES.HEADPHONE2}
            className='w-[87px] h-[87px]'
          /> */}
          {item?.contentType !== 'image' && item?.content && (
            <div className='absolute top-[5px] right-[10px]'>
              <SvgIcons
                name={ICONS_NAMES.HASHTAG}
                className='w-[46px] md:w-[60px] h-[48px] md:h-[62px]'
              />
            </div>
          )}
          {/* <div className='absolute md:hidden bottom-[3px] left-[10px]'>
            <AktivGroteskText
              text='The content displayed above is user generated and may not reflect the opinions of Sprite® '
              fontSize='text-[7px]'
              fontWeight='font-[500]'
              className='text-white'
            />
          </div> */}
          {item?.contentType === 'image' && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item?.content}
              alt='image'
              className='relative w-full h-full'
            />
          )}
          {item?.contentType === 'text' && (
            <AktivGroteskText
              text={text ?? ''}
              fontSize='text-[12px]'
              fontWeight='font-[400]'
              className='text-white  text-center w-[50%] absolute right-[20px] top-[45%]'
            />
          )}
          {item?.contentType === 'video' && (
            <button
              className='flex items-center gap-[10px] cursor-pointer border-none outline-none absolute top-[45%] right-[25%]'
              onClick={() => setVideoModalOpen(true)}
            >
              <SvgIcons
                name={ICONS_NAMES.SPRITE_PLAY}
                className='w-[50px] h-[50px]'
              />
            </button>
          )}
          {item?.contentType === 'audio' && (
            <audio
              src={item?.content}
              controls
              className='w-[60%] h-full absolute  right-4 bottom-10'
            />
          )}
        </div>
        <div className='bg-white border-x-[1px] border-b-[1px] border-[#D9D9D9] rounded-b-[5px] p-[8px] flex justify-between'>
          <div className='flex gap-[10px] md:gap-[20px] pl-[10px]'>
            <SurpriseMeCTA
              isReacted={item?.isReacted}
              disabled={
                item?.isReacted && item?.reactionType !== ReactionType.LAUGH
              }
              name={ICONS_NAMES.FUNNY}
              text={formatNumberToK(item?.reactions?.laugh ?? 0)}
              onClick={() => {
                handlerUserReaction(ReactionType.LAUGH, item?.videoId ?? '')
                triggerReactionCDPEvent(UGCReactionType.HAHA)
              }}
            />
            <SurpriseMeCTA
              isReacted={item?.isReacted}
              disabled={
                item?.isReacted && item?.reactionType !== ReactionType.NEUTRAL
              }
              name={ICONS_NAMES.MAD}
              text={formatNumberToK(item?.reactions?.neutral ?? 0)}
              onClick={() => {
                handlerUserReaction(ReactionType.NEUTRAL, item?.videoId ?? '')
                triggerReactionCDPEvent(UGCReactionType.MEH)
              }}
            />
            <SurpriseMeCTA
              isReacted={item?.isReacted}
              disabled={
                item?.isReacted && item?.reactionType !== ReactionType.SAD
              }
              name={ICONS_NAMES.ANGRY}
              text={formatNumberToK(item?.reactions?.sad ?? 0)}
              onClick={() => {
                handlerUserReaction(ReactionType.SAD, item?.videoId ?? '')
                triggerReactionCDPEvent(UGCReactionType.GRR)
              }}
            />
          </div>
          <div className='flex gap-[12px]'>
            <div className='flex items-center'>
              <GreenCTA
                onClick={() => {
                  if (item?.isLiked) {
                    return
                  }
                  if (!item?.videoId) {
                    return
                  }

                  if (ugcFilters?.language && ugcFilters?.category) {
                    sendVoteToGluedinAssets({
                      assetId: item.contentDataId ?? item.videoId ?? '',
                      languageId: ugcFilters?.language ?? '',
                      genreId: ugcFilters?.category ?? '',
                      type: 'vote'
                    })
                  } else {
                    sendVoteToGluedinAssets({
                      assetId: item.contentDataId ?? item.videoId ?? '',
                      type: 'vote'
                    })
                  }
                  trigger_CDP_VOTE_JOKES(item?.videoId ?? '')
                }}
                text={item?.isLiked ? 'Voted' : 'Vote'}
                disabled={item?.isLiked ?? false}
                className='leading-tight flex items-center justify-center'
                paddingClass='px-[26px] py-[8px] md:px-[21px] md:py-[7px]'
                fontSize='text-[12px] md:text-[16px]'
                fontWeight='font-[700]'
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
                  router.push('/user-generated-jokes')
                }}
              />
            )}
          </div>
        </div>
      </div>

      {videoModalOpen && item?.videoId && (
        <VideoModal
          open={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
          joke={item}
          handleSendGluedinUserReaction={handlerUserReaction}
        />
      )}
      <ReportPopupComponent
        setOpen={setReportPopup}
        userId={user?.id ?? ''}
        actingUserId={item?.user?.userId ?? ''}
        open={reportPopup}
        assetId={item?.videoId ?? ''}
        onClose={() => setReportPopup(false)}
      />
    </div>
  )
}

export default UgcCard
