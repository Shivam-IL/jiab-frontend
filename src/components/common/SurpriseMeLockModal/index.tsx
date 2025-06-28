'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES, IMAGES, SESSION_STORAGE_KEYS } from '@/constants'
import useAppDispatch from '@/hooks/useDispatch'
import { updateCrossModal, updateLoginModal } from '@/store/auth/auth.slice'
import { useGlobalLoader } from '@/hooks/useGlobalLoader'
import { generateImageurl } from '@/utils'
import Image from 'next/image'
const SurpriseMeLockModal = ({
  onClose,
  forceShow = false
}: {
  onClose?: () => void
  forceShow?: boolean
}) => {
  // const { shouldShow, hasChecked } = useSessionModal(
  //   "hasShownSurpriseMeLock",
  //   forceShow
  // );
  const [open, setOpen] = useState<boolean>(false)
  useGlobalLoader()

  console.log('forceShow', forceShow)

  const dispatch = useAppDispatch()

  // // Set open state based on session check
  // useEffect(() => {
  //   if (hasChecked) {
  //     if (shouldShow) {
  //       setOpen(true);
  //     } else {
  //       onClose?.();
  //     }
  //   }
  // }, [shouldShow, hasChecked, onClose]);

  // Handle modal close with proper cleanup
  const handleClose = () => {
    sessionStorage.setItem(SESSION_STORAGE_KEYS.HAS_SHOWN_LOCK_MODAL, 'true')
    setOpen(false)
    onClose?.()
  }

  useEffect(() => {
    setOpen(true)
  }, [])

  // useEffect(() => {
  //   return () => {
  //     forceHideLoader(); // Cleanup on unmount
  //   };
  // }, [forceHideLoader]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        style={{
          borderRadius: '12.5px'
        }}
        className='p-0 max-w-[37dvh] gap-2'
      >
        <div className='absolute top-[-105px] md:top-[-100px] left-0 flex justify-center items-center w-full'>
          <Image
            src='/static/sprite/icons/surprise-me.svg'
            alt='SURPRISE ME'
            className='w-[136px] h-[97px]'
            width={145}
            height={102}
          />
        </div>
        <div className='w-full relative h-fit flex justify-end box-border pt-[10px] pr-[10px]'>
          <button
            className='flex justify-center items-center outline-none border-none'
            onClick={() => {
              dispatch(updateCrossModal({ crossModal: true }))
              handleClose()
            }}
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className='w-[20px] h-[20px]' />
          </button>
        </div>
        <div className='relative  mb-5 px-3'>
          <div
            style={{
              backgroundImage: `url(${generateImageurl(
                IMAGES.SURPRISE_ME_LOCK_MODAL
              )})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              aspectRatio: '9/16'
            }}
            className='relative rounded-[5px]'
          >
            {/* <Image
            className='relative  aspect-[9/16]'
            src={GreenBG}
            alt='GREEN BG'
          /> */}
            <div className='relative flex flex-col h-full justify-center items-center top-0 left-0'>
              <div className='z-10 flex flex-col justify-center items-center h-[100%] flex-grow'>
                <button
                  onClick={() => {
                    dispatch(updateLoginModal({ loginModal: true }))
                    handleClose()
                  }}
                  className='relative'
                >
                  <div className='w-[76px] h-[76px] md:w-[68px] md:h-[68px] rounded-full flex justify-center items-center bg-[#FFFFFF] relative'>
                    <SvgIcons
                      name={ICONS_NAMES.LOCK}
                      className='w-[31px] h-[42px] md:w-[27px] md:h-[37px]'
                    />
                  </div>
                </button>
              </div>
              {/* <SvgIcons
                className="absolute top-[27px] left-[23px] md:left-[18px] md:top-[23px] w-[90px] h-[119px] md:w-[81px] md:h-[107px]"
                name={ICONS_NAMES.MULTIPLE_SMILE_MOBILE}
              />
              <SvgIcons
                className="absolute xxs:top-[118px] top-[163px] md:top-[145px] left-[12px] md:left-[21px] xxs:w-[80px] w-[115px] h-[300px] md:w-[104px] md:h-[269px]"
                name={ICONS_NAMES.SPRITE_BOTTLE}
                width={115}
                height={300}
              /> */}
              <SvgIcons
                className='absolute top-[18px] right-[20px] md:top-[14px] w-[41px] h-[38px] md:w-[37px] md:h-[34px]'
                name={ICONS_NAMES.SPRITE_PLAY}
                width={41}
                height={38}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SurpriseMeLockModal
