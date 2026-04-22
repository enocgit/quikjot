import { getFolders } from "@/actions/folders";
import { getRootNotes } from "@/actions/notes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import SectionWithSidebar from "../_components/section-with-sidebar";
import FoldersList from "./_components/folders-list";

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
  const notes = await getRootNotes();

  return (
    <main className="wrapper py-vertical">
      <BreadcrumbComp />
      <SectionWithSidebar title="Folders" className="mt-5">
        <FoldersList folders={folders} notes={notes} />
      </SectionWithSidebar>
    </main>
  );
}
