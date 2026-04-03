import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200",
        variant === "primary"
          ? "bg-[var(--color-brand)] text-white hover:brightness-110"
          : "bg-transparent text-[var(--color-text)] ring-1 ring-inset ring-[var(--color-border)] hover:bg-[var(--color-surface)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
