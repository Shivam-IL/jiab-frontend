import { IScreenWrapper } from '@/interfaces'
import React from 'react'

const ScreenWrapper: React.FC<IScreenWrapper> = ({
  children,
  className = 'mt-20',
  desktopWidth = 'md:w-[80%]'
}) => {
  return (
    <div
      className={`w-full min-h-[100vh] relative flex justify-center p-[16px] bg-[#F2F2F2] ${className}`}
    >
      <div className={`relative ${desktopWidth} w-full`}>{children}</div>
    </div>
  )
}

export default ScreenWrapper
