import React, { useState } from 'react'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES, LOCAL_IMAGES } from '@/constants'
import AktivGroteskText from '../common/AktivGroteskText'
import SurpriseMeModal from '../common/SurpriseMeModal'
import surpriseMeIcon from '@/assets/images/surprise-me-icon.png'
import { generateImageurl } from '@/utils'

const HomePageSurpriseButton = () => {
  const [surpriseMeModal, setSurpriseMeModal] = useState<boolean>(false)

  return (
    <>
      <button
        onClick={() => setSurpriseMeModal(true)}
        className='fixed cursor-pointer top-[50%] right-[10px] border-[1px] border-[#11A64B] rounded-[100px] min-w-[78px] md:max-w-[185px]
    py-[8px] pl-[5px] pr-[8px] md:px-[24px] md:py-[15px] flex items-center gap-[5px] bg-yellow'
      >
        <div className='relative  min-w-[25px] min-h-[25px] md:min-w-[42px]  md:min-h-[42px]  rounded-full bg-white flex items-center justify-center'>
          <img
            className='md:w-[33px] md:h-[33px] w-[20px] h-[20px]'
            src={generateImageurl(LOCAL_IMAGES.SURPRISE_ME)}
            alt='surprise me'
          />
          {/* <SvgIcons
          name={ICONS_NAMES.SURPRISE}
          className='md:w-[33px] md:h-[33px] w-[20px] h-[20px]'
        /> */}
        </div>
        <AktivGroteskText
          text='Surprise Me'
          className='text-[#11A64B] uppercase leading-tight text-center text-[8px] md:text-[16px] font-bold'
        />
      </button>
      {surpriseMeModal && (
        <SurpriseMeModal
          onClose={() => {
            setSurpriseMeModal(false)
          }}
        />
      )}
    </>
  )
}

export default HomePageSurpriseButton
