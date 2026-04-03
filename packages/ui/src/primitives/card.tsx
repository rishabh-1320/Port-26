import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <article className={cn("rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6", className)}>
      {children}
    </article>
  );
}
