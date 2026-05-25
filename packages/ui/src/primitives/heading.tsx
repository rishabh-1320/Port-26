import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingProps = {
  children: ReactNode;
  level: HeadingLevel;
  /**
   * Visual size override. By default, size matches level.
   * Use this when semantic level (h2) needs a different visual weight (display, h1, etc.).
   */
  size?: "display" | "h1" | "h2" | "h3" | "h4";
  className?: string;
  id?: string;
};

const SIZE_CLASSES = {
  display: "text-h1-sm md:text-display font-semibold tracking-[-0.02em]",
  h1: "text-h1-sm md:text-h1 font-semibold tracking-[-0.02em]",
  h2: "text-h2-sm md:text-h2 font-semibold tracking-tight",
  h3: "text-h3-sm md:text-h3 font-semibold tracking-tight",
  h4: "text-h4 font-semibold tracking-tight",
} as const;

export function Heading({ children, level, size, className, id }: HeadingProps) {
  const Tag = `h${level}` as const;
  const resolvedSize = size ?? (`h${level}` as keyof typeof SIZE_CLASSES);

  return (
    <Tag id={id} className={cn(SIZE_CLASSES[resolvedSize], className)}>
      {children}
    </Tag>
  );
}
