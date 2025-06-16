"use client";

import React from "react";
import SectionWithSidebar from "./section-with-sidebar";
import { MonthNavigator } from "@/components/month-navigator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import FileCard from "@/components/file/file-card";
import LargeCreateButton from "@/components/shared/large-create-button";

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

  return (
    <SectionWithSidebar
      title="My Notes"
      sidebar={
        <>
          <MonthNavigator
            month={month}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
          />
          <Link href="/" className="text-secondary-foreground w-fit">
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
          <section className="mt-5 flex xl:flex-row flex-col gap-3">
            <div className="flex gap-3 overflow-x-auto hidden-scrollbar xl:order-1 order-2">
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
            <div className="xl:order-2 order-1">
              <LargeCreateButton label="New File" className="min-h-60" />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </SectionWithSidebar>
  );
}
