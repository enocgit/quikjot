import { getFolders } from "@/actions/folders";
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
import { Folder } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import SectionWithSidebar from "../_components/section-with-sidebar";
import FoldersClient from "./_components/folders-client";

const FolderCard = dynamic(() => import("@/components/folder/folder-card"));

const CreateFolderDialog = dynamic(
  () =>
    import("@/components/folder/create-folder-dialog").then(
      (mod) => mod.CreateFolderDialog,
    )
);

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
          <BreadcrumbPage>Folders</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default async function FoldersPage() {
  const folders = await getFolders();
  const hasFolders = folders.length > 0;

  return (
    <main className="wrapper py-vertical">
      <BreadcrumbComp />
      <FoldersClient />
      <SectionWithSidebar title="Folders">
        {hasFolders ? (
          <div className="file-grid">
            {folders.map((folder, index) => (
              <FolderCard
                key={index}
                title={folder.name}
                date={folder.createdAt.toLocaleDateString()}
                slug={folder.slug}
                color={folder.color}
                fullWidth
              />
            ))}
          </div>
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
                <CreateFolderDialog trigger={<Button>Create Folder</Button>} />
              </EmptyContent>
            </Empty>
          </div>
        )}
      </SectionWithSidebar>
    </main>
  );
}
