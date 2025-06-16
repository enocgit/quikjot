import React from "react";
import { Plus, Calendar, Trash2 } from "lucide-react";
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
        <Typography variant="h2" className="font-semibold">
          Quikjot
        </Typography>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="rounded-full bg-primary hover:bg-primary/90 hover:text-primary-foreground text-primary-foreground size-16 flex items-center justify-center">
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
      <SidebarFooter>
        <UpgradeCTA />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
