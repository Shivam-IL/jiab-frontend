import React, { useState } from 'react'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import AktivGroteskText from '../common/AktivGroteskText'
import SurpriseMeModal from '../common/SurpriseMeModal'

const HomePageSurpriseButton = () => {
    const [surpriseMeModal, setSurpriseMeModal] = useState<boolean>(false)
  
  return (
    <div onClick={() => setSurpriseMeModal(true)} className='fixed cursor-pointer top-[50%] right-[10px] border-[1px] border-[#11A64B] rounded-[100px] max-w-[78px] md:max-w-[185px]
    p-[8px] md:px-[1.5rem] md:py-[1.25rem] flex items-center gap-[5px] bg-yellow'>
      <div className='relative w-[25px] h-[25px] md:w-[42px]  md:h-[42px] rounded-full bg-white flex items-center justify-center'>
        <SvgIcons name={ICONS_NAMES.SURPRISE} className='md:w-[33px] md:h-[33px] w-[20px] h-[20px]' />
      </div>
      <AktivGroteskText text='Surprise Me' className='text-[#11A64B] text-center text-[8px] md:text-[12px] font-bold' />
      {surpriseMeModal && <SurpriseMeModal />}
    </div>
  )
}

export default HomePageSurpriseButton
