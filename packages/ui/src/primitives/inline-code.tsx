import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function InlineCode({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        "inline rounded bg-[var(--surface-muted)] px-[5px] text-[0.85em] font-mono text-[var(--text-primary)]",
        "align-[1px] leading-none",
        className
      )}
    >
      {children}
    </code>
  );
}
