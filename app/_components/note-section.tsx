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
import type { Folder as FolderType, Note as NoteType } from "@/db/schema";
import { useMemo, useOptimistic, useState } from "react";

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

type TabValue = "all" | "today" | "this-week" | "this-month";

function filterNotes(notes: NoteType[], tab: TabValue): NoteType[] {
  if (tab === "all") return notes;

  const now = new Date();

  return notes.filter((note) => {
    const created = new Date(note.createdAt);

    if (tab === "today") {
      return created.toDateString() === now.toDateString();
    }

    if (tab === "this-week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      return created >= startOfWeek;
    }

    if (tab === "this-month") {
      return (
        created.getFullYear() === now.getFullYear() &&
        created.getMonth() === now.getMonth()
      );
    }

    return true;
  });
}

// Mock data removed.

export default function NoteSection({
  notes = [],
  folders = [],
}: {
  notes?: NoteType[];
  folders?: FolderType[];
}) {
  const [optimisticNotes, updateOptimisticNotes] = useOptimistic(
    notes,
    (
      state,
      action:
        | { type: "add"; note: NoteType }
        | { type: "move"; id: number; parentId: number | null }
        | { type: "trash"; id: number }
        | { type: "update"; note: NoteType },
    ) => {
      switch (action.type) {
        case "add":
          return [action.note, ...state];
        case "update":
          return state.map((n) => (n.id === action.note.id ? action.note : n));
        case "move":
          // Moves don't hide root notes in NoteSection typically, but since
          // NoteSection shows ALL notes (if it's the home page and not filtered)
          // maybe we don't drop them. Wait, if it gets moved to a folder, it's not root...
          // But "My Notes" usually shows all notes unless we filter root notes.
          // The page passes getNotes() which gives `folderId IS NULL`. So Yes, we hide moved!
          if (action.parentId !== null) {
            return state.filter((n) => n.id !== action.id);
          }
          return state;
        case "trash":
          return state.filter((n) => n.id !== action.id);
        default:
          return state;
      }
    },
  );

  const [tab, setTab] = useState<TabValue>("all");

  const filtered = useMemo(
    () => filterNotes(optimisticNotes, tab),
    [optimisticNotes, tab],
  );

  const hasNotes = filtered.length > 0;

  return (
    <SectionWithSidebar title="Recent Notes">
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          {hasNotes ? (
            <section className="mt-5">
              <div className="file-grid">
                {filtered.map((note) => (
                  <FileCard
                    key={note.id}
                    id={note.id}
                    folderId={note.folderId}
                    title={note.title}
                    color={note.color}
                    date={note.createdAt.toLocaleDateString()}
                    body={note.content as any} // render text inside FileCard or it strips Slate JSON
                    onUpdate={updateOptimisticNotes}
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
                  <EmptyTitle>
                    {tab === "all" ? "No Notes Yet" : "No notes found"}
                  </EmptyTitle>
                  <EmptyDescription>
                    {tab === "all"
                      ? "Create your first note to get started."
                      : "No notes were created in this period."}
                  </EmptyDescription>
                </EmptyHeader>
                {tab === "all" && (
                  <EmptyContent>
                    <CreateNoteDialog
                      trigger={<Button>Create Note</Button>}
                      folders={folders}
                      onAddOptimistic={(note) =>
                        updateOptimisticNotes({ type: "add", note })
                      }
                    />
                  </EmptyContent>
                )}
              </Empty>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </SectionWithSidebar>
  );
}
