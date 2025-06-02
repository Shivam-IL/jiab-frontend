import React, { useState } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import AktivGroteskText from '../AktivGroteskText'
import SurpriseMeCTA from '@/components/SurpriseMeCTA'
import GreenCTA from '@/components/GreenCTA'
import { MadeYouLaughExitPopup } from '@/components/ExitPopUps'

const UgcCard = () => {
  return (
    <div className='relative w-full p-[16px] md:px-[12px] flex flex-col gap-[10px] rounded-[5px] bg-[#FFFFFF]'>
      <div className='flex justify-between items-center md:items-start'>
        <div className='flex w-full items-start gap-[12px]'>
          <div className='min-w-[30px] md:min-w-[28px] min-h-[30px] md:min-h-[28px] flex items-end justify-center rounded-full border-[1px] border-black'>
            <SvgIcons
              name={ICONS_NAMES.TRAFFIC_LIGHT}
              className='w-[13px] h-[24px]'
            />
          </div>
          <div className='flex flex-col gap-[6.58px] md:gap-[1.58px] w-full'>
            <div className='flex justify-between items-center flex-grow'>
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
              <div className='flex gap-[6px]'>
                <AktivGroteskText
                  text='Report'
                  fontSize='text-[12px] text-[#FD0202]'
                  fontWeight='font-[400]'
                />
                <SvgIcons
                  name={ICONS_NAMES.REPORT}
                  className='w-[20px] h-[20px]'
                />
              </div>
            </div>
            <AktivGroteskText
              text='The content displayed above is user generated and may not reflect the opinions of Sprite® '
              fontSize='text-[10px] md:text-[12px]'
              fontWeight='font-[400]'
              className='text-[#313131]  block'
            />
          </div>
        </div>
      </div>
      <div>
        <div className='relative w-full h-[278px] md:h-[330px] bg-[#00953B] px-[19px] flex items-center py-[10px] gap-[34px] rounded-t-[5px]'>
          <SvgIcons
            name={ICONS_NAMES.SPRITE_WITH_BUBBLE}
            className='w-[57px] md:w-[78px] h-[213px] md:h-[274px]'
          />
          {/* <SvgIcons
            name={ICONS_NAMES.HEADPHONE2}
            className='w-[87px] h-[87px]'
          /> */}
          <div className='absolute top-[5px] right-[10px]'>
            <SvgIcons
              name={ICONS_NAMES.UGC_MARK}
              className='w-[25px] md:w-[33px] h-[24px] md:h-[34px]'
            />
          </div>
          {/* <div className='absolute md:hidden bottom-[3px] left-[10px]'>
            <AktivGroteskText
              text='The content displayed above is user generated and may not reflect the opinions of Sprite® '
              fontSize='text-[7px]'
              fontWeight='font-[500]'
              className='text-white'
            />
          </div> */}
          <div></div>
        </div>
        <div className='bg-white border-x-[1px] border-b-[1px] border-[#D9D9D9] rounded-b-[5px] p-[8px] flex justify-between'>
          <div className='flex gap-[10px] md:gap-[20px] pl-[10px]'>
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
            <div className='flex items-center'>
              <GreenCTA
                onClick={() => {}}
                text='Vote'
                className='leading-tight flex items-center justify-center'
                paddingClass='px-[26px] py-[8px] md:px-[21px] md:py-[7px]'
                fontSize='text-[12px] md:text-[16px]'
                fontWeight='font-[700]'
              />
            </div>
            <SurpriseMeCTA
              name={ICONS_NAMES.VIEWS}
              text='2.3k'
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UgcCard
