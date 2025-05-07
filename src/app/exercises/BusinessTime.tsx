'use client';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";

export default function BusinessTime() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <div>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
    </div>
  )
};
