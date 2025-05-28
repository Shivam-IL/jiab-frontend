import { IMobileTempNavBar } from '@/interfaces'
import React from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { useRouter } from 'next/navigation'
import AktivGroteskText from '../AktivGroteskText'

const MobileTempNavBar: React.FC<IMobileTempNavBar> = ({ title, subtitle }) => {
  const router = useRouter()
  return (
    <div className='md:hidden sticky top-0 z-10 bg-white flex flex-col px-[16px] pt-[20px] pb-[15px] gap-[15px]'>
      <button onClick={() => router.back()}>
        <SvgIcons name={ICONS_NAMES.LONG_ARROW} width={18} height={15} />
      </button>
      <div className='flex flex-col gap-[6px]'>
        <AktivGroteskText
          text={title}
          fontSize='text-[16px]'
          fontWeight='font-[700]'
        />
        {subtitle && (
          <AktivGroteskText
            text={subtitle}
            fontSize='text-[12px]'
            fontWeight='font-[400]'
          />
        )}
      </div>
    </div>
  )
}

export default MobileTempNavBar
