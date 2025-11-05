"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import dynamic from "next/dynamic";
import SectionWithSidebar from "../_components/section-with-sidebar";
import { MonthNavigator } from "@/components/month-navigator";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const FolderCard = dynamic(() => import("@/components/folder/folder-card"), {
  ssr: false,
});

const CreateFolderDialog = dynamic(
  () =>
    import("@/components/folder/create-folder-dialog").then(
      (mod) => mod.CreateFolderDialog,
    ),
  {
    ssr: false,
  },
);

function BreadcrumbComp() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Folders</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function FoldersPage() {
  const folders: any[] = []; // Empty array to simulate empty state
  const hasFolders = folders.length > 0;
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
    <main className="wrapper py-vertical">
      <BreadcrumbComp />
      <div className="mt-5 flex items-center justify-end">
        <MonthNavigator
          month={month}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          onDateChange={handleDateChange}
        />
      </div>
      <SectionWithSidebar title="Folders">
        {hasFolders ? (
          <div className="file-grid">
            {folders.map((folder, index) => (
              <FolderCard
                key={index}
                title={folder.title}
                date={folder.date}
                fullWidth
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full min-h-52 items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Folder />
                </EmptyMedia>
                <EmptyTitle>No Folders Yet</EmptyTitle>
                <EmptyDescription>
                  Create your first folder to get started.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <CreateFolderDialog trigger={<Button>Create Folder</Button>} />
              </EmptyContent>
            </Empty>
          </div>
        )}
      </SectionWithSidebar>
    </main>
  );
}
