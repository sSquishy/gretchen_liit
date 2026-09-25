"use client";

import type { ReactNode } from "react";

import { cn } from "@/src/lib/utils";

interface ChoiceCardProps {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function ChoiceCard({ selected = false, onClick, children, className }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start justify-between gap-3 rounded-2xl border border-[#E5E5E5] bg-white p-4 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#D7D7D7] hover:shadow-sm",
        selected && "border-[#D72638] bg-[#FFF7F7] shadow-[0_0_0_1px_rgba(215,38,56,0.08)]",
        className,
      )}
    >
      {children}
    </button>
  );
}
