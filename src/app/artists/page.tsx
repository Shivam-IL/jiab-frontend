'use client'

import AktivGroteskText from '@/components/common/AktivGroteskText'
import ArtistComponent from '@/components/common/ArtistComponent'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import { ARTISTS_PAGE_HEADERS_DATA } from '@/constants'
import React from 'react'

const ArtistsPage = () => {
  return (
    <ScreenWrapper>
      <div className='flex flex-col gap-[4px]'>
        <div className='flex flex-col gap-[4px]'>
          <AktivGroteskText
            text={ARTISTS_PAGE_HEADERS_DATA.TITLE}
            fontSize='text-[16px] md:text-[30px]'
            fontWeight='font-[700]'
          />
          <AktivGroteskText
            text={ARTISTS_PAGE_HEADERS_DATA.SUB_TITLE}
            fontSize='text-[12px] md:text-[20px]'
            fontWeight='font-[400]'
          />
        </div>
        <div>
          <ArtistComponent />
        </div>
      </div>
    </ScreenWrapper>
  )
}

export default ArtistsPage
