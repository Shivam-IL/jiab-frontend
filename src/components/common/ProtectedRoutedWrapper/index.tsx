import { PROTECTED_ROUTES } from '@/constants'
import useAppSelector from '@/hooks/useSelector'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const ProtectedRoutedWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token } = useAppSelector(state => state.auth)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (
      !isAuthenticated &&
      !token &&
      !JSON.stringify(PROTECTED_ROUTES).includes(pathname)
    ) {
      router.push('/')
    }
  }, [isAuthenticated, token, pathname])

  if (
    !isAuthenticated &&
    !token &&
    !JSON.stringify(PROTECTED_ROUTES).includes(pathname)
  ) {
    return <></>
  }

  return <>{children}</>
}

export default ProtectedRoutedWrapper
