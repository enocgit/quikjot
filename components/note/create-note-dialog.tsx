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

export function CreateNoteDialog({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Create new note</DialogTitle>
          <DialogDescription className="sr-only">
            Create a new note with a title and rich text content.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <FileEditor />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
