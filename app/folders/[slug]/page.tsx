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
import FileCard from "@/components/file/file-card";

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
          <BreadcrumbLink asChild>
            <Link href="/folders">Folders</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Folder 1</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function FolderPage() {
  const renderBreadcrumb = () => {
    return <BreadcrumbComp />;
  };

  return (
    <main className="wrapper py-vertical">
      <SectionWithBreadcrumb renderBreadcrumb={renderBreadcrumb}>
        <Typography variant="h3">Folder 1</Typography>
        <ButtonWithNavigator />
        <div className="file-grid">
          <FileCard
            title="Meeting Notes Genesis Above All Here And About"
            date="2021-01-01"
            body="This is a note about the meeting. A meeting note that I wrote yesterday."
            fullWidth
          />
          <FileCard
            title="Grocery List"
            date="2021-01-01"
            body="This is a note about the grocery list"
            fullWidth
          />
          <FileCard
            title="Article Draft"
            date="2021-01-01"
            body="This is a note about the folder"
            fullWidth
          />
          <FileCard
            title="Article Draft"
            date="2021-01-01"
            body="This is a note about the folder"
            fullWidth
          />
          <FileCard
            title="Article Draft"
            date="2021-01-01"
            body="This is a note about the folder"
            fullWidth
          />
        </div>
      </SectionWithBreadcrumb>
    </main>
  );
}
