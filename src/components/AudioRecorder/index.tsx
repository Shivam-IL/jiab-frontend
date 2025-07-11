import { IJokeData } from '@/types'
import React, { useState, useRef, useEffect } from 'react'

function formatTime (seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

const AudioRecorder: React.FC<{
  jokeData: IJokeData
  setJokeData: React.Dispatch<React.SetStateAction<IJokeData>>
  handleChange: (
    key: string,
    value: string | boolean | FileList | null | number
  ) => void
}> = ({ jokeData, setJokeData, handleChange }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  console.log('jokeData', jokeData, handleChange)
  // Preserve playback state if jokeData.file exists
  useEffect(() => {
    if (jokeData.file && jokeData.file.length > 0) {
      const file = jokeData.file[0]
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
      setIsRecording(false)
    }
  }, [jokeData.file])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const updateTime = () => setCurrentTime(audio.currentTime)
    const setAudioDuration = () => {
      if (isNaN(audio.duration) || audio.duration === Infinity) {
        // Force duration calculation for blobs
        const fixDuration = () => {
          setDuration(audio.duration)
          audio.currentTime = 0
          audio.removeEventListener('seeked', fixDuration)
        }
        audio.addEventListener('seeked', fixDuration)
        audio.currentTime = 1e10
      } else {
        setDuration(audio.duration)
      }
    }
    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', setAudioDuration)
    audio.addEventListener('ended', () => setIsPlaying(false))
    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', setAudioDuration)
      audio.removeEventListener('ended', () => setIsPlaying(false))
    }
  }, [audioUrl])

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const audioConstraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1
        }
      }
      navigator.mediaDevices
        .getUserMedia(audioConstraints)
        .then(setUpStream)
        .catch(() => {
          alert('Audio recording is not supported or permission denied.')
        })
    } else {
      alert('Audio recording is not supported in this browser')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const setUpStream = (stream: MediaStream) => {
    chunksRef.current = []
    const mimeType = MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : MediaRecorder.isTypeSupported('audio/mp4')
      ? 'audio/mp4'
      : 'audio/wav'
    const mediaRecorder = new MediaRecorder(stream, { mimeType })
    mediaRecorderRef.current = mediaRecorder
    mediaRecorder.ondataavailable = event => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunksRef.current, { type: mimeType })
      const url = URL.createObjectURL(audioBlob)
      setAudioUrl(url)
      setCurrentTime(0)
      setDuration(0)
      const audioFile = new File(
        [audioBlob],
        `audio-recording-${Date.now()}.${mimeType.split('/')[1]}`,
        {
          type: mimeType,
          lastModified: Date.now()
        }
      )
      const fileList = new DataTransfer()
      fileList.items.add(audioFile)
      setJokeData({ ...jokeData, file: fileList.files })
      chunksRef.current = []
      mediaRecorder.stream.getTracks().forEach(track => track.stop())
    }
    try {
      mediaRecorder.start(1000)
      setIsRecording(true)
    } catch {
      alert('Failed to start recording. Please try again.')
    }
  }

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const seekTime = Number(e.target.value)
    audio.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  const handleRecordAgain = () => {
    setAudioUrl('')
    setCurrentTime(0)
    setDuration(0)
    setIsPlaying(false)
    setJokeData({ ...jokeData, file: null })
  }

  const isStartState = !isRecording && !audioUrl
  const isRecordingState = isRecording
  const isPlaybackState = !isRecording && audioUrl

  return (
    <div className='w-full md:mt-[24px] mt-[8px] relative min-h-[180px] md:min-h-[200px] flex flex-col justify-center items-center bg-[#9BD4B1] border-[2px] border-[#11A64B] rounded-[16px]'>
      {/* Start State & Recording State */}
      {(isStartState || isRecordingState) && (
        <>
          <div className='w-full flex flex-col items-center justify-center'>
            <div className='mb-2 text-center text-[16px] text-[#333] font-normal'>
              Tap on the mic to start recording
            </div>
            <button
              className={`flex bg-none items-center justify-center rounded-full  w-[100px] h-[100px] transition-all duration-200 ${
                isRecordingState ? 'animate-pulse' : ''
              }`}
              onClick={handleToggleRecording}
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
              type='button'
            >
              {isRecording ? (
                <svg
                  width="81"
                  height="80"
                  viewBox="0 0 81 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer green ring */}
                  <circle
                    cx="40.5"
                    cy="40"
                    r="38.5"
                    stroke="#009233"
                    strokeWidth="3"
                    fill="none"
                  />
                  {/* Pulse ring (animated) */}
                  <circle
                    cx="40.5"
                    cy="40"
                    r="34"
                    stroke="#009233"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.4"
                    className="animate-pulse-ring"
                  />
                  {/* Microphone body */}
                  <rect
                    x="33"
                    y="25"
                    width="15"
                    height="25"
                    rx="7.5"
                    fill="#009233"
                  />
                  {/* Microphone base */}
                  <rect
                    x="37"
                    y="50"
                    width="7"
                    height="8"
                    rx="3.5"
                    fill="#009233"
                  />
                  {/* Microphone stand */}
                  <rect
                    x="34"
                    y="58"
                    width="13"
                    height="3"
                    rx="1.5"
                    fill="#009233"
                  />
                </svg>
              ) : (
                <svg
                  width='81'
                  height='81'
                  viewBox='0 0 81 81'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect
                    x='1.44378'
                    y='1.27679'
                    width='78.4464'
                    height='78.4464'
                    rx='39.2232'
                    stroke='#009233'
                    stroke-width='1.55357'
                  />
                  <path
                    d='M40.667 45.017C44.4548 45.017 47.5245 41.9836 47.5245 38.2403V29.2045C47.5245 25.4612 44.4548 22.4277 40.667 22.4277C36.8793 22.4277 33.8096 25.4612 33.8096 29.2045V38.2403C33.8096 41.9836 36.8793 45.017 40.667 45.017ZM53.9786 38.1596C53.9786 37.9821 53.8334 37.8369 53.6559 37.8369H51.2356C51.0581 37.8369 50.9129 37.9821 50.9129 38.1596C50.9129 43.819 46.3265 48.4054 40.667 48.4054C35.0076 48.4054 30.4212 43.819 30.4212 38.1596C30.4212 37.9821 30.2759 37.8369 30.0985 37.8369H27.6782C27.5007 37.8369 27.3555 37.9821 27.3555 38.1596C27.3555 44.9646 32.4623 50.5797 39.0535 51.3743V55.5049H33.1924C32.6398 55.5049 32.196 56.0818 32.196 56.7958V58.2479C32.196 58.4254 32.309 58.5706 32.4461 58.5706H48.8879C49.0251 58.5706 49.138 58.4254 49.138 58.2479V56.7958C49.138 56.0818 48.6943 55.5049 48.1417 55.5049H42.1192V51.3945C48.7871 50.6684 53.9786 45.0211 53.9786 38.1596Z'
                    fill='#009233'
                  />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
      {/* Playback State */}
      {isPlaybackState && (
        <div className='w-full flex flex-col items-center justify-center px-4 py-8'>
          <audio
            ref={audioRef}
            src={audioUrl}
            preload='metadata'
            style={{ display: 'none' }}
          />
          <div className='w-full flex items-center gap-4 mb-8'>
            <button
              className='flex items-center justify-center focus:outline-none'
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              type='button'
            >
              {isPlaying ? (
                <svg width='48' height='48' viewBox='0 0 60 60' fill='none'>
                  <circle
                    cx='30'
                    cy='30'
                    r='28'
                    stroke='#5B6B5B'
                    strokeWidth='4'
                  />
                  <rect
                    x='19'
                    y='17'
                    width='8'
                    height='26'
                    rx='2'
                    fill='#5B6B5B'
                  />
                  <rect
                    x='33'
                    y='17'
                    width='8'
                    height='26'
                    rx='2'
                    fill='#5B6B5B'
                  />
                </svg>
              ) : (
                <svg width='48' height='48' viewBox='0 0 60 60' fill='none'>
                  <circle
                    cx='30'
                    cy='30'
                    r='28'
                    stroke='#5B6B5B'
                    strokeWidth='4'
                  />
                  <polygon points='24,18 44,30 24,42' fill='#5B6B5B' />
                </svg>
              )}
            </button>
            <input
              type='range'
              min={0}
              max={duration || 0}
              step={0.01}
              value={currentTime}
              onChange={handleSeek}
              className='flex-1 accent-[#5B6B5B] h-2 rounded-lg bg-[#fff]'
              style={{
                background:
                  'linear-gradient(to right, #5B6B5B 0%, #5B6B5B ' +
                  (duration ? (currentTime / duration) * 100 : 0) +
                  '%, #fff ' +
                  (duration ? (currentTime / duration) * 100 : 0) +
                  '%, #fff 100%)'
              }}
            />
            <span className='text-[#5B6B5B] text-lg min-w-[48px] text-right font-mono'>
              {formatTime(currentTime)}
            </span>
            <span className='text-[#5B6B5B] text-lg min-w-[48px] text-left font-mono'>
              {duration ? formatTime(duration) : '0:00'}
            </span>
          </div>
          <button
            className='px-8 py-2 border border-[#11A64B] rounded-full text-[#11A64B] font-semibold hover:bg-[#11A64B] hover:text-white transition-colors duration-200 text-lg'
            onClick={handleRecordAgain}
            type='button'
          >
            Record Again
          </button>
        </div>
      )}
    </div>
  )
}

export default AudioRecorder
