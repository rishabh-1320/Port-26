import type { ReactNode } from "react";
import { Card, Heading } from "@packages/ui";

type SubCardProps = {
  title?: string;
  children: ReactNode;
  /** Defaults to `h3` size. Set to `h4` for compact step cards. */
  titleSize?: "h3" | "h4";
  className?: string;
};

/**
 * White inner card used inside case study sections — for step breakdowns,
 * sub-points, decision cards, etc.
 */
export function SubCard({ title, children, titleSize = "h3", className }: SubCardProps) {
  return (
    <Card className={`space-y-3 border-white bg-white/90 p-5 md:p-6 ${className ?? ""}`}>
      {title ? (
        <Heading level={3} size={titleSize}>
          {title}
        </Heading>
      ) : null}
      {children}
    </Card>
  );
}
