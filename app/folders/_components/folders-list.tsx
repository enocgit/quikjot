"use client";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Folder as FolderType } from "@/db/schema";
import { Folder } from "lucide-react";
import dynamic from "next/dynamic";
import { useOptimistic } from "react";

const FolderCard = dynamic(() => import("@/components/folder/folder-card"));
const CreateFolderDialog = dynamic(
  () =>
    import("@/components/folder/create-folder-dialog").then(
      (mod) => mod.CreateFolderDialog,
    )
);

export default function FoldersList({ folders }: { folders: FolderType[] }) {
  const [optimisticFolders, updateOptimisticFolders] = useOptimistic(
    folders,
    (state, action: 
      | { type: 'add', folder: FolderType }
      | { type: 'rename', id: number, name: string }
      | { type: 'update-color', id: number, color: string }
      | { type: 'move', id: number, parentId: number | null }
      | { type: 'trash', id: number }
    ) => {
      switch (action.type) {
        case 'add':
          return [action.folder, ...state];
        case 'rename':
          return state.map((f) => 
            f.id === action.id 
              ? { ...f, name: action.name, slug: action.name.toLowerCase().replace(/\s+/g, "-") } 
              : f
          );
        case 'update-color':
          return state.map((f) => 
            f.id === action.id ? { ...f, color: action.color } : f
          );
        case 'move':
          if (action.parentId !== null) {
            return state.filter((f) => f.id !== action.id);
          }
          return state;
        case 'trash':
          return state.filter((f) => f.id !== action.id);
        default:
          return state;
      }
    }
  );

  const hasFolders = optimisticFolders.length > 0;

  if (!hasFolders) {
    return (
      <div className="flex h-full min-h-52 items-center justify-center">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Folder />
            </EmptyMedia>
            <EmptyTitle>No Folders Yet</EmptyTitle>
            <EmptyDescription>
              Create your first folder to get started.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <CreateFolderDialog 
              trigger={<Button>Create Folder</Button>} 
              onAddOptimistic={(folder) => updateOptimisticFolders({ type: 'add', folder })}
            />
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="file-grid">
      {optimisticFolders.map((folder) => (
        <FolderCard
          key={folder.id}
          id={folder.id}
          title={folder.name}
          date={folder.createdAt.toLocaleDateString()}
          slug={folder.slug}
          color={folder.color}
          onUpdate={updateOptimisticFolders}
          parentId={folder.parentId}
        />
      ))}
    </div>
  );
}
