import { Container, Section } from "@packages/ui";
import { ProcessLinesReveal } from "@/components/process-lines-reveal";
import { GsapReveal } from "@/components/gsap-reveal";
import type { IdeologyPrinciple } from "@/lib/types";

const variantStyles: Record<IdeologyPrinciple["variant"], { bg: string; titleColor: string; descColor: string }> = {
  light: { bg: "#F5F5F5", titleColor: "#181818", descColor: "#181818" },
  brand: { bg: "#BBF451", titleColor: "#181818", descColor: "#181818" },
  blue: { bg: "#007AFF", titleColor: "#ffffff", descColor: "#ffffff" },
  dark: { bg: "#181818", titleColor: "#ffffff", descColor: "#e0e0e0" },
};

type IdeologySectionProps = {
  heading: string;
  principles: IdeologyPrinciple[];
};

export function IdeologySection({ heading, principles }: IdeologySectionProps) {
  return (
    <Section id="how-it-works" className="process-section">
      <Container className="process-container">
        <GsapReveal preset="fadeUp" className="process-headline">
          <span className="framer-chip framer-chip-blue process-chip">Principles</span>
          <h2 className="process-title">{heading}</h2>
        </GsapReveal>

        <div className="process-content">
          <ProcessLinesReveal />
          <div className="process-lines" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={`process-guide-${index}`} className="process-line-column">
                <span className="process-line-label">{`${index + 1}`.padStart(2, "0")}</span>
                <span className="process-line-track" />
              </div>
            ))}
          </div>

          <GsapReveal preset="fadeUp" childSelector=".process-row" stagger={0.12} className="process-cards">
            {principles.map((principle, index) => (
              <div key={principle.id} className={getProcessRowClasses(index)}>
                <article
                  className="process-card"
                  style={{ backgroundColor: variantStyles[principle.variant].bg }}
                >
                  <IdeologyCardContent principle={principle} />
                </article>
              </div>
            ))}
          </GsapReveal>
        </div>
      </Container>
    </Section>
  );
}

function IdeologyCardContent({ principle }: { principle: IdeologyPrinciple }) {
  const { titleColor, descColor } = variantStyles[principle.variant];
  return (
    <div className="process-card-content">
      <div className="process-card-header">
        <div className="process-card-icon-wrap">
          <IdeologyIcon id={principle.id} variant={principle.variant} />
        </div>
        <h3 className="process-card-title" style={{ color: titleColor }}>
          {principle.title}
        </h3>
      </div>
      <p className="process-card-description" style={{ color: descColor, letterSpacing: "-0.01em" }}>
        {principle.description}
      </p>
    </div>
  );
}

function IdeologyIcon({ id, variant }: { id: string; variant: IdeologyPrinciple["variant"] }) {
  if (id === "01") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#4FA1FF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 12h8M8 8h5M8 16h3" />
      </svg>
    );
  }
  if (id === "02") {
    const iconStroke = variantStyles[variant].titleColor;
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke={iconStroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="8" height="10" rx="2" />
        <rect x="14" y="7" width="8" height="10" rx="2" />
        <path d="M10 12h4" />
      </svg>
    );
  }
  if (id === "03") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
        <path d="M18.5 17l.8 1.8 1.7.7-1.7.7-.8 1.8-.8-1.8-1.7-.7 1.7-.7.8-1.8z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#BBF451" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function getProcessRowClasses(index: number) {
  if (index === 0) return "process-row process-row-01";
  if (index === 1) return "process-row process-row-02";
  if (index === 2) return "process-row process-row-03";
  return "process-row process-row-04";
}
