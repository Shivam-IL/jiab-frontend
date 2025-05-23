'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogOverlay
} from '@/components/ui/dialog'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { aktivGrotesk } from '@/app/layout'
import SurpriseMeCTA from '@/components/SurpriseMeCTA'

const SurpriseMeModal: React.FC<{}> = ({}) => {
  const [open, setOpen] = useState<boolean>(true)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='border-none md:max-w-[401px] max-w-[277px] shadow-none p-0 rounded-[10px]'>
        <div className='absolute top-[-105px] md:top-[-150px] left-0 flex justify-center items-center w-full'>
          <SvgIcons
            name={ICONS_NAMES.SURPRISE_ME}
            className='w-[145px] h-[102px] md:w-[209px] md:h-[148px]'
          />
        </div>
        <div className='flex justify-between items-start px-[10px] pt-[10px]'>
          <div className='w-[80%] relative flex gap-[10px]'>
            <SvgIcons
              name={ICONS_NAMES.MAN_WITH_SEARCH}
              className='w-[23px] h-[28px]'
            />
            <div className='flex flex-col gap-[2px]'>
              <p
                className={`${aktivGrotesk.className} font-[400] md:text-[16px] text-[12px] text-[#000000]`}
              >
                Observation_English_cool boy & cool girl
              </p>
              <p
                className={`${aktivGrotesk.className} font-[400] md:text-[12px] text-[8px] text-[#000000]`}
              >
                Chill guy and Chill girl,
              </p>
            </div>
          </div>
          <button
            className='flex justify-center items-center'
            onClick={() => {
              setOpen(false)
            }}
          >
            <SvgIcons
              name={ICONS_NAMES.CROSS}
              className='w-[16px] h-[16px] md:w-[24px] md:h-[24px]'
            />
          </button>
        </div>
        <div className='relative max-w-[255px] md:max-w-[369px] h-[429px] md:h-[621px] ml-[11px]'>
          <video
            className='w-full h-full relative bg-[#11A64B] '
            controls
            autoPlay
            muted
            loop
            poster='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
          >
            <source src='/videos/sample.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='bg-white rounded-[10px] px-[12px] pb-[16px] flex justify-between'>
          <div className='flex gap-[24px] md:gap-[34px] pl-[10px]'>
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
          <div className='pr-[10px]'>
            <SurpriseMeCTA
              name={ICONS_NAMES.VIEWS}
              text='2.3k'
              onClick={() => {}}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SurpriseMeModal
