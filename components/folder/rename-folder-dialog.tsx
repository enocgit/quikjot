import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState, useTransition, useRef } from "react";
import { renameFolder } from "@/actions/folders";
import { Loader2 } from "lucide-react";

export function RenameFolderDialog({ 
  id,
  initialName,
  onRename,
  trigger 
}: { 
  id: number;
  initialName: string;
  onRename?: (newName: string) => void;
  trigger: React.ReactNode 
}) {
  const [name, setName] = useState(initialName);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const submittedRef = useRef(false);

  const handleOpenChange = (nextOpen: boolean) => {
    // Block re-opening caused by parent re-renders after submission
    if (nextOpen && submittedRef.current) return;
    setOpen(nextOpen);
    if (!nextOpen) {
      submittedRef.current = false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    submittedRef.current = true;
    setOpen(false);
    startTransition(async () => {
      if (onRename) {
        onRename(name);
      }
      await renameFolder(id, name);
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename folder</DialogTitle>
            <DialogDescription>
              Enter a new name for your folder.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input 
              id="name" 
              placeholder="Folder name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
