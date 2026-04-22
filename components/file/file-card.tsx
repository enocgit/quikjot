"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { FILE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Typography } from "../ui/typography";

import { duplicateNote, moveNoteToTrash } from "@/actions/notes";
import { useTransition } from "react";
import { MoveNoteDialog } from "../note/move-note-dialog";
import { EditNoteDialog } from "../note/edit-note-dialog";
import { Descendant } from "slate";
import type { Note as NoteType } from "@/db/schema";

const extractText = (nodes: any): string => {
  if (typeof nodes === "string") return nodes;
  if (!Array.isArray(nodes)) return "";
  return nodes
    .map((n) => {
      if ("text" in n) return n.text;
      if ("children" in n && Array.isArray(n.children))
        return extractText(n.children);
      return "";
    })
    .join(" ");
};

interface FileCardProps {
  id: number;
  folderId?: number | null;
  date: string;
  title: string;
  body: string | Descendant[];
  color?: string; // e.g. "blue", "yellow"
  isTrash?: boolean;
  onUpdate?: (
    action:
      | { type: "add"; note: NoteType }
      | { type: "move"; id: number; parentId: number | null }
      | { type: "trash"; id: number }
      | { type: "update"; note: NoteType },
  ) => void;
  fullWidth?: boolean;
}

function DropdownMenuComp({
  title,
  body,
  children,
  isTrash,
  id,
  folderId,
  onUpdate,
}: {
  title: string;
  body: string | Descendant[];
  children: React.ReactNode;
  isTrash?: boolean;
  id: number;
  folderId?: number | null;
  onUpdate?: FileCardProps["onUpdate"];
}) {
  const [, startTransition] = useTransition();

  const handleDuplicate = () => {
    startTransition(async () => {
      await duplicateNote(id);
    });
  };

  const noteObject = {
    id,
    folderId,
    title: (children as any)?.props?.title || "",
    content: (children as any)?.props?.body || "",
    color: "yellow", // Just dummy filler
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const handleTrash = () => {
    startTransition(async () => {
      if (onUpdate) {
        onUpdate({ type: "trash", id });
      }
      await moveNoteToTrash(id);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {isTrash ? (
          <DropdownMenuGroup>
            <DropdownMenuItem inset>Restore</DropdownMenuItem>
            <DropdownMenuItem inset variant="destructive">
              Delete Permanently
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            <EditNoteDialog
              note={
                {
                  id,
                  title,
                  content: body,
                  folderId,
                  color: "yellow",
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  deletedAt: null,
                } as any
              }
              onUpdateOptimistic={(updatedNote) =>
                onUpdate?.({ type: "update", note: updatedNote })
              }
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} inset>
                  Edit
                </DropdownMenuItem>
              }
            />
            <MoveNoteDialog
              noteId={id}
              currentParentId={folderId}
              onMove={(id, newParentId) =>
                onUpdate?.({ type: "move", id, parentId: newParentId })
              }
              trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} inset>
                  Move
                </DropdownMenuItem>
              }
            />
            <DropdownMenuItem onSelect={handleDuplicate} inset>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={handleTrash}
              inset
              variant="destructive"
            >
              Move to Trash
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ContextMenuComp({
  title,
  body,
  children,
  isTrash,
  id,
  folderId,
  onUpdate,
}: {
  title: string;
  body: string | Descendant[];
  children: React.ReactNode;
  isTrash?: boolean;
  id: number;
  folderId?: number | null;
  onUpdate?: FileCardProps["onUpdate"];
}) {
  const isMobile = useIsMobile();
  const [, startTransition] = useTransition();

  const handleDuplicate = () => {
    startTransition(async () => {
      await duplicateNote(id);
    });
  };

  const handleTrash = () => {
    startTransition(async () => {
      if (onUpdate) {
        onUpdate({ type: "trash", id });
      }
      await moveNoteToTrash(id);
    });
  };

  return (
    <>
      {!isMobile ? (
        <ContextMenu>
          <ContextMenuTrigger>{children}</ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            {isTrash ? (
              <ContextMenuGroup>
                <ContextMenuItem inset>Restore</ContextMenuItem>
                <ContextMenuItem inset variant="destructive">
                  Delete Permanently
                </ContextMenuItem>
              </ContextMenuGroup>
            ) : (
              <ContextMenuGroup>
                <EditNoteDialog
                  note={
                    {
                      id,
                      title,
                      content: body,
                      folderId,
                      color: "yellow",
                      createdAt: new Date(),
                      updatedAt: new Date(),
                      deletedAt: null,
                    } as any
                  }
                  onUpdateOptimistic={(updatedNote) =>
                    onUpdate?.({ type: "update", note: updatedNote })
                  }
                  trigger={
                    <ContextMenuItem onSelect={(e) => e.preventDefault()} inset>
                      Edit
                    </ContextMenuItem>
                  }
                />
                <MoveNoteDialog
                  noteId={id}
                  currentParentId={folderId}
                  onMove={(id, newParentId) =>
                    onUpdate?.({ type: "move", id, parentId: newParentId })
                  }
                  trigger={
                    <ContextMenuItem onSelect={(e) => e.preventDefault()} inset>
                      Move
                    </ContextMenuItem>
                  }
                />
                <ContextMenuItem onSelect={handleDuplicate} inset>
                  Duplicate
                </ContextMenuItem>
                <ContextMenuItem inset>Share</ContextMenuItem>
                <ContextMenuItem
                  onSelect={handleTrash}
                  inset
                  variant="destructive"
                >
                  Move to Trash
                </ContextMenuItem>
              </ContextMenuGroup>
            )}
          </ContextMenuContent>
        </ContextMenu>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

const FileCard: React.FC<FileCardProps> = ({
  id,
  folderId,
  title,
  date,
  color,
  body,
  isTrash = false,
  onUpdate,
}) => {
  // Pick a color scheme
  const colorScheme =
    FILE_COLORS.find(
      (c) => c.friendlyName.toLowerCase() === color?.toLowerCase(),
    ) || FILE_COLORS[Math.floor(Math.random() * FILE_COLORS.length)];

  return (
    <ContextMenuComp
      title={title}
      body={body}
      isTrash={isTrash}
      id={id}
      folderId={folderId}
      onUpdate={onUpdate}
    >
      <Card
        className="relative h-52 w-full rounded-md px-0 pt-2 md:h-60 md:rounded-lg md:pt-3"
        style={{ background: colorScheme.bg }}
      >
        <CardHeader className="text-secondary-foreground dark:text-background grid grid-cols-2 items-center justify-between max-md:px-3">
          <Typography className="max-lg:text-xs">
            {format(new Date(date), "MMM yy")}
          </Typography>
          <DropdownMenuComp
            title={title}
            body={body}
            isTrash={isTrash}
            id={id}
            folderId={folderId}
            onUpdate={onUpdate}
          >
            <Button variant="ghost" size="icon" className="ml-auto">
              <MoreHorizontal />
            </Button>
          </DropdownMenuComp>
        </CardHeader>
        <CardContent className="space-y-2 max-md:px-3 md:space-y-3">
          <Typography
            variant="h4"
            className="text-secondary-foreground dark:text-muted line-clamp-1 max-sm:text-base md:line-clamp-2"
          >
            {title}
          </Typography>
          <Typography
            className={cn(
              "text-muted-foreground line-clamp-3 max-sm:text-sm dark:text-gray-500",
              {
                "line-clamp-2": isTrash,
              },
            )}
          >
            {extractText(body)}
          </Typography>
        </CardContent>
      </Card>
    </ContextMenuComp>
  );
};

export default FileCard;
