"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Folder } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import SectionWithSidebar from "./section-with-sidebar";
import { Button } from "@/components/ui/button";

const CreateFolderDialog = dynamic(
  () =>
    import("@/components/folder/create-folder-dialog").then(
      (mod) => mod.CreateFolderDialog,
    ),
  {
    ssr: false,
  },
);

const FolderCard = dynamic(() => import("@/components/folder/folder-card"), {
  ssr: false,
});

const folders = [
  { id: "1", title: "Personal", date: "2025-01-01" },
  { id: "2", title: "Work", date: "2025-01-01" },
  { id: "3", title: "Travel", date: "2025-01-01" },
  {
    id: "4",
    title: "Recipes. This is a longer title to test the length of the title.",
    date: "2025-01-01",
  },
];

export default function FolderSection() {
  const hasFolders = folders.length > 0;

  return (
    <SectionWithSidebar
      title="Recent Folders"
      seeAllLink={
        <Link href="/folders" className="text-secondary-foreground w-fit">
          See All
        </Link>
      }
    >
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {hasFolders ? (
            <section className="mt-5 gap-3 xl:flex xl:flex-row">
              <div className="hidden-scrollbar xxs:grid-cols-2 grid grid-cols-1 gap-3 overflow-x-auto min-[520px]:grid-cols-3 md:grid-cols-(--file-grid-cols) xl:flex">
                {folders.map((folder, index) => (
                  <FolderCard
                    key={index}
                    title={folder.title}
                    date={folder.date}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="flex h-full min-h-52 items-center justify-center">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Folder />
                  </EmptyMedia>
                  <EmptyTitle>No Folders Yet</EmptyTitle>
                  <EmptyDescription>
                    Create your first folder to get started.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <CreateFolderDialog
                    trigger={<Button>Create Folder</Button>}
                  />
                </EmptyContent>
              </Empty>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </SectionWithSidebar>
  );
}
