import React, { useState, useEffect } from 'react'
import SvgIcons from './SvgIcons'
import { ICONS_NAMES, SESSION_STORAGE_KEYS } from '@/constants'
import { updateEnableCoachMarks } from '@/store/auth/auth.slice'
import useAppDispatch from '@/hooks/useDispatch'
import useAppSelector from '@/hooks/useSelector'
import { removeSessionStorageItem } from '@/utils'
import { useCMSData } from '@/data'
import { useRouter } from 'next/navigation'

// Export box IDs for reuse in other components
export const BoxIds = {
  MENU_BAR: 'menu-element',
  NOTIFICATIONS: 'notifications-element',
  LANG: 'lang-element',
  PICK_YOUR_MOOD: 'pick-your-mood-element',
  JOKE_BOX: 'joke-box-element',
  HOME: 'home-element',
  PROFILE: 'profile-element',
  COMIC_COINS: 'comic-coins-element',
  CONTEST_ELEMENT: 'contest-element',
  REFRESH: 'refresh-element'
} as const

interface Coordinates {
  x: number
  y: number
  width: number
  height: number
}

interface CoordinatesState {
  home: Coordinates
  contest: Coordinates
  comicCoins: Coordinates
  refresh: Coordinates
  profile: Coordinates
  menuBar: Coordinates
  notifications: Coordinates
  lang: Coordinates
  pickYourMovie: Coordinates
  jokeBox: Coordinates
  windowHeight: number
}

interface CircularBoxesModalProps {
  isOpen: boolean
  onClose: () => void
}

