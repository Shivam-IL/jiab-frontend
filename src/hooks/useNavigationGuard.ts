import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export const useNavigationGuard = (
  onBeforeNavigate: (url: string) => boolean
) => {
  const pathname = usePathname()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      if (link && link.href && !link.href.includes(pathname)) {
        e.preventDefault()
        onBeforeNavigate(link.href)
      }
    }

    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
      onBeforeNavigate(window.location.href)
      // Push the current state back to prevent navigation
      window.history.pushState(null, '', pathname)
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handlePopState)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [pathname, onBeforeNavigate])
} 