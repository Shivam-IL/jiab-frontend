import React, { useState, useEffect } from 'react'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { aktivGrotesk } from '@/app/layout'
import AktivGroteskText from '../common/AktivGroteskText'
import UgcCard from '../common/UgcCard'
import UgcFilterModal from '../UgcFilterModal'
import { Dialog, DialogContent } from '../ui/dialog'
import GreenCTA from '../GreenCTA'
import { IUgcComponent } from '@/interfaces'

const UgcComponent: React.FC<IUgcComponent> = ({ isUnmounting }) => {
  const [openUgcFilterModal, setOpenUgcFilterModal] = useState<boolean>(false)
  const [selectedFilters, setSelectedFilters] = useState({
    language: '',
    category: ''
  })
  const [showExitModal, setShowExitModal] = useState(false)

  useEffect(() => {
    if (isUnmounting && (selectedFilters.language || selectedFilters.category)) {
      setShowExitModal(true)
    }
  }, [isUnmounting, selectedFilters])

  const handleApplyFilters = (filters: { language: string; category: string }) => {
    setSelectedFilters(filters)
    setOpenUgcFilterModal(false)
  }

  return (
    <div className='py-[16px]'>
      <div className='flex items-center justify-between md:justify-end md:gap-[12px]'>
        <div className='w-[239px] md:w-[418px] rounded-[108px] bg-white px-[10px] md:px-[16px] py-[9px] md:py-[13.5] flex items-center gap-[4px] border-[1px] border-[#383838]'>
          <SvgIcons
            name={ICONS_NAMES.GLASS}
            className='w-[17px] h-[17px] md:w-[23px] md:h-[23px]'
          />
          <input
            type='text'
            placeholder='Search by Name...'
            className={`w-full outline-none border-none bg-transparent ${aktivGrotesk.className} font-[400] text-[10px] md:text-[16px] text-[#383838]`}
          />
        </div>
        <div className='flex items-center gap-[4px]'>
          <AktivGroteskText
            text='Filter'
            fontSize='text-[14px] md:text-[16px]'
            fontWeight='font-[400]'
          />
          <button
            onClick={() => setOpenUgcFilterModal(true)}
            className='border-none outline-none'
          >
            <SvgIcons name={ICONS_NAMES.FILTER} className='w-[12px] h-[12px]' />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-x-[94px] md:gap-y-[24px] pt-[16px]'>
        {Array.from({ length: 9 }).map((_, index) => (
          <UgcCard key={index} />
        ))}
      </div>

      <UgcFilterModal
        open={openUgcFilterModal}
        onClose={() => setOpenUgcFilterModal(false)}
        onApply={handleApplyFilters}
      />

      <Dialog open={showExitModal} onOpenChange={setShowExitModal}>
        <DialogContent className='max-w-[343px] rounded-[10px] py-[16px] px-[16px]'>
          <div className='flex items-center justify-end pb-[8px]'>
            <button
              onClick={() => setShowExitModal(false)}
              className='border-none outline-none bg-transparent hover:opacity-70 transition-opacity'
            >
              <SvgIcons name={ICONS_NAMES.CROSS} className='w-[16px] h-[16px]' />
            </button>
          </div>
          <div className='flex flex-col gap-[24px]'>
            <AktivGroteskText
              text='Are you sure you want to leave?'
              fontSize='text-[16px]'
              fontWeight='font-[700]'
            />
            <AktivGroteskText
              text='Your selected filters will be lost.'
              fontSize='text-[12px]'
              fontWeight='font-[400]'
              className='text-gray-600'
            />
            <div className='flex flex-col gap-[12px]'>
              <GreenCTA
                onClick={() => {
                  // Apply filters before unmounting
                  setShowExitModal(false)
                }}
                text='Apply and Exit'
                className='w-full'
                paddingClass='pt-[19px] pb-[14px]'
                fontSize='text-[16px]'
                fontWeight='font-[700]'
              />
              <button
                onClick={() => {
                  setSelectedFilters({ language: '', category: '' })
                  setShowExitModal(false)
                }}
                className='w-full border border-gray-200 rounded-full pt-[19px] pb-[14px] hover:bg-gray-50'
              >
                <AktivGroteskText
                  text='Exit Without Applying'
                  fontSize='text-[16px]'
                  fontWeight='font-[700]'
                  className='text-gray-600'
                />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UgcComponent
