"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Folder as FolderIcon } from "lucide-react";

type Folder = {
  value: string;
  label: string;
  parent?: string;
};

const folders: Folder[] = [
  {
    value: "personal",
    label: "Personal",
  },
  {
    value: "work",
    label: "Work",
  },
  {
    value: "work-projects",
    label: "Projects",
    parent: "Work",
  },
  {
    value: "work-projects-project-a",
    label: "Project A",
    parent: "Work / Projects",
  },
  {
    value: "travel",
    label: "Travel",
  },
  {
    value: "recipes",
    label: "Recipes",
  },
  {
    value: "ideas",
    label: "Ideas",
  },
];

interface MoveFolderDialogProps {
  trigger: React.ReactNode;
}

export function MoveFolderDialog({ trigger }: MoveFolderDialogProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Filter folders..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            {folders.map((folder) => (
              <CommandItem
                key={folder.value}
                value={folder.value}
                onSelect={() => {
                  setOpen(false);
                }}
              >
                <FolderIcon className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  {folder.parent && (
                    <span className="text-xs text-muted-foreground">
                      {folder.parent}
                    </span>
                  )}
                  <span>{folder.label}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
