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
  const [footerHeight, setFooterHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const cmsData = useCMSData(mounted)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const updateViewportHeight = () => {
      // Use window.innerHeight for better iOS support
      setViewportHeight(window.innerHeight)
    }

    const calculateFooterHeight = () => {
      // Try to find mobile footer first
      const mobileFooter =
        document.querySelector('[data-footer="mobile"]') ||
        document.querySelector('.bg-white.w-full.h-\\[71px\\]') ||
        document.querySelector('.fixed.bottom-0') ||
        document.querySelector('#mobile-footer')

      if (mobileFooter && mobileFooter instanceof HTMLElement) {
        setFooterHeight(mobileFooter.offsetHeight)
      } else {
        // Fallback to default mobile footer height
        setFooterHeight(71)
      }
    }

    // Calculate on mount and resize
    updateViewportHeight()
    calculateFooterHeight()
    
    window.addEventListener('resize', () => {
      updateViewportHeight()
      calculateFooterHeight()
    })

    // Handle iOS viewport changes
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        updateViewportHeight()
        calculateFooterHeight()
      }, 100)
    })

    // Use ResizeObserver for more accurate detection
    const resizeObserver = new ResizeObserver(() => {
      updateViewportHeight()
      calculateFooterHeight()
    })
    
    const footer =
      document.querySelector('[data-footer="mobile"]') ||
      document.querySelector('.bg-white.w-full.h-\\[71px\\]') ||
      document.querySelector('.fixed.bottom-0') ||
      document.querySelector('#mobile-footer')

    if (footer) {
      resizeObserver.observe(footer)
    }

    return () => {
      window.removeEventListener('resize', updateViewportHeight)
      window.removeEventListener('orientationchange', updateViewportHeight)
      resizeObserver.disconnect()
    }
  }, [])

  const pageHeight = viewportHeight > 0 ? `${viewportHeight - footerHeight}px` : '100vh'

  return (
    <div 
      className="bg-[url('/other-svgs/jiab-bg.svg')] bg-cover bg-center w-full flex justify-center items-center overflow-hidden"
      style={{ height: pageHeight }}
    >
      <ScreenWrapper className='bg-transparent'>
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
        </div>
      </ScreenWrapper>
      <SvgIcons
        className='md:hidden absolute bottom-[15%] left-[4%] w-[124px] h-[100px]'
        name={ICONS_NAMES.REFRESH_RINGS_SMILE}
      />
    </div>
  )
}

export default RefreshRings
