import React from 'react'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { aktivGrotesk } from '@/app/layout'
import AktivGroteskText from '../common/AktivGroteskText'
import UgcCard from '../common/UgcCard'

const UgcComponent = () => {
  return (
    <div className='py-[16px]'>
      <div className='flex items-center justify-between'>
        <div className='w-[239px]  rounded-[108px] bg-white px-[10px] py-[9px] flex items-center gap-[4px] border-[1px] border-[#383838]'>
          <SvgIcons name={ICONS_NAMES.GLASS} className='w-[17px] h-[17px]' />
          <input
            type='text'
            placeholder='Search by Name...'
            className={`w-full outline-none border-none bg-transparent ${aktivGrotesk.className} font-[400] text-[10px] text-[#383838]`}
          />
        </div>
        <div className='flex items-center gap-[4px]'>
            <AktivGroteskText text='Filter' fontSize='text-[14px]' fontWeight='font-[400]' />
            <button className='border-none outline-none'>
                <SvgIcons name={ICONS_NAMES.FILTER} className='w-[12px] h-[12px]' />
            </button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-x-[94px] md:gap-y-[24px] pt-[16px]'>
        {Array.from({ length: 9 }).map((_, index) => (
          <UgcCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default UgcComponent
