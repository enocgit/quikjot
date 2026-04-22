"use client";

import { getAllFolders } from "@/actions/folders";
import { moveNote } from "@/actions/notes";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { Folder as FolderType } from "@/db/schema";
import { Folder as FolderIcon, Loader2 } from "lucide-react";
import * as React from "react";
import { useTransition } from "react";

interface MoveNoteDialogProps {
  trigger: React.ReactNode;
  noteId?: number;
  currentParentId?: number | null;
  onMove?: (id: number, newParentId: number | null) => void;
}

export function MoveNoteDialog({
  trigger,
  noteId,
  currentParentId,
  onMove,
}: MoveNoteDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [allFolders, setAllFolders] = React.useState<FolderType[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [, startTransition] = useTransition();

  React.useEffect(() => {
    if (open) {
      setLoading(true);
      getAllFolders().then((folders) => {
        setAllFolders(folders);
        setLoading(false);
      });
    }
  }, [open]);

  const handleMove = (newParentId: number | null) => {
    if (!noteId) return;

    startTransition(async () => {
      if (onMove) {
        onMove(noteId, newParentId);
      }
      setOpen(false);
      await moveNote(noteId, newParentId);
    });
  };

  const folderMap = React.useMemo(() => {
    const map = new Map<number, string>();
    allFolders.forEach((f) => map.set(f.id, f.name));
    return map;
  }, [allFolders]);

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search destination folder..." />
        <CommandList>
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
            </div>
          ) : (
            <>
              <CommandEmpty>No folders found.</CommandEmpty>
              <CommandGroup heading="Locations">
                {/* Root location */}
                {currentParentId !== null && (
                  <CommandItem value="root" onSelect={() => handleMove(null)}>
                    <FolderIcon className="mr-2 h-4 w-4" />
                    <span>All Notes (Root)</span>
                  </CommandItem>
                )}

                {allFolders.map((folder) => {
                  const parentName =
                    folder.parentId != null
                      ? folderMap.get(folder.parentId)
                      : null;

                  return (
                    <CommandItem
                      key={folder.id}
                      // Suffix ID to make each value unique — prevents same-name hover bleed
                      value={`${folder.name}-${folder.id}`}
                      onSelect={() => handleMove(folder.id)}
                      disabled={folder.id === currentParentId}
                    >
                      <FolderIcon className="mr-2 h-4 w-4 shrink-0" />
                      <div className="flex flex-col">
                        {parentName && (
                          <span className="text-muted-foreground text-xs">
                            {parentName}
                          </span>
                        )}
                        <span>{folder.name}</span>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
