import React from "react";
import { MoreHorizontal, SquarePen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FILE_COLORS } from "@/lib/constants";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FileCardProps {
  date: string;
  title: string;
  body: string;
  colorIndex?: number; // Optional: specify color, otherwise random
  fullWidth?: boolean;
  isTrash?: boolean;
}

export function DropdownMenuComp({
  children,
  isTrash,
}: {
  children: React.ReactNode;
  isTrash?: boolean;
}) {
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
            <DropdownMenuItem inset>Edit</DropdownMenuItem>
            <DropdownMenuItem inset>Duplicate</DropdownMenuItem>
            <DropdownMenuItem inset>Share</DropdownMenuItem>
            <DropdownMenuItem inset variant="destructive">
              Move to Trash
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ContextMenuComp({
  children,
  isTrash,
}: {
  children: React.ReactNode;
  isTrash?: boolean;
}) {
  return (
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
            <ContextMenuItem inset>Edit</ContextMenuItem>
            <ContextMenuItem inset>Duplicate</ContextMenuItem>
            <ContextMenuItem inset>Share</ContextMenuItem>
            <ContextMenuItem inset variant="destructive">
              Move to Trash
            </ContextMenuItem>
          </ContextMenuGroup>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

const FileCard: React.FC<FileCardProps> = ({
  title,
  date,
  colorIndex,
  body,
  fullWidth = false,
  isTrash = false,
}) => {
  // Pick a color scheme
  const colorScheme =
    typeof colorIndex === "number"
      ? FILE_COLORS[colorIndex % FILE_COLORS.length]
      : FILE_COLORS[Math.floor(Math.random() * FILE_COLORS.length)];

  return (
    <ContextMenuComp isTrash={isTrash}>
      <Card
        className={cn(
          "relative h-60 w-full rounded-lg px-0 pt-3 xl:w-52 xl:min-w-52",
          {
            "w-full min-w-full xl:w-full xl:min-w-full": fullWidth,
            "h-52": isTrash,
          },
        )}
        style={{ background: colorScheme.bg }}
      >
        <CardHeader className="text-secondary-foreground dark:text-background grid grid-cols-2 items-center justify-between">
          <Typography>{format(new Date(date), "MMM yy")}</Typography>
          <DropdownMenuComp isTrash={isTrash}>
            <Button variant="ghost" size="icon" className="ml-auto">
              <MoreHorizontal />
            </Button>
          </DropdownMenuComp>
        </CardHeader>
        <CardContent className="space-y-3">
          <Typography
            variant="h4"
            className="text-secondary-foreground dark:text-muted line-clamp-2"
          >
            {title}
          </Typography>
          <Typography
            className={cn(
              "text-muted-foreground line-clamp-3 dark:text-gray-500",
              {
                "line-clamp-2": isTrash,
              },
            )}
          >
            {body}
          </Typography>
        </CardContent>
      </Card>
    </ContextMenuComp>
  );
};

export default FileCard;
