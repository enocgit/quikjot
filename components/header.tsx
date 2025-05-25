"use client";

import React from "react";
import { Search } from "lucide-react";
import { Typography } from "./ui/typography";
import { Input } from "./ui/input";
import ModeToggle from "./ui/mode-toggle";
import Menu from "./ui/menu";

const Header: React.FC = () => {
  return (
    <header className="w-full flex h-fit justify-between gap-5 px-6 py-4 pt-8 bg-background">
      <Typography variant="h2" className="font-semibold">
        My Notes
      </Typography>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Search notes..."
            className="pl-10 bg-muted"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
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
