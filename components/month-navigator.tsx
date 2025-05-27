import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Typography } from "./ui/typography";

interface MonthNavigatorProps {
  month: Date;
  onPrev: () => void;
  onNext: () => void;
}

export const MonthNavigator: React.FC<MonthNavigatorProps> = ({
  month,
  onPrev,
  onNext,
}) => {
  const monthLabel = month.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="secondary"
        size="icon"
        onClick={onPrev}
        aria-label="Previous month"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <Typography className="text-muted-foreground">{monthLabel}</Typography>
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
