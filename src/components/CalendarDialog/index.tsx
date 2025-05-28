import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { aktivGrotesk } from '@/app/layout'
import { format, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DateRange } from 'react-day-picker'

interface CalendarDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onDateSelect?: (range: DateRange | undefined) => void
}

const CalendarDialog: React.FC<CalendarDialogProps> = ({
  open,
  setOpen,
  onDateSelect
}) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range)
    if (onDateSelect) {
      onDateSelect(range)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-[343px] p-0 rounded-[20px]'>
        <div className='w-full p-4'>
          <Calendar
            mode='range'
            selected={dateRange}
            onSelect={handleDateSelect}
            numberOfMonths={1}
            className='w-full'
            classNames={{
              months: 'space-y-4',
              month: 'space-y-4 w-full',
              caption: 'flex justify-between items-center pt-1 relative',
              caption_label: `${aktivGrotesk.className} text-[18px] font-[600]`,
              nav: 'flex items-center space-x-2',
              nav_button: 'bg-transparent hover:bg-transparent',
              nav_button_previous: 'relative',
              nav_button_next: 'relative',
              table: 'w-full border-collapse',
              head_row: 'flex w-full justify-between',
              head_cell: `${aktivGrotesk.className} text-[14px] font-[500] w-[40px] text-center`,
              row: 'flex w-full mt-2',
              cell: `${aktivGrotesk.className} flex-1 relative p-0 text-center text-sm focus-within:relative focus-within:z-20`,
              day: `${aktivGrotesk.className} h-9 w-full p-0 font-[400] text-[14px] aria-selected:opacity-100 hover:bg-[#E8F5E9] rounded-none flex items-center justify-center`,
              day_range_start: '[&:not(disabled)]:bg-[#4CAF50] [&:not(disabled)]:text-white hover:bg-[#4CAF50] rounded-l-full',
              day_range_end: '[&:not(disabled)]:bg-[#4CAF50] [&:not(disabled)]:text-white hover:bg-[#4CAF50] rounded-r-full',
              day_range_middle: '[&:not(disabled)]:bg-[#E8F5E9] [&:not(disabled)]:text-black hover:bg-[#E8F5E9] rounded-none',
              day_selected: '[&:not(disabled)]:bg-[#4CAF50] [&:not(disabled)]:text-white hover:bg-[#4CAF50]',
              day_today: 'bg-transparent text-black',
              day_outside: 'invisible',
              day_disabled: 'text-gray-500 opacity-50',
              day_hidden: 'invisible'
            }}
            components={{
              IconLeft: () => <ChevronLeft className='h-4 w-4' />,
              IconRight: () => <ChevronRight className='h-4 w-4' />
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CalendarDialog
