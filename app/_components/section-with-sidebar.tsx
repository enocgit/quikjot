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
    <section className="grid grid-cols-1 2xl:grid-cols-12 gap-10">
      <div className="2xl:col-span-9 space-y-5">
        <Typography variant="h3">{title}</Typography>
        {children}
      </div>
      <div className="2xl:col-span-3">
        <div className="flex gap-8 items-center justify-end 2xl:flex-col 2xl:items-end">
          {sidebar}
        </div>
      </div>
    </section>
  );
}
