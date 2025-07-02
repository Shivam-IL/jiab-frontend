'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog3'
import { ICONS_NAMES } from '@/constants'
import SurpriseMeCTA from '@/components/SurpriseMeCTA'
import { MakeLaughExitPopup } from '@/components/ExitPopUps'

import { ReactionType } from '@/types'

import { TModifiedUGCContent } from '@/api/types/GluedinTypes'
import SvgIcons from '../common/SvgIcons'
import { useViewGludeinJokes } from '@/api/hooks/GluedinHooks'
import { updateUgcViewData } from '@/store/ugc'
import useAppDispatch from '@/hooks/useDispatch'

const SurpriseMeModal = ({
  onClose,
  open,
  joke,
  handleSendGluedinUserReaction
}: {
  open: boolean
  onClose: () => void
  joke: TModifiedUGCContent | undefined
  handleSendGluedinUserReaction: (
    reactionType: ReactionType,
    videoId: string
  ) => void
}) => {
  const handleClose = () => {
    onClose()
  }
  const [makeLaughExitPopup, setMakeLaughExitPopup] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { mutate: viewGludeinJokes, data: viewGludeinJokesData } =
    useViewGludeinJokes()

  useEffect(() => {
    if (viewGludeinJokesData?.ok) {
      const { data } = viewGludeinJokesData ?? {}
      dispatch(updateUgcViewData({ assetIds: data }))
    }
  }, [viewGludeinJokesData, dispatch])

  if (joke?.videoId && open) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
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
            video::-webkit-media-controls-playback-rate-menu-button
              ul
              li:hover {
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
        <DialogContent className='z-[50] border-none max-w-[37dvh] gap-[4px] shadow-none p-0 rounded-[10px]'>
          <div className='flex relative max-w-[37dvh] justify-between items-start p-[12px]'>
            <div className='w-[80%] relative flex gap-[10px]'>
              <SvgIcons
                name={ICONS_NAMES.MAN_WITH_SEARCH}
                className='w-[23px] h-[28px]'
              />
              <div className='flex flex-col gap-[2px]'>
                <p
                  className={`font-[700] md:text-[12px] text-[14px] text-[#000000]`}
                >
                  {joke?.title ?? ''}
                </p>
                <p
                  className={`font-[400] md:text-[10px] text-[12px] text-[#000000]`}
                >
                  {joke?.user.fullName ?? ''}
                </p>
              </div>
            </div>
            <button
              className='flex justify-center items-center cursor-pointer border-none outline-none'
              onClick={() => {
                if (joke?.reactionType) {
                  handleClose()
                } else {
                  setMakeLaughExitPopup(true)
                }
              }}
            >
              <SvgIcons
                name={ICONS_NAMES.CROSS}
                className='w-[20px] h-[20px]'
              />
            </button>
          </div>
          <div className='relative ml-[11px] mr-[11px]'>

          <div className='relative w-full mx-0 max-w-[35dvh] aspect-[9/16] overflow-hidden rounded-[8px] max-h-[60vh]'>
                    
            <video
              src={joke?.content ?? ''}
              preload='auto'
              autoPlay
              controls
              disablePictureInPicture
              controlsList='nodownload'
              playsInline
              webkit-playsinline=''
              x5-playsinline=''
              muted={false}
              onEnded={() => {
                viewGludeinJokes({ assetIds: [joke?.videoId] })
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
          </div>
          <div className='bg-white rounded-[10px] p-[8px] mt-[14px]  pb-[12px] flex justify-between'>
            <div className='flex gap-[24px] md:gap-[14px] pl-[10px]'>
              <SurpriseMeCTA
                name={ICONS_NAMES.FUNNY}
                isReacted={joke?.isReacted ?? false}
                disabled={
                  joke?.reactionType
                    ? joke?.reactionType !== ReactionType.LAUGH
                    : false
                }
                text={joke?.reactions?.laugh?.toString() ?? '0'}
                onClick={() => {
                  handleSendGluedinUserReaction(
                    ReactionType.LAUGH,
                    joke?.videoId
                  )
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
                text={joke?.reactions?.neutral?.toString() ?? '0'}
                onClick={() => {
                  handleSendGluedinUserReaction(
                    ReactionType.NEUTRAL,
                    joke?.videoId
                  )
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
                text={joke?.reactions?.sad?.toString() ?? '0'}
                onClick={() => {
                  handleSendGluedinUserReaction(ReactionType.SAD, joke?.videoId)
                }}
              />
            </div>
            <div className='pr-[10px]'>
              <SurpriseMeCTA
                name={ICONS_NAMES.VIEWS}
                text={joke?.viewsCount?.toString() ?? '0'}
                onClick={() => {}}
              />
            </div>
          </div>
        </DialogContent>

        {makeLaughExitPopup && (
          <MakeLaughExitPopup
            yesButtonClick={() => {
              setMakeLaughExitPopup(false)
              handleClose()
            }}
            noButtonClick={() => {
              setMakeLaughExitPopup(false)
            }}
            open={makeLaughExitPopup}
            onClose={() => {
              setMakeLaughExitPopup(false)
            }}
            setOpen={setMakeLaughExitPopup}
          />
        )}
        {/* Coin Animation */}
      </Dialog>
    )
  }

  return null
}

export default SurpriseMeModal
