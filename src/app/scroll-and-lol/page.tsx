'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/common/Header/Header'
import ReactionEmojies from '@/components/ReactionEmojies'
import { ICONS_NAMES } from '@/constants' // Import ICONS_NAMES
import { useCMSData } from '@/data'
import { useSearchParams } from 'next/navigation'
import {
  useActivateConsumption,
  useGetJokes,
  usePostReelReaction
} from '@/api/hooks/JokeHooks'
import { useLanguage } from '@/hooks/useLanguage'
import { IUserReaction } from '@/api/types/JokeTypes'
import {
  useSendGluedinUserReaction,
  useViewGludeinJokes
} from '@/api/hooks/GluedinHooks'
import {
  CDPEventPayloadBuilder,
  ReactionCDPEventPayload
} from '@/api/utils/cdpEvents'
import useAppSelector from '@/hooks/useSelector'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'
import ExhaustVideo from '@/components/ExhaustVideo'
import {
  CoinAnimation,
  useCoinAnimation
} from '@/components/common/CoinAnimation'

export interface IModifiedJoke {
  id: string
  url: string
  title: string
  thumbnail?: string
  user_reaction: IUserReaction
  thumbnail_url: string
  view_count: number
  reactionType: string
  isReacted: boolean
  is_exhausted: boolean
}

interface ErrorResponse {
  ok: false
  data: unknown[]
  message: string
  code?: number
}

// Define a type for the values of ICONS_NAMES (if not already global or imported appropriately)
// This might be duplicative if ReactionEmojies exports its Reaction type, consider refactoring later.
type IconName = typeof ICONS_NAMES[keyof typeof ICONS_NAMES]

interface SelectedReactionData {
  icon: IconName
  count: string
  name: string
}

interface VideoData {
  id: string
  url: string
  title: string
  thumbnail?: string
  user_reaction: IUserReaction
  view_count: number
  reactionType: string
  isReacted: boolean
}

// Loading Spinner Component
const LoadingSpinner: React.FC<{ mobileHeight?: string }> = ({
  mobileHeight = '100vh'
}) => {
  return (
    <div
      className='relative md:w-fit md:h-full w-full flex items-center justify-center'
      style={{
        height:
          typeof window !== 'undefined' && window.innerWidth >= 768
            ? '100vh'
            : mobileHeight
      }}
    >
      <div className='flex flex-col items-center'>
        <div className='w-16 h-16 border-[8px] border-[#08C270] border-t-[#009639] rounded-full animate-spin mb-4'></div>
      </div>
    </div>
  )
}

// Mini spinner component overlay
const SpinnerOverlay: React.FC = () => (
  <div className='absolute inset-0 flex items-center justify-center bg-black/40 z-30'>
    <div className='w-12 h-12 border-4 border-[#08C270] border-t-transparent rounded-full animate-spin' />
  </div>
)

