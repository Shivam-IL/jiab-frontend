import React, { useState } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import AktivGroteskText from '../AktivGroteskText'
import SurpriseMeCTA from '@/components/SurpriseMeCTA'
import GreenCTA from '@/components/GreenCTA'
import { MadeYouLaughExitPopup } from '@/components/ExitPopUps'

const UgcCard = () => {
  const [openMadYouLOL, setOpenMadYouLOL] = useState<boolean>(false)
  return (
    <div className='relative w-full p-[16px] md:px-[12px] flex flex-col gap-[16px] rounded-[5px] bg-[#FFFFFF]'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-[12px]'>
          <div className='w-[30px] md:w-[28px] h-[30px] md:h-[28px] flex items-end justify-center rounded-full border-[1px] border-black'>
            <SvgIcons
              name={ICONS_NAMES.TRAFFIC_LIGHT}
              className='w-[13px] h-[24px]'
            />
          </div>
          <div className='flex flex-col justify-between'>
            <AktivGroteskText
              text='Cab Driver'
              fontSize='text-[14px]'
              fontWeight='font-[700]'
            />
            <AktivGroteskText
              text='Kapil Sharma, Hindi'
              fontSize='text-[10px]'
              fontWeight='font-[500]'
            />
          </div>
        </div>
        <div className='flex gap-[6px]'>
          <AktivGroteskText
            text='Report'
            fontSize='text-[12px] text-[#FD0202]'
            fontWeight='font-[400]'
          />
          <SvgIcons name={ICONS_NAMES.REPORT} className='w-[20px] h-[20px]' />
        </div>
      </div>
      <div>
        <div className='relative w-full h-[260px] md:h-[282px] bg-[#00953B] px-[19px] flex items-center py-[23px] gap-[34px] rounded-t-[5px]'>
          <SvgIcons
            name={ICONS_NAMES.SPRITE_WITH_BUBBLE}
            className='w-[57px] md:w-[64px] h-[213px] md:h-[244px]'
          />
          <SvgIcons
            name={ICONS_NAMES.HEADPHONE2}
            className='w-[87px] h-[87px]'
          />
          <div className='absolute top-[5px] right-[10px]'>
            <SvgIcons
              name={ICONS_NAMES.UGC_MARK}
              className='w-[25px] md:w-[33px] h-[24px] md:h-[34px]'
            />
          </div>
          <div className='absolute bottom-[3px] left-[10px]'>
            <AktivGroteskText
              text='The content displayed above is user generated and may not reflect the opinions of Sprite® '
              fontSize='text-[7px]'
              fontWeight='font-[500]'
              className='text-white'
            />
          </div>
          <div></div>
        </div>
        <div className='bg-white border-x-[1px] border-b-[1px] border-[#D9D9D9] rounded-b-[5px] p-[8px] flex justify-between'>
          <div className='flex gap-[10px] md:gap-[34px] pl-[10px]'>
            <SurpriseMeCTA
              name={ICONS_NAMES.FUNNY}
              text='2.3k'
              onClick={() => {}}
            />
            <SurpriseMeCTA
              name={ICONS_NAMES.MAD}
              text='2.3k'
              onClick={() => {}}
            />
            <SurpriseMeCTA
              name={ICONS_NAMES.ANGRY}
              text='2.3k'
              onClick={() => {}}
            />
          </div>
          <div className='flex gap-[12px]'>
            <GreenCTA
              onClick={() => {
                setOpenMadYouLOL(true)
              }}
              text='Vote'
              paddingClass='px-[26px] py-[8px] md:px-[21px] md:py-[7px]'
              fontSize='text-[12px] md:text-[20px]'
              fontWeight='font-[700]'
            />
            <SurpriseMeCTA
              name={ICONS_NAMES.VIEWS}
              text='2.3k'
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      {openMadYouLOL && (
        <MadeYouLaughExitPopup
          open={openMadYouLOL}
          onClose={() => setOpenMadYouLOL(false)}
        />
      )}
    </div>
  )
}

export default UgcCard
