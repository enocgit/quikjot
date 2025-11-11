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
import { Typography } from "@/components/ui/typography";
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
import { File, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileCard = dynamic(() => import("@/components/file/file-card"), {
  ssr: false,
});

const CreateNoteDialog = dynamic(
  () =>
    import("@/components/note/create-note-dialog").then(
      (mod) => mod.CreateNoteDialog,
    ),
  {
    ssr: false,
  },
);

const notes = [
  {
    id: "1",
    title: "Note 1",
    date: "2025-01-01",
    body: "This is a note about the note 1. This is a bit longer note to test the length of the note.",
  },
  {
    id: "2",
    title: "Note 2",
    date: "2025-01-01",
    body: "This is a note about the note 2",
  },
  {
    id: "3",
    title: "Note 3. This is a longer title to test the length of the title.",
    date: "2025-01-01",
    body: "This is a note about the note 3. This is a bit longer note to test the length of the note.",
  },
  {
    id: "4",
    title: "Note 4",
    date: "2025-01-01",
    body: "This is a note about the note 4",
  },
];

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
          <BreadcrumbPage>Notes</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function NotesPage() {
  const hasNotes = notes.length > 0;
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
      <SectionWithSidebar title="Notes">
        {hasNotes ? (
          <section className="@container/notes space-y-5">
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Folder className="size-4" />
                <Typography variant="h6">Project X</Typography>
              </div>

              <div className="file-grid">
                <FileCard
                  title="Meeting Notes Genesis Above All Here And About"
                  date="2021-01-01"
                  body="This is a note about the meeting. A meeting note that I wrote yesterday."
                  fullWidth
                />
                <FileCard
                  title="Grocery List"
                  date="2021-01-01"
                  body="This is a note about the grocery list"
                  fullWidth
                />
                <FileCard
                  title="Article Draft"
                  date="2021-01-01"
                  body="This is a note about the folder"
                  fullWidth
                />
                <FileCard
                  title="Article Draft"
                  date="2021-01-01"
                  body="This is a note about the folder"
                  fullWidth
                />
                <FileCard
                  title="Article Draft"
                  date="2021-01-01"
                  body="This is a note about the folder"
                  fullWidth
                />
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Folder className="size-4" />
                <Typography variant="h6">Work</Typography>
              </div>

              <div className="file-grid">
                <FileCard
                  title="Article Draft"
                  date="2021-01-01"
                  body="This is a note about the folder"
                  fullWidth
                />
                <FileCard
                  title="Article Draft"
                  date="2021-01-01"
                  body="This is a note about the folder"
                  fullWidth
                />
              </div>
            </div>
          </section>
        ) : (
          <div className="flex h-full min-h-52 items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <File />
                </EmptyMedia>
                <EmptyTitle>No Notes Yet</EmptyTitle>
                <EmptyDescription>
                  Create your first note to get started.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <CreateNoteDialog trigger={<Button>Create Note</Button>} />
              </EmptyContent>
            </Empty>
          </div>
        )}
      </SectionWithSidebar>
    </main>
  );
}
