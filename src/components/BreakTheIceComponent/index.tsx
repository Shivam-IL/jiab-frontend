import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BreakTheIceExitPopup } from '../ExitPopUps'
import { SESSION_STORAGE_KEYS } from '@/constants'
import useAppSelector from '@/hooks/useSelector'

const BreakTheIceComponent = () => {
  // ...existing code...
  const [showExitPopup, setShowExitPopup] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Store the previous path
      const prev = sessionStorage.getItem(SESSION_STORAGE_KEYS.CURRENT_PATH)
      if (prev) sessionStorage.setItem(SESSION_STORAGE_KEYS.PREVIOUS_PATH, prev)
      sessionStorage.setItem(SESSION_STORAGE_KEYS.CURRENT_PATH, pathname)
      if (prev === '/profile') {
        setShowExitPopup(true)
      }
    }
  }, [pathname])

  const handleStayOnPage = () => setShowExitPopup(false)
  const { user } = useAppSelector(state => state.profile)
  const router = useRouter()

  return (
    <>
      {/* ...existing code... */}
      {showExitPopup && user?.profile_percentage < 100 && (
        <BreakTheIceExitPopup
          open={showExitPopup}
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
