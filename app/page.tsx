import { getFolders } from "@/actions/folders";
import FolderSection from "./_components/folder-section";
import HomeClient from "./_components/home-client";
import NoteSection from "./_components/note-section";

export default async function Home() {
  const folders = await getFolders();

  return (
    <main className="wrapper py-vertical space-y-14">
      <HomeClient />
      <FolderSection folders={folders} />
      <NoteSection />
    </main>
  );
}
