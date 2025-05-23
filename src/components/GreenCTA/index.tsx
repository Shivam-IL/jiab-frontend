import React from 'react'
import { Button } from '../ui/button'
import { IGreenCTA } from '@/interfaces'
import { aktivGrotesk } from '@/app/layout'

const GreenCTA: React.FC<IGreenCTA> = ({ onClick, text }) => {
  return (
    <Button
      onClick={onClick}
      className={`w-full text-[16px] md:text-[20px] md:font-[500]   hover:bg-[#11A64B] font-[700] bg-[#11A64B] px-[24px] py-[24px] rounded-[100px] ${aktivGrotesk.className}`}
    >
      {text}
    </Button>
  )
}

export default GreenCTA
