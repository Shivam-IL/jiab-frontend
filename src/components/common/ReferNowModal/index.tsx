import { Dialog, DialogContent } from '@/components/ui/dialog'
import { IReferNowModal } from '@/interfaces'
import React from 'react'
import SvgIcons from '../SvgIcons'
import {
  ICONS_NAMES,
} from '@/constants'
import AktivGroteskText from '../AktivGroteskText'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'

const ReferNowModal: React.FC<IReferNowModal> = ({
  open,
  onClose,
  title,
  subtitle,
  ctaText,
  phoneNumber,
  onChange,
  onSubmit,
  placeholder="Enter Your Friend's Mobile No.",
  error,
  isSendingReferral=false
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-[343px] md:max-w-[401px] gap-0 rounded-[10px] p-0'>
        <div className='flex justify-end pt-[16px]  pr-[16px] md:pr-[18px]'>
          <button
            onClick={() => {
              onClose()
            }}
            className='p-0 self-end cursor-pointer border-none outline-none'
          >
            <SvgIcons
              name={ICONS_NAMES.CROSS}
              className='w-[20px] h-[20px]'
            />
          </button>
        </div>
        <div className='w-full px-[22px] md:px-[16px] pt-[29.78px] md:pt-[18px] pb-[23px] flex flex-col gap-[30px] md:gap-[24px]'>
          <div className=' relative flex flex-col gap-[8px] md:gap-[12px] text-center items-center'>
            <AktivGroteskText
              text={title}
              fontSize='text-[20px] md:text-[24px]'
              fontWeight='font-[700]'
            />
            <AktivGroteskText
              text={subtitle}
              fontSize='text-[16px] md:text-[20px]'
              fontWeight='font-[400]'
            />
          </div>
          <form onSubmit={(event)=>{
            event.preventDefault()
          }} className='flex flex-col gap-[28px]'>
            <Input
              name='referPhoneNumber'
              type='text'
              value={phoneNumber}
              fontSize='text-[14px] md:text-[16px]'
              onChange={onChange}
              error={error}
              placeholder={placeholder}
            />
            <div className='flex flex-col justify-center items-center'>
              <GreenCTA
                className=''
                text={ctaText}
                fontSize='text-[16px] md:text-[20px]'
                paddingClass='py-[10px] md:py-[10px] px-[28px]'
                disabled={isSendingReferral}
                onClick={() => {
                  onSubmit()
                }}
              />
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReferNowModal
