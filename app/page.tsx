import { getFolders } from "@/actions/folders";
import { getNotes } from "@/actions/notes";
import FolderSection from "./_components/folder-section";
import NoteSection from "./_components/note-section";

export default async function Home() {
  const folders = await getFolders();
  const notes = await getNotes();

  return (
    <main className="wrapper py-vertical space-y-14">
      <FolderSection folders={folders} />
      <NoteSection notes={notes} folders={folders} />
    </main>
  );
}
