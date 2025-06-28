import { Dialog, DialogContent } from '@/components/ui/dialog'
import { IReportPopup } from '@/interfaces'
import React from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import AktivGroteskText from '../AktivGroteskText'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'

const ReportPopup: React.FC<IReportPopup> = ({
  open,
  onClose,
  title,
  ctaText,
  refferalLink,
  onChange,
  onSubmit,
  placeholder = 'Source URL*',
  error,
  onBlur
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
          <AktivGroteskText
            text={title}
            fontSize='text-[14px] md:text-[16px]'
            fontWeight='font-[700]'
            className='text-center'
          />
          <form
            onSubmit={event => {
              event.preventDefault()
            }}
            className='flex flex-col gap-[28px]'
          >
            <Input
              name='refferalLink'
              type='text'
              value={refferalLink}
              fontSize='text-[14px] md:text-[16px]'
              onChange={onChange}
              error={error}
              placeholder={placeholder}
              onBlur={onBlur}
            />
            <div className='flex flex-col justify-center items-center'>
              <GreenCTA
                className='w-full'
                text={ctaText}
                fontSize='text-[16px] md:text-[20px]'
                paddingClass='py-[10px] md:py-[10px] px-[28px]'
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

export default ReportPopup
