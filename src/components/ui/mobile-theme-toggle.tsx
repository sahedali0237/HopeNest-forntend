"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

export function MobileThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
    >
      {theme === "light" ? (
        <>
          <Moon className="h-5 w-5" />
          Dark Mode
        </>
      ) : (
        <>
          <Sun className="h-5 w-5" />
          Light Mode
        </>
      )}
    </button>
  );
}