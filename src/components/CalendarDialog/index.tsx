import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { aktivGrotesk } from "@/app/layout";
import { format, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateRange } from "react-day-picker";

interface CalendarDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDateSelect?: (range: DateRange | undefined) => void;
}
const currentYear = new Date().getFullYear();

const date = new Date();

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CalendarDialog: React.FC<CalendarDialogProps> = ({
  open,
  setOpen,
  onDateSelect,
}) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();
  const [viewMode, setViewMode] = React.useState<"calendar" | "year" | "month">(
    "calendar"
  );
  const [currentDate, setCurrentDate] = React.useState(date);
  const [yearViewStartYear, setYearViewStartYear] = React.useState(() => {
    return currentYear - 6;
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (onDateSelect) {
      onDateSelect(range);
    }
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    setCurrentDate(newDate);
    setViewMode("month");
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    setCurrentDate(newDate);
    setViewMode("calendar");
  };

  const handlePreviousYears = () => {
    setYearViewStartYear((prev) => prev - 12);
  };

  const handleNextYears = () => {
    setYearViewStartYear((prev) => prev + 12);
  };

  const handlePreviousYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentDate(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentDate(newDate);
  };

  const renderMonthGrid = () => {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePreviousYear}
              className="h-7 w-7 flex items-center justify-center hover:bg-[#E8F5E9] rounded-full transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2
              className={`${aktivGrotesk.className} text-[14px] font-[500] text-gray-800`}
            >
              {currentDate.getFullYear()}
            </h2>
            <button
              onClick={handleNextYear}
              className="h-7 w-7 flex items-center justify-center hover:bg-[#E8F5E9] rounded-full transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {MONTHS.map((month, index) => (
            <button
              key={month}
              onClick={() => handleMonthSelect(index)}
              className={`
                p-3 border rounded-lg text-center transition-all
                ${
                  index === currentDate.getMonth()
                    ? "border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50]"
                    : "border-gray-200 hover:border-[#4CAF50] hover:bg-[#E8F5E9]/50"
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
    );
  };

  const renderYearGrid = () => {
    const years = Array.from({ length: 12 }, (_, i) => yearViewStartYear + i);

    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePreviousYears}
              className="h-7 w-7 flex items-center justify-center hover:bg-[#E8F5E9] rounded-full transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2
              className={`${aktivGrotesk.className} text-[14px] font-[500] text-gray-800`}
            >
              {years[0]} - {years[years.length - 1]}
            </h2>
            <button
              onClick={handleNextYears}
              className="h-7 w-7 flex items-center justify-center hover:bg-[#E8F5E9] rounded-full transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => handleYearSelect(year)}
              className={`
                p-3 border rounded-lg text-center transition-all
                ${
                  year === currentDate.getFullYear()
                    ? "border-[#4CAF50] bg-[#E8F5E9] text-[#4CAF50]"
                    : "border-gray-200 hover:border-[#4CAF50] hover:bg-[#E8F5E9]/50"
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
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[343px] p-0 rounded-[20px] shadow-xl border-none bg-white/95 backdrop-blur-sm">
        {viewMode === "calendar" ? (
          <div className="w-full p-6">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              className="w-full"
              defaultMonth={currentDate}
              captionLayout="buttons"
              components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
                CaptionLabel: ({ displayMonth }) => (
                  <div className="flex items-center gap-2">
                    <span
                      onClick={() => setViewMode("month")}
                      className={`${aktivGrotesk.className} text-[18px] font-[600] cursor-pointer hover:text-[#4CAF50] transition-colors`}
                    >
                      {format(displayMonth, "MMM")}
                    </span>
                    <span
                      onClick={() => setViewMode("year")}
                      className={`${aktivGrotesk.className} text-[18px] font-[600] cursor-pointer hover:text-[#4CAF50] transition-colors`}
                    >
                      {format(displayMonth, "yyyy")}
                    </span>
                  </div>
                ),
              }}
              classNames={{
                months: "space-y-4",
                month: "space-y-4 w-full",
                caption: "flex justify-between items-center pt-1 relative",
                caption_label: `${aktivGrotesk.className} text-[18px] font-[600]`,
                nav: "flex items-center space-x-2",
                nav_button: "bg-transparent hover:bg-transparent",
                nav_button_previous: "relative",
                nav_button_next: "relative",
                table: "w-full border-collapse",
                head_row: "flex w-full justify-between",
                head_cell: `${aktivGrotesk.className} text-[14px] font-[500] w-[40px] text-center`,
                row: "flex w-full",
                cell: `${aktivGrotesk.className} flex-1 relative p-0 text-center text-sm focus-within:relative focus-within:z-20`,
                day: `${aktivGrotesk.className} h-8 w-full p-0 font-[400] text-[14px] aria-selected:opacity-100 hover:bg-[#E8F5E9] rounded-none flex items-center justify-center`,
                day_range_start:
                  "[&:not(disabled)]:bg-[#4CAF50] [&:not(disabled)]:text-white hover:bg-[#4CAF50] rounded-l-full",
                day_range_end:
                  "[&:not(disabled)]:bg-[#4CAF50] [&:not(disabled)]:text-white hover:bg-[#4CAF50] rounded-r-full",
                day_range_middle:
                  "[&:not(disabled)]:bg-[#E8F5E9] [&:not(disabled)]:text-black hover:bg-[#E8F5E9] rounded-none",
                day_selected:
                  "[&:not(disabled)]:bg-[#4CAF50] [&:not(disabled)]:text-white hover:bg-[#4CAF50]",
                day_today: "bg-transparent text-black",
                day_outside: "invisible",
                day_disabled: "text-gray-500 opacity-50",
                day_hidden: "invisible",
              }}
            />
          </div>
        ) : viewMode === "year" ? (
          renderYearGrid()
        ) : (
          renderMonthGrid()
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
