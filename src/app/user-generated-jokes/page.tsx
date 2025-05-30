'use client'

import AktivGroteskText from '@/components/common/AktivGroteskText'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import UgcComponent from '@/components/UgcComponent'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MadeYouLaughExitPopup } from '@/components/ExitPopUps'

const UserGeneratedJokes = () => {
  const router = useRouter()
  const [isUnmounting, setIsUnmounting] = useState(false)

  useEffect(() => {
    return () => {
      setIsUnmounting(true)
    }
  }, [])

  return (
    <ScreenWrapper>
      <div>
        <div className='flex flex-col gap-[4px] md:gap-[12px]'>
          <div className='flex justify-between items-center'>
            <AktivGroteskText
              fontSize='text-[16px] md:text-[30px] uppercase'
              fontWeight='font-[700]'
              text='Joke Box'
            />
            <button onClick={() => router.push('/hall-of-lame')}>
              <AktivGroteskText
                fontSize='text-[12px] md:text-[20px]'
                fontWeight='font-[400]'
                className='text-[#11A64B]'
                text='Hall of Lame >'
              />
            </button>
          </div>
          <AktivGroteskText
            fontSize='text-[12px] md:text-[20px]'
            fontWeight='font-[400]'
            text='Jokes For you, Created By You'
          />
        </div>
        <UgcComponent />
      </div>
      {isUnmounting && (
        <MadeYouLaughExitPopup
          open={isUnmounting}
          onClose={() => {
            setIsUnmounting(false)
          }}
        />
      )}
    </ScreenWrapper>
  )
}

export default UserGeneratedJokes
