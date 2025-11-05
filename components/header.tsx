"use client";

import React from "react";
import { SearchIcon } from "lucide-react";
import { Typography } from "./ui/typography";
import Menu from "./ui/menu";
import dynamic from "next/dynamic";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input.group";
import { Kbd } from "./ui/kbd";
const ModeToggle = dynamic(() => import("./ui/mode-toggle"), {
  ssr: false,
});

const Header: React.FC = () => {
  return (
    <header className="bg-background flex h-fit w-full justify-between gap-5 px-6 py-4 pt-8">
      <Typography variant="h3" className="font-semibold">
        My Notes
      </Typography>
      <div className="bg-muted/50 flex w-full max-w-md flex-col gap-6">
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
      {/* <div className="flex flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search notes..."
            className="bg-muted/50 pl-10"
          />
          <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
            <Search size={18} />
          </span>
        </div>
      </div> */}

      <div className="flex items-center gap-4">
        {/* Dark/Light Mode Toggle */}
        <ModeToggle />
        {/* Avatar with Dropdown Menu */}
        <Menu />
      </div>
    </header>
  );
};

export default Header;
