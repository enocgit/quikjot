import React from "react";
import FolderSection from "./_components/folder-section";
import NoteSection from "./_components/note-section";

export default function Home() {
  return (
    <main className="wrapper py-vertical space-y-14">
      <FolderSection />
      <NoteSection />
    </main>
  );
}
