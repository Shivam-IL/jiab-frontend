import React from 'react'
import { Button } from '../ui/button'
import { IGreenCTA } from '@/interfaces'
import { aktivGrotesk } from '@/app/layout'
import AktivGroteskText from '../common/AktivGroteskText'

const GreenCTA: React.FC<IGreenCTA> = ({
  onClick,
  text,
  paddingClass = 'px-[24px] py-[24px]',
  fontSize = 'text-[16px] md:text-[20px]',
  fontWeight = 'md:font-[500] font-[700]',
  className = 'w-full'
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} text-white  hover:bg-[#11A64B]  bg-[#11A64B] ${paddingClass} rounded-[100px] ${aktivGrotesk.className}`}
    >
      <AktivGroteskText
        text={text}
        fontSize={fontSize}
        fontWeight={fontWeight}
      />
    </button>
  )
}

export default GreenCTA
