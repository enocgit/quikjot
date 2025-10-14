import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";

interface MonthNavigatorProps {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
  onDateChange: (date: Date) => void;
  className?: string;
}

export const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  month,
  onPrev,
  onNext,
  onDateChange,
  className,
}) => {
  const monthLabel = month.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Button
        variant="secondary"
        size="icon"
        onClick={onPrev}
        aria-label="Previous month"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Typography className="text-muted-foreground cursor-pointer">
            {monthLabel}
          </Typography>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={month}
            onSelect={(date) => onDateChange(date as Date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        variant="secondary"
        size="icon"
        onClick={onNext}
        aria-label="Next month"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
