"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  onDateRangeChange: (startDate: string, endDate: string) => void;
}

export function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (value: string) => {
    setStartDate(value);
    if (value && endDate) {
      onDateRangeChange(value, endDate);
    }
  };

  const handleEndDateChange = (value: string) => {
    setEndDate(value);
    if (startDate && value) {
      onDateRangeChange(startDate, value);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Select Rental Dates</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Start Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground-secondary mb-2">
            Start Date
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-3 text-foreground-secondary"
              size={18}
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              min={today}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* End Date */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground-secondary mb-2">
            End Date
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-3 text-foreground-secondary"
              size={18}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleEndDateChange(e.target.value)}
              min={startDate || today}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {startDate && endDate && (
        <div className="bg-background-secondary rounded-lg p-4">
          <p className="text-sm text-foreground-secondary mb-1">
            Rental Duration
          </p>
          <p className="font-semibold text-foreground">
            {Math.ceil(
              (new Date(endDate).getTime() - new Date(startDate).getTime()) /
                (1000 * 60 * 60 * 24),
            )}{" "}
            days
          </p>
        </div>
      )}
    </div>
  );
}
