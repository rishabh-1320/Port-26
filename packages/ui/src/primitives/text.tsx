import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type TextVariant = "body" | "body-sm" | "muted" | "caption" | "lead";

type TextProps = {
  children: ReactNode;
  variant?: TextVariant;
  as?: "p" | "span" | "div";
  className?: string;
};

const VARIANT_CLASSES: Record<TextVariant, string> = {
  body: "text-body text-[var(--text-secondary)]",
  "body-sm": "text-body-sm text-[var(--text-secondary)]",
  muted: "text-body-sm text-[var(--text-muted)]",
  caption: "text-caption text-[var(--text-muted)]",
  lead: "text-h4 text-[var(--text-primary)] leading-[1.5]",
};

export function Text({ children, variant = "body", as = "p", className }: TextProps) {
  const Tag = as;
  return <Tag className={cn(VARIANT_CLASSES[variant], className)}>{children}</Tag>;
}
