import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { MadeYouLaughExitPopup } from '../ExitPopUps'
import { SESSION_STORAGE_KEYS } from '@/constants'
import useAppSelector from '@/hooks/useSelector'
import {
  removeSessionStorageItem
} from '@/utils'

const MadeYouLolComponent = () => {
  const [showExitPopup, setShowExitPopup] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, token } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAuthenticated) {
        const currentStoredPath = sessionStorage.getItem(
          SESSION_STORAGE_KEYS.JOKES_CURRENT_PATH
        )

        // Only show exit popup if we're actually navigating away from /user-generated-jokes
        if (currentStoredPath === '/user-generated-jokes' && pathname !== '/user-generated-jokes') {
          console.log('Navigating away from /user-generated-jokes to:', pathname)
          setShowExitPopup(true)
        }

        // Update the stored paths
        if (currentStoredPath && currentStoredPath !== pathname) {
          sessionStorage.setItem(
            SESSION_STORAGE_KEYS.JOKES_PREVIOUS_PATH,
            currentStoredPath
          )
        }
        sessionStorage.setItem(SESSION_STORAGE_KEYS.JOKES_CURRENT_PATH, pathname)
      }
      if (!isAuthenticated) {
        removeSessionStorageItem(SESSION_STORAGE_KEYS.JOKES_CURRENT_PATH)
        removeSessionStorageItem(SESSION_STORAGE_KEYS.JOKES_PREVIOUS_PATH)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isAuthenticated])


  useEffect(() => {
    if (!isAuthenticated) {
      removeSessionStorageItem(SESSION_STORAGE_KEYS.JOKES_CURRENT_PATH)
      removeSessionStorageItem(SESSION_STORAGE_KEYS.JOKES_PREVIOUS_PATH)
      setShowExitPopup(false)
    }
  }, [isAuthenticated, pathname])

  // Cleanup effect to reset popup state
  useEffect(() => {
    return () => {
      setShowExitPopup(false)
    }
  }, [])


  if (!isAuthenticated || !token) return <></>

  if (pathname === '/user-generated-jokes') return <></>

  return (
    <>
      {showExitPopup && (
        <MadeYouLaughExitPopup
          open={showExitPopup}
          onClose={() => {
            setShowExitPopup(false)
            // Clear the "came from user-generated-jokes" state when popup is dismissed
            removeSessionStorageItem(SESSION_STORAGE_KEYS.JOKES_CURRENT_PATH)
            removeSessionStorageItem(SESSION_STORAGE_KEYS.JOKES_PREVIOUS_PATH)
          }}
          yesButtonClick={() => {
            setShowExitPopup(false)
            // Clear the "came from user-generated-jokes" state when popup is dismissed
            removeSessionStorageItem(SESSION_STORAGE_KEYS.JOKES_CURRENT_PATH)
            removeSessionStorageItem(SESSION_STORAGE_KEYS.JOKES_PREVIOUS_PATH)
          }}
          noButtonClick={() => {
            setShowExitPopup(false)
            router.push('/user-generated-jokes')
            removeSessionStorageItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
            removeSessionStorageItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH)
          }}
        />
      )}
    </>
  )
}

export default MadeYouLolComponent
