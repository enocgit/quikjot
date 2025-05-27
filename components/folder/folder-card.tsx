import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { FOLDER_COLORS } from "@/lib/constants";

interface FolderCardProps {
  title: string;
  date: string;
  colorIndex?: number; // Optional: specify color, otherwise random
}

const FolderCard: React.FC<FolderCardProps> = ({ title, date, colorIndex }) => {
  // Pick a color scheme
  const colorScheme =
    typeof colorIndex === "number"
      ? FOLDER_COLORS[colorIndex % FOLDER_COLORS.length]
      : FOLDER_COLORS[Math.floor(Math.random() * FOLDER_COLORS.length)];

  return (
    <Card
      className="relative p-0 w-52 rounded-lg"
      style={{ background: colorScheme.bg }}
    >
      <CardContent className="p-5">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-5 top-5 dark:text-background"
        >
          <MoreHorizontal />
        </Button>
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
        <Typography variant="h4" className="pt-1 pb-3 dark:text-background">
          {title}
        </Typography>
        <Typography className="text-secondary-foreground dark:text-background">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FolderCard;
