import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type BadgeTone = "neutral" | "lime" | "blue" | "outline";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-[var(--surface-muted)] text-[var(--text-primary)]",
  lime: "bg-[var(--brand-lime)] text-[var(--text-primary)] shadow-chip-lime",
  blue: "bg-[var(--brand-blue)] text-white shadow-chip-blue",
  outline: "border border-[var(--color-border)] bg-white/80 text-[var(--text-muted)]",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-caption font-semibold",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
