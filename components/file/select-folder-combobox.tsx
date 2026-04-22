"use client";

import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Loader2, Folder } from "lucide-react";
import type { Folder as FolderType } from "@/db/schema";
import { getAllFolders } from "@/actions/folders";

export function SelectFolderComboBox({
  folders = [],
  value,
  onChange,
}: {
  folders?: FolderType[];
  value?: number | null;
  onChange?: (folderId: number | null) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const [allFolders, setAllFolders] = React.useState<FolderType[]>(folders);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setLoading(true);
      getAllFolders().then((res) => {
        setAllFolders(res);
        setLoading(false);
      });
    }
  }, [open]);

  // Merge the fetched folders with the passed ones to immediately show the active one safely
  const mergedFolders = React.useMemo(() => {
    const map = new Map<number, FolderType>();
    folders.forEach((f) => map.set(f.id, f));
    allFolders.forEach((f) => map.set(f.id, f));
    return Array.from(map.values());
  }, [folders, allFolders]);

  const selectedFolder = mergedFolders.find((f) => f.id === value) || null;

  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Folder className="size-4" />
            <span>
              {" "}
              {selectedFolder ? <>{selectedFolder.name}</> : <>Select Folder</>}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0" align="start">
          <FolderList
            folders={mergedFolders}
            loading={loading}
            setOpen={setOpen}
            value={value}
            onChange={onChange}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Folder className="size-4" />
          <span>
            {" "}
            {selectedFolder ? <>{selectedFolder.name}</> : <>Select Folder</>}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <FolderList
            folders={mergedFolders}
            loading={loading}
            setOpen={setOpen}
            value={value}
            onChange={onChange}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function FolderList({
  folders,
  setOpen,
  value,
  onChange,
  loading,
}: {
  folders: FolderType[];
  setOpen: (open: boolean) => void;
  value?: number | null;
  onChange?: (folderId: number | null) => void;
  loading: boolean;
}) {
  const folderMap = React.useMemo(() => {
    const map = new Map<number, string>();
    folders.forEach((f) => map.set(f.id, f.name));
    return map;
  }, [folders]);
  return (
    <Command>
      <CommandInput placeholder="Filter folder..." />
      <CommandList>
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
          </div>
        ) : (
          <>
            <CommandEmpty>No folders found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="root"
                onSelect={() => {
                  if (onChange) onChange(null);
                  setOpen(false);
                }}
              >
                None (Root)
              </CommandItem>
              {folders.map((folder) => {
                const parentName =
                  folder.parentId != null
                    ? folderMap.get(folder.parentId)
                    : null;

                return (
                  <CommandItem
                    key={folder.id}
                    value={`${folder.name}-${folder.id}`}
                    onSelect={() => {
                      if (onChange) onChange(folder.id);
                      setOpen(false);
                    }}
                  >
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
    </Command>
  );
}
