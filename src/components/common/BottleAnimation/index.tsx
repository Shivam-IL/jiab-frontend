import React from 'react'
import Image from 'next/image'

const BottleAnimation: React.FC<{
  isVisible: boolean
  animationKey?: number
  onAnimationEnd?: () => void
  animation?: boolean
}> = ({ isVisible, animationKey = 0, onAnimationEnd, animation = false }) => {
  if (!isVisible) return null

  return (
    <div className='fixed inset-0 z-[9999] pointer-events-none flex justify-center items-center'>
      <Image
        key={animationKey} // Force remount to restart animation from beginning
        src='/assets/images/bottle-sprite-t.gif'
        alt='Bottle Animation'
        width={400}
        height={400}
        className='object-contain w-[400px] h-[400px]'
        unoptimized // Required for GIFs
        onLoad={() => {
          // Trigger animation end callback after gif duration
          if (onAnimationEnd) {
            setTimeout(onAnimationEnd, 2800) // Slightly less than hook timeout
          }
        }}
        priority // Load immediately for smooth animation
      />
    </div>
  )
}

export default BottleAnimation
