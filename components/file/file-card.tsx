import React from "react";
import { SquarePen } from "lucide-react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { FILE_COLORS } from "@/lib/constants";
import { format } from "date-fns";

interface FileCardProps {
  date: string;
  title: string;
  body: string;
  colorIndex?: number; // Optional: specify color, otherwise random
}

const FileCard: React.FC<FileCardProps> = ({
  title,
  date,
  colorIndex,
  body,
}) => {
  // Pick a color scheme
  const colorScheme =
    typeof colorIndex === "number"
      ? FILE_COLORS[colorIndex % FILE_COLORS.length]
      : FILE_COLORS[Math.floor(Math.random() * FILE_COLORS.length)];

  return (
    <Card
      className="relative px-0 w-52 min-w-52 h-60 pt-3 rounded-lg"
      style={{ background: colorScheme.bg }}
    >
      <CardHeader className="grid grid-cols-2 text-secondary-foreground dark:text-background items-center justify-between">
        <Typography>{format(new Date(date), "MMM yy")}</Typography>
        <Button variant="ghost" size="icon" className="ml-auto">
          <SquarePen />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <Typography
          variant="h4"
          className="text-secondary-foreground line-clamp-2 dark:text-muted"
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
