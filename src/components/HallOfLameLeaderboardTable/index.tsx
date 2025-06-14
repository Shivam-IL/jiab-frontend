import React from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import { ICONS_NAMES } from '@/constants'
import SvgIcons from '../common/SvgIcons'
import { aktivGrotesk } from '@/app/layout'
import CalendarDialog from '../CalendarDialog'
import { DateRange } from 'react-day-picker'
import GreenCTA from '../GreenCTA'
import {
  IHallOfLameDisplayTableProps,
  IHallOfLameData,
  IHallOfLameLeaderboardTableProps
} from '@/types'
import { formatNumberToK, formatTimestampToDate, getLabel } from '@/utils'

const DisplayTable = ({
  rank,
  jokes,
  votes,
  data,
  offset
}: IHallOfLameDisplayTableProps) => {
  return (
    <table className='w-full border-separate border-spacing-y-[12px] md:border-spacing-y-[20px]'>
      <thead>
        <tr className='border-none bg-[#FFE200] w-full'>
          <th
            className={`${aktivGrotesk.className} mb-[12px] box-border text-[12px] md:text-[20px] font-[700] text-center py-[12px] md:py-[20px] pl-[12px] md:pl-[60px] rounded-l-[5px] md:rounded-l-[10px]`}
          >
            {rank}
          </th>
          <th
            className={`${aktivGrotesk.className} mb-[12px] box-border text-[12px] md:text-[20px] font-[700]  text-start py-[12px] pl-[22px] md:py-[20px]`}
          >
            {jokes}
          </th>
          <th
            className={`${aktivGrotesk.className} mb-[12px] box-border text-[12px] md:text-[20px] font-[700] text-center py-[12px] md:py-[20px] pr-[12px] md:pr-[60px] rounded-r-[5px] md:rounded-r-[10px]`}
          >
            {votes}
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.length > 0 &&
          data.map((item: IHallOfLameData) => {
            return (
              <tr key={item.id} className='border-none mt-[12px] bg-white'>
                <td
                  className={`${aktivGrotesk.className} relative text-[12px] md:text-[16px] font-[400] text-center py-[12px] box-border md:py-[19px] pl-[12px] md:pl-[60px] rounded-l-[5px] md:rounded-l-[10px]`}
                >
                  {(offset - 1) * 5 + (item?.rank ?? 0)}.
                </td>
                <td
                  className={`${aktivGrotesk.className} relative box-border text-[12px] md:text-[16px] font-[400] py-[12px] md:py-[19px] pl-[22px]`}
                >
                  <div className='flex gap-[19px] box-border relative w-full'>
                    <div className='min-w-[57px] md:min-w-[72px] min-h-[57px] md:min-h-[72px] rounded-[3px] bg-green'></div>
                    <div className='flex flex-col text-start box justify-between'>
                      <div className='flex flex-col md:gap-0 gap-[4px] justify-between'>
                        <AktivGroteskText
                          text={item?.title ?? ''}
                          className='leading-tight w-full'
                          fontSize='text-[12px] md:text-[18px]'
                          fontWeight='font-[700]'
                        />
                        <AktivGroteskText
                          text={item?.jokeOwnerName ?? ''}
                          className='leading-tight w-full'
                          fontSize='text-[10px] md:text-[16px]'
                          fontWeight='font-[400]'
                        />
                      </div>
                      <AktivGroteskText
                        text={getLabel(item?.labels ?? [])}
                        className='leading-tight w-full text-[rgba(0,0,0,0.5)]'
                        fontSize='text-[10px] md:text-[14px]'
                        fontWeight='font-[400]'
                      />
                    </div>
                  </div>
                </td>
                <td
                  className={`${aktivGrotesk.className} box-border text-[12px] md:text-[16px] font-[400] text-center py-[12px] md:py-[19px] pr-[12px] md:pr-[60px] rounded-r-[5px] md:rounded-r-[10px]`}
                >
                  <div className='flex flex-col justify-between md:justify-center gap-[2px] md:gap-[9px] items-center h-[57px] md:h-fit relative w-full'>
                    <AktivGroteskText
                      text={formatTimestampToDate(item?.updatedTimestamp ?? 0)}
                      fontSize='text-[8px] md:text-[14px]'
                      fontWeight='font-[400]'
                      className='text-[rgba(0,0,0,0.5)] w-full'
                    />
                    <div className='flex flex-col gap-[2px] md:gap-[4px] items-center'>
                      <AktivGroteskText
                        text={formatNumberToK(item?.voteCount ?? 0)}
                        className='leading-tight w-full'
                        fontSize='text-[16px] md:text-[20px]'
                        fontWeight='font-[700]'
                      />
                      <AktivGroteskText
                        text='Votes'
                        className='leading-tight w-full'
                        fontSize='text-[10px] md:text-[16px]'
                        fontWeight='font-[400]'
                      />
                    </div>
                  </div>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

const HallOfLameLeaderboardTable = ({
  weeklyTopJokes,
  prevButtonText,
  nextButtonText,
  rank,
  jokes,
  votes,
  setOffset,
  data,
  totalPages,
  offset
}: IHallOfLameLeaderboardTableProps) => {
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
          text={weeklyTopJokes}
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
        <DisplayTable
          offset={offset}
          rank={rank}
          jokes={jokes}
          votes={votes}
          data={data}
        />
        {/*  <div>
          <AktivGroteskText
            text='YOUR RANK'
            fontSize='text-[16px] md:text-[20px]'
            fontWeight='font-[700]'
          />
        </div>*/}
      </div>
      <div className='flex gap-[12px] md:gap-[24px] self-center'>
        <button
          onClick={() =>
            setOffset(prev => {
              if (prev > 1) {
                return prev - 1
              }
              return prev
            })
          }
          className={`px-[36px] py-[8px] md:py-[20px] md:px-[60px] border-[1px] ${
            offset > 1
              ? 'text-black border-black'
              : 'text-[rgba(0,0,0,0.3)] border-[rgba(0,0,0,0.2)]'
          } rounded-[100px]`}
        >
          <AktivGroteskText
            text={prevButtonText}
            className={`${
              offset > 1 ? 'text-black' : 'text-[rgba(0,0,0,0.3)]'
            } leading-tight relative`}
            fontSize='text-[14px] md:text-[20px]'
            fontWeight='font-[700]'
          />
        </button>
        <GreenCTA
          disabled={totalPages > offset ? false : true}
          className='leading-tight'
          fontSize='text-[14px] md:text-[20px]'
          fontWeight='font-[700]'
          paddingClass='px-[36px] py-[8px] md:py-[20px] md:px-[60px] '
          text={nextButtonText}
          onClick={() => {
            setOffset(prev => {
              if (prev < totalPages) {
                return prev + 1
              }
              return prev
            })
          }}
        />
      </div>
    </div>
  )
}

export default HallOfLameLeaderboardTable
