import React from 'react'
import { IGreenCTA } from '@/interfaces'
import { aktivGrotesk } from '@/app/layout'

const GreenCTA: React.FC<IGreenCTA> = ({
  onClick,
  text,
  paddingClass = 'px-[24px] py-[12px] md:py-[14px]',
  fontSize = 'text-[16px] md:text-[20px]',
  fontWeight = 'md:font-[500] font-[700]',
  className = 'w-full',
  disabled = false,
  children,
  childrenPosition
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-[#73C392]  bg-[#11A64B]'
      } ${fontSize} ${fontWeight} leading-tight  text-white transition-all duration-300   ${paddingClass} rounded-[100px] ${
        aktivGrotesk.className
      }`}
    >
      {childrenPosition==='left' && children}
      {text}
      {childrenPosition==='right' && children}
    </button>
  )
}

export default GreenCTA
