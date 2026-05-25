import type { ReactNode } from "react";
import { Card, Heading } from "@packages/ui";
import { InfoBlock } from "@/components/case-study/info-block";

type HeroCardProps = {
  title: string;
  /** Snapshot paragraphs / lead copy. Pass JSX so callers can render inline <strong>, <em>, etc. */
  children: ReactNode;
  /** Bottom info grid — 3 cells of role/company/timeline-style metadata. */
  meta: Array<{ title: string; value: string }>;
  /** Optional content rendered below the meta grid (typically a CaseFigurePlaceholder or CaseFigure). */
  footer?: ReactNode;
};

/**
 * The white-frosted card that sits at the top of every case study.
 * Holds the page title, snapshot copy, metadata grid, and optional hero figure.
 */
export function HeroCard({ title, children, meta, footer }: HeroCardProps) {
  return (
    <Card className="border-white bg-white/85 p-6 shadow-card-feature md:p-8">
      <Heading level={1} size="h1">
        {title}
      </Heading>

      <div className="mt-5 space-y-3">{children}</div>

      <div className="mt-8 grid gap-6 border-t border-[var(--border-default)] pt-6 md:grid-cols-3 md:gap-8">
        {meta.map((cell) => (
          <InfoBlock key={cell.title} title={cell.title} value={cell.value} />
        ))}
      </div>

      {footer ? <div className="mt-8">{footer}</div> : null}
    </Card>
  );
}
