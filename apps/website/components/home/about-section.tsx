import { Container, Section } from "@packages/ui";
import { GsapReveal } from "@/components/gsap-reveal";
import type { HomeContent } from "@/lib/types";

export function AboutSection({ about }: { about: HomeContent["about"] }) {
  return (
    <Section id="about" className="section-deferred bg-[var(--surface-soft)] py-20 md:py-28">
      <Container className="max-w-[1000px]">
        <GsapReveal preset="fadeUp" className="mb-12 flex flex-col gap-2">
          <span className="framer-chip framer-chip-lime w-fit">About</span>
          <h2 className="text-[36px] font-semibold leading-[1.05] tracking-[-0.02em] md:text-[48px]">{about.heading}</h2>
        </GsapReveal>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          <div className="flex flex-1 flex-col gap-6">
            {about.bio.map((paragraph, index) => (
              <GsapReveal key={index} preset="fadeUp" delay={index * 0.08}>
                <p className="text-[17px] leading-[30px] text-[#181818]" style={{ letterSpacing: "-0.01em" }}>
                  {paragraph}
                </p>
              </GsapReveal>
            ))}

            <GsapReveal preset="fadeUp" delay={0.2}>
              <p className="mt-2 text-sm font-medium text-[var(--text-muted)]" style={{ letterSpacing: "-0.01em" }}>
                {about.currentlyLine}
              </p>
            </GsapReveal>

            <GsapReveal preset="fadeUp" delay={0.28}>
              <div className="mt-4 flex flex-col gap-3">
                {about.skills.map((group) => (
                  <div key={group.category} className="flex gap-3 text-sm leading-6">
                    <span className="w-[130px] shrink-0 font-semibold text-[#181818]">{group.category}</span>
                    <span className="text-[var(--text-secondary)]">{group.items}</span>
                  </div>
                ))}
              </div>
            </GsapReveal>
          </div>

          {/* Experience timeline with continuous left spine */}
          <div className="w-full md:w-[340px] md:shrink-0">
            <GsapReveal preset="fadeUp" delay={0.15} childSelector=".exp-entry" stagger={0.1}>
              <div className="relative pl-7">
                {/* spine */}
                <div
                  className="pointer-events-none absolute left-[5px] top-[6px] bottom-[6px] w-px bg-[var(--border-default)]"
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-7">
                  {about.experiences.map((exp) => (
                    <div key={exp.company} className="exp-entry relative">
                      {/* dot on spine */}
                      <div
                        className="pointer-events-none absolute -left-7 top-[5px] h-[11px] w-[11px] rounded-full bg-[var(--brand-lime)] ring-[3px] ring-[var(--surface-soft)]"
                        aria-hidden="true"
                      />

                      <div className="mb-2 flex items-baseline justify-between gap-2">
                        <span className="text-base font-semibold tracking-tight text-[#181818]">{exp.company}</span>
                        <span className="shrink-0 text-xs text-[var(--text-muted)]">{exp.period}</span>
                      </div>
                      {exp.description && (
                        <p className="text-sm leading-6 text-[var(--text-secondary)]">{exp.description}</p>
                      )}
                      {exp.projects && (
                        <div className="mt-3 flex flex-col gap-2.5 border-l border-[var(--border-default)] pl-4">
                          {exp.projects.map((project) => (
                            <div key={project.name}>
                              <div className="flex items-baseline gap-2">
                                <span className="text-sm font-semibold text-[#181818]">{project.name}</span>
                                <span className="text-xs text-[var(--text-muted)]">{project.period}</span>
                              </div>
                              <p className="mt-0.5 text-sm leading-6 text-[var(--text-secondary)]">{project.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </GsapReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