// Individual Video Item Component with react-intersection-observer
interface VideoItemProps {
  video: VideoData
  index: number
  isActive: boolean
  isMuted: boolean
  mobilePageHeight: string
  onVideoInView: (index: number) => void
  onVideoOutOfView: (index: number) => void
  onVideoLoad: (index: number) => void
  onVideoCanPlay: (index: number) => void
  onVideoError: (index: number) => void
  onVideoEnded: (index: number) => void
  onVideoPlay: (index: number) => void
  onVideoPause: (index: number) => void
  onTogglePlay: (index: number) => void
  onToggleMute: (index: number) => void
  onVideoRef: (index: number, element: HTMLVideoElement | null) => void
  isPlaying: boolean
  isReady: boolean
  isUserPaused: boolean
}

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  index,
  isActive,
  isMuted,
  mobilePageHeight,
  onVideoInView,
  onVideoOutOfView,
  onVideoLoad,
  onVideoCanPlay,
  onVideoError,
  onVideoEnded,
  onVideoPlay,
  onVideoPause,
  onTogglePlay,
  onToggleMute,
  onVideoRef,
  isPlaying,
  isReady,
  isUserPaused
}) => {
  const { ref: intersectionRef, inView } = useInView({
    threshold: 0.5,
    rootMargin: '-20% 0px -20% 0px'
  })

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const combinedRef = useCallback(
    (node: HTMLDivElement | null) => {
      intersectionRef(node)
    },
    [intersectionRef]
  )

  useEffect(() => {
    if (inView) {
      onVideoInView(index)
    } else {
      onVideoOutOfView(index)
    }
  }, [inView, index, onVideoInView, onVideoOutOfView])

  // Auto-play logic when video comes into view
  useEffect(() => {
    if (inView && isActive && videoRef.current && !isUserPaused) {
      const video = videoRef.current
      if (video.paused && video.readyState >= 3) {
        video.play().catch(console.error)
      }
    }
  }, [inView, isActive, isUserPaused])

  return (
    <div
      ref={combinedRef}
      className='video-container relative md:max-h-[calc(100vh-200px)] w-full flex-shrink-0 md:mb-[100px] last:md:mb-0 md:flex md:items-center md:justify-center'
      data-index={index}
      style={{
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        height:
          typeof window !== 'undefined' && window.innerWidth >= 768
            ? 'calc(100vh - 200px)'
            : mobilePageHeight
      }}
    >
      <div className='relative md:w-auto md:h-auto w-full h-full'>
        {/* Thumbnail & spinner overlay */}
        {!isReady && (
          <>
            {video.thumbnail && (
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className='md:w-auto md:max-h-[calc(100vh-200px)] md:max-w-[442px] h-full w-full md:object-contain object-cover absolute inset-0'
                sizes='(max-width: 768px) 100vw, 442px'
                style={{ aspectRatio: '9/16' }}
                priority={index === 0}
              />
            )}
            <SpinnerOverlay />
          </>
        )}
        <video
          ref={el => {
            videoRef.current = el
            onVideoRef(index, el)
          }}
          className='md:w-auto md:max-h-[calc(100vh-200px)] md:max-w-[442px] w-full md:object-cover object-cover relative'
          src={video.url}
          playsInline
          muted={isMuted}
          autoPlay={false}
          preload='metadata'
          loop={false}
          onEnded={() => onVideoEnded(index)}
          onLoadedData={() => onVideoLoad(index)}
          onCanPlay={() => onVideoCanPlay(index)}
          onLoadStart={() => {
            if (index === 0) {
              setTimeout(() => onVideoLoad(index), 2000)
            }
          }}
          onError={() => onVideoError(index)}
          onPlay={() => onVideoPlay(index)}
          onPause={() => onVideoPause(index)}
          style={{
            aspectRatio: '9/16',
            height:
              typeof window !== 'undefined' && window.innerWidth >= 768
                ? 'auto'
                : mobilePageHeight
          }}
        />

        {/* Top controls */}
        <div className='absolute top-4 w-full flex justify-between px-4 z-20'>
          <button
            onClick={() => onTogglePlay(index)}
            className='w-[40px] h-[40px] rounded-full bg-[#12121240] flex items-center justify-center'
            disabled={!isReady}
          >
            <Image
              src={
                isPlaying && isActive
                  ? '/other-svgs/pause-icon.svg'
                  : '/other-svgs/play-icon.svg'
              }
              alt={isPlaying && isActive ? 'Pause' : 'Play'}
              width={isPlaying && isActive ? 12 : 20}
              height={isPlaying && isActive ? 12 : 20}
            />
          </button>
          <button
            onClick={() => onToggleMute(index)}
            className='w-[40px] h-[40px] rounded-full bg-[#12121240] flex items-center justify-center'
            disabled={!isReady}
          >
            <Image
              src={
                isMuted
                  ? '/other-svgs/mute-icon.svg'
                  : '/other-svgs/unmute-icon.svg'
              }
              alt={isMuted ? 'Unmute' : 'Mute'}
              width={20}
              height={20}
              className='text-white'
            />
          </button>
        </div>
      </div>
    </div>
  )
}

