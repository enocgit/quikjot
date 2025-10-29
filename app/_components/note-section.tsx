"use client";

import React from "react";
import SectionWithSidebar from "./section-with-sidebar";
import { MonthNavigator } from "@/components/month-navigator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import LargeCreateButton from "@/components/shared/large-create-button";
import { CreateNoteDialog } from "@/components/note/create-note-dialog";
import dynamic from "next/dynamic";
const FileCard = dynamic(() => import("@/components/file/file-card"), {
  ssr: false,
});

export default function NoteSection() {
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
    <SectionWithSidebar
      title="My Notes"
      sidebar={
        <>
          <MonthNavigator
            month={month}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            onDateChange={handleDateChange}
          />
          <Link href="/notes" className="text-secondary-foreground w-fit">
            See All
          </Link>
        </>
      }
    >
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <section className="mt-5 gap-3 xl:flex xl:flex-row">
            <div className="hidden-scrollbar xxs:grid-cols-2 order-2 grid grid-cols-1 gap-3 overflow-x-auto min-[520px]:grid-cols-3 md:grid-cols-(--file-grid-cols) xl:order-1 xl:flex">
              <div className="xl:hidden">
                <CreateNoteDialog
                  trigger={
                    <LargeCreateButton label="New File" className="min-h-60" />
                  }
                />
              </div>
              <FileCard
                title="Meeting Notes Genesis Above All Here And About"
                date="2021-01-01"
                body="This is a note about the meeting. A meeting note that I wrote yesterday."
              />
              <FileCard
                title="Grocery List"
                date="2021-01-01"
                body="This is a note about the grocery list"
              />
              <FileCard
                title="Article Draft"
                date="2021-01-01"
                body="This is a note about the folder"
              />
              <FileCard
                title="Article Draft"
                date="2021-01-01"
                body="This is a note about the folder"
              />
            </div>
            <div className="order-1 hidden xl:order-2 xl:block">
              <CreateNoteDialog
                trigger={
                  <LargeCreateButton label="New File" className="min-h-60" />
                }
              />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </SectionWithSidebar>
  );
}
