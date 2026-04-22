"use server";

import { db } from "@/db";
import { folders, notes } from "@/db/schema";
import { and, desc, eq, isNotNull, isNull, SQL } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { FILE_COLORS } from "@/lib/constants";

// --- READ ---

export async function getNotes(folderId?: number | null) {
  const whereClauses: SQL[] = [isNull(notes.deletedAt)];
  if (folderId != null) {
    whereClauses.push(eq(notes.folderId, folderId));
  }

  const allNotes = await db
    .select()
    .from(notes)
    .where(and(...whereClauses))
    .orderBy(desc(notes.createdAt));

  return allNotes;
}

export async function getRootNotes() {
  const rootNotes = await db
    .select()
    .from(notes)
    .where(and(isNull(notes.deletedAt), isNull(notes.folderId)))
    .orderBy(desc(notes.createdAt));

  return rootNotes;
}

export async function getTrashedNotes() {
  const trashedNotes = await db
    .select()
    .from(notes)
    .where(isNotNull(notes.deletedAt))
    .orderBy(desc(notes.deletedAt));

  return trashedNotes;
}

// --- CREATE ---

export async function createNote(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const folderId = formData.get("folderId")
    ? Number(formData.get("folderId"))
    : null;

  if (!title) {
    return { error: "Title is required" };
  }

  let parsedContent = null;
  if (content) {
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse content JSON", e);
    }
  }

  const randomColorIndex = Math.floor(Math.random() * FILE_COLORS.length);
  const color = FILE_COLORS[randomColorIndex].friendlyName || "yellow";

  try {
    const [newNote] = await db
      .insert(notes)
      .values({
        title,
        content: parsedContent,
        color,
        folderId,
      })
      .returning();

    revalidatePath("/");
    revalidatePath("/folders");
    if (folderId) {
      const [parentFolder] = await db
        .select()
        .from(folders)
        .where(eq(folders.id, folderId));
      if (parentFolder) {
        revalidatePath(`/folders/${parentFolder.slug}`);
      }
    }
    return { success: true, note: newNote };
  } catch (error) {
    console.error("Failed to create note:", error);
    return { error: "Failed to create note" };
  }
}

// --- UPDATE ---

export async function updateNote(prevState: any, formData: FormData) {
  const idStr = formData.get("id") as string;
  const id = parseInt(idStr, 10);
  const title = formData.get("title") as string;
  const contentStr = formData.get("content") as string;
  const folderIdStr = formData.get("folderId") as string | null;
  const folderId = folderIdStr ? parseInt(folderIdStr, 10) : null;

  if (!id || !title) {
    return { error: "ID and Title are required" };
  }

  let parsedContent = null;
  if (contentStr) {
    try {
      parsedContent = JSON.parse(contentStr);
    } catch (e) {
      console.error("Failed to parse content JSON", e);
    }
  }

  try {
    const [updatedNote] = await db
      .update(notes)
      .set({ title, content: parsedContent, folderId, updatedAt: new Date() })
      .where(eq(notes.id, id))
      .returning();

    revalidatePath("/");
    revalidatePath("/folders");
    if (folderId) {
      const [parentFolder] = await db
        .select()
        .from(folders)
        .where(eq(folders.id, folderId));
      if (parentFolder) {
        revalidatePath(`/folders/${parentFolder.slug}`);
      }
    }
    return { success: true, note: updatedNote };
  } catch (error) {
    console.error("Failed to update note:", error);
    return { error: "Failed to update note" };
  }
}

export async function duplicateNote(id: number) {
  const [noteToCopy] = await db.select().from(notes).where(eq(notes.id, id));

  if (!noteToCopy) return { error: "Note not found" };

  const isAlreadyCopy = noteToCopy.title.match(/^(.*?) \(Copy(?: (\d+))?\)$/);
  let baseName = noteToCopy.title;
  let newName = `${baseName} (Copy)`;

  if (isAlreadyCopy) {
    baseName = isAlreadyCopy[1];
  }

  const siblingWhere =
    noteToCopy.folderId === null
      ? isNull(notes.folderId)
      : eq(notes.folderId, noteToCopy.folderId);

  const existingNotes = await db
    .select({ title: notes.title })
    .from(notes)
    .where(and(siblingWhere, isNull(notes.deletedAt)));

  const names = existingNotes.map((n) => n.title);

  if (names.includes(newName)) {
    let i = 2;
    while (names.includes(`${baseName} (Copy ${i})`)) {
      i++;
    }
    newName = `${baseName} (Copy ${i})`;
  }

  const [newNote] = await db
    .insert(notes)
    .values({
      title: newName,
      content: noteToCopy.content,
      color: noteToCopy.color,
      folderId: noteToCopy.folderId,
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/folders");

  return { success: true, note: newNote };
}

export async function moveNote(id: number, folderId: number | null) {
  await db
    .update(notes)
    .set({ folderId, updatedAt: new Date() })
    .where(eq(notes.id, id));

  revalidatePath("/");
  revalidatePath("/folders");
}

// --- TRASH / DELETE ---

export async function moveNoteToTrash(id: number) {
  await db
    .update(notes)
    .set({ deletedAt: new Date(), updatedAt: new Date() })
    .where(eq(notes.id, id));

  revalidatePath("/");
  revalidatePath("/folders");
  revalidatePath("/trash");
}

export async function restoreNote(id: number) {
  await db
    .update(notes)
    .set({ deletedAt: null, updatedAt: new Date() })
    .where(eq(notes.id, id));

  revalidatePath("/");
  revalidatePath("/folders");
  revalidatePath("/trash");
}

export async function deleteNotePermanently(id: number) {
  await db.delete(notes).where(eq(notes.id, id));

  revalidatePath("/trash");
}
