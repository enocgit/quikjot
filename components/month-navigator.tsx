import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";
import { cn } from "@/lib/utils";

interface MonthNavigatorProps {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

export const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  month,
  onPrev,
  onNext,
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
        className="w-14 h-9"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Typography className="text-muted-foreground">{monthLabel}</Typography>
      <Button
        variant="secondary"
        size="icon"
        onClick={onNext}
        aria-label="Next month"
        className="w-14 h-9"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
