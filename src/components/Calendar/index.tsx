'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { format, parse, isValid } from 'date-fns'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react'
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
  dateFormat?: string // Default: 'yyyy/MM/dd'
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

type ViewMode = 'calendar' | 'year' | 'month'

const Calendar: React.FC<CalendarProps> = ({
  value,
  placeholder = 'Select date',
  onChange,
  name,
  error = '',
  fontSize = 'text-[14px]',
  paddingClass = 'pl-[16px] pr-[16px] py-[16px] md:py-[19px] md:pl-[25px]',
  bgColor = 'bg-[#F3F3F3]',
  dateFormat = 'yyyy/MM/dd'
}) => {
  // State management
  const [viewMode, setViewMode] = useState<ViewMode>('calendar')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [yearViewStartYear, setYearViewStartYear] = useState(() => {
    return new Date().getFullYear() - 6
  })
  const [isOpen, setIsOpen] = useState(false)

  // Parse date string to Date object
  const parseDateString = (dateString: string): Date | null => {
    if (!dateString) return null

    try {
      // Handle ISO date format (2003-06-05T00:00:00Z)
      if (dateString.includes('T') && dateString.includes('Z')) {
        const date = new Date(dateString)
        if (isValid(date)) return date
      }

      // Try parsing with date-fns first
      const parsed = parse(dateString, dateFormat, new Date())
      if (isValid(parsed)) {
        return parsed
      }

      // Fallback parsing for common formats
      if (dateString.includes('/')) {
        const parts = dateString.split('/')
        if (parts.length === 3) {
          const [year, month, day] = parts
          const date = new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
          )
          if (isValid(date)) return date
        }
      }

      if (dateString.includes('-')) {
        const [year, month, day] = dateString.split('-')
        const date = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        )
        if (isValid(date)) return date
      }

      return null
    } catch {
      return null
    }
  }

  // Format Date object to string
  const formatDateToString = (date: Date): string => {
    return format(date, dateFormat)
  }

  // Get selected date from value prop
  const selectedDate = useMemo(() => {
    return value ? parseDateString(value) : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, dateFormat])

  // Update current date and year view when value changes
  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(selectedDate)
      setYearViewStartYear(selectedDate.getFullYear() - 6)
    } else {
      const now = new Date()
      setCurrentDate(now)
      setYearViewStartYear(now.getFullYear() - 6)
    }
  }, [selectedDate])

  // Format display value for the input field
  const displayValue = useMemo(() => {
    if (!value) return ''

    // If value is already a string in YYYY/MM/DD format, use it directly
    if (typeof value === 'string' && value.match(/^\d{4}\/\d{2}\/\d{2}$/)) {
      return value
    }

    // Parse the date (handles ISO format, YYYY/MM/DD, etc.)
    const parsedDate = parseDateString(value)
    if (parsedDate) {
      return format(parsedDate, 'yyyy/MM/dd')
    }

    return value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  // Event handlers
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = formatDateToString(date)
      onChange(name, formattedDate)
      setIsOpen(false)
    }
  }

  const handleClearDate = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(name, '')
  }

  useEffect(() => {
    if (value) {
      const date = new Date(value)
      const formattedDate = formatDateToString(date)
      onChange(name, formattedDate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

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

  // Render month grid
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
            <h2
              className={`${aktivGrotesk.className} text-[14px] font-[500] text-gray-800`}
            >
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
              <span
                className={`${aktivGrotesk.className} text-[14px] font-[400]`}
              >
                {month}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Render year grid
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
            <h2
              className={`${aktivGrotesk.className} text-[14px] font-[500] text-gray-800`}
            >
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
              <span
                className={`${aktivGrotesk.className} text-[14px] font-[400]`}
              >
                {year}
              </span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Render calendar content based on view mode
  const renderCalendarContent = () => {
    switch (viewMode) {
      case 'calendar':
        return (
          <CalendarComponent
            mode='single'
            selected={selectedDate || undefined}
            onSelect={handleDateSelect}
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
        )
      case 'month':
        return renderMonthGrid()
      case 'year':
        return renderYearGrid()
      default:
        return null
    }
  }

  console.log(value, 'value')

  return (
    <div className='flex flex-col gap-[6px] w-full'>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            className={`w-full cursor-pointer flex items-center justify-between ${
              error !== '' ? 'border-[#FD0202] border-[1px]' : ''
            } outline-none ${fontSize} font-[400] ${
              aktivGrotesk.className
            } ${paddingClass} ${bgColor} rounded-[100px] border border-transparent transition-all duration-200 hover:border-gray-200 data-[state=open]:border-[#11A64B] focus-visible:border-[#11A64B]`}
          >
            <span className={!value ? 'text-[rgba(0,0,0,0.3)]' : ''}>
              {displayValue || placeholder}
            </span>
            <div className='flex items-center gap-2'>
              {value ?(
                <button
                  onClick={handleClearDate}
                  className='w-6 h-6 bg-[#11A64B] rounded-[50%] flex items-center justify-center hover:bg-[#0E8A3F] transition-colors'
                >
                  <X className='h-3 w-3 text-white' />
                </button>
                ):(
                
              <CalendarIcon className='h-5 w-5' />
              )}
              
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          {renderCalendarContent()}
        </PopoverContent>
      </Popover>
      {error !== '' && (
        <span className='text-[#FD0202] font-[400] text-[12px]'>{error}</span>
      )}
    </div>
  )
}

export default Calendar
