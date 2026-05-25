import type { ReactNode } from "react";
import { Heading } from "@packages/ui";
import { GsapReveal } from "@/components/gsap-reveal";

type CaseSectionProps = {
  id: string;
  heading: string;
  children: ReactNode;
  /** Override the heading visual size — defaults to h2. */
  headingSize?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * One article section inside a case study. Renders the section anchor,
 * a heading with the standard fade-up reveal, then the body content
 * (also wrapped in a fade-up reveal so it animates after the heading).
 */
export function CaseSection({ id, heading, children, headingSize = "h2", className }: CaseSectionProps) {
  return (
    <section id={id} className={`space-y-5 scroll-mt-28 py-8 md:py-10 ${className ?? ""}`}>
      <GsapReveal preset="fadeUp">
        <Heading level={2} size={headingSize}>
          {heading}
        </Heading>
      </GsapReveal>
      <GsapReveal preset="fadeUp" delay={0.08}>
        <>{children}</>
      </GsapReveal>
    </section>
  );
}
