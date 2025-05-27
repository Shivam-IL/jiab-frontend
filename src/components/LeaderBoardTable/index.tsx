import React from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import { DAILY_WINNERS, ICONS_NAMES } from '@/constants'
import SvgIcons from '../common/SvgIcons'

const LeaderBoardTable = () => {
  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex justify-between items-center'>
        <AktivGroteskText
          text={DAILY_WINNERS}
          fontSize='text-[14px]'
          fontWeight='font-[500]'
        />
        <button className='outline-none border-none'>
          <SvgIcons
            name={ICONS_NAMES.CALENDAR2}
            className='w-[18px] h-[18px]'
          />
        </button>
      </div>
      <div className='w-full'>
            <tr className='w-full'>
              <td>
                <AktivGroteskText
                  text='Rank'
                  fontSize='text-[12px]'
                  fontWeight='font-[400]'
                />
              </td>
              <td>
                <AktivGroteskText
                  text='Avataar'
                  fontSize='text-[12px]'
                  fontWeight='font-[400]'
                />
              </td>
              <td>
                <AktivGroteskText
                  text='Mobile No'
                  fontSize='text-[12px]'
                  fontWeight='font-[400]'
                />
              </td>
              <td>
                <AktivGroteskText
                  text='Comic Coins'
                  fontSize='text-[12px]'
                  fontWeight='font-[400]'
                />
              </td>
              <td>
                <AktivGroteskText
                  text='Price'
                  fontSize='text-[12px]'
                  fontWeight='font-[400]'
                />
              </td>
            </tr>

      </div>
    </div>
  )
}

export default LeaderBoardTable
