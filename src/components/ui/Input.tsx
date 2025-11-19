"use client";

import { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-neutral-200">
          {label}
        </label>
      )}
      <input
        className={clsx(
          "rounded-md bg-neutral-900/80 px-3 py-2 text-sm text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blafflix-red focus:border-transparent",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}
