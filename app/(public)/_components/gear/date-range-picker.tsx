"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { Calendar as CalendarIcon, ArrowRight, X } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import "react-day-picker/dist/style.css";

interface DateRangePickerProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
}

export function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<"start" | "end">("start");
  const containerRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const rentalDays = useMemo(() => {
    if (!range?.from || !range?.to) return 0;
    return differenceInCalendarDays(range.to, range.from);
  }, [range]);

  // Close calendar popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selected: DateRange | undefined) => {
    setRange(selected);

    if (selected?.from && selected?.to) {
      const start = format(selected.from, "yyyy-MM-dd");
      const end = format(selected.to, "yyyy-MM-dd");
      onDateRangeChange(start, end);
      setOpen(false);
    } else if (selected?.from && !selected?.to) {
      setActiveInput("end");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRange(undefined);
    onDateRangeChange("", "");
  };

  const openFor = (target: "start" | "end") => {
    setActiveInput(target);
    setOpen(true);
  };

  return (
    <div className="space-y-3 relative" ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-900 dark:text-white">
          Rental Dates
        </label>
        {range?.from && (
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            <X size={12} /> Clear dates
          </button>
        )}
      </div>

      {/* Two Clickable Inputs */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-100 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700/80">
        {/* Start Date Input */}
        <button
          type="button"
          onClick={() => openFor("start")}
          className={`flex flex-col text-left px-3 py-2 rounded-lg transition-all ${
            open && activeInput === "start"
              ? "bg-white dark:bg-gray-900 border-2 border-blue-600 dark:border-blue-500 shadow-sm"
              : "bg-white dark:bg-gray-900/60 hover:bg-white dark:hover:bg-gray-900 border border-gray-200 dark:border-gray-700/60"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Start Date
          </span>
          <div className="flex items-center gap-1.5 mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
            <CalendarIcon
              size={14}
              className="text-blue-600 dark:text-blue-400 shrink-0"
            />
            <span
              className={
                range?.from
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-500"
              }
            >
              {range?.from ? format(range.from, "MMM d, yyyy") : "Pick date"}
            </span>
          </div>
        </button>

        {/* End Date Input */}
        <button
          type="button"
          onClick={() => openFor("end")}
          className={`flex flex-col text-left px-3 py-2 rounded-lg transition-all ${
            open && activeInput === "end"
              ? "bg-white dark:bg-gray-900 border-2 border-blue-600 dark:border-blue-500 shadow-sm"
              : "bg-white dark:bg-gray-900/60 hover:bg-white dark:hover:bg-gray-900 border border-gray-200 dark:border-gray-700/60"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            End Date
          </span>
          <div className="flex items-center gap-1.5 mt-0.5 text-sm font-medium text-gray-900 dark:text-white">
            <CalendarIcon
              size={14}
              className="text-blue-600 dark:text-blue-400 shrink-0"
            />
            <span
              className={
                range?.to
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400 dark:text-gray-500"
              }
            >
              {range?.to ? format(range.to, "MMM d, yyyy") : "Pick date"}
            </span>
          </div>
        </button>
      </div>

      {/* DayPicker Popover Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 lg:left-auto lg:right-0 z-50 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-4 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <style>{`
            .rdp {
              --rdp-cell-size: 38px;
              --rdp-accent-color: #2563eb;
              --rdp-background-color: #dbeafe;
              margin: 0;
            }
            .dark .rdp {
              --rdp-accent-color: #3b82f6;
              --rdp-background-color: #1e3a8a;
            }
            .rdp-day_selected:not(.rdp-day_outside) {
              background-color: var(--rdp-accent-color) !important;
              color: white !important;
            }
            .rdp-day_range_middle {
              background-color: var(--rdp-background-color) !important;
              color: inherit !important;
              border-radius: 0 !important;
            }
            .dark .rdp-day_range_middle {
              color: #f3f4f6 !important;
            }
            .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
              background-color: #f3f4f6;
            }
            .dark .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
              background-color: #1f2937;
            }
            .dark .rdp-caption_label, .dark .rdp-head_cell {
              color: #f3f4f6;
            }
            .dark .rdp-nav_button {
              color: #9ca3af;
            }
          `}</style>

          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            disabled={{ before: today }}
            numberOfMonths={1}
            defaultMonth={range?.from || today}
          />
        </div>
      )}

      {/* Duration Summary Badge */}
      {range?.from && range?.to && rentalDays > 0 && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-300">
            <span>{format(range.from, "MMM d")}</span>
            <ArrowRight size={12} />
            <span>{format(range.to, "MMM d, yyyy")}</span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
            {rentalDays} {rentalDays === 1 ? "day" : "days"}
          </span>
        </div>
      )}
    </div>
  );
}
