import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { aktivGrotesk } from '@/app/layout'
import { format } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onDateSelect?: (date: Date | undefined) => void
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

const SingleDateSelector: React.FC<CalendarDialogProps> = ({
  open,
  setOpen,
  onDateSelect
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)
  const [viewMode, setViewMode] = React.useState<'calendar' | 'year' | 'month'>(
    'calendar'
  )
  const [currentDate, setCurrentDate] = React.useState(date)
  const [yearViewStartYear, setYearViewStartYear] = React.useState(() => {
    return currentYear - 6
  })

  // Sync currentDate with selectedDate when dialog opens
  React.useEffect(() => {
    if (open && selectedDate) {
      setCurrentDate(selectedDate)
      setYearViewStartYear(selectedDate.getFullYear() - 6)
    }
  }, [open, selectedDate])

  const handleDateSelect = (date: Date | undefined) => {
    console.log('date', date)
    setSelectedDate(date)
    if (onDateSelect) {
      onDateSelect(date)
    }

    // Close the dialog when a date is selected
    if (date) {
      setOpen(false)
    }
  }

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(year)
    setCurrentDate(newDate)

    // Update selectedDate to reflect the new year
    if (selectedDate) {
      const updatedSelectedDate = new Date(selectedDate)
      updatedSelectedDate.setFullYear(year)
      setSelectedDate(updatedSelectedDate)
    }

    setViewMode('month')
  }

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(monthIndex)
    setCurrentDate(newDate)

    // Update selectedDate to reflect the new month
    if (selectedDate) {
      const updatedSelectedDate = new Date(selectedDate)
      updatedSelectedDate.setMonth(monthIndex)
      setSelectedDate(updatedSelectedDate)
    }

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
    setSelectedDate(newDate)
  }

  const handleNextYear = () => {
    const newDate = new Date(currentDate)
    console.log('newDate', newDate)
    newDate.setFullYear(newDate.getFullYear() + 1)
    if (newDate.getFullYear() <= new Date().getFullYear()) {
      setCurrentDate(newDate)
      setSelectedDate(newDate)
    }
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
            <h2
              className={`${aktivGrotesk.className} text-[14px] font-[500] text-gray-800`}
            >
              {currentDate.getFullYear()}
            </h2>
            <button
              onClick={handleNextYear}
              disabled={currentDate.getFullYear() >= new Date().getFullYear()}
              className={`h-7 w-7 flex items-center justify-center rounded-full transition-colors ${
                currentDate.getFullYear() >= new Date().getFullYear()
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-[#E8F5E9]'
              }`}
            >
              <ChevronRight className='h-4 w-4' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          {MONTHS.map((month, index) => {
            // Disable if year is current and month is after current month
            const isFutureMonth =
              currentDate.getFullYear() === new Date().getFullYear() &&
              index > new Date().getMonth()

            return (
              <button
                key={month}
                onClick={() => handleMonthSelect(index)}
                disabled={isFutureMonth}
                className={`
          p-3 border rounded-lg text-center transition-all
          ${
            index === currentDate.getMonth()
              ? 'border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50]'
              : isFutureMonth
              ? 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
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
              disabled={year > new Date().getFullYear()}
              className={`
                p-3 border rounded-lg text-center transition-all
                ${
                  year === currentDate.getFullYear()
                    ? 'border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50]'
                    : year > new Date().getFullYear()
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed opacity-50'
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-[343px] p-0 rounded-[20px] shadow-xl border-none bg-white/95 backdrop-blur-sm'>
        {viewMode === 'calendar' ? (
          <div className='w-full py-[10.5px] px-[8px]'>
            <Calendar
              key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
              mode='single'
              selected={selectedDate}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              className='w-full space-y-[7px]'
              month={currentDate}
              onMonthChange={setCurrentDate}
              captionLayout='buttons'
              disabled={date => date > new Date()}
              components={{
                IconLeft: () => (
                  <button
                    onClick={() => {
                      const newDate = new Date(currentDate)
                      newDate.setMonth(newDate.getMonth() - 1)
                      setCurrentDate(newDate)
                    }}
                    className='h-7 w-7 flex items-center justify-center hover:bg-[#E8F5E9] rounded-full transition-colors'
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </button>
                ),
                IconRight: () => {
                  const nextMonth = new Date(currentDate)
                  nextMonth.setMonth(nextMonth.getMonth() + 1)
                  const isDisabled = nextMonth > new Date()
                  return (
                    <button
                      onClick={() => {
                        if (!isDisabled) {
                          const newDate = new Date(currentDate)
                          newDate.setMonth(newDate.getMonth() + 1)
                          setCurrentDate(newDate)
                        }
                      }}
                      disabled={isDisabled}
                      className={`h-7 w-7 flex items-center justify-center rounded-full transition-colors ${
                        isDisabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-[#E8F5E9]'
                      }`}
                    >
                      <ChevronRight className='h-4 w-4' />
                    </button>
                  )
                },
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
                months: 'space-y-4',
                month: 'space-y-[32px] w-full',
                caption: 'flex justify-between items-center relative mb-4',
                caption_label: `${aktivGrotesk.className} text-[18px] font-[600]`,
                nav: 'flex items-center space-x-2',
                nav_button: 'bg-transparent hover:bg-transparent',
                nav_button_previous: 'relative',
                nav_button_next: 'relative',
                table: 'w-full border-collapse space-y-[7px]',
                head_row: 'flex w-full justify-between mb-2',
                head_cell: `${aktivGrotesk.className} text-[14px] font-[500] w-[40px] text-center`,
                row: 'flex w-full mb-2',
                cell: `${aktivGrotesk.className} flex-1 relative p-0 text-center text-sm focus-within:relative focus-within:z-20`,
                day: `${aktivGrotesk.className} text-[#666666] h-[35px] w-[35px] p-0 font-[400] text-[14px] aria-selected:opacity-100 hover:bg-[#11A64B] hover:text-white hover:rounded-[50%] rounded-none flex items-center justify-center mx-auto [&.rdp-day_selected]:text-white [&.rdp-day_selected]:bg-[#11A64B] [&.rdp-day_selected]:rounded-[50%] [&.rdp-day_selected]:w-[35px] [&.rdp-day_selected]:h-[35px] [&.rdp-day_selected]:mx-auto`,
                day_selected:
                  '!bg-[#11A64B] !text-white !rounded-[50%] !w-[35px] !h-[35px] !mx-auto !flex !items-center !justify-center',
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

export default SingleDateSelector
