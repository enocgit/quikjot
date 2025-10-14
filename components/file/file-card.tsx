import React from "react";
import { SquarePen } from "lucide-react";
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
}

const FileCard: React.FC<FileCardProps> = ({
  title,
  date,
  colorIndex,
  body,
  fullWidth = false,
}) => {
  // Pick a color scheme
  const colorScheme =
    typeof colorIndex === "number"
      ? FILE_COLORS[colorIndex % FILE_COLORS.length]
      : FILE_COLORS[Math.floor(Math.random() * FILE_COLORS.length)];

  return (
    <Card
      className={cn(
        "relative h-60 w-full rounded-lg px-0 pt-3 xl:w-52 xl:min-w-52",
        fullWidth && "w-full min-w-full xl:w-full xl:min-w-full",
      )}
      style={{ background: colorScheme.bg }}
    >
      <CardHeader className="text-secondary-foreground dark:text-background grid grid-cols-2 items-center justify-between">
        <Typography>{format(new Date(date), "MMM yy")}</Typography>
        <Button variant="ghost" size="icon" className="ml-auto">
          <SquarePen />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <Typography
          variant="h4"
          className="text-secondary-foreground dark:text-muted line-clamp-2"
        >
          {title}
        </Typography>
        <Typography className="text-muted-foreground line-clamp-3 dark:text-gray-500">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FileCard;
