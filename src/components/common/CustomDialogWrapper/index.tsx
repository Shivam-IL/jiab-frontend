import { DialogContent, Dialog } from '@/components/ui/dialog'
import { ICustomDialogWrapper } from '@/interfaces'
import React from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'

const CustomDialogWrapper: React.FC<ICustomDialogWrapper> = ({
  open,
  onClose,
  children
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='p-0 bg-white max-w-[318px] rounded-[10px]'>
        <div className='flex mb-[6px] justify-end pt-[16px] pr-[16px]'>
          <button
            className='outline-none border-none'
            onClick={() => onClose && onClose()}
          >
            <SvgIcons
              name={ICONS_NAMES.CROSS}
              className='w-[12px] h-[12px] text-black'
            />
          </button>
        </div>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialogWrapper
