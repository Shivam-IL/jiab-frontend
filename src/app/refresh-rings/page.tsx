'use client'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import React from 'react'
import Image from 'next/image'
import { useCMSData } from '@/data'
import { useEffect, useState } from 'react'
import SvgIcons from '@/components/common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
const RefreshRings = () => {
  const [mounted, setMounted] = useState(false)
  const cmsData = useCMSData(mounted)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-[url('/other-svgs/jiab-bg.svg')] bg-cover bg-center min-h-screen w-full flex justify-center items-center">
      <ScreenWrapper className='bg-transparent min-h-screen'>
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='flex flex-col items-center justify-center bg-white rounded-[16px] p-[6dvh]'>
            <Image
              src='/other-svgs/scan-icon.svg'
              alt='Refresh Rings'
              width={55}
              height={45}
            />
            <p className='text-[18px] font-black text-black'>
              {cmsData?.refreshRings?.refreshRingsHeader}
            </p>
            <p className='text-[16px] text-black text-center mt-[10px] max-w-[250px]'>
              {cmsData?.refreshRings?.refreshRingContent}
            </p>
          </div>
          <SvgIcons
            className='md:hidden absolute bottom-[10%] left-[4%] w-[124px] h-[100px]'
            name={ICONS_NAMES.REFRESH_RINGS_SMILE}
          />
        </div>
      </ScreenWrapper>
    </div>
  )
}

export default RefreshRings
