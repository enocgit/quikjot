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
import SectionWithSidebar from "../../_components/section-with-sidebar";
import { MonthNavigator } from "@/components/month-navigator";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { File } from "lucide-react";
import { useParams } from "next/navigation";
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

function BreadcrumbComp({ slug }: { slug: string }) {
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
          <BreadcrumbLink asChild>
            <Link href="/folders">Folders</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{slug}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function FolderPage() {
  const params = useParams<{ slug: string }>();
  const notes: any[] = []; // Empty array to simulate empty state
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
      <BreadcrumbComp slug={params.slug} />
      <div className="mt-5 flex items-center justify-end">
        <MonthNavigator
          month={month}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          onDateChange={handleDateChange}
        />
      </div>
      <SectionWithSidebar title={params.slug}>
        {hasNotes ? (
          <div className="file-grid">
            {notes.map((note, index) => (
              <FileCard
                key={index}
                title={note.title}
                date={note.date}
                body={note.body}
                fullWidth
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full min-h-52 items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <File />
                </EmptyMedia>
                <EmptyTitle>No Notes Yet</EmptyTitle>
                <EmptyDescription>
                  Create your first note in this folder to get started.
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
