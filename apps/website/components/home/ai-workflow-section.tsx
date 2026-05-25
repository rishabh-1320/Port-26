import { Container, Section } from "@packages/ui";
import { GsapReveal } from "@/components/gsap-reveal";
import type { HomeContent } from "@/lib/types";

export function AiWorkflowSection({ aiWorkflow }: { aiWorkflow: HomeContent["aiWorkflow"] }) {
  return (
    <Section className="section-deferred bg-[var(--surface-soft)] py-20 md:py-28">
      <Container className="max-w-[900px]">
        <GsapReveal preset="fadeUp" className="mb-12 flex flex-col items-center gap-3 text-center">
          <span className="framer-chip framer-chip-blue w-fit">Workflow</span>
          <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[48px]">{aiWorkflow.heading}</h2>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-[var(--text-secondary)]" style={{ letterSpacing: "-0.01em" }}>
            {aiWorkflow.intro}
          </p>
        </GsapReveal>

        <GsapReveal preset="fadeUp" delay={0.1}>
          <div className="relative mx-auto max-w-[720px]">
            {/* center axis line */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px bg-[var(--border-default)]"
              aria-hidden="true"
            />

            <div className="workflow-list space-y-7 md:space-y-9">
              {aiWorkflow.tools.map((tool) => (
                <div key={tool.name} className="workflow-tool relative grid grid-cols-2 items-start gap-6 md:gap-12">
                  {/* dot on the axis */}
                  <div
                    className="pointer-events-none absolute left-1/2 top-2 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[var(--brand-lime)] ring-4 ring-[var(--surface-soft)]"
                    aria-hidden="true"
                  />

                  {/* left side: tool name, right-aligned to the axis */}
                  <div className="pr-5 text-right md:pr-8">
                    <p className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--text-primary)] md:text-base">
                      {tool.name}
                    </p>
                  </div>

                  {/* right side: description */}
                  <div className="pl-5 md:pl-8">
                    <p className="text-[14px] leading-6 text-[var(--text-secondary)] md:text-[15px]" style={{ letterSpacing: "-0.01em" }}>
                      {tool.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GsapReveal>

        <GsapReveal preset="fadeUp" delay={0.25}>
          <p
            className="mx-auto mt-14 max-w-[640px] rounded-2xl bg-white p-6 text-center text-[15px] leading-7 text-[var(--text-secondary)] ring-1 ring-[var(--border-default)]"
            style={{ letterSpacing: "-0.01em" }}
          >
            {aiWorkflow.closingLine}
          </p>
        </GsapReveal>
      </Container>
    </Section>
  );
}
