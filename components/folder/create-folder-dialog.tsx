"use client";

import { createFolder } from "@/actions/folders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Folder as FolderType } from "@/db/schema";
import { FOLDER_COLORS } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect, useId, useMemo, useState } from "react";

export function CreateFolderDialog({ 
  trigger,
  parentId = null,
  onAddOptimistic,
}: { 
  trigger: React.ReactNode;
  parentId?: number | null;
  onAddOptimistic?: (folder: FolderType) => void;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [state, action, isPending] = useActionState(createFolder, null);

  const defaultColor = useMemo(() => 
    FOLDER_COLORS[Math.floor(Math.random() * FOLDER_COLORS.length)].friendlyName.toLowerCase(), 
  []);

  useEffect(() => {
    if (state?.success) {
      setOpen(false);
    }
  }, [state]);

  const handleAction = async (formData: FormData) => {
    if (onAddOptimistic) {
      const name = formData.get("name") as string;
      const color = formData.get("color") as string;
      const optimisticFolder = {
        id: Math.random(), // Temporary ID
        name,
        color: color || "blue",
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        parentId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      onAddOptimistic(optimisticFolder);
    }
    action(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form action={handleAction}>
          <input type="hidden" name="parentId" value={parentId ?? ""} />
          <DialogHeader>
            <DialogTitle>Create new folder</DialogTitle>
            <DialogDescription>
              Choose a name and color for your new folder.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Input 
                id="name" 
                name="name" 
                placeholder="Folder name" 
                required 
                autoFocus
              />
              {state?.error && (
                <p className="text-sm text-destructive">{state.error}</p>
              )}
            </div>
            <fieldset className="space-y-4">
              <legend className="text-foreground text-sm leading-none font-medium">
                Choose a color
              </legend>
              <RadioGroup 
                className="flex flex-wrap gap-1.5" 
                defaultValue={defaultColor} 
                name="color"
              >
                {FOLDER_COLORS.map((color) => {
                  const colorValue = color.friendlyName.toLowerCase();
                  return (
                    <RadioGroupItem
                      key={colorValue}
                      value={colorValue}
                      id={`${id}-${colorValue}`}
                      aria-label={color.friendlyName}
                      className="size-6 shadow-none"
                      style={{ 
                        borderColor: color.iconTop,
                        // @ts-ignore
                        "--color-check": color.iconTop 
                      }}
                    />
                  );
                })}
              </RadioGroup>
            </fieldset>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
