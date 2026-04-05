"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { FOLDER_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Typography } from "../ui/typography";
import { MoveFolderDialog } from "./move-folder-dialog";
import { RenameFolderDialog } from "./rename-folder-dialog";

import {
  duplicateFolder,
  moveFolderToTrash,
  updateFolderColor,
} from "@/actions/folders";

interface FolderCardProps {
  id: number;
  title: string;
  date: string;
  slug: string;
  color?: string;
  parentId?: number | null;
  isTrash?: boolean;
  onUpdate?: (
    action:
      | { type: "rename"; id: number; name: string }
      | { type: "update-color"; id: number; color: string }
      | { type: "move"; id: number; parentId: number | null }
      | any, // for other actions if any
  ) => void;
}

function DropdownMenuComp({
  children,
  isTrash,
  id,
  title,
  parentId,
  colorFriendlyName,
  onUpdate,
}: {
  children: React.ReactNode;
  isTrash?: boolean;
  id: number;
  title: string;
  parentId?: number | null;
  colorFriendlyName: string;
  onUpdate?: FolderCardProps["onUpdate"];
}) {
  const [, startTransition] = useTransition();

  const handleColorChange = (colorFriendlyName: string) => {
    startTransition(async () => {
      if (onUpdate) {
        onUpdate({ type: "update-color", id, color: colorFriendlyName });
      }
      await updateFolderColor(id, colorFriendlyName);
    });
  };

  const handleDuplicate = () => {
    startTransition(async () => {
      // For duplicate, we just trigger the server action.
      // The server will revalidate the page resulting in the new folder appearing.
      await duplicateFolder(id);
    });
  };

  const handleTrash = () => {
    startTransition(async () => {
      if (onUpdate) {
        onUpdate({ type: "trash", id });
      }
      await moveFolderToTrash(id);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {isTrash ? (
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} inset>
              Restore
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              inset
              variant="destructive"
            >
              Delete Permanently
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <>
            <DropdownMenuGroup>
              <RenameFolderDialog
                id={id}
                initialName={title}
                onRename={(newName) =>
                  onUpdate?.({ type: "rename", id, name: newName })
                }
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} inset>
                    Rename
                  </DropdownMenuItem>
                }
              />
              <MoveFolderDialog
                folderId={id}
                currentParentId={parentId}
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
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger
                onSelect={(e) => e.preventDefault()}
                inset
              >
                Change Color
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={colorFriendlyName}
                    onValueChange={handleColorChange}
                  >
                    {FOLDER_COLORS.map((color) => (
                      <DropdownMenuRadioItem
                        key={color.friendlyName}
                        value={color.friendlyName}
                        style={{ color: color.iconTop }}
                      >
                        {color.friendlyName}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onSelect={handleTrash}
                inset
                variant="destructive"
              >
                Move to Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ContextMenuComp({
  children,
  isTrash,
  id,
  title,
  parentId,
  colorFriendlyName,
  onUpdate,
}: {
  children: React.ReactNode;
  isTrash?: boolean;
  id: number;
  title: string;
  parentId?: number | null;
  colorFriendlyName: string;
  onUpdate?: FolderCardProps["onUpdate"];
}) {
  const isMobile = useIsMobile();

  const [, startTransition] = useTransition();

  const handleColorChange = (colorFriendlyName: string) => {
    startTransition(async () => {
      if (onUpdate) {
        onUpdate({ type: "update-color", id, color: colorFriendlyName });
      }
      await updateFolderColor(id, colorFriendlyName);
    });
  };

  const handleDuplicate = () => {
    startTransition(async () => {
      await duplicateFolder(id);
    });
  };

  const handleTrash = () => {
    startTransition(async () => {
      if (onUpdate) {
        onUpdate({ type: "trash", id });
      }
      await moveFolderToTrash(id);
    });
  };

  return (
    <>
      {!isMobile ? (
        <ContextMenu>
          <ContextMenuTrigger className="">{children}</ContextMenuTrigger>
          {isTrash ? (
            <ContextMenuContent className="w-52">
              <ContextMenuItem inset>Restore</ContextMenuItem>
              <ContextMenuItem inset variant="destructive">
                Delete Permanently
              </ContextMenuItem>
            </ContextMenuContent>
          ) : (
            <ContextMenuContent className="w-52">
              <RenameFolderDialog
                id={id}
                initialName={title}
                onRename={(newName) =>
                  onUpdate?.({ type: "rename", id, name: newName })
                }
                trigger={
                  <ContextMenuItem onSelect={(e) => e.preventDefault()} inset>
                    Rename
                  </ContextMenuItem>
                }
              />
              <MoveFolderDialog
                folderId={id}
                currentParentId={parentId}
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
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger inset>
                  Change Color
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuRadioGroup
                    value={colorFriendlyName}
                    onValueChange={handleColorChange}
                  >
                    {FOLDER_COLORS.map((color) => (
                      <ContextMenuRadioItem
                        key={color.friendlyName}
                        value={color.friendlyName}
                        style={{ color: color.iconTop }}
                      >
                        {color.friendlyName}
                      </ContextMenuRadioItem>
                    ))}
                  </ContextMenuRadioGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem
                onSelect={handleTrash}
                inset
                variant="destructive"
              >
                Move to Trash
              </ContextMenuItem>
            </ContextMenuContent>
          )}
        </ContextMenu>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

const FolderCard: React.FC<FolderCardProps> = ({
  id,
  title,
  date,
  slug,
  color,
  parentId,
  isTrash = false,
  onUpdate,
}) => {
  // Pick a color scheme
  const colorScheme =
    FOLDER_COLORS.find(
      (c) => c.friendlyName.toLowerCase() === color?.toLowerCase(),
    ) || FOLDER_COLORS[Math.floor(Math.random() * FOLDER_COLORS.length)];

  return (
    <ContextMenuComp
      isTrash={isTrash}
      id={id}
      title={title}
      parentId={parentId}
      colorFriendlyName={colorScheme.friendlyName}
      onUpdate={onUpdate}
    >
      <div className="relative h-34 lg:h-52">
        <Link href={`/folders/${slug}`}>
          <Card
            className="relative cursor-pointer rounded-md p-0 lg:rounded-lg"
            style={{ background: colorScheme.bg }}
            role="button"
          >
            <CardContent className="space-y-2 p-3 lg:space-y-3 lg:p-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                // Reduce the icon size on lg and below
                width="87"
                height="87"
                className="relative -left-2 h-12 w-12 lg:h-22 lg:w-22"
                viewBox="0 0 48 48"
              >
                {/* Folder top */}
                <path
                  fill={colorScheme.iconTop}
                  d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"
                ></path>

                {/* Folder body */}
                <path
                  fill={colorScheme.iconBody}
                  d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
                ></path>
              </svg>
              <Typography
                variant="h4"
                title={title}
                className="text-secondary-foreground dark:text-muted line-clamp-1 pt-0 max-lg:text-base lg:pt-1"
              >
                {title}
              </Typography>
              <Typography className="text-muted-foreground max-lg:text-xs dark:text-gray-500">
                {format(new Date(date), "MMM yy")}
              </Typography>
            </CardContent>
          </Card>
        </Link>
        <div className="absolute top-3 right-3 lg:top-5 lg:right-5">
          <DropdownMenuComp
            isTrash={isTrash}
            id={id}
            title={title}
            parentId={parentId}
            colorFriendlyName={colorScheme.friendlyName}
            onUpdate={onUpdate}
          >
            <Button
              variant="ghost"
              size="icon"
              className="dark:text-background"
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuComp>
        </div>
      </div>
    </ContextMenuComp>
  );
};

export default FolderCard;
