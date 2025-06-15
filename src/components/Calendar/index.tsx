'use client'

import React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { aktivGrotesk } from '@/app/layout'

interface CalendarProps {
  value?: string
  placeholder?: string
  onChange: (name: string, value: string) => void
  name: string
  error?: string
  fontSize?: string
  paddingClass?: string
  bgColor?: string
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

const Calendar: React.FC<CalendarProps> = ({
  value,
  placeholder,
  onChange,
  name,
  error = '',
  fontSize = 'text-[14px]',
  paddingClass = 'pl-[16px] pr-[16px] py-[16px] md:py-[19px] md:pl-[25px]',
  bgColor = 'bg-[#F3F3F3]'
}) => {
  const [viewMode, setViewMode] = React.useState<'calendar' | 'year' | 'month'>('calendar')
  const [currentDate, setCurrentDate] = React.useState(value ? parseDate(value) : new Date())
  const [yearViewStartYear, setYearViewStartYear] = React.useState(() => {
    return currentDate.getFullYear() - 6
  })

  function parseDate(dateString: string) {
    const [year, month, day] = dateString.split('/')
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  }

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(year)
    setCurrentDate(newDate)
    setViewMode('month')
  }

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(monthIndex)
    setCurrentDate(newDate)
    setViewMode('calendar')
  }

  const handlePreviousYears = () => {
    setYearViewStartYear(prev => prev - 12)
  }

  const handleNextYears = () => {
    setYearViewStartYear(prev => prev + 12)
  }

  const handlePreviousYear = () => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(newDate.getFullYear() - 1)
    setCurrentDate(newDate)
  }

  const handleNextYear = () => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(newDate.getFullYear() + 1)
    setCurrentDate(newDate)
  }

  const renderMonthGrid = () => {
    return (
      <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <button
              onClick={handlePreviousYear}
              className='h-7 w-7 flex items-center justify-center hover:bg-[#E8F5E9] rounded-full transition-colors'
            >
              <ChevronLeft className='h-4 w-4' />
            </button>
            <h2 className={`${aktivGrotesk.className} text-[14px] font-[500] text-gray-800`}>
              {currentDate.getFullYear()}
            </h2>
            <button
              onClick={handleNextYear}
              className='h-7 w-7 flex items-center justify-center hover:bg-[#E8F5E9] rounded-full transition-colors'
            >
              <ChevronRight className='h-4 w-4' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {MONTHS.map((month, index) => (
            <button
              key={month}
              onClick={() => handleMonthSelect(index)}
              className={`
                p-3 border rounded-lg text-center transition-all
                ${
                  index === currentDate.getMonth()
                    ? 'border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50]'
                    : 'border-gray-200 hover:border-[#4CAF50] hover:bg-[#E8F5E9]/50'
                }
              `}
            >
              <span className={`${aktivGrotesk.className} text-[14px] font-[400]`}>
                {month}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderYearGrid = () => {
    const years = Array.from({ length: 12 }, (_, i) => yearViewStartYear + i)

    return (
      <div className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-3'>
            <button
              onClick={handlePreviousYears}
              className='h-7 w-7 flex items-center justify-center hover:bg-[#E8F5E9] rounded-full transition-colors'
            >
              <ChevronLeft className='h-4 w-4' />
            </button>
            <h2 className={`${aktivGrotesk.className} text-[14px] font-[500] text-gray-800`}>
              {years[0]} - {years[years.length - 1]}
            </h2>
            <button
              onClick={handleNextYears}
              className='h-7 w-7 flex items-center justify-center hover:bg-[#E8F5E9] rounded-full transition-colors'
            >
              <ChevronRight className='h-4 w-4' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {years.map(year => (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`
                p-3 border rounded-lg text-center transition-all
                ${
                  year === currentDate.getFullYear()
                    ? 'border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50]'
                    : 'border-gray-200 hover:border-[#4CAF50] hover:bg-[#E8F5E9]/50'
                }
              `}
            >
              <span className={`${aktivGrotesk.className} text-[14px] font-[400]`}>
                {year}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-[6px] w-full'>
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={`w-full cursor-pointer flex items-center justify-between ${
              error !== '' ? 'border-[#FD0202] border-[1px]' : ''
            } outline-none ${fontSize} font-[400] ${
              aktivGrotesk.className
            } ${paddingClass} ${bgColor} rounded-[100px] border border-transparent transition-all duration-200 hover:border-gray-200 data-[state=open]:border-[#11A64B] focus-visible:border-[#11A64B]`}
          >
            <span className={!value ? 'text-[rgba(0,0,0,0.3)]' : ''}>
              {value || placeholder}
            </span>
            <CalendarIcon className='h-5 w-5' />
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          {viewMode === 'calendar' ? (
            <CalendarComponent
              mode='single'
              selected={value ? parseDate(value) : undefined}
              onSelect={date => {
                if (date) {
                  const formattedDate = format(date, 'yyyy/MM/dd')
                  onChange(name, formattedDate)
                }
              }}
              initialFocus
              className='rounded-md border'
              defaultMonth={currentDate}
              components={{
                IconLeft: () => <ChevronLeft className='h-4 w-4' />,
                IconRight: () => <ChevronRight className='h-4 w-4' />,
                CaptionLabel: ({ displayMonth }) => (
                  <div className='flex items-center gap-2'>
                    <span
                      onClick={() => setViewMode('month')}
                      className={`${aktivGrotesk.className} text-[18px] font-[600] cursor-pointer hover:text-[#4CAF50] transition-colors`}
                    >
                      {format(displayMonth, 'MMM')}
                    </span>
                    <span
                      onClick={() => setViewMode('year')}
                      className={`${aktivGrotesk.className} text-[18px] font-[600] cursor-pointer hover:text-[#4CAF50] transition-colors`}
                    >
                      {format(displayMonth, 'yyyy')}
                    </span>
                  </div>
                )
              }}
              classNames={{
                day_selected:
                  'bg-[#11A64B] text-white hover:bg-[#11A64B] hover:text-white focus:bg-[#11A64B] focus:text-white',
                day_today: 'bg-accent text-accent-foreground',
                day_range_middle: 'bg-[#11A64B] text-white',
                day_range_end: 'bg-[#11A64B] text-white',
                day_range_start: 'bg-[#11A64B] text-white'
              }}
            />
          ) : viewMode === 'month' ? (
            renderMonthGrid()
          ) : (
            renderYearGrid()
          )}
        </PopoverContent>
      </Popover>
      {error !== '' && (
        <span className='text-[#FD0202] font-[400] text-[12px]'>{error}</span>
      )}
    </div>
  )
}

export default Calendar 