"use server";

import { db } from "@/db";
import { folders } from "@/db/schema";
import { and, desc, eq, isNotNull, isNull, SQL } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// --- READ ---

export async function getFolders(parentId?: number | null) {
    const whereClauses: SQL[] = [isNull(folders.deletedAt)]
    if(parentId != null) {
        whereClauses.push(eq(folders.parentId, parentId))
    }
    else {
        whereClauses.push(isNull(folders.parentId))
    }

    const allFolders = db
        .select()
        .from(folders)
        .where(and(
            ...whereClauses
        ))
        .orderBy(desc(folders.createdAt))

  return allFolders
}

export async function getFolderBySlug(slug: string) {
  const [folder] = await db
    .select()
    .from(folders)
    .where(and(isNull(folders.deletedAt), eq(folders.slug, slug)));

  return folder;
}

export async function getTrashedFolders() {
    const trashedFolders = await db
        .select()
        .from(folders)
        .where(isNotNull(folders.deletedAt))
        .orderBy(desc(folders.deletedAt))

        return trashedFolders
}


// --- CREATE ---

export async function createFolder(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const color = formData.get("color") as string;
  const parentId = formData.get("parentId") ? Number(formData.get("parentId")) : null;

  if (!name) {
    return { error: "Name is required" };
  }

  const slug = name.toLowerCase().replace(/\s+/g, "-");

  try {
    await db.insert(folders).values({
      name,
      color: color || "blue",
      slug,
      parentId,
    });

    revalidatePath("/");
    revalidatePath("/folders");
    return { success: true };
  } catch (error) {
    console.error("Failed to create folder:", error);
    return { error: "Failed to create folder" };
  }
}

// --- UPDATE ---

export async function renameFolder(id: number, name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  await db
    .update(folders)
    .set({ name, slug, updatedAt: new Date() })
    .where(eq(folders.id, id));

  revalidatePath("/");
  revalidatePath("/folders");
}

export async function updateFolderColor(id: number, color: string) {
  await db
    .update(folders)
    .set({ color, updatedAt: new Date() })
    .where(eq(folders.id, id));

  revalidatePath("/folders");
}

export async function moveFolder(id: number, parentId: number | null) {
  await db
    .update(folders)
    .set({ parentId, updatedAt: new Date() })
    .where(eq(folders.id, id));

  revalidatePath("/folders");
}

// --- TRASH / DELETE ---

export async function moveFolderToTrash(id: number) {
  await db
    .update(folders)
    .set({ deletedAt: new Date(), updatedAt: new Date() })
    .where(eq(folders.id, id));

  revalidatePath("/");
  revalidatePath("/folders");
  revalidatePath("/trash");
}

export async function restoreFolder(id: number) {
  await db
    .update(folders)
    .set({ deletedAt: null, updatedAt: new Date() })
    .where(eq(folders.id, id));

  revalidatePath("/folders");
  revalidatePath("/trash");
}

export async function deleteFolderPermanently(id: number) {
  await db.delete(folders).where(eq(folders.id, id));

  revalidatePath("/trash");
}