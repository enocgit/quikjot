import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import React from "react";

export default function SectionWithSidebar({
  title,
  children,
  sidebar,
  seeAllLink,
  className,
}: {
  title: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  seeAllLink?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("grid grid-cols-1 gap-10", sidebar && "2xl:grid-cols-12", className)}
    >
      <div className="space-y-5 2xl:col-span-10">
        <div className="flex items-center justify-between">
          <Typography variant="h4">{title}</Typography>
          {seeAllLink}
        </div>
        {children}
      </div>
      {sidebar && (
        <div className="2xl:col-span-2">
          <div className="flex items-center justify-end gap-8 2xl:flex-col 2xl:items-end">
            {sidebar}
          </div>
        </div>
      )}
    </section>
  );
}