const CircularBoxesModal = ({ isOpen, onClose }: CircularBoxesModalProps) => {
  const [mounted, setMounted] = useState(false)
  const cmsData = useCMSData(mounted)
  const router = useRouter()
  useEffect(() => {
    setMounted(true)
  }, [])
  const [currentBox, setCurrentBox] = useState(0)
  const { enableCoachMarks } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const { selectedLanguage } = useAppSelector(state => state.language)
  const [coordinates, setCoordinates] = useState<CoordinatesState>({
    home: { x: 0, y: 0, width: 0, height: 0 },
    contest: { x: 0, y: 0, width: 0, height: 0 },
    comicCoins: { x: 0, y: 0, width: 0, height: 0 },
    refresh: { x: 0, y: 0, width: 0, height: 0 },
    profile: { x: 0, y: 0, width: 0, height: 0 },
    menuBar: { x: 0, y: 0, width: 0, height: 0 },
    notifications: { x: 0, y: 0, width: 0, height: 0 },
    lang: { x: 0, y: 0, width: 0, height: 0 },
    pickYourMovie: { x: 0, y: 0, width: 0, height: 0 },
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
        home: document.getElementById(BoxIds.HOME),
        contest: document.getElementById(BoxIds.CONTEST_ELEMENT),
        comicCoins: document.getElementById(BoxIds.COMIC_COINS),
        refresh: document.getElementById(BoxIds.REFRESH),
        profile: document.getElementById(BoxIds.PROFILE),
        menuBar: document.getElementById(BoxIds.MENU_BAR),
        notifications: document.getElementById(BoxIds.NOTIFICATIONS),
        lang: document.getElementById(BoxIds.LANG),
        pickYourMovie: document.getElementById(BoxIds.PICK_YOUR_MOOD),
        jokeBox: document.getElementById(BoxIds.JOKE_BOX)
      }

      const newCoords: CoordinatesState = {
        home: { x: 0, y: 0, width: 0, height: 0 },
        contest: { x: 0, y: 0, width: 0, height: 0 },
        comicCoins: { x: 0, y: 0, width: 0, height: 0 },
        refresh: { x: 0, y: 0, width: 0, height: 0 },
        profile: { x: 0, y: 0, width: 0, height: 0 },
        menuBar: { x: 0, y: 0, width: 0, height: 0 },
        notifications: { x: 0, y: 0, width: 0, height: 0 },
        lang: { x: 0, y: 0, width: 0, height: 0 },
        pickYourMovie: { x: 0, y: 0, width: 0, height: 0 },
        jokeBox: { x: 0, y: 0, width: 0, height: 0 },
        windowHeight: window.innerHeight
      }

      Object.entries(elements).forEach(([key, element]) => {
        if (element && key in newCoords) {
          const rect = element.getBoundingClientRect()
          // For pickYourMovie and jokeBox, use scroll offset (so they stay with the section)
          if (key === 'pickYourMovie' || key === 'jokeBox') {
            newCoords[key as keyof Omit<CoordinatesState, 'windowHeight'>] = {
              x: rect.left + window.scrollX,
              y: rect.top + window.scrollY,
              width: rect.width,
              height: rect.height
            }
          } else {
            // For all others, use viewport coordinates (fixed)
            newCoords[key as keyof Omit<CoordinatesState, 'windowHeight'>] = {
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height
            }
          }
        }
      })

      if (JSON.stringify(newCoords) !== JSON.stringify(coordinates)) {
        setCoordinates(newCoords)
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

  // Auto-scroll for pickYourMovie and jokeBox
  useEffect(() => {
    if (currentBox === 3) {
      setTimeout(() => {
        const pickYourMoodEl = document.getElementById(BoxIds.PICK_YOUR_MOOD)
        if (pickYourMoodEl) {
          pickYourMoodEl.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }
      }, 100)
    } else if (currentBox === 4) {
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
      if (currentBox < 9) {
        setCurrentBox(prev => prev + 1)
      } else {
        handleClose()
      }
    }, 2000) // 2 seconds per step

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
        {/* Menu Bar Box */}
        {currentBox === 0 && coordinates.menuBar.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.menuBar.x - 60.5}px`,
              top: `${coordinates.menuBar.y - 58.5}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='w-[50px] relative bottom-2 h-[50px] bg-white rounded-full flex flex-col items-center justify-center'>
                <SvgIcons
                  name={ICONS_NAMES.HAMBURGER}
                  className='w-[20px] h-[20px]'
                />
              </div>
              <div
                className={`${
                  selectedLanguage === 'ta' ? 'text-[8px]' : 'text-[12px]'
                } absolute right-[20px] leading-tight  bottom-[28px] text-start w-[50%] `}
              >
                {cmsData.coachMarkers.yourGuideToJokeInabottle}
              </div>
            </div>
          </div>
        )}

        {/* Notifications Box */}
        {currentBox === 1 && coordinates.notifications.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.notifications.x - 120.5}px`,
              top: `${coordinates.notifications.y - 88.5}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex items-center absolute bottom-12 left-2'>
                <div
                  className={`w-[60%] ${
                    selectedLanguage === 'ta' ? 'text-[8px]' : 'text-[10px]'
                  } leading-tight`}
                >
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
        {currentBox === 2 && coordinates.lang.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.lang.x - 90.5}px`,
              top: `${coordinates.lang.y - 88.5}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex items-center absolute bottom-12 left-2'>
                <div
                  className={`w-[60%] ${
                    selectedLanguage === 'ta' ? 'text-[8px]' : 'text-[10px]'
                  } leading-tight`}
                >
                  {cmsData.coachMarkers.weSpeakManyLanguages}
                </div>
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

        {/* Pick Your Mood Box */}
        {currentBox === 3 && coordinates.pickYourMovie.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.pickYourMovie.x - 30.5}px`,
              top: `${coordinates.pickYourMovie.y - 100}px`,
              width: '187px',
              height: '187px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex flex-col items-start top-[53px] absolute w-[128px] bottom-[64px] right-[18px]'>
                <div
                  className={`text-start text-[16px]  font-[700] leading-tight`}
                >
                  {cmsData.coachMarkers.pickYourMood}
                </div>
                <div className={`text-start relative  text-[12px]  font-[400]`}>
                  {
                    cmsData.coachMarkers
                      .pickyourmoodSubheadingTellusWhatsAnnoyingYouToday
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {currentBox === 4 && coordinates.jokeBox.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.jokeBox.x - 80.5}px`,
              top: `${coordinates.jokeBox.y - 600.5}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='flex w-[81px] items-start flex-col absolute bottom-[62px] right-[21px]'>
                <div
                  className={`${
                    selectedLanguage === 'ta' ? 'text-[12px]' : 'text-[16px]'
                  } font-[700] leading-tight`}
                >
                  {cmsData.coachMarkers.jokeBoxHeading}
                </div>
                <div
                  className={`text-start relative text-[12px]  font-[400] leading-tight`}
                >
                  {cmsData.coachMarkers.jokeboxSubHeadingAllyourjokes}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Home Box */}
        {currentBox === 5 && coordinates.home.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.home.x - 40.5}px`,
              top: `${coordinates.home.y - 88.5}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='w-[100px] text-[12px] leading-tight'>
                {cmsData.coachMarkers.backToBase}
              </div>
              <div className='w-[50px] h-[50px] text-[#11A64B] bg-white rounded-full flex flex-col items-center justify-center'>
                <SvgIcons
                  name={ICONS_NAMES.NEW_HOME}
                  className='w-[20px] h-[20px] stroke-2 fill-[#11A64B]'
                />
                <p className='text-[9px] uppercase text-[#11A64B]'>
                  {cmsData.navFooter.home}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Contest Box */}
        {currentBox === 6 && coordinates.contest.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.contest.x - 40.5}px`,
              top: `${coordinates.contest.y - 88.5}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='w-[100px] text-[12px] leading-tight'>
                {cmsData.coachMarkers.rewardsToMakeYouGo}
              </div>
              <div className='w-[56px] h-[56px] bg-white rounded-full flex flex-col items-center justify-center'>
                <SvgIcons
                  name={ICONS_NAMES.NEW_CUP}
                  className='w-[24px] h-[24px] fill-[#11A64B]'
                />
                <p className='text-[9px] text-center uppercase  text-[#11A64B]'>
                  {cmsData.navFooter.contest}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Comic Coins Box */}
        {currentBox === 7 && coordinates.comicCoins.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.comicCoins.x - 40.5}px`,
              top: `${coordinates.comicCoins.y - 88.5}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='w-[100px] text-[12px] leading-tight'>
                {cmsData.coachMarkers.trackurCollectionHere}
              </div>
              <div className='w-[87px] h-[87px] bg-white rounded-full flex flex-col items-center justify-center'>
                <SvgIcons
                  name={ICONS_NAMES.NEW_COMIC_COINS}
                  className='w-[22px] h-[22px]'
                />
                <p className='text-[9px] text-center uppercase text-[#11A64B]'>
                  {cmsData.navFooter.comicCoins}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Refresh Box */}
        {currentBox === 8 && coordinates.refresh.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.refresh.x - 40.5}px`,
              top: `${coordinates.refresh.y - 98.5}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='w-[100px] text-[12px] leading-tight '>
                {cmsData.coachMarkers.refreshringsToUnlockExclusiveContent}
              </div>
              <div className='w-[87px] h-[87px] bg-white rounded-full flex flex-col items-center justify-center'>
                <SvgIcons
                  name={ICONS_NAMES.NEW_REFRESH_RING}
                  className='w-[22px] h-[22px] fill-[#11A64B]'
                />
                <p className='text-[9px] text-center uppercase text-[#11A64B]'>
                  {cmsData.navFooter.refreshRings}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Box */}
        {currentBox === 9 && coordinates.profile.y !== 0 && (
          <div
            className='circle-box bg-[#FFE200] rounded-full'
            style={{
              left: `${coordinates.profile.x - 40.5}px`,
              top: `${coordinates.profile.y - 88.5}px`,
              width: '177px',
              height: '177px',
              position: 'fixed'
            }}
          >
            <div className='flex relative w-full text-center h-full flex-col justify-center items-center gap-[9px]'>
              <div className='w-[50%] z-10 absolute top-[25px] leading-tight left-[25px] text-[12px]'>
                {cmsData.coachMarkers.letsGetToKnowYouBetter}
              </div>
              <div className='w-[50px] relative top-[25px] h-[50px] bg-white rounded-full flex flex-col items-center justify-center'>
                <SvgIcons
                  name={ICONS_NAMES.NEW_USER}
                  className='w-[20px] h-[20px] stroke-10 fill-[#11A64B]'
                />
                <p className='text-[9px] text-center uppercase text-[#11A64B] leading-tight'>
                  {cmsData.navFooter.profile}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CircularBoxesModal
