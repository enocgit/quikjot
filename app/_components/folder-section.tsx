"use client";
import React from "react";
import SectionWithSidebar from "./section-with-sidebar";
import { MonthNavigator } from "@/components/month-navigator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import FolderCard from "@/components/folder/folder-card";
import CreateFolderButton from "@/components/folder/create-folder-button";

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

  return (
    <SectionWithSidebar
      title="Recent Folders"
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
          <div className="mt-5 flex gap-3">
            <FolderCard title="Folder 1" date="2021-01-01" />
            <FolderCard title="Folder 1" date="2021-01-01" />
            <FolderCard title="Folder 1" date="2021-01-01" />
            <CreateFolderButton />
          </div>
        </TabsContent>
      </Tabs>
    </SectionWithSidebar>
  );
}
