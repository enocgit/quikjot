import React from "react";
import { Plus, Calendar, Trash2, FileText } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import UpgradeCTA from "./upgrade-cta";
import { Typography } from "./ui/typography";

const AppSidebar: React.FC = () => {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <FileText />
          <Typography variant="h3" className="font-semibold">
            Quikjot
          </Typography>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="bg-primary hover:bg-primary/90 hover:text-primary-foreground text-primary-foreground flex size-16 items-center justify-center rounded-full">
              <Plus />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Calendar />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Trash2 />
            </SidebarMenuButton>
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
