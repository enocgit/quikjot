import { getFolderBySlug, getFolders } from "@/actions/folders";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { File } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionWithSidebar from "../../_components/section-with-sidebar";
import FolderSlugClient from "./_components/folder-slug-client";

const FileCard = dynamic(() => import("@/components/file/file-card"));

const FolderCard = dynamic(() => import("@/components/folder/folder-card"));

const CreateFolderDialog = dynamic(
  () =>
    import("@/components/folder/create-folder-dialog").then(
      (mod) => mod.CreateFolderDialog,
    ),
);

const CreateNoteDialog = dynamic(
  () =>
    import("@/components/note/create-note-dialog").then(
      (mod) => mod.CreateNoteDialog,
    ),
);

function BreadcrumbComp({ folderName }: { folderName: string }) {
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
          <BreadcrumbLink asChild>
            <Link href="/folders">Folders</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{folderName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default async function FolderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const folder = await getFolderBySlug(slug);

  if (!folder) {
    notFound();
  }

  const childFolders = await getFolders(folder.id);
  const notes: any[] = []; // Still empty as we are focusing on folders
  const hasContent = childFolders.length > 0 || notes.length > 0;

  return (
    <main className="wrapper py-vertical">
      <BreadcrumbComp folderName={folder.name} />
      <FolderSlugClient />
      <SectionWithSidebar title={folder.name}>
        {hasContent ? (
          <div className="space-y-10">
            {childFolders.length > 0 && (
              <div className="file-grid">
                {childFolders.map((child, index) => (
                  <FolderCard
                    key={index}
                    title={child.name}
                    date={child.createdAt.toLocaleDateString()}
                    slug={child.slug}
                    color={child.color}
                    fullWidth
                  />
                ))}
              </div>
            )}
            {notes.length > 0 && (
              <div className="file-grid">
                {notes.map((note, index) => (
                  <FileCard
                    key={index}
                    title={note.title}
                    date={note.date}
                    body={note.body}
                    fullWidth
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full min-h-52 items-center justify-center">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <File />
                </EmptyMedia>
                <EmptyTitle>No Notes Yet</EmptyTitle>
                <EmptyDescription>
                  Create your first note in this folder to get started.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex flex-row justify-center gap-2">
                <CreateFolderDialog 
                  trigger={<Button variant="outline">Create Folder</Button>} 
                  parentId={folder.id}
                />
                <CreateNoteDialog trigger={<Button>Create Note</Button>} />
              </EmptyContent>
            </Empty>
          </div>
        )}
      </SectionWithSidebar>
    </main>
  );
}