const ScrollAndLol: React.FC = () => {
  // Get selected joke id from query params
  const searchParams = useSearchParams()
  const selectedJokesParam = searchParams.get('selected_joke') || undefined

  // Language for API - use local state instead of global language
  const { selectedLanguage: globalLanguage } = useLanguage()
  const [videoLanguage, setVideoLanguage] = useState(globalLanguage)

  // Mobile footer height calculation
  const [footerHeight, setFooterHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  // Fetch jokes – ensure we always get 15 items (API default/limit)
  const { data: jokesResponse, isLoading: jokesLoading } = useGetJokes({
    limit: 15,
    selected_joke: selectedJokesParam,
    language: videoLanguage,
    type: 'scroll'
  })

  const [videos, setVideos] = useState<VideoData[]>([])
  const [languageChangeKey, setLanguageChangeKey] = useState(0)
  const [showSerialChillerForError, setShowSerialChillerForError] =
    useState(false)

  // Handle language change - completely reset component state
  useEffect(() => {
    // Stop and clear all currently playing videos
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause()
        video.currentTime = 0
        video.src = '' // Clear video source to stop loading
      }
    })

    // Reset all video-related state
    setVideos([])
    setVideoPlayStates([])
    setUserPausedVideos([])
    setVideoReady([])
    setActiveVideoIndex(0)
    setCurrentVideoData(null)
    setIsLoading(true)
    setShowSerialChillerForError(false) // Reset error state on language change

    // Clear video refs array
    videoRefs.current = []

    // Increment key to force re-render and reset intersection observer
    setLanguageChangeKey(prev => prev + 1)

    // Safety timeout to prevent infinite loading
    const safetyTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 10000) // 10 second timeout

    return () => clearTimeout(safetyTimeout)
  }, [videoLanguage])

  useEffect(() => {
    if (jokesResponse?.ok) {
      const jokesArr = jokesResponse.data as IModifiedJoke[]
      const newData = jokesArr.map(joke => ({
        id: joke.id,
        url: joke.url, // assuming backend returns direct video URL here
        title: joke.title ?? '',
        thumbnail: joke.thumbnail_url,
        user_reaction: joke.user_reaction ?? { laugh: 0, neutral: 0, sad: 0 },
        view_count: joke.view_count ?? 0,
        reactionType: joke.reactionType ?? '',
        isReacted: joke.isReacted ?? false
      }))
      setVideos(newData)
      const checkQuotaExhausted = jokesArr?.[0]?.is_exhausted
      setQuotaExhausted(checkQuotaExhausted)
      setShowSerialChillerForError(false) // Reset error state on successful response

      // If no videos returned, hide loading
      if (newData.length === 0) {
        setIsLoading(false)
      }
    } else if (jokesResponse && !jokesResponse.ok) {
      // Check if the error code is 1013
      const errorResponse = jokesResponse as ErrorResponse
      if (errorResponse?.code === 1013) {
        setShowSerialChillerForError(true)
        setVideos([]) // Clear videos array
      }
      // If API returns error, also hide loading
      setIsLoading(false)
    }
  }, [jokesResponse])

  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0)
  const [videoPlayStates, setVideoPlayStates] = useState<boolean[]>([])
  const [userPausedVideos, setUserPausedVideos] = useState<boolean[]>([])
  const [videoReady, setVideoReady] = useState<boolean[]>([])
  const [quotaExhausted, setQuotaExhausted] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const isDesktopRef = useRef(false)
  const [currentVideoData, setCurrentVideoData] = useState<VideoData | null>(
    null
  )
  const { isAnimating, triggerAnimation, animationKey } = useCoinAnimation()
  const [isExhaustVideoInView, setIsExhaustVideoInView] = useState(false)

  const { mutate: postReelReaction, data: postReelReactionData } =
    usePostReelReaction()
  const [completlyPlayedVideoIndex, setCompletlyPlayedVideoIndex] =
    useState<number>(-1)
  const { user } = useAppSelector(state => state.profile)
  const { mutate: sendCDPEvent } = useSendCDPEvent()
  const { mutate: sendGluedinUserReaction, data: sendGluedinUserReactionData } =
    useSendGluedinUserReaction()
  const { mutate: viewGludeinJokes, data: viewGludeinJokesData } =
    useViewGludeinJokes()
  const { mutate: activateConsumption } = useActivateConsumption()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cmsData = useCMSData(mounted)

  // Calculate viewport height and footer height for mobile
  useEffect(() => {
    const updateViewportHeight = () => {
      // Use window.innerHeight for better iOS support
      setViewportHeight(window.innerHeight)
    }

    const calculateFooterHeight = () => {
      // Try to find mobile footer first
      const mobileFooter =
        document.querySelector('[data-footer="mobile"]') ||
        document.querySelector('.bg-white.w-full.h-\\[71px\\]') ||
        document.querySelector('.fixed.bottom-0') ||
        document.querySelector('#mobile-footer')

      if (mobileFooter && mobileFooter instanceof HTMLElement) {
        setFooterHeight(mobileFooter.offsetHeight)
      } else {
        // Fallback to default mobile footer height
        setFooterHeight(71)
      }
    }

    // Calculate on mount and resize
    updateViewportHeight()
    calculateFooterHeight()

    window.addEventListener('resize', () => {
      updateViewportHeight()
      calculateFooterHeight()
    })

    // Handle iOS viewport changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        updateViewportHeight()
        calculateFooterHeight()
      }, 100)
    })

    // Use ResizeObserver for more accurate detection
    const resizeObserver = new ResizeObserver(() => {
      updateViewportHeight()
      calculateFooterHeight()
    })

    const footer =
      document.querySelector('[data-footer="mobile"]') ||
      document.querySelector('.bg-white.w-full.h-\\[71px\\]') ||
      document.querySelector('.fixed.bottom-0') ||
      document.querySelector('#mobile-footer')

    if (footer) {
      resizeObserver.observe(footer)
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight)
      window.removeEventListener('orientationchange', updateViewportHeight)
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const checkDesktop = () => {
      isDesktopRef.current = window.innerWidth >= 768
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => {
      window.removeEventListener('resize', checkDesktop)
    }
  }, [])

  // Hide loader once API data fetched and videos are processed
  useEffect(() => {
    if (!jokesLoading && videos && videos.length > 0) {
      // Allow loader to disappear after small delay so first video can load
      const timeout = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [jokesLoading, videos])

  // Auto-play first video when component mounts and loading is complete
  useEffect(() => {
    if (!isLoading && videoRefs.current[0] && videos.length > 0) {
      const firstVideo = videoRefs.current[0]

      // Ensure activeVideoIndex is set to 0 first
      setActiveVideoIndex(0)

      // Then set video play states
      setVideoPlayStates(prev => {
        const newStates = [...prev]
        newStates[0] = true
        return newStates
      })

      // Finally start playing the video
      firstVideo.currentTime = 0
      firstVideo.play().catch(console.error)
    }
  }, [isLoading, videos.length])

  // Initialize play/pause arrays when videos are loaded
  useEffect(() => {
    if (videos?.length) {
      setVideoPlayStates(prev => {
        if (prev.length === videos.length) return prev // already init
        const arr = new Array(videos.length).fill(false)
        arr[0] = true
        return arr
      })
      setUserPausedVideos(prev => {
        if (prev.length === videos.length) return prev
        return new Array(videos.length).fill(false)
      })
      setVideoReady(prev => {
        if (prev.length === videos.length) return prev
        return new Array(videos.length).fill(false)
      })
    }
  }, [videos.length])

  const scrollToVideo = (direction: 'up' | 'down') => {
    if (!containerRef.current) return

    const container = containerRef.current
    const videoElements = Array.from(
      container.querySelectorAll('.video-container')
    )

    // Calculate the new target index (videos.length is the end page index)
    const newIndex =
      direction === 'up'
        ? Math.max(0, activeVideoIndex - 1)
        : Math.min(videos.length, activeVideoIndex + 1)

    // Get the target element
    const targetElement = videoElements[newIndex]
    if (!targetElement) return

    // Scroll to the target element
    targetElement.scrollIntoView({ behavior: 'smooth' })

    // Update the active video index
    setActiveVideoIndex(newIndex)
  }

  // Video event handlers
  const handleVideoInView = useCallback((index: number) => {
    setActiveVideoIndex(index)

    // Pause all other videos
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== index) {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [])

  const handleVideoOutOfView = useCallback((index: number) => {
    // Pause video when it goes out of view
    const video = videoRefs.current[index]
    if (video) {
      video.pause()
      video.currentTime = 0
    }

    // Reset play states
    setVideoPlayStates(prev => {
      const newStates = [...prev]
      newStates[index] = false
      return newStates
    })

    // Reset user pause state
    setUserPausedVideos(prev => {
      const newStates = [...prev]
      newStates[index] = false
      return newStates
    })
  }, [])

  // Handle video ref callback
  const handleVideoRef = useCallback(
    (index: number, element: HTMLVideoElement | null) => {
      if (element) {
        videoRefs.current[index] = element
      }
    },
    []
  )

  // Handle video load to hide loading spinner
  const handleVideoLoad = (index: number) => {
    // Hide loading when first video is loaded
    if (index === 0) {
      setIsLoading(false)
    }
  }

  // Handle video ready to play
  const handleVideoCanPlay = (index: number) => {
    if (index === 0) {
      setIsLoading(false)
    }
    setVideoReady(prev => {
      const newArr = [...prev]
      newArr[index] = true
      return newArr
    })
  }

  const triggerCDPEvent = useCallback(
    (reactionType: string, jokeId: string) => {
      if (reactionType && jokeId && user?.id) {
        const payload: ReactionCDPEventPayload =
          CDPEventPayloadBuilder.buildReactionPayload(
            jokeId,
            reactionType,
            user?.id
          )
        sendCDPEvent(payload)
      }
    },
    [sendCDPEvent, user?.id]
  )

  const triger_CDP_View_Scroll_LOL = (jokeId: string) => {
    if (jokeId && user?.id) {
      const payload: ReactionCDPEventPayload =
        CDPEventPayloadBuilder.buildViewJokePayload(jokeId, user?.id)
      sendCDPEvent(payload)
    }
  }

  // Handle video error
  const handleVideoError = (index: number) => {
    // Still mark as "loaded" to prevent infinite loading
    if (index === 0) {
      setIsLoading(false)
    }
    setVideoReady(prev => {
      const newArr = [...prev]
      newArr[index] = true
      return newArr
    })
  }

  // Handler for when an emoji is selected
  const handleEmojiSelect = (reaction: SelectedReactionData) => {
    // Prevent reactions while still loading or if no active video
    if (
      isLoading ||
      activeVideoIndex === undefined ||
      activeVideoIndex === null ||
      !videos[activeVideoIndex]
    ) {
      console.warn('Reaction blocked: Component not fully initialized', {
        isLoading,
        activeVideoIndex,
        videosCount: videos.length,
        hasActiveVideo: !!videos[activeVideoIndex]
      })
      return
    }

    console.log('👆 User reacted:', {
      reaction: reaction.name,
      videoIndex: activeVideoIndex,
      videoId: videos[activeVideoIndex]?.id
    })

    const payload = {
      assetId: videos[activeVideoIndex]?.id ?? '',
      reactionType: reaction.name
    }
    sendGluedinUserReaction(payload)
  }

  useEffect(() => {
    if (sendGluedinUserReactionData?.ok && activeVideoIndex !== -1) {
      const currentVideoId = videos[activeVideoIndex]?.id
      const reactionType = sendGluedinUserReactionData?.data?.reactionType
      triggerCDPEvent(reactionType, currentVideoId)
      postReelReaction({
        assetId: currentVideoId,
        reaction: reactionType
      })
      setVideos((prev: VideoData[]) => {
        const newArr = [...prev]
        const currentVideoIndexData = newArr.findIndex(
          (video: VideoData) => video.id === currentVideoId
        )
        if (currentVideoIndexData !== -1) {
          newArr[currentVideoIndexData] = {
            ...newArr[currentVideoIndexData],
            isReacted: true,
            reactionType: reactionType,
            user_reaction: {
              ...newArr[currentVideoIndexData]?.user_reaction,
              [reactionType]:
                (newArr[currentVideoIndexData]?.user_reaction?.[
                  reactionType as keyof IUserReaction
                ] ?? 0) + 1
            }
          }
          setCurrentVideoData(newArr[currentVideoIndexData])
          return newArr
        }
        return newArr
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendGluedinUserReactionData])

  const togglePlay = (index: number) => {
    if (index === activeVideoIndex) {
      const video = videoRefs.current[index]
      if (!video) return

      // Get current actual video state
      const isCurrentlyPlaying = !video.paused
      const newPlayState = !isCurrentlyPlaying

      // Update states immediately
      setVideoPlayStates(prev => {
        const newStates = [...prev]
        newStates[index] = newPlayState
        return newStates
      })

      // Track user-initiated pause/play
      setUserPausedVideos(prev => {
        const newUserPausedStates = [...prev]
        newUserPausedStates[index] = !newPlayState // If not playing, then user paused
        return newUserPausedStates
      })

      // Apply video state change
      if (newPlayState) {
        video.play().catch(console.error)
      } else {
        video.pause()
      }
    }
  }

  useEffect(() => {
    if (postReelReactionData?.ok) {
      console.log('🎬 Triggering coin animation for reaction:', {
        activeVideoIndex,
        isLoading,
        videosCount: videos.length,
        hasCurrentVideoData: !!currentVideoData
      })

      // Small delay to ensure DOM is stable before triggering animation
      setTimeout(() => {
        triggerAnimation()
      }, 100)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postReelReactionData])

  const toggleMute = (index: number) => {
    if (index === activeVideoIndex) {
      if (videoRefs.current[index]) {
        videoRefs.current[index]!.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }
  }

  // Handle video play/pause events
  const handleVideoPlay = (index: number) => {
    setVideoPlayStates(prev => {
      const newStates = [...prev]
      newStates[index] = true
      return newStates
    })
  }

  const handleVideoPause = (index: number) => {
    setVideoPlayStates(prev => {
      const newStates = [...prev]
      newStates[index] = false
      return newStates
    })
  }

  const handleVideoEnded = (index: number) => {
    console.log('✅ Video ended:', index)
    setCompletlyPlayedVideoIndex(index)
  }

  // Serial Chiller End of Feed Page Component
  const SerialChillerEndPage: React.FC = () => {
    return (
      <div
        className='w-full flex flex-col justify-center items-center bg-white text-black text-center px-6'
        style={{
          height:
            typeof window !== 'undefined' && window.innerWidth >= 768
              ? '100vh'
              : mobilePageHeight
        }}
      >
        <div className='w-[279px] flex flex-col items-center'>
          {/* Breaking News Header */}
          <h1 className='font-bold text-black md:text-[25px] text-[20px] mb-[15px] text-center'>
            {cmsData?.scrollAndLol?.breakingNews}
          </h1>

          {/* Main Message */}
          <h2 className='font-bold text-black md:text-[15px] text-[13px] leading-relaxed mb-6'>
            {cmsData?.scrollAndLol?.serialChiller}
          </h2>

          {/* Subtitle */}
          <p className='font-normal text-black md:text-[14px] text-[13px] leading-relaxed'>
            {cmsData?.scrollAndLol?.scrollAndLolLastPageContent}
          </p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (
      completlyPlayedVideoIndex < videos.length &&
      completlyPlayedVideoIndex !== -1
    ) {
      const getCurrentVideoId = videos[completlyPlayedVideoIndex]?.id ?? ''
      console.log('getCurrentVideoId', getCurrentVideoId)
      viewGludeinJokes({
        assetIds: [getCurrentVideoId]
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completlyPlayedVideoIndex])

  useEffect(() => {
    if (viewGludeinJokesData?.ok && completlyPlayedVideoIndex !== -1) {
      console.log('viewGludeinJokesData', viewGludeinJokesData)
      const currentVideoId = videos[completlyPlayedVideoIndex]?.id
      triger_CDP_View_Scroll_LOL(currentVideoId)
      setVideos((prev: VideoData[]) => {
        const newArr = [...prev]
        const currentVideoIndexData = newArr.findIndex(
          (video: VideoData) => video.id === currentVideoId
        )
        if (currentVideoIndexData !== -1) {
          newArr[currentVideoIndexData] = {
            ...newArr[currentVideoIndexData],
            view_count: newArr[currentVideoIndexData]?.view_count + 1
          }
          return newArr
        }
        return newArr
      })
      setCompletlyPlayedVideoIndex(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewGludeinJokesData])

  useEffect(() => {
    if (videos.length > 0) {
      const currentVideoId = videos[activeVideoIndex]?.id ?? ''
      const currentVideoData = videos.find(
        (video: VideoData) => video.id === currentVideoId
      )
      if (currentVideoData) {
        setCurrentVideoData(currentVideoData)
        activateConsumption({ joke_id: currentVideoId })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVideoIndex, videos])

  // Ensure currentVideoData is set for the first video immediately when videos load
  useEffect(() => {
    if (videos.length > 0 && !currentVideoData && activeVideoIndex === 0) {
      const firstVideoData = videos[0]
      if (firstVideoData) {
        setCurrentVideoData(firstVideoData)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos.length, currentVideoData])

  // Handler for language selection from ExhaustVideo
  const handleLanguageSelect = (langCode: string) => {
    // Update only the local video language state, not the global website language
    setVideoLanguage(langCode)
  }

  // Calculate mobile page height accounting for footer
  const mobilePageHeight =
    viewportHeight > 0 ? `${viewportHeight - footerHeight}px` : '100vh'

  return (
    <div className="md:w-full md:h-screen md:pt-[100px] pt-0 flex flex-col justify-center items-center bg-[url('/assets/images/scroll-and-lol-bg.png')] bg-cover bg-center bg-fixed overflow-hidden">
      {isLoading ? (
        <></>
      ) : (
        <div className='w-full container md:block hidden'>
          <Header
            title={cmsData?.scrollAndLol?.scrollAndLolHeading}
            textTransform='capitalize'
          />
        </div>
      )}

      <div
        className='relative md:w-fit md:h-full w-full'
        style={{
          height:
            typeof window !== 'undefined' && window.innerWidth >= 768
              ? '100vh'
              : mobilePageHeight
        }}
      >
        {isLoading ? (
          <LoadingSpinner mobileHeight={mobilePageHeight} />
        ) : (
          <>
            <div
              key={languageChangeKey}
              ref={containerRef}
              className='relative md:max-h-[calc(100vh-200px)] w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide md:gap-[30px]'
              style={{
                scrollSnapType: 'y mandatory',
                scrollBehavior: 'smooth',
                height:
                  typeof window !== 'undefined' && window.innerWidth >= 768
                    ? '100vh'
                    : mobilePageHeight
              }}
            >
              {videos.map((video, index) => (
                <VideoItem
                  key={video.id}
                  video={video}
                  index={index}
                  isActive={activeVideoIndex === index}
                  isMuted={isMuted}
                  mobilePageHeight={mobilePageHeight}
                  onVideoInView={handleVideoInView}
                  onVideoOutOfView={handleVideoOutOfView}
                  onVideoLoad={handleVideoLoad}
                  onVideoCanPlay={handleVideoCanPlay}
                  onVideoError={handleVideoError}
                  onVideoEnded={handleVideoEnded}
                  onVideoPlay={handleVideoPlay}
                  onVideoPause={handleVideoPause}
                  onTogglePlay={togglePlay}
                  onToggleMute={toggleMute}
                  onVideoRef={handleVideoRef}
                  isPlaying={videoPlayStates[index]}
                  isReady={videoReady[index]}
                  isUserPaused={userPausedVideos[index]}
                />
              ))}

              {/* Serial Chiller End Page as part of scroll sequence */}
              <div
                className='video-container relative md:max-h-[calc(100vh-200px)] w-full flex-shrink-0 md:mb-[100px] last:md:mb-0 md:flex md:items-center md:justify-center'
                data-index={videos.length}
                style={{
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always',
                  height:
                    typeof window !== 'undefined' && window.innerWidth >= 768
                      ? 'calc(100vh - 200px)'
                      : mobilePageHeight
                }}
              >
                {showSerialChillerForError ? (
                  <SerialChillerEndPage />
                ) : !quotaExhausted ? (
                  <ExhaustVideo
                    selectedLanguage={videoLanguage}
                    onLanguageSelect={handleLanguageSelect}
                    headerText={cmsData?.scrollAndLol?.exhaustHeading}
                    subText={cmsData?.scrollAndLol?.exhaustSubheading}
                    onInView={setIsExhaustVideoInView}
                  />
                ) : (
                  <SerialChillerEndPage />
                )}
              </div>
            </div>

            {/* Reaction Emojis - only visible when fully initialized and not on end page or exhaust video */}
            {!isLoading &&
              activeVideoIndex !== undefined &&
              activeVideoIndex !== null &&
              activeVideoIndex < videos.length &&
              currentVideoData &&
              !isExhaustVideoInView && (
                <div
                  className='absolute right-[10px] md:bottom-[12vh] md:right-[clamp(-8rem,0vw,-3rem)] z-20 md:scale-[clamp(0.7,1.2vh,1.2)] origin-bottom-right md:mb-0'
                  style={{
                    bottom:
                      typeof window !== 'undefined' && window.innerWidth >= 768
                        ? '12vh'
                        : `${footerHeight - 10}px`
                  }}
                >
                  <ReactionEmojies
                    key={currentVideoData?.id}
                    videoId={currentVideoData?.id}
                    onEmojiSelect={handleEmojiSelect}
                    userReaction={currentVideoData?.user_reaction}
                    reactionType={currentVideoData?.reactionType}
                    isReacted={currentVideoData?.isReacted}
                    viewCount={currentVideoData?.view_count}
                  />
                </div>
              )}
          </>
        )}
      </div>

      {/* Scroll buttons - only visible when not loading */}
      {!isLoading && (
        <div className='hidden md:flex flex-col gap-4 absolute bottom-[97.32px] md:right-[20px] lg:right-[100px] transform z-20'>
          <button
            onClick={() => scrollToVideo('up')}
            className={`w-[64px] h-[64px] rounded-full border-2 border-green flex items-center justify-center transition-all duration-300 ${
              activeVideoIndex === 0 ? 'opacity-50' : ''
            }`}
            aria-label='Scroll up'
            disabled={activeVideoIndex === 0}
          >
            <Image
              src='/other-svgs/up-arrow.svg'
              alt='Scroll up'
              width={25}
              height={25}
              className={activeVideoIndex === 0 ? 'opacity-50' : ''}
            />
          </button>
          <button
            onClick={() => scrollToVideo('down')}
            className={`w-[64px] h-[64px] rounded-full border-2 border-green flex items-center justify-center transition-all duration-300 ${
              activeVideoIndex === videos.length ? 'opacity-50' : ''
            }`}
            aria-label='Scroll down'
            disabled={activeVideoIndex === videos.length}
          >
            <Image
              src='/other-svgs/down-arrow.svg'
              alt='Scroll down'
              width={25}
              height={25}
              className={`${
                activeVideoIndex === videos.length ? 'opacity-50' : ''
              }`}
            />
          </button>
        </div>
      )}
      <CoinAnimation isVisible={isAnimating} animationKey={animationKey} />
    </div>
  )
}

export default ScrollAndLol
