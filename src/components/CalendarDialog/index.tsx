import React, { useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { monthDayYearConvert } from '@/utils'

interface CalendarDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onDateSelect?: (range: DateRange | undefined) => void
  fromDate?: number
  toDate?: number
}
const currentYear = new Date().getFullYear()

const date = new Date()

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

const CalendarDialog: React.FC<CalendarDialogProps> = ({
  open,
  setOpen,
  onDateSelect,
  fromDate,
  toDate
}) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [viewMode, setViewMode] = React.useState<'calendar' | 'year' | 'month'>(
    'calendar'
  )
  const [currentDate, setCurrentDate] = React.useState(date)
  const [yearViewStartYear, setYearViewStartYear] = React.useState(() => {
    return currentYear - 6
  })
  const [fromDateInternal, setFromDateInternal] = React.useState<
    number | undefined
  >(fromDate)
  const [toDateInternal, setToDateInternal] = React.useState<
    number | undefined
  >(toDate)

  // Get today's date for disabling future dates
  const today = new Date()
  today.setHours(23, 59, 59, 999) // End of today

  // Clear date range when dialog opens to start fresh
  React.useEffect(() => {
    if (open) {
      setViewMode('calendar')
      // Set current date to the from date if it exists, so calendar opens to the correct month/year
      if (fromDate) {
        setCurrentDate(new Date(fromDate))
      }
    }
  }, [open, fromDate])

  useEffect(() => {
    if (fromDate) {
      setFromDateInternal(fromDate)
    }
    if (toDate) {
      setToDateInternal(toDate)
    }
  }, [fromDate, toDate])

  const handleDateSelect = (range: DateRange | undefined) => {
    const isRangeComplete = dateRange?.from && dateRange?.to

    if (isRangeComplete && fromDateInternal && toDateInternal) {
      console.log('range', range)
      console.log(new Date(fromDateInternal), new Date(toDateInternal))
      const currentFromDate = monthDayYearConvert(
        new Date(fromDateInternal).toISOString()
      )
      const currentToDate = monthDayYearConvert(
        new Date(toDateInternal).toISOString()
      )
      const changedFromDate = monthDayYearConvert(
        range?.from?.toISOString() ?? ''
      )
      const changedToDate = monthDayYearConvert(range?.to?.toISOString() ?? '')
      if (changedFromDate !== currentFromDate) {
        const newRange = { from: range?.from, to: undefined }
        setDateRange(newRange)
        onDateSelect?.(newRange)
        return
      }

      if (changedToDate !== currentToDate) {
        const newRange = { from: range?.to, to: undefined }
        setDateRange(newRange)
        onDateSelect?.(newRange)
        return
      }
    }

    // Normal behavior
    setDateRange(range)
    onDateSelect?.(range)

    // Auto-close only when a complete range is selected
    if (range?.from && range?.to) {
      setOpen(false)
    }
  }

  const handleYearSelect = (year: number) => {
    // Prevent selecting future years
    if (year > currentYear) {
      return
    }
    const newDate = new Date(currentDate)
    newDate.setFullYear(year)
    setCurrentDate(newDate)
    setViewMode('month')
  }

  const handleMonthSelect = (monthIndex: number) => {
    // Prevent selecting future months in current year
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    
    if (currentDate.getFullYear() === currentYear && monthIndex > currentMonth) {
      return
    }
    
    const newDate = new Date(currentDate)
    newDate.setMonth(monthIndex)
    setCurrentDate(newDate)
    setViewMode('calendar')
  }

  const handlePreviousYears = () => {
    setYearViewStartYear(prev => prev - 12)
  }

  const handleNextYears = () => {
    // Prevent navigating to future years
    const maxYear = currentYear + 1
    if (yearViewStartYear + 12 >= maxYear) {
      return
    }
    setYearViewStartYear(prev => prev + 12)
  }

  const handlePreviousYear = () => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(newDate.getFullYear() - 1)
    setCurrentDate(newDate)
  }

  const handleNextYear = () => {
    // Prevent navigating to future years
    if (currentDate.getFullYear() >= currentYear) {
      return
    }
    const newDate = new Date(currentDate)
    newDate.setFullYear(newDate.getFullYear() + 1)
    setCurrentDate(newDate)
  }

  const renderMonthGrid = () => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    
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
              className={`text-[14px] font-[500] text-gray-800`}
            >
              {currentDate.getFullYear()}
            </h2>
            <button
              onClick={handleNextYear}
              disabled={currentDate.getFullYear() >= currentYear}
              className={`h-7 w-7 flex items-center justify-center rounded-full transition-colors ${
                currentDate.getFullYear() >= currentYear 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-[#E8F5E9]'
              }`}
            >
              <ChevronRight className='h-4 w-4' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {MONTHS.map((month, index) => {
            const isFutureMonth = currentDate.getFullYear() === currentYear && index > currentMonth
            const isCurrentMonth = index === currentDate.getMonth()
            
            return (
              <button
                key={month}
                onClick={() => handleMonthSelect(index)}
                disabled={isFutureMonth}
                className={`
                  p-3 border rounded-lg text-center transition-all
                  ${
                    isCurrentMonth
                      ? 'border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50]'
                      : isFutureMonth
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:border-[#4CAF50] hover:bg-[#E8F5E9]/50'
                  }
                `}
              >
                <span
                  className={`text-[14px] font-[400]`}
                >
                  {month}
                </span>
              </button>
            )
          })}
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
            <h2
              className={` text-[14px] font-[500] text-gray-800`}
            >
              {years[0]} - {years[years.length - 1]}
            </h2>
            <button
              onClick={handleNextYears}
              disabled={yearViewStartYear + 12 >= currentYear + 1}
              className={`h-7 w-7 flex items-center justify-center rounded-full transition-colors ${
                yearViewStartYear + 12 >= currentYear + 1
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-[#E8F5E9]'
              }`}
            >
              <ChevronRight className='h-4 w-4' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {years.map(year => {
            const isFutureYear = year > currentYear
            const isCurrentYear = year === currentDate.getFullYear()
            
            return (
              <button
                key={year}
                onClick={() => handleYearSelect(year)}
                disabled={isFutureYear}
                className={`
                  p-3 border rounded-lg text-center transition-all
                  ${
                    isCurrentYear
                      ? 'border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50]'
                      : isFutureYear
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:border-[#4CAF50] hover:bg-[#E8F5E9]/50'
                  }
                `}
              >
                <span
                  className={`text-[14px] font-[400]`}
                >
                  {year}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-[343px] p-0 rounded-[20px] shadow-xl border-none bg-white/95 backdrop-blur-sm'>
        {viewMode === 'calendar' ? (
          <div className='w-full py-[10.5px] px-[8px]'>
            <Calendar
              mode='range'
              key={viewMode}
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              className='w-full space-y-[7px]'
              defaultMonth={currentDate}
              captionLayout='buttons'
              disabled={{ after: today }}
              modifiers={{
                first_of_row: date => date.getDay() === 0,
                last_of_row: date => date.getDay() === 6,
                has_range: () =>
                  dateRange?.from !== dateRange?.to &&
                  dateRange?.to !== undefined
              }}
              modifiersClassNames={{
                first_of_row: 'rounded-l-full',
                last_of_row: 'rounded-r-full',
                has_range: 'show-range-bg'
              }}
              components={{
                IconLeft: () => <ChevronLeft className='h-4 w-4' />,
                IconRight: () => <ChevronRight className='h-4 w-4' />,
                CaptionLabel: ({ displayMonth }) => (
                  <div className='flex items-center gap-2'>
                    <span
                      onClick={() => setViewMode('month')}
                      className={`text-[18px] font-[600] cursor-pointer hover:text-[#4CAF50] transition-colors`}
                    >
                      {format(displayMonth, 'MMM')}
                    </span>
                    <span
                      onClick={() => setViewMode('year')}
                      className={`text-[18px] font-[600] cursor-pointer hover:text-[#4CAF50] transition-colors`}
                    >
                      {format(displayMonth, 'yyyy')}
                    </span>
                  </div>
                )
              }}
              classNames={{
                months: 'space-y-4',
                month: 'space-y-[32px] w-full',
                caption: 'flex justify-between items-center relative mb-4',
                caption_label: `text-[18px] font-[600]`,
                nav: 'flex items-center space-x-2',
                nav_button: 'bg-transparent hover:bg-transparent',
                nav_button_previous: 'relative',
                nav_button_next: 'relative',
                table: 'w-full border-collapse space-y-[7px]',
                head_row: 'flex w-full justify-between mb-2',
                head_cell: ` text-[14px] font-[500] w-[40px] text-center`,
                row: 'flex w-full mb-2',
                cell: `flex-1 relative p-0 text-center text-sm focus-within:relative focus-within:z-20`,
                day: ` text-[#666666] h-[35px] w-full p-0 font-[400] text-[14px] aria-selected:opacity-100 hover:bg-[#11A64B] hover:text-white hover:rounded-full rounded-none flex items-center justify-center [&.rdp-day_selected]:text-white [&.rdp-day_range_start]:text-white [&.rdp-day_range_end]:text-white`,
                day_range_start:
                  '!rounded-full text-white relative before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:bg-[#CFEDDB] before:-z-10 [&:not(.show-range-bg)]:before:hidden [&:not(disabled)]:bg-[#11A64B]',
                day_range_end:
                  '!rounded-full text-white relative before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:bg-[#CFEDDB] before:-z-10 [&:not(.show-range-bg)]:before:hidden [&:not(disabled)]:bg-[#11A64B]',
                day_range_middle:
                  '[&:not(disabled)]:bg-[#CFEDDB] text-[#666666] hover:bg-[#11A64B] hover:text-white hover:rounded-none rounded-none',
                day_selected:
                  '[&:not(disabled)]:bg-[#11A64B]  hover:bg-[#11A64B]',
                day_today: 'bg-transparent text-black',
                day_outside: 'invisible',
                day_disabled: 'text-gray-500 opacity-50',
                day_hidden: 'invisible'
              }}
            />
          </div>
        ) : viewMode === 'year' ? (
          renderYearGrid()
        ) : (
          renderMonthGrid()
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CalendarDialog
