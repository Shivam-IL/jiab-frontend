import { aktivGrotesk } from '@/app/layout'
import UgcFilterModal from '@/components/UgcFilterModal'
import React, { useEffect, useState } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import AktivGroteskText from '../AktivGroteskText'

const UgcFilter = () => {
  const [openUgcFilterModal, setOpenUgcFilterModal] = useState<boolean>(false)
  const [selectedFilters, setSelectedFilters] = useState({
    language: '',
    category: ''
  })

  console.log(selectedFilters)

  const handleApplyFilters = (filters: {
    language: string
    category: string
  }) => {
    setSelectedFilters(filters)
    setOpenUgcFilterModal(false)
  }

  useEffect(() => {
    return () => {
      setSelectedFilters({
        language: '',
        category: ''
      })
    }
  }, [])

  return (
    <>
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
      <UgcFilterModal
        open={openUgcFilterModal}
        onClose={() => setOpenUgcFilterModal(false)}
        onApply={handleApplyFilters}
      />
    </>
  )
}

export default UgcFilter
