"use client";
import { cn } from "@/lib/utils";
import { getFolderBySlug } from "@/actions/folders";
import { Calendar, File, FileText, Folder, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CreateFolderDialog } from "./folder/create-folder-dialog";
import { CreateNoteDialog } from "./note/create-note-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "./ui/sidebar";
import { Typography } from "./ui/typography";

const AppSidebar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const params = useParams<{ slug?: string }>();
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);

  useEffect(() => {
    if (params.slug) {
      getFolderBySlug(params.slug).then((folder) => {
        if (folder) setCurrentFolderId(folder.id);
        else setCurrentFolderId(null);
      });
    } else {
      setCurrentFolderId(null);
    }
  }, [params.slug]);

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <FileText />
          <Typography variant="h3" className="font-semibold">
            Quikjot
          </Typography>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="relative">
              <AnimatePresence>
                <Popover open={isMenuVisible} onOpenChange={setIsMenuVisible}>
                  <PopoverTrigger asChild>
                    <SidebarMenuButton
                      className={cn(
                        "bg-primary hover:bg-primary/90 hover:text-primary-foreground text-primary-foreground flex size-16 items-center justify-center rounded-full",
                        isMenuVisible && "rotate-45",
                      )}
                      onClick={() => setIsMenuVisible(!isMenuVisible)}
                    >
                      <Plus />
                    </SidebarMenuButton>
                  </PopoverTrigger>
                  <PopoverContent
                    side="right"
                    align="start"
                    className="w-fit rounded-none border-none bg-transparent p-0 shadow-none"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col gap-2"
                    >
                      <CreateFolderDialog
                        trigger={
                          <SidebarMenuButton className="bg-secondary hover:bg-secondary/90 flex items-center justify-center rounded-full p-3">
                            <Folder />
                          </SidebarMenuButton>
                        }
                        parentId={currentFolderId}
                      />
                      <CreateNoteDialog
                        trigger={
                          <SidebarMenuButton className="bg-secondary hover:bg-secondary/90 flex items-center justify-center rounded-full p-3">
                            <File />
                          </SidebarMenuButton>
                        }
                      />
                      <SidebarMenuButton className="bg-secondary hover:bg-secondary/90 flex items-center justify-center rounded-full p-3">
                        <Calendar />
                      </SidebarMenuButton>
                      <Link href="/trash">
                        <SidebarMenuButton
                          className="bg-secondary hover:bg-secondary/90 flex items-center justify-center rounded-full p-3"
                          onClick={() => setIsMenuVisible(false)}
                        >
                          <Trash2 />
                        </SidebarMenuButton>
                      </Link>
                    </motion.div>
                  </PopoverContent>
                </Popover>
              </AnimatePresence>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      {/* <SidebarFooter>
        <UpgradeCTA />
      </SidebarFooter> */}
    </Sidebar>
  );
};

export default AppSidebar;
