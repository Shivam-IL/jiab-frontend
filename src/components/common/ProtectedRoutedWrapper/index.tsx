import { LOCAL_STORAGE_KEYS } from '@/api/client/config'
import { PROTECTED_ROUTES } from '@/constants'
import useAppSelector from '@/hooks/useSelector'
import { getLocalStorageItem } from '@/utils'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const ProtectedRoutedWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token } = useAppSelector(state => state.auth)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (
      !getLocalStorageItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) &&
      JSON.stringify(PROTECTED_ROUTES).startsWith(pathname)
    ) {
      router.push('/')
    }
  }, [isAuthenticated, token, pathname])


  return <>{children}</>
}

export default ProtectedRoutedWrapper
