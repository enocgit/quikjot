"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Folder as FolderType, Note as NoteType } from "@/db/schema";
import { File as FileIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useOptimistic } from "react";

const FileCard = dynamic(() => import("@/components/file/file-card"));
const FolderCard = dynamic(() => import("@/components/folder/folder-card"));
const CreateFolderDialog = dynamic(() =>
  import("@/components/folder/create-folder-dialog").then(
    (mod) => mod.CreateFolderDialog,
  ),
);
const CreateNoteDialog = dynamic(() =>
  import("@/components/note/create-note-dialog").then(
    (mod) => mod.CreateNoteDialog,
  ),
);

export default function FolderContent({
  folder,
  initialChildFolders,
  notes,
}: {
  folder: FolderType;
  initialChildFolders: FolderType[];
  notes: NoteType[];
}) {
  const [optimisticFolders, updateOptimisticFolders] = useOptimistic(
    initialChildFolders,
    (
      state,
      action:
        | { type: "add"; folder: FolderType }
        | { type: "rename"; id: number; name: string }
        | { type: "update-color"; id: number; color: string }
        | { type: "move"; id: number; parentId: number | null }
        | { type: "trash"; id: number },
    ) => {
      switch (action.type) {
        case "add":
          return [action.folder, ...state];
        case "rename":
          return state.map((f) =>
            f.id === action.id
              ? {
                  ...f,
                  name: action.name,
                  slug: action.name.toLowerCase().replace(/\s+/g, "-"),
                }
              : f,
          );
        case "update-color":
          return state.map((f) =>
            f.id === action.id ? { ...f, color: action.color } : f,
          );
        case "move":
          // If we're moving it OUT of this folder
          if (action.parentId !== folder.id) {
            return state.filter((f) => f.id !== action.id);
          }
          return state;
        case "trash":
          return state.filter((f) => f.id !== action.id);
        default:
          return state;
      }
    },
  );

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
          // If we're moving it OUT of this folder
          if (action.parentId !== folder.id) {
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

  const hasContent = optimisticFolders.length > 0 || optimisticNotes.length > 0;

  if (!hasContent) {
    return (
      <div className="flex h-full min-h-52 items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FileIcon />
            </EmptyMedia>
            <EmptyTitle>No Notes Yet</EmptyTitle>
            <EmptyDescription>
              Create your first note in this folder to get started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex flex-row justify-center gap-2">
            <CreateFolderDialog
              trigger={<Button variant="outline">Create Folder</Button>}
              parentId={folder.id}
              onAddOptimistic={(folder) =>
                updateOptimisticFolders({ type: "add", folder })
              }
            />
            <CreateNoteDialog
              trigger={<Button>Create Note</Button>}
              folders={initialChildFolders}
              onAddOptimistic={(note) =>
                updateOptimisticNotes({ type: "add", note })
              }
            />
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {optimisticFolders.length > 0 && (
        <div className="file-grid">
          {optimisticFolders.map((child) => (
            <FolderCard
              key={child.id}
              id={child.id}
              title={child.name}
              date={child.createdAt.toLocaleDateString()}
              slug={child.slug}
              color={child.color}
              onUpdate={updateOptimisticFolders}
              parentId={child.parentId}
            />
          ))}
        </div>
      )}
      {optimisticNotes.length > 0 && (
        <div className="file-grid">
          {optimisticNotes.map((note) => (
            <FileCard
              key={note.id}
              id={note.id}
              folderId={note.folderId}
              title={note.title}
              color={note.color}
              date={note.createdAt.toLocaleDateString()}
              body={note.content as any} // we'll render text inside if needed
              onUpdate={updateOptimisticNotes}
              fullWidth
            />
          ))}
        </div>
      )}
    </div>
  );
}
