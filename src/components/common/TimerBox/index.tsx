import { ITimerBox } from '@/interfaces'
import React from 'react'
import AktivGroteskText from '../AktivGroteskText'

const TimerBox: React.FC<ITimerBox> = ({ text }) => {
  return (
    <span className='w-[17.35px] md:w-[33.1px] h-[17.35px] md:h-[33.1px] bg-[#FFE200] flex justify-center items-center'>
      <AktivGroteskText text={text} fontSize='text-[10px] md:text-[20px]' fontWeight='font-[500]' />
    </span>
  )
}

export default TimerBox
