'use client'

import { PORTAL_ID } from '@/constants'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({
  children,
  onClose
}) => {
  useEffect(() => {
    // Prevent background scroll
    document.body.style.overflow = 'hidden'

    // Optional: Close on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return (
    <div className='fixed top-0 w-full h-full inset-0 bg-white z-[100] overflow-y-auto'>
      <div
        className='fixed top-0 w-full h-full inset-0 bg-[rgba(0,0,0,0.6)] z-[100] overflow-y-auto'
        onClick={onClose}
      >
        <div
          className='relative w-full min-h-full flex justify-center items-center pt-4'
          onClick={e => {
            e.stopPropagation()
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const LoginSignupDialog: React.FC<{
  children: React.ReactNode
  onClose: () => void
}> = ({ children, onClose }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const el = document.getElementById(PORTAL_ID)
    setPortalRoot(el)
  }, [])

  return portalRoot
    ? createPortal(<Modal onClose={onClose}>{children}</Modal>, portalRoot)
    : null
}

export default LoginSignupDialog
