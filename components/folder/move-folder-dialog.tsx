"use client";

import { getAllFolders, moveFolder } from "@/actions/folders";
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

interface MoveFolderDialogProps {
  trigger: React.ReactNode;
  folderId?: number;
  currentParentId?: number | null;
  onMove?: (id: number, newParentId: number | null) => void;
}

export function MoveFolderDialog({ 
  trigger, 
  folderId, 
  currentParentId,
  onMove 
}: MoveFolderDialogProps) {
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

  // Helper to check if a folder is a descendant of the folder being moved
  const isDescendant = (targetParentId: number | null, sourceFolderId: number) => {
    if (targetParentId === null) return false;
    if (targetParentId === sourceFolderId) return true;
    
    let currentId: number | null = targetParentId;
    const visited = new Set<number>(); // Prevent infinite loops if DB has corrupt cycles
    
    while (currentId !== null) {
      if (visited.has(currentId)) break;
      visited.add(currentId);
      
      const parentFolder = allFolders.find(f => f.id === currentId);
      if (!parentFolder) break;
      
      if (parentFolder.parentId === sourceFolderId) return true;
      currentId = parentFolder.parentId;
    }
    
    return false;
  };

  const handleMove = (newParentId: number | null) => {
    if (!folderId) return;
    
    startTransition(async () => {
      if (onMove) {
        onMove(folderId, newParentId);
      }
      setOpen(false);
      await moveFolder(folderId, newParentId);
    });
  };

  const folderMap = React.useMemo(() => {
    const map = new Map<number, string>();
    allFolders.forEach(f => map.set(f.id, f.name));
    return map;
  }, [allFolders]);

  const availableFolders = folderId 
    ? allFolders.filter(f => f.id !== folderId && !isDescendant(f.id, folderId))
    : allFolders;

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search destination folder..." />
        <CommandList>
          {loading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <CommandEmpty>No folders found.</CommandEmpty>
              <CommandGroup heading="Locations">
                {/* Root location */}
                {currentParentId !== null && (
                  <CommandItem
                    value="root"
                    onSelect={() => handleMove(null)}
                  >
                    <FolderIcon className="mr-2 h-4 w-4" />
                    <span>All Notes (Root)</span>
                  </CommandItem>
                )}
                
                {availableFolders.map((folder) => {
                  const parentName = folder.parentId != null 
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
                          <span className="text-xs text-muted-foreground">
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
