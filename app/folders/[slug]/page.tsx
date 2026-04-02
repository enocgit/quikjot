import { getFolderBySlug, getFolders } from "@/actions/folders";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionWithSidebar from "../../_components/section-with-sidebar";
import FolderContent from "./_components/folder-content";

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

  return (
    <main className="wrapper py-vertical">
      <BreadcrumbComp folderName={folder.name} />
      <SectionWithSidebar title={folder.name} className="mt-5">
        <FolderContent 
          folder={folder} 
          initialChildFolders={childFolders} 
          notes={notes} 
        />
      </SectionWithSidebar>
    </main>
  );
}
