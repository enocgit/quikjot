"use client";

import React from "react";
import { MenuIcon, SearchIcon } from "lucide-react";
import { Typography } from "./ui/typography";
import Menu from "./ui/menu";
import dynamic from "next/dynamic";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input.group";
import { Kbd } from "./ui/kbd";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Button } from "./ui/button";
const ModeToggle = dynamic(() => import("./ui/mode-toggle"), {
  ssr: false,
});

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="bg-background @container/header flex h-fit w-full justify-between gap-5 px-6 py-4 pt-8">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <MenuIcon />
        </Button>
        <Typography variant="h3" className="font-semibold">
          My Notes
        </Typography>
      </div>
      <div className="bg-muted/50 hidden w-full max-w-md flex-col gap-6 @3xl:flex">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="@3xl:hidden">
          <SearchIcon />
        </Button>
        {/* Dark/Light Mode Toggle */}
        <ModeToggle />
        {/* Avatar with Dropdown Menu */}
        <Menu />
      </div>
    </header>
  );
};

export default Header;
