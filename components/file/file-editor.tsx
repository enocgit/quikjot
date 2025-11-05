"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SlateEditor from "@/components/editor/slate-editor";
import { Button } from "../ui/button";
import { Folder } from "lucide-react";
import { SelectFolderComboBox } from "./select-folder-combobox";

export function FileEditor() {
  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <Input
            placeholder="Note title"
            className="border-none text-2xl font-bold shadow-none focus-visible:ring-0"
          />
          <SelectFolderComboBox />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Folder className="size-4" />
                <span>Select Folder</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Folders</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Personal</DropdownMenuItem>
              <DropdownMenuItem>Work</DropdownMenuItem>
              <DropdownMenuItem>Ideas</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </CardHeader>
      <CardContent>
        <SlateEditor />
      </CardContent>
    </Card>
  );
}
