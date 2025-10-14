import { Typography } from "@/components/ui/typography";
import React from "react";

export default function SectionWithSidebar({
  title,
  children,
  sidebar,
}: {
  title: string;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-1 gap-10 2xl:grid-cols-12">
      <div className="space-y-5 2xl:col-span-10">
        <Typography variant="h4">{title}</Typography>
        {children}
      </div>
      <div className="2xl:col-span-2">
        <div className="flex items-center justify-end gap-8 2xl:flex-col 2xl:items-end">
          {sidebar}
        </div>
      </div>
    </section>
  );
}
