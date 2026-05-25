import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /**
   * `pill` adds the bordered chip wrapper (matches the legacy `.section-eyebrow` class).
   * `plain` is just the uppercase label — useful inside cards.
   */
  variant?: "pill" | "plain";
};

export function Eyebrow({ children, className, variant = "plain" }: EyebrowProps) {
  if (variant === "pill") {
    return (
      <p
        className={cn(
          "inline-flex rounded-full border border-[var(--color-border)] bg-white/90 px-3 py-1 text-eyebrow font-bold uppercase tracking-[0.11em] text-[var(--color-muted)]",
          className
        )}
      >
        {children}
      </p>
    );
  }

  return (
    <p
      className={cn(
        "text-eyebrow font-semibold uppercase tracking-[0.09em] text-[var(--color-muted)]",
        className
      )}
    >
      {children}
    </p>
  );
}
