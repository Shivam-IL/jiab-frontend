import React, { useEffect, useMemo, useRef, useState } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'

interface VideoPlayerProps {
  src: Blob
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isPortrait, setIsPortrait] = useState(false)

  // Create object URL only once per file
  const objectUrl = useMemo(() => URL.createObjectURL(src), [src])

  // Clean up the object URL when component unmounts or src changes
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [objectUrl])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      const { videoWidth, videoHeight } = videoRef.current
      setIsPortrait(videoHeight > videoWidth)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = value
      setCurrentTime(value)
    }
  }

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  return (
    <div className='relative flex flex-col w-full'>
      <div
        className={`flex justify-between ${
          !isPortrait ? 'relative p-2' : 'absolute top-2 left-2'
        }`}
      >
        <button onClick={togglePlay} className='rounded-full z-[50]'>
          {isPlaying ? (
            <SvgIcons
              name={ICONS_NAMES.PREVIEW_PAUSE}
              className='min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px]'
            />
          ) : (
            <SvgIcons
              name={ICONS_NAMES.PREVIEW_PLAY}
              className='min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px]'
            />
          )}
        </button>
      </div>
      <div className='relative flex flex-col gap-2 w-full px-2 py-2'>
        <div className='relative w-full flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center w-full min-h-[150px] max-h-[200px]'>
            <video
              ref={videoRef}
              src={objectUrl}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              playsInline
              className={
                isPortrait
                  ? 'mx-auto rounded-lg max-h-[150px] w-auto'
                  : 'mx-auto rounded-lg max-w-full max-h-[200px]'
              }
              style={{ background: '#000' }}
            />
          </div>
        </div>
        <div className='flex items-center gap-2 w-full mt-2'>
          <span className='text-[10px] font-[400] text-white w-10 text-right'>
            {formatTime(currentTime)}
          </span>
          <input
            type='range'
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className='flex-1 accent-white/80  bg-white/60 rounded-lg'
          />
          <span className='text-[10px] font-[400] text-white w-10 text-left'>
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
