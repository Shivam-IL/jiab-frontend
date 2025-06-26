import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BreakTheIceExitPopup } from '../ExitPopUps'
import { LOCAL_KEYS, SESSION_STORAGE_KEYS } from '@/constants'
import useAppSelector from '@/hooks/useSelector'
import { getLocalStorageItem, removeSessionStorageItem } from '@/utils'

const BreakTheIceComponent = () => {
  // ...existing code...
  const [showExitPopup, setShowExitPopup] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, token } = useAppSelector(state => state.auth)

  const { user } = useAppSelector(state => state.profile)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAuthenticated && user?.profile_percentage < 100) {
        const currentStoredPath = sessionStorage.getItem(
          SESSION_STORAGE_KEYS.CURRENT_PATH
        )

        // Only show exit popup if we're actually navigating away from /profile
        if (currentStoredPath === '/profile' && pathname !== '/profile') {
          // Don't show popup if user is on profile-related pages or has complete profile
          if (
            !pathname.startsWith('/profile') &&
            !pathname.startsWith('/my-profile') &&
            !pathname.startsWith('/send-reminder') &&
            user?.profile_percentage < 100
          ) {
            console.log('Navigating away from /profile to:', pathname)
            setShowExitPopup(true)
          }
        }

        // Update the stored paths
        if (currentStoredPath && currentStoredPath !== pathname) {
          sessionStorage.setItem(
            SESSION_STORAGE_KEYS.PREVIOUS_PATH,
            currentStoredPath
          )
        }
        sessionStorage.setItem(SESSION_STORAGE_KEYS.CURRENT_PATH, pathname)
      }
      if (!isAuthenticated) {
        removeSessionStorageItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
        removeSessionStorageItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isAuthenticated])

  useEffect(() => {
    if (
      pathname.startsWith('/contest') &&
      getLocalStorageItem(LOCAL_KEYS.CONTEST_TOUR) === 'true'
    ) {
      removeSessionStorageItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH)
      removeSessionStorageItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
      setShowExitPopup(false)
    }
  }, [pathname])

  useEffect(() => {
    if (!isAuthenticated) {
      removeSessionStorageItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
      removeSessionStorageItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH)
      setShowExitPopup(false)
    }
  }, [isAuthenticated, pathname])

  // Cleanup effect to reset popup state
  useEffect(() => {
    return () => {
      setShowExitPopup(false)
    }
  }, [])

  if (!isAuthenticated || !token || user?.profile_percentage === 100)
    return <></>

  if (pathname.startsWith('/send-reminder')) return <></>

  if (pathname.startsWith('/my-profile')) return <></>

  if (pathname.startsWith('/profile')) return <></>

  if (
    pathname.startsWith('/contest') &&
    getLocalStorageItem(LOCAL_KEYS.CONTEST_TOUR) === 'true'
  ) {
    return <></>
  }

  return (
    <>
      {/* ...existing code... */}
      {showExitPopup && user?.profile_percentage < 100 && (
        <BreakTheIceExitPopup
          open={showExitPopup}
          onClose={() => {
            setShowExitPopup(false)
            // Clear the "came from profile" state when popup is dismissed
            removeSessionStorageItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
            removeSessionStorageItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH)
          }}
          yesButtonClick={() => {
            setShowExitPopup(false)
            // Clear the "came from profile" state when user clicks yes
            removeSessionStorageItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
            removeSessionStorageItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH)
          }}
          noButtonClick={() => {
            setShowExitPopup(false)
            // Clear the "came from profile" state when user clicks no
            removeSessionStorageItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
            removeSessionStorageItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH)
            router.push('/profile')
          }}
        />
      )}
    </>
  )
}

export default BreakTheIceComponent
