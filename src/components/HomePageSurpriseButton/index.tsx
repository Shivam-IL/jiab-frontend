import React, { useEffect, useState } from 'react'
import { GA_EVENTS, LOCAL_IMAGES } from '@/constants'
import SurpriseMeModal from '../common/SurpriseMeModal'
import { generateImageurl } from '@/utils'
import useAppSelector from '@/hooks/useSelector'
import SurpriseMeLockModal from '../common/SurpriseMeLockModal'
import { useCMSData } from '@/data'
import { triggerGAEvent } from '@/utils/gTagEvents'
import { useGlobalLoader } from '@/hooks/useGlobalLoader'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder
} from '@/api/utils/cdpEvents'

const HomePageSurpriseButton = () => {
  const { isAuthenticated, token, enableCoachMarks } = useAppSelector(
    state => state.auth
  )
  const [mounted, setMounted] = useState(false)
  const cmsData = useCMSData(mounted)
  const { forceHideLoader } = useGlobalLoader()

  useEffect(() => {
    setMounted(true)
  }, [])

  const [surpriseMeModal, setSurpriseMeModal] = useState<boolean>(false)
  const { selectedLanguage } = useAppSelector(state => state.language)
  const { mutate: sendCDPEvent } = useSendCDPEvent()

  const closeSurpriseMe = () => {
    forceHideLoader() // Ensure any loading states are cleared
    setSurpriseMeModal(false)
  }

  const { user } = useAppSelector(state => state.profile)

  const trigerCDPSurpriseMeClick = () => {
    if (user?.id) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildSurpriseMePayload({
          user_identifier: user.id
        })
      sendCDPEvent(payload)
    }
  }

  const openSurpriseMe = () => {
    setSurpriseMeModal(true)
    triggerGAEvent(GA_EVENTS.SPRITE_J24_SURPRISE_ME)
    trigerCDPSurpriseMeClick()
  }

  console.log(surpriseMeModal, 'surpriseMeModal')
  return (
    <>
      <button
        onClick={openSurpriseMe}
        className='fixed cursor-pointer md:top-[50%] top-[68%] right-[10px] border-[1px] border-[#11A64B] rounded-[100px] max-w-[98px] md:max-w-[180px] py-[8px] pl-[5px] pr-[8px] md:pl-[4px] md:pr-[18px] md:py-[4px] flex items-center gap-[5px] bg-yellow'
      >
        <div className='relative  min-w-[25px] min-h-[25px] md:min-w-[42px]  md:min-h-[42px]  rounded-full bg-white flex items-center justify-center'>
          <Image
            className='md:w-[33px] md:h-[33px] w-[20px] h-[20px]'
            src={generateImageurl(LOCAL_IMAGES.SURPRISE_ME)}
            alt='surprise me'
            width={42}
            height={42}
          />
          {/* <SvgIcons
          name={ICONS_NAMES.SURPRISE}
          className='md:w-[33px] md:h-[33px] w-[20px] h-[20px]'
        /> */}
        </div>
        <p
          className={cn(
            'text-[#11A64B] uppercase leading-tight text-center break-words whitespace-normal text-[9px] md:text-[16px] font-bold',
            {
              'text-[6px] md:text-[11px]': selectedLanguage === 'kn',
              'text-[7px] md:text-[13px]': selectedLanguage === 'hi'
            }
          )}
        >
          {cmsData.comic.surpriseMe}
        </p>
      </button>
      {surpriseMeModal && isAuthenticated && token && !enableCoachMarks && (
        <SurpriseMeModal onClose={()=>closeSurpriseMe()} surpriseMeCheck={true} />
      )}
      {surpriseMeModal && !isAuthenticated && !token && (
        <SurpriseMeLockModal onClose={closeSurpriseMe} />
      )}
    </>
  )
}

export default HomePageSurpriseButton
