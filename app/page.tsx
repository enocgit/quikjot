import React from "react";
import FolderSection from "./_components/folder-section";
import NoteSection from "./_components/note-section";

export default function Home() {
  return (
    <main className="wrapper pt-10 space-y-14">
      <FolderSection />
      <NoteSection />
    </main>
  );
}
