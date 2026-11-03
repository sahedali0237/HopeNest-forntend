"use client";

import React from "react";

interface AvatarWithTooltipProps {
  children: React.ReactNode;
  name: string;
  placement?: "top" | "bottom";
}

export function AvatarWithTooltip({
  children,
  name,
  placement = "top",
}: AvatarWithTooltipProps) {
  if (!name) {
    return children;
  }

  const position =
    placement === "top" ? "bottom-full mb-1.5" : "bottom-full mt-1.5";

  return (
    <div className="relative inline-block group">
      {children}
      <span
        className={`
          absolute z-50 left-1/2 -translate-x-1/2 ${position}
          px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/50
          text-xs text-white whitespace-nowrap shadow-lg
          opacity-0 group-hover:opacity-100 transition-opacity duration-200
          pointer-events-none
        `}
      >
        {name}
      </span>
    </div>
  );
}
