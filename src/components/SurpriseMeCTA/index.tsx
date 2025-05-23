import { ISurpriseMeCTA } from '@/interfaces'
import React from 'react'
import SvgIcons from '../common/SvgIcons'
import { aktivGrotesk } from '@/app/layout'

const SurpriseMeCTA:React.FC<ISurpriseMeCTA> = ({name,onClick,text}) => {
  return (
    <div className='flex flex-col gap-[2px]'>
      <SvgIcons name={name} className='w-[20px] h-[20px] md:w-[28px] md:h-[28px]' />
      <span className={`${aktivGrotesk.className} font-[500] md:text-[14px] text-[9px]`}>{text}</span>
    </div>
  )
}

export default SurpriseMeCTA
