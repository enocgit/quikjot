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
import { Folder } from "lucide-react";
import dynamic from "next/dynamic";
import { useOptimistic } from "react";

const FolderCard = dynamic(() => import("@/components/folder/folder-card"));
const FileCard = dynamic(() => import("@/components/file/file-card"));
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

export default function FoldersList({
  folders,
  notes = [],
}: {
  folders: FolderType[];
  notes?: NoteType[];
}) {
  const [optimisticFolders, updateOptimisticFolders] = useOptimistic(
    folders,
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
          if (action.parentId !== null) {
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
          // FoldersList is for root items. If moved to a folder (parentId !== null), hide it
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

  const hasContent = optimisticFolders.length > 0 || optimisticNotes.length > 0;

  if (!hasContent) {
    return (
      <div className="flex h-full min-h-52 items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folder />
            </EmptyMedia>
            <EmptyTitle>No Folders or Notes Yet</EmptyTitle>
            <EmptyDescription>
              Create your first folder or note to get started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex flex-row justify-center gap-2">
            <CreateFolderDialog
              trigger={<Button variant="outline">Create Folder</Button>}
              onAddOptimistic={(folder) =>
                updateOptimisticFolders({ type: "add", folder })
              }
            />
            <CreateNoteDialog
              trigger={<Button>Create Note</Button>}
              folders={optimisticFolders}
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
          {optimisticFolders.map((folder) => (
            <FolderCard
              key={folder.id}
              id={folder.id}
              title={folder.name}
              date={folder.createdAt.toLocaleDateString()}
              slug={folder.slug}
              color={folder.color}
              onUpdate={updateOptimisticFolders}
              parentId={folder.parentId}
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
              body={note.content as any}
              onUpdate={updateOptimisticNotes}
              fullWidth
            />
          ))}
        </div>
      )}
    </div>
  );
}
