import { cn } from "../utils/cn";

type DividerProps = {
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export function Divider({ className, orientation = "horizontal" }: DividerProps) {
  if (orientation === "vertical") {
    return <div aria-hidden="true" className={cn("w-px h-full bg-[var(--color-border)]", className)} />;
  }
  return <div aria-hidden="true" className={cn("h-px w-full bg-[var(--color-border)]", className)} />;
}
