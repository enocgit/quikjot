import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { FOLDER_COLORS } from "@/lib/constants";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
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

interface FolderCardProps {
  title: string;
  date: string;
  colorIndex?: number; // Optional: specify color, otherwise random
  fullWidth?: boolean;
}

export function DropdownMenuComp({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem inset>Rename</DropdownMenuItem>
          <DropdownMenuItem inset>Move</DropdownMenuItem>
          <DropdownMenuItem inset>Duplicate</DropdownMenuItem>
          <DropdownMenuItem inset>Share</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger inset>Change Color</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value="Green">
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
          <DropdownMenuItem inset variant="destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ContextMenuComp({ children }: { children: React.ReactNode }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem inset>Rename</ContextMenuItem>
        <ContextMenuItem inset>Move</ContextMenuItem>
        <ContextMenuItem inset>Duplicate</ContextMenuItem>
        <ContextMenuItem inset>Share</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Change Color</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuRadioGroup value="Green">
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
        <ContextMenuItem inset variant="destructive">
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

import Link from "next/link";

const FolderCard: React.FC<FolderCardProps> = ({
  title,
  date,
  colorIndex,
  fullWidth = false,
}) => {
  // Pick a color scheme
  const colorScheme =
    typeof colorIndex === "number"
      ? FOLDER_COLORS[colorIndex % FOLDER_COLORS.length]
      : FOLDER_COLORS[Math.floor(Math.random() * FOLDER_COLORS.length)];

  const slug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <ContextMenuComp>
      <Link href={`/folders/${slug}`}>
        <Card
          className={cn(
            "relative h-52 w-full cursor-pointer rounded-lg p-0 xl:w-52 xl:min-w-52",
            fullWidth && "w-full min-w-full xl:w-full xl:min-w-full",
          )}
          style={{ background: colorScheme.bg }}
          role="button"
        >
          <CardContent className="space-y-3 p-5">
            <DropdownMenuComp>
              <Button
                variant="ghost"
                size="icon"
                className="dark:text-background absolute top-5 right-5"
              >
                <MoreHorizontal />
              </Button>
            </DropdownMenuComp>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="87"
              height="87"
              viewBox="0 0 48 48"
              className="relative -left-2"
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
              className="text-secondary-foreground dark:text-muted line-clamp-1 pt-1"
            >
              {title}
            </Typography>
            <Typography className="text-muted-foreground dark:text-gray-500">
              {format(new Date(date), "MMM yy")}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </ContextMenuComp>
  );
};

export default FolderCard;
