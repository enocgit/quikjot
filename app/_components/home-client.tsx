"use client";

import React from "react";
import { MonthNavigator } from "@/components/month-navigator";

export default function HomeClient() {
  const [month, setMonth] = React.useState<Date>(new Date());

  const handlePrevMonth = () => {
    setMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };
  const handleNextMonth = () => {
    setMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const handleDateChange = (date: Date) => {
    setMonth(date);
  };

  return (
    <div className="flex items-center justify-end">
      <MonthNavigator
        month={month}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onDateChange={handleDateChange}
      />
    </div>
  );
}
