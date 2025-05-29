import { IExitPopupWrapper } from '@/interfaces'
import React from 'react'
import CustomDialogWrapper from '../CustomDialogWrapper'
import SvgIcons from '../SvgIcons'
import AktivGroteskText from '../AktivGroteskText'
import GreenCTA from '@/components/GreenCTA'
import { aktivGrotesk } from '@/app/layout'

const ExitPopupWrapper: React.FC<IExitPopupWrapper> = ({
  open,
  onClose,
  icon,
  title,
  subtitle
}) => {
  return (
    <CustomDialogWrapper open={open} onClose={onClose}>
      <div className='w-full  h-full flex flex-col gap-[16px] items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-[50px] h-[50px] rounded-full bg-[#FFE200]'>
          <SvgIcons name={icon} className='w-[25px] h-[25px]' />
        </div>
        <div className='flex flex-col items-center px-[27px] w-[80%] justify-center gap-[16px]'>
          <AktivGroteskText
            text={title}
            fontSize='text-[18px]'
            fontWeight='font-[700]'
          />
          <AktivGroteskText
            text={subtitle}
            fontSize='text-[16px]'
            fontWeight='font-[400]'
          />
          <AktivGroteskText
            text='Are you sure you want to exit?'
            fontSize='text-[14px]'
            fontWeight='font-[500]'
          />
        </div>
        <div className='flex pb-[16px] gap-[14px]'>
          <button
            onClick={onClose}
            className={`py-[10px] ${aktivGrotesk.className} px-[28px] bg-white border-[1px] border-black rounded-[100px] text-[14px] font-[700]`}
          >
            Yes
          </button>
          <GreenCTA
            paddingClass='py-[10px] px-[28px]'
            text='No'
            onClick={onClose}
          />
        </div>
      </div>
    </CustomDialogWrapper>
  )
}

export default ExitPopupWrapper
