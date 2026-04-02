import SectionWithBreadcrumb from "@/components/section-with-breadcrumb";
import FileCard from "@/components/file/file-card";
import FolderCard from "@/components/folder/folder-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { TrashIcon } from "lucide-react";

function BreadcrumbComp() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Trash</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

interface TrashItem {
  type: "folder" | "file";
  title: string;
  date: string;
  body?: string;
}

export default function TrashPage() {
  const trashedItems: TrashItem[] = [
    {
      type: "folder",
      title: "Old Projects",
      date: "2024-01-15T10:00:00Z",
    },
    {
      type: "file",
      title: "Meeting Notes",
      date: "2024-02-20T14:30:00Z",
      body: "- Discussed Q1 budget\n- Planned next steps for project X",
    },
    {
      type: "file",
      title: "Draft for blog post",
      date: "2024-03-10T11:00:00Z",
      body: "This is a draft for a blog post about Next.js...",
    },
  ];

  const hasItems = trashedItems.length > 0;

  return (
    <main className="wrapper py-vertical">
      <SectionWithBreadcrumb renderBreadcrumb={() => <BreadcrumbComp />}>
        <Typography variant="h3">Trash</Typography>
        {hasItems ? (
          <div className="file-grid">
            {trashedItems.map((item, index) => {
              if (item.type === "folder") {
                return (
                  <FolderCard
                    key={index}
                    id={index}
                    title={item.title}
                    date={item.date}
                    slug={item.title.toLowerCase().replace(/\s+/g, '-')}
                    isTrash={true}
                  />
                );
              }
              if (item.type === "file") {
                return (
                  <FileCard
                    key={index}
                    title={item.title}
                    date={item.date}
                    body={item.body || ""}
                    isTrash={true}
                  />
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <TrashIcon />
                </EmptyMedia>
                <EmptyTitle>No Trash Yet</EmptyTitle>
                <EmptyDescription>
                  You haven&apos;t deleted any items yet.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        )}
      </SectionWithBreadcrumb>
    </main>
  );
}
