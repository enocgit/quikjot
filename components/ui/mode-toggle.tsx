"use client";

import React from "react";
import { Button } from "./button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="rounded-full transition"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
