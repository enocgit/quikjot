"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import dynamic from "next/dynamic";
import { File } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import SectionWithSidebar from "./section-with-sidebar";
import { Button } from "@/components/ui/button";

const CreateNoteDialog = dynamic(
  () =>
    import("@/components/note/create-note-dialog").then(
      (mod) => mod.CreateNoteDialog,
    ),
  {
    ssr: false,
  },
);

const FileCard = dynamic(() => import("@/components/file/file-card"), {
  ssr: false,
});

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

export default function NoteSection() {
  const hasNotes = notes.length > 0;

  return (
    <SectionWithSidebar
      title="My Notes"
      seeAllLink={
        <Link
          href="/notes"
          className="text-secondary-foreground w-fit text-sm md:text-base"
        >
          See All
        </Link>
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
          {hasNotes ? (
            <section className="mt-5">
              <div className="file-grid">
                {notes.map((note, index) => (
                  <FileCard
                    key={index}
                    title={note.title}
                    date={note.date}
                    body={note.body}
                  />
                ))}
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
        </TabsContent>
      </Tabs>
    </SectionWithSidebar>
  );
}
