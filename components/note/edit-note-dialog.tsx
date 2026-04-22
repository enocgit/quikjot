"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
const FileEditor = dynamic(
  () => import("@/components/file/file-editor").then((mod) => mod.FileEditor),
  {
    ssr: false,
  },
);

import { useActionState, useEffect, useState } from "react";
import { updateNote } from "@/actions/notes";
import { Loader2 } from "lucide-react";
import type { Folder as FolderType } from "@/db/schema";
import type { Note as NoteType } from "@/db/schema";
import { Descendant } from "slate";

const DEFAULT_INITIAL_VALUE: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export function EditNoteDialog({
  trigger,
  note,
  folders = [],
  onUpdateOptimistic,
}: {
  trigger: React.ReactNode;
  note: NoteType;
  folders?: FolderType[];
  onUpdateOptimistic?: (note: NoteType) => void;
}) {
  const [open, setOpen] = useState(false);
  const [state, action, isPending] = useActionState(updateNote, null);

  const [title, setTitle] = useState(note.title);
  const [folderId, setFolderId] = useState<number | null>(note.folderId);

  // Need to handle missing or stringified content safely
  const initialContent = note.content
    ? typeof note.content === "string"
      ? JSON.parse(note.content)
      : (note.content as Descendant[])
    : DEFAULT_INITIAL_VALUE;

  const [content, setContent] = useState<Descendant[]>(initialContent);

  // Reset state when opened to match note
  useEffect(() => {
    if (open) {
      setTitle(note.title);
      setFolderId(note.folderId);
      setContent(initialContent);
    }
  }, [open, note, initialContent]);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  const handleAction = async (formData: FormData) => {
    formData.set("id", note.id.toString());
    formData.set("content", JSON.stringify(content));
    if (folderId) {
      formData.set("folderId", folderId.toString());
    } else {
      formData.delete("folderId");
    }

    if (onUpdateOptimistic) {
      const optimisticNote = {
        ...note,
        title,
        content,
        folderId,
        updatedAt: new Date(),
      };
      onUpdateOptimistic(optimisticNote);
    }
    action(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 sm:max-w-4xl">
        <form action={handleAction}>
          <input type="hidden" name="title" value={title} />
          <input type="hidden" name="id" value={note.id} />

          <div className="max-h-[85vh] overflow-y-auto px-6 py-4 pb-0">
            <DialogHeader className="mb-4">
              <DialogTitle className="sr-only">Edit note</DialogTitle>
              <DialogDescription className="sr-only">
                Edit an existing note with a title and rich text content.
              </DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <FileEditor
                folders={folders}
                title={title}
                onTitleChange={setTitle}
                folderId={folderId}
                onFolderChange={setFolderId}
                content={content}
                onContentChange={setContent}
                titleError={state?.error}
              />
            </div>
          </div>
          <DialogFooter className="px-6 py-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || !title.trim()}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
