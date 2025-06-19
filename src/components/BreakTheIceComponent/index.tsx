import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BreakTheIceExitPopup } from '../ExitPopUps'
import { SESSION_STORAGE_KEYS } from '@/constants'
import useAppSelector from '@/hooks/useSelector'
import { removeSessionStorageItem } from '@/utils'

const BreakTheIceComponent = () => {
  // ...existing code...
  const [showExitPopup, setShowExitPopup] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, token } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Store the previous path
      if (isAuthenticated) {
        const prev = sessionStorage.getItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
        if (prev)
          sessionStorage.setItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH, prev)
        sessionStorage.setItem(SESSION_STORAGE_KEYS.CURRENT_PATH, pathname)
        if (prev === '/profile') {
          setShowExitPopup(true)
        }
      }
      if (!isAuthenticated) {
        removeSessionStorageItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
        removeSessionStorageItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH)
      }
    }
  }, [pathname, isAuthenticated])

  const handleStayOnPage = () => setShowExitPopup(false)
  const { user } = useAppSelector(state => state.profile)
  const router = useRouter()

  const pathName = usePathname()

  if (!isAuthenticated || !token || user?.profile_percentage === 100)
    return null

  if (pathName.startsWith('/my-profile')) return null

  if (pathName.startsWith('/profile')) return null

  return (
    <>
      {/* ...existing code... */}
      {showExitPopup && user?.profile_percentage < 100 && (
        <BreakTheIceExitPopup
          open={showExitPopup}
          onClose={() => {
            setShowExitPopup(false)
          }}
          yesButtonClick={() => {
            setShowExitPopup(false)
          }}
          noButtonClick={() => {
            setShowExitPopup(false)
            router.push('/profile')
          }}
        />
      )}
    </>
  )
}

export default BreakTheIceComponent
