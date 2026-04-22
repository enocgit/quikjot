"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SlateEditor from "@/components/editor/slate-editor";
import { SelectFolderComboBox } from "./select-folder-combobox";
import { Descendant } from "slate";
import type { Folder as FolderType } from "@/db/schema";

interface FileEditorProps {
  titleError?: string;
  folders?: FolderType[];
  title?: string;
  onTitleChange?: (title: string) => void;
  folderId?: number | null;
  onFolderChange?: (folderId: number | null) => void;
  content?: Descendant[];
  onContentChange?: (content: Descendant[]) => void;
}

export function FileEditor({
  titleError,
  folders = [],
  title = "",
  onTitleChange,
  folderId = null,
  onFolderChange,
  content,
  onContentChange,
}: FileEditorProps) {
  return (
    <Card className="mx-auto w-full max-w-3xl border-none shadow-none sm:border-solid sm:shadow-sm">
      <CardHeader className="px-0 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 flex-col self-stretch">
            <Input
              placeholder="Note title"
              required
              value={title}
              onChange={(e) => onTitleChange?.(e.target.value)}
              className="min-w-0 border-none px-0 text-2xl font-bold shadow-none focus-visible:ring-0"
            />
            {titleError && (
              <p className="text-destructive text-sm">{titleError}</p>
            )}
          </div>
          <SelectFolderComboBox
            folders={folders}
            value={folderId}
            onChange={onFolderChange}
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 sm:px-6">
        <SlateEditor initialValue={content} onChange={onContentChange} />
      </CardContent>
    </Card>
  );
}
