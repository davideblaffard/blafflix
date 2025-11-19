"use client";

import { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  const variants: Record<typeof variant, string> = {
    primary: "bg-blafflix-red text-white hover:bg-red-700 focus:ring-blafflix-red",
    secondary:
      "bg-white text-black hover:bg-neutral-200 focus:ring-neutral-300",
    ghost:
      "bg-transparent text-white hover:bg-white/10 focus:ring-neutral-500"
  };

  return (
    <button
      className={clsx(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
