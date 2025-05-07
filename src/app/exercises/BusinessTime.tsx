'use client';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState, useMemo } from "react";

const BUSINESS_START_HOURS = 9;
const BUSINESS_END_HOURS = 17;
const SATURDAY = 6;
const SUNDAY = 7;

function isWeekday(day: number) {
  // 6 and 7 are Saturday and Sunday
  return (day !== SATURDAY && day !== SUNDAY);
}

function getStartHours(date: Date): number {
  const hours = date.getHours();
  if (hours < BUSINESS_START_HOURS) return BUSINESS_START_HOURS;
  return hours;
}

function getEndHours(date: Date, end: Date): number {
  const isSame = date.toDateString() === end.toDateString();
  if (isSame) return Math.min(end.getHours(), BUSINESS_END_HOURS);
  return BUSINESS_END_HOURS;
}

function calculateBusinessHours(start: Date, end: Date): number {
  if (end <= start) return 0;

  let totalHours = 0;
  const current = new Date(start);

  while (current < end) {
    const day = current.getDay();

    if (isWeekday(day)) {
      const startHours = getStartHours(current);
      const endHours = getEndHours(current, end);

      if (endHours > startHours) {
        totalHours += endHours - startHours;
      }
    }

    // Move to the next day at 00:00
    current.setDate(current.getDate() + 1);
    current.setHours(0, 0, 0, 0);
  }

  return totalHours;
}

export default function BusinessTime() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const businessHours = useMemo(() => {
    if (!startDate || !endDate) return 0;
    return calculateBusinessHours(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col text-sm font-medium text-gray-900 dark:text-white mb-2">
        Start date
        <DatePicker
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(date) => setStartDate(date)}
          selected={startDate}
          dateFormat="Pp"
          showTimeSelect />
      </div>
      <div className="flex flex-col text-sm font-medium text-gray-900 dark:text-white mb-2">
        End date
        <DatePicker
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(date) => setEndDate(date)}
          selected={endDate}
          dateFormat="Pp"
          showTimeSelect />
      </div>
      <p className="text-sm text-gray-900 dark:text-white mb-2">
        Business time: {businessHours} hours
      </p>
    </div>
  )
}
