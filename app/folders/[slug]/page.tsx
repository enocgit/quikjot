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
import FileCard from "@/components/file/file-card";
import ButtonWithNavigator from "@/components/button-with-navigator";

function BreadcrumbComp({ slug }: { slug: string }) {
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
          <BreadcrumbPage>
            {slug.charAt(0).toUpperCase() + slug.slice(1)}
          </BreadcrumbPage>
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
  const renderBreadcrumb = () => {
    return <BreadcrumbComp slug={slug} />;
  };

  return (
    <main className="wrapper py-vertical">
      <SectionWithBreadcrumb renderBreadcrumb={renderBreadcrumb}>
        <div className="flex items-center justify-between">
          <Typography variant="h3">
            {slug.charAt(0).toUpperCase() + slug.slice(1)}
          </Typography>
        </div>
        <ButtonWithNavigator createButtonType="note" />

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
        </div>
      </SectionWithBreadcrumb>
    </main>
  );
}
