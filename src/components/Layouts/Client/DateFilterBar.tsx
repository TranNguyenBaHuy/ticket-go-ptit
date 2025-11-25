import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface DateFilterBarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

const DateFilterBar = ({ selectedDate, onDateChange }: DateFilterBarProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  const handleDateSelect = (day: Date | undefined) => {
    if (!day) return;

    if (!dateRange.from) {
      setDateRange({ from: day, to: undefined });
    } else if (!dateRange.to) {
      if (day < dateRange.from) {
        setDateRange({ from: day, to: dateRange.from });
        const fromDate = format(day, "yyyy-MM-dd");
        const toDate = format(dateRange.from, "yyyy-MM-dd");
        onDateChange(`${fromDate},${toDate}`);
      } else {
        setDateRange({ from: dateRange.from, to: day });
        const fromDate = format(dateRange.from, "yyyy-MM-dd");
        const toDate = format(day, "yyyy-MM-dd");
        onDateChange(`${fromDate},${toDate}`);
      }
    } else {
      setDateRange({ from: day, to: undefined });
    }
  };

  const handleClear = () => {
    setDateRange({ from: undefined, to: undefined });
    onDateChange("");
  };

  const isInRange = (date: Date) => {
    if (!dateRange.from || !dateRange.to) return false;
    return date > dateRange.from && date < dateRange.to;
  };

  const displayText = () => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
        dateRange.to,
        "dd/MM/yyyy"
      )}`;
    } else if (dateRange.from) {
      return `${format(dateRange.from, "dd/MM/yyyy")} - ...`;
    }
    return "Chọn khoảng thời gian";
  };

  return (
    <div className="bg-black">
      <div className="mx-5 lg:mx-auto max-w-[1200px]">
        <div className="py-4 flex items-center gap-4">
          <label className="text-white font-semibold whitespace-nowrap">
            Lọc theo ngày:
          </label>

          <Popover>
            <PopoverTrigger
              asChild
              className="flex items-center gap-3 justify-center"
            >
              <Button
                variant="outline"
                className="w-auto justify-start text-left font-normal bg-[#3f3f46] border-gray-600 text-white hover:bg-[#4f4f56] hover:text-white"
              >
                <CalendarIcon className="h-4 w-4" />
                {displayText()}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-4 bg-[#2a2a2a] border-gray-700"
              align="start"
            >
              <div className="space-y-4">
                {/* Info text */}
                <div className="text-sm text-gray-400">
                  {dateRange.from && !dateRange.to
                    ? "Chọn ngày kết thúc"
                    : "Chọn ngày bắt đầu"}
                </div>

                {/* Calendar */}
                <Calendar
                  mode="single"
                  selected={dateRange.to || dateRange.from}
                  onSelect={handleDateSelect}
                  className="bg-[#2a2a2a] text-white"
                  disabled={(date) => {
                    if (dateRange.from && dateRange.to) {
                      return date > dateRange.from && date < dateRange.to;
                    }
                    return false;
                  }}
                  modifiers={{
                    inRange: isInRange,
                  }}
                  modifiersStyles={{
                    inRange: {
                      backgroundColor: "#2dc275",
                      color: "#000",
                      opacity: 1,
                    },
                  }}
                />

                {/* Action btns */}
                {(dateRange.from || dateRange.to) && (
                  <div className="flex gap-2 pt-2 border-t border-gray-700">
                    <Button
                      onClick={handleClear}
                      variant="outline"
                      className="flex-1 bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
                    >
                      Thiết lập lại
                    </Button>
                    {dateRange.from && dateRange.to && (
                      <Button
                        onClick={() => {}} // Popover will close automatically
                        className="flex-1 bg-[#2dc275] hover:bg-[#25a85f] text-white border-0"
                      >
                        Áp dụng
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {selectedDate && (
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition flex items-center gap-2"
            >
              <X size={16} />
              Thiết lập lại
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateFilterBar;
