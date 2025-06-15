'use client'
import React, { useEffect, useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import Header from '@/components/common/Header/Header'
import ReactionEmojies from '@/components/ReactionEmojies'
import { ICONS_NAMES } from '@/constants' // Import ICONS_NAMES
import { useCMSData } from '@/data'
import { useSearchParams } from 'next/navigation'
import { useGetJokes } from '@/api/hooks/JokeHooks'
import { useLanguage } from '@/hooks/useLanguage'
import { IUserReaction } from '@/api/types/JokeTypes'
import {
  useSendGluedinUserReaction,
  useViewGludeinJokes
} from '@/api/hooks/GluedinHooks'

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
const LoadingSpinner: React.FC = () => {
  return (
    <div className='relative md:w-fit md:h-full w-full h-screen flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <div className='w-16 h-16 border-[8px] border-[#08C270] border-t-[#009639] rounded-full animate-spin mb-4'></div>
        <p className='text-green text-xl font-bold'>Loading...</p>
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

const ScrollAndLol: React.FC = () => {
  // Get selected joke id from query params
  const searchParams = useSearchParams()
  const selectedJokesParam = searchParams.get('selected_joke') || undefined

  // Language for API
  const { selectedLanguage } = useLanguage()

  // Fetch jokes – ensure we always get 15 items (API default/limit)
  const { data: jokesResponse, isLoading: jokesLoading } = useGetJokes({
    limit: 15,
    selected_joke: selectedJokesParam,
    language: selectedLanguage
  })

  const [videos, setVideos] = useState<VideoData[]>([])

  useEffect(() => {
    if (jokesResponse?.ok) {
      const jokesArr = jokesResponse.data as any[]
      console.log(jokesArr, 'jokesArr')
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
    }
  }, [jokesResponse])

  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0)
  const [videoPlayStates, setVideoPlayStates] = useState<boolean[]>([])
  const [userPausedVideos, setUserPausedVideos] = useState<boolean[]>([])
  const [videoReady, setVideoReady] = useState<boolean[]>([])
  const [isMuted, setIsMuted] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const isDesktopRef = useRef(false)
  const { mutate: sendGluedinUserReaction, data: sendGluedinUserReactionData } =
    useSendGluedinUserReaction()
  const { mutate: viewGludeinJokes, data: viewGludeinJokesData } =
    useViewGludeinJokes()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const cmsData = useCMSData(mounted)

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

  // Hide loader once API data fetched
  useEffect(() => {
    if (!jokesLoading) {
      // Allow loader to disappear after small delay so first video can load
      const timeout = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [jokesLoading])

  // Auto-play first video when component mounts and loading is complete
  useEffect(() => {
    if (!isLoading && videoRefs.current[0]) {
      const firstVideo = videoRefs.current[0]
      firstVideo.currentTime = 0
      firstVideo.play().catch(console.error)

      setVideoPlayStates(prev => {
        const newStates = [...prev]
        newStates[0] = true
        return newStates
      })
      setActiveVideoIndex(0)
    }
  }, [isLoading])

  // Initialize play/pause arrays when videos are loaded
  useEffect(() => {
    if (videos.length) {
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

  useEffect(() => {
    const options = {
      root: containerRef.current,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const videoIndex = parseInt(
          entry.target.getAttribute('data-index') || '0'
        )

        if (entry.isIntersecting) {
          // Update active video index
          setActiveVideoIndex(videoIndex)

          // If this is the end page (index === videos.length), just pause all videos
          if (videoIndex === videos.length) {
            videoRefs.current.forEach(video => {
              if (video) {
                video.pause()
              }
            })
            return
          }

          // Pause all other videos (except current) and keep their time reset
          videoRefs.current.forEach((video, idx) => {
            if (video && idx !== videoIndex) {
              video.pause()
            }
          })

          // Auto-play the current video only if user hasn't paused it
          const currentVideo = videoRefs.current[videoIndex]
          if (currentVideo) {
            // Check if user has manually paused this video
            setUserPausedVideos(prevUserPaused => {
              const userHasPaused = prevUserPaused[videoIndex]

              if (!userHasPaused && currentVideo.paused) {
                currentVideo.play().catch(console.error)
              }

              // Update play state based on whether video should be playing
              setVideoPlayStates(prev => {
                const newStates = [...prev]
                newStates[videoIndex] = !userHasPaused
                return newStates
              })

              return prevUserPaused // Don't change user pause state
            })
          }
        } else {
          // Skip processing for end page when it goes out of view
          if (videoIndex === videos.length) {
            return
          }

          // Pause video when it goes out of view and reset play state
          const video = videoRefs.current[videoIndex]
          if (video) {
            video.pause()
            video.currentTime = 0 // Reset to beginning so next time it starts from start

            // Update play state to reflect that video is paused
            setVideoPlayStates(prev => {
              const newStates = [...prev]
              newStates[videoIndex] = false
              return newStates
            })

            // Reset user pause state when video goes out of view
            setUserPausedVideos(prev => {
              const newStates = [...prev]
              newStates[videoIndex] = false
              return newStates
            })
          }
        }
      })
    }, options)

    // Observe all video containers
    videoRefs.current.forEach(videoRef => {
      if (videoRef) {
        // Find the video-container element with data-index
        const videoContainer = videoRef.closest('.video-container')
        if (videoContainer) {
          observer.observe(videoContainer)
        }
      }
    })

    // Also observe the end page container
    if (containerRef.current) {
      const endPageContainer = containerRef.current.querySelector(
        `.video-container[data-index="${videos.length}"]`
      )
      if (endPageContainer) {
        observer.observe(endPageContainer)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [videoPlayStates, userPausedVideos, videos.length])

  // Handle video load to hide loading spinner
  const handleVideoLoad = (index: number) => {
    console.log(`Video ${index} loaded`)
    // Hide loading when first video is loaded
    if (index === 0) {
      console.log('First video loaded, hiding loader')
      setIsLoading(false)
    }
  }

  // Handle video ready to play
  const handleVideoCanPlay = (index: number) => {
    console.log(`Video ${index} can play`)
    if (index === 0) {
      setIsLoading(false)
    }
    setVideoReady(prev => {
      const newArr = [...prev]
      newArr[index] = true
      return newArr
    })
  }

  // Handle video error
  const handleVideoError = (index: number) => {
    console.error(`Error loading video ${index}`)
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
    const payload = {
      assetId: videos[activeVideoIndex]?.id ?? '',
      reactionType: reaction.name
    }
    sendGluedinUserReaction(payload)
  }

  useEffect(() => {
    if (sendGluedinUserReactionData?.ok) {
      const currentVideoId = videos[activeVideoIndex]?.id
      const reactionType = sendGluedinUserReactionData?.data?.reactionType

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
          return newArr
        }
        return newArr
      })
    }
  }, [sendGluedinUserReactionData])

  const togglePlay = (index: number) => {
    if (index === activeVideoIndex) {
      const newPlayStates = [...videoPlayStates]
      newPlayStates[index] = !newPlayStates[index]
      setVideoPlayStates(newPlayStates)

      // Track user-initiated pause/play
      const newUserPausedStates = [...userPausedVideos]
      newUserPausedStates[index] = !newPlayStates[index] // If not playing, then user paused
      setUserPausedVideos(newUserPausedStates)

      const video = videoRefs.current[index]
      if (video) {
        if (newPlayStates[index]) {
          video.play().catch(console.error)
        } else {
          video.pause()
        }
      }
    }
  }

  const toggleMute = (index: number) => {
    if (index === activeVideoIndex) {
      if (videoRefs.current[index]) {
        videoRefs.current[index]!.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }
  }

  // Serial Chiller End of Feed Page Component
  const SerialChillerEndPage: React.FC = () => {
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center bg-white text-black text-center px-6'>
        <div className='w-[279px] flex flex-col items-center'>
          {/* Breaking News Header */}
          <h1 className='font-bold text-black md:text-[25px] text-[20px] mb-[15px] max-w-[200px] text-center'>
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
    if (activeVideoIndex < videos.length) {
      const getCurrentVideoId = videos[activeVideoIndex]?.id ?? ''
      viewGludeinJokes({
        assetIds: [getCurrentVideoId]
      })
    }
  }, [activeVideoIndex])

  useEffect(() => {
    if (viewGludeinJokesData?.ok) {
      const currentVideoId = videos[activeVideoIndex]?.id
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
    }
  }, [viewGludeinJokesData])

  return (
    <div className="md:w-full md:h-screen md:pt-[100px] pt-0 flex flex-col justify-center items-center bg-[url('/assets/images/scroll-and-lol-bg.png')] bg-cover bg-center bg-fixed overflow-hidden">
      {isLoading ? (
        <></>
      ) : (
        <div className='w-full container md:block hidden'>
          <Header title={cmsData?.scrollAndLol?.scrollAndLolHeading} />
        </div>
      )}

      <div className='relative md:w-fit md:h-full w-full h-screen'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div
              ref={containerRef}
              className='relative md:max-h-[calc(100vh-200px)] w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth scrollbar-hide md:gap-[30px]'
              style={{
                scrollSnapType: 'y mandatory',
                scrollBehavior: 'smooth'
              }}
            >
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className='video-container relative md:max-h-[calc(100vh-200px)] h-screen w-full flex-shrink-0 md:mb-[100px] last:md:mb-0 md:flex md:items-center md:justify-center'
                  data-index={index}
                  style={{
                    scrollSnapAlign: 'start',
                    scrollSnapStop: 'always'
                  }}
                >
                  <div className='relative md:w-auto md:h-auto w-full h-full'>
                    {/* Thumbnail & spinner overlay */}
                    {!videoReady[index] && (
                      <>
                        {video.thumbnail && (
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className='md:w-auto md:max-h-[calc(100vh-200px)] md:max-w-[442px] h-full w-full md:object-contain object-cover'
                            sizes='(max-width: 768px) 100vw, 442px'
                            style={{ aspectRatio: '9/16' }}
                          />
                        )}
                        <SpinnerOverlay />
                      </>
                    )}
                    <video
                      ref={el => {
                        videoRefs.current[index] = el
                      }}
                      className='md:w-auto md:max-h-[calc(100vh-200px)] md:max-w-[442px] h-full w-full md:object-contain object-cover relative'
                      src={video.url}
                      loop
                      playsInline
                      muted={isMuted}
                      autoPlay
                      onLoadedData={() => handleVideoLoad(index)}
                      onCanPlay={() => handleVideoCanPlay(index)}
                      onLoadStart={() => {
                        console.log(`Video ${index} started loading`)
                        if (index === 0) {
                          // Give a small delay then hide loading as fallback
                          setTimeout(() => setIsLoading(false), 2000)
                        }
                      }}
                      onError={() => handleVideoError(index)}
                      style={{
                        aspectRatio: '9/16'
                      }}
                    />
                    {/* Top controls */}
                    <div className='absolute top-4 w-full flex justify-between px-4 z-50'>
                      <button
                        onClick={() => togglePlay(index)}
                        className='w-[40px] h-[40px] rounded-full bg-[#12121240] flex items-center justify-center'
                      >
                        <Image
                          src={
                            videoPlayStates[index] && index === activeVideoIndex
                              ? '/other-svgs/pause-icon.svg'
                              : '/other-svgs/play-icon.svg'
                          }
                          alt={
                            videoPlayStates[index] && index === activeVideoIndex
                              ? 'Pause'
                              : 'Play'
                          }
                          width={
                            videoPlayStates[index] && index === activeVideoIndex
                              ? 12
                              : 20
                          }
                          height={
                            videoPlayStates[index] && index === activeVideoIndex
                              ? 12
                              : 20
                          }
                        />
                      </button>
                      <button
                        onClick={() => toggleMute(index)}
                        className='w-[40px] h-[40px] rounded-full bg-[#12121240] flex items-center justify-center'
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
              ))}

              {/* Serial Chiller End Page as part of scroll sequence */}
              <div
                className='video-container relative md:max-h-[calc(100vh-200px)] h-screen w-full flex-shrink-0 md:mb-[100px] last:md:mb-0 md:flex md:items-center md:justify-center'
                data-index={videos.length}
                style={{
                  scrollSnapAlign: 'start',
                  scrollSnapStop: 'always'
                }}
              >
                <SerialChillerEndPage />
              </div>
            </div>

            {/* Reaction Emojis - only visible when not loading and not on end page */}
            {activeVideoIndex < videos.length && (
              <div className='absolute md:bottom-[88.82px] bottom-[135px] md:right-[-5rem] right-[10px] z-20'>
                <ReactionEmojies
                  onEmojiSelect={handleEmojiSelect}
                  userReaction={videos[activeVideoIndex]?.user_reaction}
                  reactionType={videos[activeVideoIndex]?.reactionType}
                  isReacted={videos[activeVideoIndex]?.isReacted}
                  viewCount={videos[activeVideoIndex]?.view_count}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Scroll buttons - only visible when not loading */}
      {!isLoading && (
        <div className='hidden md:flex flex-col gap-4 absolute bottom-[97.32px] right-[100px] transform z-20'>
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
    </div>
  )
}

export default ScrollAndLol
