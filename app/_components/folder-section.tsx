"use client";
import React from "react";
import SectionWithSidebar from "./section-with-sidebar";
import { MonthNavigator } from "@/components/month-navigator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import FolderCard from "@/components/folder/folder-card";
import LargeCreateButton from "@/components/shared/large-create-button";
import { CreateFolderDialog } from "@/components/folder/create-folder-dialog";

export default function FolderSection() {
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
      title="Recent Folders"
      sidebar={
        <>
          <MonthNavigator
            month={month}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            onDateChange={handleDateChange}
          />
          <Link href="/folders" className="text-secondary-foreground w-fit">
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
                <CreateFolderDialog
                  trigger={
                    <LargeCreateButton
                      label="New Folder"
                      className="min-h-52"
                    />
                  }
                />
              </div>
              <FolderCard
                title="Folder 1 Genesis Above All"
                date="2021-01-01"
              />
              <FolderCard title="Folder 2" date="2021-01-01" />
              <FolderCard title="Folder 3" date="2021-01-01" />
              <FolderCard title="Folder 4" date="2021-01-01" />
            </div>
            <div className="order-1 hidden xl:order-2 xl:block">
              <CreateFolderDialog
                trigger={
                  <LargeCreateButton label="New Folder" className="min-h-52" />
                }
              />
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </SectionWithSidebar>
  );
}
