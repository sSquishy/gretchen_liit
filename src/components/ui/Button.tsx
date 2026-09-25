"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/src/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D72638]/60 focus-visible:ring-offset-2",
        variant === "primary"
          ? "bg-[#171717] text-[#FAFAF8] shadow-sm hover:-translate-y-0.5 hover:bg-[#2a2a2a]"
          : "border border-[#E5E5E5] bg-white text-[#171717] hover:border-[#D7D7D7] hover:bg-[#F5F5F3]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
