"use client";
import React from "react";
import { MonthNavigator } from "@/components/month-navigator";
import LargeCreateButton from "@/components/shared/large-create-button";

export default function ButtonWithNavigator() {
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
  return (
    <div className="flex xs:flex-row flex-col gap-5 justify-between items-start">
      <LargeCreateButton label="New Note" className="min-h-52" />
      <MonthNavigator
        month={month}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        className="self-end xs:self-start"
      />
    </div>
  );
}
