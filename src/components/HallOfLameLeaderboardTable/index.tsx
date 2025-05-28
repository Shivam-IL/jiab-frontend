import React from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import { DAILY_WINNERS, ICONS_NAMES, PROFILE_IMAGES } from '@/constants'
import SvgIcons from '../common/SvgIcons'
import { aktivGrotesk } from '@/app/layout'
import CalendarDialog from '../CalendarDialog'
import { DateRange } from 'react-day-picker'

const DisplayTable = () => {
  return (
    <table className='w-full border-separate border-spacing-y-[12px] md:border-spacing-y-[20px]'>
      <thead>
        <tr className='border-none bg-[#FFE200] w-full'>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[700] text-center py-[12px] md:py-[20px] pl-[12px] md:pl-[60px] rounded-l-[5px] md:rounded-l-[10px]`}
          >
            Rank
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[700] md:text-center text-start py-[12px] pl-[22px] md:py-[20px]`}
          >
            Jokes
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[700] text-center py-[12px] md:py-[20px] pr-[12px] md:pr-[60px] rounded-r-[5px] md:rounded-r-[10px]`}
          >
            Votes
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className='border-none mt-[12px] bg-white'>
          <td
            className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400] text-center py-[12px] md:py-[19px] pl-[12px] md:pl-[60px] rounded-l-[5px] md:rounded-l-[10px]`}
          >
            1.
          </td>
          <td
            className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400] py-[12px] md:py-[19px] pl-[22px]`}
          >
            <div className='flex gap-[19px] md:justify-center'>
              <div className='min-w-[57px] md:min-w-[120px] min-h-[57px] md:min-h-[120px] rounded-[3px] bg-green'></div>
              <div className='flex flex-col text-start justify-between'>
                <div className='flex flex-col gap-[3px]'>
                  <AktivGroteskText
                    text='Title of the Joke'
                    fontSize='text-[12px] md:text-[20px]'
                    fontWeight='font-[700]'
                  />
                  <AktivGroteskText
                    text='Title of the Joke'
                    fontSize='text-[10px] md:text-[16px]'
                    fontWeight='font-[400]'
                  />
                </div>
                <AktivGroteskText
                  className='text-[rgba(0,0,0,0.5)]'
                  text='Traffic'
                  fontSize='text-[10px] md:text-[16px]'
                  fontWeight='font-[400]'
                />
              </div>
            </div>
          </td>
          <td
            className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400] text-center py-[12px] md:py-[19px] pr-[12px] md:pr-[60px] rounded-r-[5px] md:rounded-r-[10px]`}
          >
            <div className='flex flex-col justify-between items-center h-[57px] md:h-[120px]'>
              <AktivGroteskText
                text='1 Jan 2024'
                fontSize='text-[8px] md:text-[16px]'
                fontWeight='font-[400]'
                className='text-[rgba(0,0,0,0.5)]'
              />
              <div className='flex flex-col  md:gap-[4px] items-center'>
                <AktivGroteskText
                  text='37.6k'
                  fontSize='text-[16px] md:text-[32px]'
                  fontWeight='font-[700]'
                />
                <AktivGroteskText
                  text='Votes'
                  fontSize='text-[10px] md:text-[16px]'
                  fontWeight='font-[400]'
                />
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const HallOfLameLeaderboardTable = () => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    console.log('Selected date range:', range)
    // Handle the date range selection here
  }

  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex justify-between md:justify-start items-center md:gap-[12px]'>
        <button
          className='outline-none md:block hidden border-none'
          onClick={() => setIsCalendarOpen(true)}
        >
          <SvgIcons
            name={ICONS_NAMES.CALENDAR2}
            className='w-[18px] h-[18px] md:w-[22px] md:h-[22px]'
          />
        </button>
        <AktivGroteskText
          text={DAILY_WINNERS}
          fontSize='text-[14px] md:text-[20px]'
          fontWeight='font-[500] md:font-[400]'
        />
        <button
          className='outline-none md:hidden border-none'
          onClick={() => setIsCalendarOpen(true)}
        >
          <SvgIcons
            name={ICONS_NAMES.CALENDAR2}
            className='w-[18px] h-[18px]'
          />
        </button>
        <CalendarDialog
          open={isCalendarOpen}
          setOpen={setIsCalendarOpen}
          onDateSelect={handleDateRangeSelect}
        />
      </div>
      <div className='w-full flex flex-col gap-[28px] md:gap-[40px]'>
        <DisplayTable />
        <div>
          <AktivGroteskText
            text='YOUR RANK'
            fontSize='text-[16px] md:text-[20px]'
            fontWeight='font-[700]'
          />
        </div>
      </div>
    </div>
  )
}

export default HallOfLameLeaderboardTable
