import React, { useState, useEffect } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { aktivGrotesk } from '@/app/layout'
import { updateEnableCoachMarks } from '@/store/auth/auth.slice'
import useAppDispatch from '@/hooks/useDispatch'
import { BoxIds } from '../CircularBoxesModal'
import AktivGroteskText from '../AktivGroteskText'

// Export box IDs for reuse in other components
export const DesktopBoxIds = {
  EXPLORE: 'explore-element-desktop',
  CONTEST: 'contest-element-desktop',
  LANGUAGE: 'language-element-desktop',
  PROFILE_ELEMENT: 'profile-element-desktop',
  PICK_YOUR_MOOD: 'pick-your-mood-element',
  JOKE_BOX: 'joke-box-element'
} as const

interface Coordinates {
  x: number
  y: number
  width: number
  height: number
}

interface CoordinatesState {
  explore: Coordinates
  contest: Coordinates
  language: Coordinates
  profile: Coordinates
  pickYourMood: Coordinates
  jokeBox: Coordinates
  windowHeight: number
}

interface CircularBoxesModalProps {
  isOpen: boolean
  onClose: () => void
}

const HomePageDesktopOnboarding = ({
  isOpen,
  onClose
}: CircularBoxesModalProps) => {
  const [currentBox, setCurrentBox] = useState(0)
  const dispatch = useAppDispatch()
  const [coordinates, setCoordinates] = useState<CoordinatesState>({
    explore: { x: 0, y: 0, width: 0, height: 0 },
    contest: { x: 0, y: 0, width: 0, height: 0 },
    language: { x: 0, y: 0, width: 0, height: 0 },
    profile: { x: 0, y: 0, width: 0, height: 0 },
    pickYourMood: { x: 0, y: 0, width: 0, height: 0 },
    jokeBox: { x: 0, y: 0, width: 0, height: 0 },
    windowHeight: 0
  })

  const handleClose = () => {
    dispatch(updateEnableCoachMarks({ enableCoachMarks: false }))
    onClose()
  }

  // Add effect to disable scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    // Calculate position of all elements
    const calculatePositions = () => {
      const elements = {
        explore: document.getElementById(DesktopBoxIds.EXPLORE),
        contest: document.getElementById(DesktopBoxIds.CONTEST),
        language: document.getElementById(DesktopBoxIds.LANGUAGE),
        profile: document.getElementById(DesktopBoxIds.PROFILE_ELEMENT),
        pickYourMood: document.getElementById(BoxIds.PICK_YOUR_MOOD),
        jokeBox: document.getElementById(BoxIds.JOKE_BOX)
      }

      const newCoords: CoordinatesState = {
        explore: { x: 0, y: 0, width: 0, height: 0 },
        contest: { x: 0, y: 0, width: 0, height: 0 },
        language: { x: 0, y: 0, width: 0, height: 0 },
        profile: { x: 0, y: 0, width: 0, height: 0 },
        pickYourMood: { x: 0, y: 0, width: 0, height: 0 },
        jokeBox: { x: 0, y: 0, width: 0, height: 0 },
        windowHeight: window.innerHeight
      }

      Object.entries(elements).forEach(([key, element]) => {
        if (element && key in newCoords) {
          const rect = element.getBoundingClientRect()
          newCoords[key as keyof Omit<CoordinatesState, 'windowHeight'>] = {
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY,
            width: rect.width,
            height: rect.height
          }
        }
      })

      if (JSON.stringify(newCoords) !== JSON.stringify(coordinates)) {
        setCoordinates(newCoords)
        console.log('New coordinates:', newCoords)
      }
    }

    calculatePositions()
    window.addEventListener('resize', calculatePositions)
    window.addEventListener('scroll', calculatePositions)

    return () => {
      window.removeEventListener('resize', calculatePositions)
      window.removeEventListener('scroll', calculatePositions)
    }
  }, [coordinates])

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center'>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.3);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .circle-box {
          animation: fadeIn 0.5s ease-out forwards;
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
      <div
        onClick={() => {
          if (currentBox === 5) {
            handleClose()
          } else {
            setCurrentBox(prev => (prev + 1) % 6)
          }
        }}
        className='relative w-full h-full'
      >
        {/* Explore Box */}
        {currentBox === 0 && coordinates.explore.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.explore.x - 30.5}px`,
              top: `${coordinates.explore.y - 70}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex flex-col items-start absolute bottom-[74px] left-[38px]'>
                <AktivGroteskText
                  text='Explore >'
                  fontSize='text-[16px]'
                  fontWeight='font-[700]'
                />

                <div
                  className={`text-start relative text-[12px] ${aktivGrotesk.className} font-[400]`}
                >
                  Think of it like a map!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contest Box */}
        {currentBox === 1 && coordinates.contest.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.contest.x - 70}px`,
              top: `${coordinates.contest.y - 70}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex flex-col gap-[6px] items-start absolute bottom-[64px] px-[18px]'>
                <AktivGroteskText
                  text='Contest'
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight'
                />
                <AktivGroteskText
                  text='Jumpin the rewards* game'
                  fontSize='text-[12px]'
                  fontWeight='font-[400] leading-tight'
                  className='text-start'
                />
              </div>
            </div>
          </div>
        )}

        {/* Language Box */}
        {currentBox === 2 && coordinates.language.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.language.x - 125}px`,
              top: `${coordinates.language.y - 90}px`,
              width: '237px',
              height: '237px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex items-center absolute bottom-[92px] px-[11px] justify-between'>
                <AktivGroteskText
                  text='We speak many languages, take your pick!'
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight'
                  className='text-start w-[80%]'
                />
                <div className='w-[50px] h-[50px] bg-white rounded-full flex flex-col items-center justify-center'>
                  <SvgIcons
                    name={ICONS_NAMES.LANG}
                    className='w-[37px] h-[17px]'
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Box */}
        {currentBox === 3 && coordinates.profile.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.profile.x - 170}px`,
              top: `${coordinates.profile.y - 80}px`,
              width: '237px',
              height: '237px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex items-center absolute pl-[11px] pr-[21px] bottom-[110px]'>
                <AktivGroteskText
                  text='Your own fun Space/zone'
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight'
                  className='text-start'
                />
                <div className='min-w-[50px] min-h-[50px] bg-white rounded-full flex flex-col items-center justify-center'>
                  <SvgIcons
                    name={ICONS_NAMES.PROFILE}
                    className='w-[30px] h-[30px]'
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pick Your Mood Box */}
        {currentBox === 4 && coordinates.pickYourMood.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.pickYourMood.x - 300.5}px`,
              top: `${coordinates.pickYourMood.y - 200}px`,
              width: '225px',
              height: '225px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex flex-col gap-[8px] items-start absolute bottom-[63px] pl-[73px]'>
                <AktivGroteskText
                  text='Pick your Mood'
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight'
                  className='text-start w-[80%]'
                />
                <div
                  className={`text-start relative w-[70%] text-[12px] ${aktivGrotesk.className} font-[400]`}
                >
                  Tell us what&apos;s annoying you today! 😎🌡️
                </div>
              </div>
            </div>
          </div>
        )}

        {currentBox === 5 && coordinates.jokeBox.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.jokeBox.x - 300.5}px`,
              top: `${coordinates.jokeBox.y - 200}px`,
              width: '225px',
              height: '225px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex flex-col gap-[8px] items-start absolute bottom-[63px] pl-[73px]'>
                <AktivGroteskText
                  text='Joke Box'
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight'
                  className='text-start w-[80%]'
                />
                <div
                  className={`text-start relative w-[70%] text-[12px] ${aktivGrotesk.className} font-[400]`}
                >
                  All your jokes  bottled here!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePageDesktopOnboarding
