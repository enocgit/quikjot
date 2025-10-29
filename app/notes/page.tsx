"use client";

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
import dynamic from "next/dynamic";
const FileCard = dynamic(() => import("@/components/file/file-card"), {
  ssr: false,
});

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
          <BreadcrumbPage>Notes</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function NotesPage() {
  const renderBreadcrumb = () => {
    return <BreadcrumbComp />;
  };

  return (
    <main className="wrapper py-vertical">
      <SectionWithBreadcrumb renderBreadcrumb={renderBreadcrumb}>
        <Typography variant="h3">Notes</Typography>
        <ButtonWithNavigator createButtonType="note" />

        <section className="space-y-5">
          <div className="space-y-5">
            <Typography variant="h5">Project X</Typography>

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
          </div>
          <div className="space-y-5">
            <Typography variant="h5">Work</Typography>

            <div className="file-grid">
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
          </div>
        </section>
      </SectionWithBreadcrumb>
    </main>
  );
}
