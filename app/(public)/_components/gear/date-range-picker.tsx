"use client";

import { useMemo, useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { Calendar } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import "react-day-picker/dist/style.css";

interface DateRangePickerProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
}

export function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const rentalDays = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    return differenceInCalendarDays(range.to, range.from);
  }, [range]);

  const handleSelect = (selected: DateRange | undefined) => {
    setRange(selected);

    if (selected?.from && selected?.to) {
      const start = format(selected.from, "yyyy-MM-dd");
      const end = format(selected.to, "yyyy-MM-dd");
      onDateRangeChange(start, end);
      setOpen(false);
    }
  };

  const label =
    range?.from && range?.to
      ? `${format(range.from, "MMM d, yyyy")} – ${format(range.to, "MMM d, yyyy")}`
      : range?.from
        ? `${format(range.from, "MMM d, yyyy")} – Select end date`
        : "Select rental dates";

  return (
    <div className="space-y-3 relative">
      <h3 className="font-semibold text-foreground">Select Rental Dates</h3>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-3 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <Calendar size={18} className="text-foreground-secondary shrink-0" />
        <span
          className={
            range?.from ? "text-foreground" : "text-foreground-secondary"
          }
        >
          {label}
        </span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 bg-background border border-border rounded-lg shadow-lg p-2">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            disabled={{ before: today }}
            numberOfMonths={2}
            defaultMonth={today}
          />
        </div>
      )}

      {range?.from && range?.to && rentalDays > 0 && (
        <div className="bg-background-secondary rounded-lg p-4 border border-border">
          <p className="text-sm text-foreground-secondary mb-1">
            Rental Duration
          </p>
          <p className="font-semibold text-foreground">
            {rentalDays} {rentalDays === 1 ? "day" : "days"}
          </p>
        </div>
      )}
    </div>
  );
}
