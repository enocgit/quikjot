import React from "react";
import SectionWithBreadcrumb from "@/components/section-with-breadcrumb";
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
import ButtonWithNavigator from "@/components/button-with-navigator";
import FolderCard from "@/components/folder/folder-card";

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

export default function FoldersPage() {
  const renderBreadcrumb = () => {
    return <BreadcrumbComp />;
  };

  return (
    <main className="wrapper py-vertical">
      <SectionWithBreadcrumb renderBreadcrumb={renderBreadcrumb}>
        <Typography variant="h3">Folders</Typography>
        <ButtonWithNavigator />
        <div className="file-grid">
          <FolderCard title="Folder 2" date="2021-01-01" fullWidth />
          <FolderCard title="Folder 3" date="2021-01-01" fullWidth />
          <FolderCard title="Folder 4" date="2021-01-01" fullWidth />
        </div>
      </SectionWithBreadcrumb>
    </main>
  );
}
