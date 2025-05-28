'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import GreenBG from '../../../../public/assets/images/green-bg.png'
import Image from 'next/image'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import useAppDispatch from '@/hooks/useDispatch'
import { updateCrossModal, updateLoginModal } from '@/store/auth/auth.slice'

const SurpriseMeLockModal: React.FC<{}> = () => {
  const [open, setOpen] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='rounded-[5px] md:max-w-[401px] p-0 max-w-[277px]'>
        <div className='absolute top-[-105px] md:top-[-150px] left-0 flex justify-center items-center w-full'>
          <SvgIcons
            name={ICONS_NAMES.SURPRISE_ME}
            className='w-[145px] h-[102px] md:w-[209px] md:h-[148px]'
          />
        </div>
        <div className='w-full flex justify-end box-border pt-[10px] pr-[10px]'>
          <button
            className='flex justify-center items-center'
            onClick={() => {
              setOpen(false)
              dispatch(updateCrossModal({ crossModal: true }))
            }}
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className='w-[16px] h-[16px]' />
          </button>
        </div>
        <div className='relative w-full h-full mb-5 px-3'>
          <Image
            className='relative w-full md:h-[721px] h-[506px]'
            src={GreenBG}
            alt='GREEN BG'
          />
          <div className='absolute flex flex-col justify-center items-center top-0'>
            <div className='self-center z-10 absolute top-[204px] md:top-[305px] left-[99px] md:left-[130px]'>
              <button
                onClick={() => {
                  dispatch(updateLoginModal({ loginModal: true }))
                  setOpen(false)
                }}
                className='relative'
              >
                <div className='w-[76px] h-[76px] md:w-[114px] md:h-[114px] rounded-full flex justify-center items-center bg-[#FFFFFF] relative'>
                  <SvgIcons
                    name={ICONS_NAMES.LOCK}
                    className='w-[31px] h-[42px] md:w-[46px] md:h-[63px]'
                  />
                </div>
              </button>
            </div>
            <SvgIcons
              className='absolute top-[27px] left-[23px] md:left-[35px] md:top-[39px] w-[90px] h-[119px] md:w-[135px] md:h-[180px]'
              name={ICONS_NAMES.MULTIPLE_SMILE_MOBILE}
            />
            <SvgIcons
              className='absolute top-[163px] md:top-[244px] left-[17px] md:left-[21px] w-[115px] h-[300px] md:w-[174px] md:h-[452px]'
              name={ICONS_NAMES.SPRITE_BOTTLE}
              width={115}
              height={300}
            />
            <SvgIcons
              className='absolute top-[18px] left-[198px] md:top-[25px] md:left-[294px] w-[41px] h-[38px] md:w-[62px] md:h-[57px]'
              name={ICONS_NAMES.SPRITE_PLAY}
              width={41}
              height={38}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SurpriseMeLockModal
