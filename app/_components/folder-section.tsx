"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folder } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import SectionWithSidebar from "./section-with-sidebar";
import { Folder as FolderType } from "@/db/schema";
import { useState, useMemo } from "react";

const CreateFolderDialog = dynamic(
  () =>
    import("@/components/folder/create-folder-dialog").then(
      (mod) => mod.CreateFolderDialog,
    ),
  { ssr: false },
);

const FolderCard = dynamic(() => import("@/components/folder/folder-card"), {
  ssr: false,
});

type TabValue = "all" | "today" | "this-week" | "this-month";

function filterFolders(folders: FolderType[], tab: TabValue): FolderType[] {
  if (tab === "all") return folders;

  const now = new Date();

  return folders.filter((folder) => {
    const created = new Date(folder.createdAt);

    if (tab === "today") {
      return created.toDateString() === now.toDateString();
    }

    if (tab === "this-week") {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      return created >= startOfWeek;
    }

    if (tab === "this-month") {
      return (
        created.getFullYear() === now.getFullYear() &&
        created.getMonth() === now.getMonth()
      );
    }

    return true;
  });
}

export default function FolderSection({ folders }: { folders: FolderType[] }) {
  const [tab, setTab] = useState<TabValue>("all");

  const filtered = useMemo(() => filterFolders(folders, tab), [folders, tab]);
  const hasFolders = filtered.length > 0;

  return (
    <SectionWithSidebar
      title="Recent Folders"
      seeAllLink={
        <Link
          href="/folders"
          className="text-secondary-foreground w-fit text-sm md:text-base"
        >
          See All
        </Link>
      }
    >
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="this-week">This Week</TabsTrigger>
          <TabsTrigger value="this-month">This Month</TabsTrigger>
        </TabsList>
        <TabsContent value={tab}>
          {hasFolders ? (
            <section className="mt-5 gap-3 xl:flex xl:flex-row">
              <div className="hidden-scrollbar lg:grid-col-4 grid grid-cols-1 gap-3 overflow-x-auto min-[280px]:grid-cols-2 min-[420px]:grid-cols-3 min-[560px]:grid-cols-4 md:grid-cols-3 lg:grid-cols-(--file-grid-cols) xl:flex">
                {filtered.map((folder) => (
                  <FolderCard
                    key={folder.id}
                    title={folder.name}
                    color={folder.color}
                    date={folder.createdAt.toLocaleDateString()}
                    slug={folder.slug}
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
                  <EmptyTitle>
                    {tab === "all" ? "No Folders Yet" : "No folders found"}
                  </EmptyTitle>
                  <EmptyDescription>
                    {tab === "all"
                      ? "Create your first folder to get started."
                      : "No folders were created in this period."}
                  </EmptyDescription>
                </EmptyHeader>
                {tab === "all" && (
                  <EmptyContent>
                    <CreateFolderDialog
                      trigger={<Button>Create Folder</Button>}
                    />
                  </EmptyContent>
                )}
              </Empty>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </SectionWithSidebar>
  );
}