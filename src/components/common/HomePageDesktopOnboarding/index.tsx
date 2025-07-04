import React, { useState, useEffect } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES, SESSION_STORAGE_KEYS } from '@/constants'
import { updateEnableCoachMarks } from '@/store/auth/auth.slice'
import useAppDispatch from '@/hooks/useDispatch'
import { BoxIds } from '../CircularBoxesModal'
import AktivGroteskText from '../AktivGroteskText'
import { removeSessionStorageItem } from '@/utils'
import useAppSelector from '@/hooks/useSelector'
import { useCMSData } from '@/data/'
import { useRouter } from 'next/navigation'

// Export box IDs for reuse in other components
export const DesktopBoxIds = {
  EXPLORE: 'explore-element-desktop',
  CONTEST: 'contest-element-desktop',
  NOTIFICATIONS: 'notifications-element-desktop',
  LANGUAGE: 'language-element-desktop',
  PROFILE_ELEMENT: 'profile-element-desktop',
  PICK_YOUR_MOOD: 'pick-your-mood-element-desktop',
  JOKE_BOX: 'joke-box-element-desktop'
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
  notifications: Coordinates
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
  const [mounted, setMounted] = useState(false)
  const cmsData = useCMSData(mounted)
  const { selectedLanguage } = useAppSelector(state => state.language)
  useEffect(() => {
    setMounted(true)
  }, [])
  const router = useRouter()
  const [currentBox, setCurrentBox] = useState(0)
  const { enableCoachMarks } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const [coordinates, setCoordinates] = useState<CoordinatesState>({
    explore: { x: 0, y: 0, width: 0, height: 0 },
    contest: { x: 0, y: 0, width: 0, height: 0 },
    notifications: { x: 0, y: 0, width: 0, height: 0 },
    language: { x: 0, y: 0, width: 0, height: 0 },
    profile: { x: 0, y: 0, width: 0, height: 0 },
    pickYourMood: { x: 0, y: 0, width: 0, height: 0 },
    jokeBox: { x: 0, y: 0, width: 0, height: 0 },
    windowHeight: 0
  })

  const handleClose = () => {
    dispatch(updateEnableCoachMarks({ enableCoachMarks: false }))
    removeSessionStorageItem(SESSION_STORAGE_KEYS.HAS_SHOWN_SERIAL_CHILL_MODAL)
    router.push('/contest')
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
        notifications: document.getElementById(DesktopBoxIds.NOTIFICATIONS),
        language: document.getElementById(DesktopBoxIds.LANGUAGE),
        profile: document.getElementById(DesktopBoxIds.PROFILE_ELEMENT),
        pickYourMood: document.getElementById(BoxIds.PICK_YOUR_MOOD),
        jokeBox: document.getElementById(BoxIds.JOKE_BOX)
      }

      const newCoords: CoordinatesState = {
        explore: { x: 0, y: 0, width: 0, height: 0 },
        contest: { x: 0, y: 0, width: 0, height: 0 },
        notifications: { x: 0, y: 0, width: 0, height: 0 },
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
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          }
        }
      })

      if (JSON.stringify(newCoords) !== JSON.stringify(coordinates)) {
        setCoordinates(newCoords)
        console.log('New coordinates:', newCoords)
        console.log('Pick Your Mood Coordinates:', newCoords.pickYourMood)
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

  // Auto-scroll to the relevant section when currentBox is 4 or 5
  useEffect(() => {
    if (currentBox === 4) {
      setTimeout(() => {
        const pickYourMoodEl = document.getElementById(BoxIds.PICK_YOUR_MOOD)
        if (pickYourMoodEl) {
          pickYourMoodEl.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
      }, 100)
    } else if (currentBox === 5) {
      setTimeout(() => {
        const jokeBoxEl = document.getElementById(BoxIds.JOKE_BOX)
        if (jokeBoxEl) {
          jokeBoxEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }, [currentBox])

  // Auto-advance through onboarding steps
  useEffect(() => {
    if (!enableCoachMarks) return

    const timer = setTimeout(() => {
      if (currentBox < 6) {
        setCurrentBox(prev => prev + 1)
      } else {
        handleClose()
      }
    }, 3000) // 3 seconds per step

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBox, enableCoachMarks])

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
      <div className='relative w-full h-full'>
        {/* Explore Box */}
        {currentBox === 0 && coordinates.explore.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.explore.x - 20.5}px`,
              top: `${coordinates.explore.y - 50}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div
                className={`flex flex-col items-start absolute bottom-[74px] left-[38px]`}
              >
                <AktivGroteskText
                  text={cmsData.coachMarkers.exploreArrowHeading}
                  fontSize={`${
                    selectedLanguage === 'tu' ? 'text-[14px]' : 'text-[16px]'
                  }`}
                  fontWeight='font-[700]'
                />

                <div className={`text-start relative text-[12px]  font-[400]`}>
                  {cmsData.coachMarkers.exploreArrowSubheadingThinkOfitLikeamap}
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
              left: `${coordinates.contest.x - 20}px`,
              top: `${coordinates.contest.y - 70}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex flex-col gap-[6px] items-start absolute bottom-[64px] px-[18px]'>
                <AktivGroteskText
                  text={cmsData.coachMarkers.contestHeading}
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight'
                />
                <AktivGroteskText
                  text={
                    cmsData.coachMarkers.contestSubheadingJumpinTheRewardGame
                  }
                  fontSize='text-[12px]'
                  fontWeight='font-[400] leading-tight'
                  className='text-start'
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications Box */}
        {currentBox === 2 && coordinates.notifications.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.notifications.x - 110}px`,
              top: `${selectedLanguage === 'ta' ? coordinates.notifications.y - 80 : coordinates.notifications.y -100}px`,
              width: '192px',
              height: '192px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex items-center absolute bottom-12 left-2'>
                <div className='w-[60%] text-[12px]'>
                  {cmsData.coachMarkers.checkOutAllYourNotificationHere}
                </div>
                <div className='w-[50px] h-[50px] bg-white rounded-full flex flex-col items-center justify-center'>
                  <SvgIcons
                    name={ICONS_NAMES.BELL}
                    className='w-[22px] h-[20px]'
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Language Box */}
        {currentBox === 3 && coordinates.language.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.language.x - 125}px`,
              top: `${
                selectedLanguage === 'ta'
                  ? coordinates.language.y - 50
                  : coordinates.language.y - 90
              }px`,
              width: '240px',
              height: '240px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex items-center absolute bottom-[92px] px-[11px] justify-between'>
                <AktivGroteskText
                  text={cmsData.coachMarkers.weSpeakManyLanguages}
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight'
                  className={`text-start  ${
                    selectedLanguage === 'ta' ? 'w-[80%] px-2' : 'w-[80%]'
                  }`}
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
        {currentBox === 4 && coordinates.profile.y !== 0 && (
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
                  text={cmsData.coachMarkers.yourOwnFunSpacezone}
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight break-words'
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
        {currentBox === 5 && coordinates.pickYourMood.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: '-30px',
              top: `${
                coordinates.pickYourMood.y +
                coordinates.pickYourMood.height / 2 -
                112.5
              }px`,
              width: '225px',
              height: '225px',
              position: 'fixed',
              zIndex: 1000
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex flex-col gap-[8px] items-start absolute bottom-[63px] pl-[73px]'>
                <AktivGroteskText
                  text={cmsData.coachMarkers.pickYourMoodHeading}
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight'
                  className='text-start w-[80%]'
                />
                <div
                  className={`text-start relative w-[70%] text-[12px] font-[400]`}
                >
                  {
                    cmsData.coachMarkers
                      .pickyourmoodSubheadingTellusWhatsAnnoyingYouToday
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Joke Box */}
        {currentBox === 6 && coordinates.jokeBox.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `-50px`,
              top: `${coordinates.jokeBox.y - 100}px`,
              width: '225px',
              height: '225px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex flex-col gap-[8px] items-start absolute bottom-[63px] pl-[73px]'>
                <AktivGroteskText
                  text={cmsData.coachMarkers.jokeBoxHeading}
                  fontSize='text-[16px]'
                  fontWeight='font-[700] leading-tight'
                  className='text-start w-[80%]'
                />
                <div
                  className={`text-start relative w-[70%] text-[12px]  font-[400]`}
                >
                  {cmsData.coachMarkers.jokeboxSubHeadingAllyourjokes}
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
