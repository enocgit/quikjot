"use client";

import React from "react";
import { Search } from "lucide-react";
import { Typography } from "./ui/typography";
import { Input } from "./ui/input";
import ModeToggle from "./ui/mode-toggle";
import Menu from "./ui/menu";

const Header: React.FC = () => {
  return (
    <header className="bg-background flex h-fit w-full justify-between gap-5 px-6 py-4 pt-8">
      <Typography variant="h3" className="font-semibold">
        My Notes
      </Typography>

      <div className="flex flex-1 justify-center">
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
      </div>

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
