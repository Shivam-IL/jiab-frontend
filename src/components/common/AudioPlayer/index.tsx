import React, { useEffect, useMemo, useRef, useState } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'

interface AudioPlayerProps {
  src: Blob // Accept only string (URL)
  fileName: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, fileName }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Create object URL only once per file
  const objectUrl = useMemo(() => URL.createObjectURL(src), [src])

  // Clean up the object URL when component unmounts or src changes
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [objectUrl])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      if (isNaN(audioRef.current.duration) || audioRef.current.duration === Infinity) {
        const fixDuration = () => {
          setDuration(audioRef.current!.duration)
          audioRef.current!.currentTime = 0
          audioRef.current!.removeEventListener('seeked', fixDuration)
        }
        audioRef.current.addEventListener('seeked', fixDuration)
        audioRef.current.currentTime = 1e10
      } else {
        setDuration(audioRef.current.duration)
      }
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = value
      setCurrentTime(value)
    }
  }

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60)
    const sec = Math.floor(time % 60)
    return `${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  console.log(src)
  return (
    <div className='rounded-2xl bg-white/20 backdrop-blur-md p-4 w-[80%] max-w-lg shadow-md flex flex-col gap-2'>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={objectUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          setIsPlaying(false)
          setCurrentTime(duration)
        }}
      />
      <div className='flex items-start gap-3'>
        <button
          onClick={togglePlay}
        >
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
        <div className='flex flex-col gap-2 w-full'>
          <input
            type='range'
            min={0}
            max={duration}
            value={Math.min(currentTime, duration)}
            onChange={handleSeek}
            step={0.001}
            className='flex-1 accent-white/80 h-1 bg-white/60 rounded-lg'
          />
          <div className='flex justify-between gap-2'>
            <span className='text-[10px] font-[400] text-white w-10 text-right'>
              {formatTime(currentTime)}
            </span>
            <span className='text-[10px] font-[400] text-white w-10 text-left'>
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
      <div className='flex items-start gap-2 mt-1'>
        <SvgIcons name={ICONS_NAMES.MUSIC} className='min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px]' />
        <span className='text-white font-[400] text-[12px]'>
          File Name: {fileName}
        </span>
      </div>
    </div>
  )
}

export default AudioPlayer
