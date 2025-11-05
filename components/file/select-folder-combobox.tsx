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
import { Folder } from "lucide-react";

type Status = {
  value: string;
  label: string;
};

const statuses: Status[] = [
  {
    value: "personal",
    label: "Personal",
  },
  {
    value: "work",
    label: "Work",
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

export function SelectFolderComboBox() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null,
  );

  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Folder className="size-4" />
            <span>
              {" "}
              {selectedStatus ? (
                <>{selectedStatus.label}</>
              ) : (
                <>Select Folder</>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
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
            {selectedStatus ? <>{selectedStatus.label}</> : <>Select Folder</>}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null,
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
