"use client";
import React from "react";
import { MonthNavigator } from "@/components/month-navigator";
import LargeCreateButton from "@/components/shared/large-create-button";
import { CreateFolderDialog } from "./folder/create-folder-dialog";
import { CreateNoteDialog } from "./note/create-note-dialog";

export default function ButtonWithNavigator({
  createButtonType,
}: {
  createButtonType: "folder" | "note";
}) {
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
    <div className="xs:flex-row flex flex-col items-start justify-between gap-5">
      {createButtonType === "folder" ? (
        <CreateFolderDialog
          trigger={
            <LargeCreateButton label="New Folder" className="min-h-52 w-52" />
          }
        />
      ) : (
        <CreateNoteDialog
          trigger={
            <LargeCreateButton label="New Note" className="min-h-52 w-52" />
          }
        />
      )}
      <MonthNavigator
        month={month}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onDateChange={handleDateChange}
        className="xs:self-start self-end"
      />
    </div>
  );
}
