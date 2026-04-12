import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, Section } from "@packages/ui";
import { BeforeAfterCompare } from "@/components/case-study/before-after-compare";
import { ScrollSpyToc } from "@/components/case-study/scroll-spy-toc";
import { onboardingCaseStudy } from "@/lib/onboarding-case-study";
import { homeContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: onboardingCaseStudy.metadataTitle,
  description: onboardingCaseStudy.metadataDescription
};

export default function OnboardingCaseStudyPage() {
  return (
    <>
      <Section className="pb-8 pt-12 md:pb-10 md:pt-16">
        <Container>
          <Link href="/" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
            Back to Home
          </Link>

          <div id="overview" className="mt-5 space-y-5 scroll-mt-28">
            <Card className="border-white bg-white/85 p-6 shadow-[0_24px_70px_-42px_rgba(9,18,13,0.45)] md:p-8">
              <h1 className="text-4xl font-semibold leading-[0.98] tracking-[-0.02em] md:text-5xl">
                {onboardingCaseStudy.heroTitle}
                <span className="block">{onboardingCaseStudy.heroSubtitle}</span>
              </h1>

              <div className="mt-6 grid gap-4 rounded-2xl bg-[#f5f5f5] p-4 md:grid-cols-3">
                <InfoBlock title="Overview" value={onboardingCaseStudy.overview} />
                <InfoBlock title="My role" value={onboardingCaseStudy.myRole} />
                <InfoBlock title="Timeline" value={onboardingCaseStudy.timeline} />
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-white bg-white">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={onboardingCaseStudy.heroPoster}
                  className="h-full max-h-[560px] w-full object-contain"
                  aria-label="Lokalise onboarding comparison"
                >
                  <source src={onboardingCaseStudy.heroVideo} type="video/mp4" />
                </video>
              </div>
            </Card>

            <Card className="border-white bg-[#f5f5f5] p-5 md:p-6">
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Impact Overview</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {onboardingCaseStudy.impactOverview.map((metric) => (
                  <article key={metric.title} className="rounded-xl bg-white/90 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">{metric.title}</p>
                    <p className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{metric.value}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{metric.description}</p>
                  </article>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="py-2 md:py-4">
        <Container>
          <div className="grid gap-5 md:grid-cols-[190px_minmax(0,860px)] md:gap-8">
            <aside className="md:sticky md:top-28 md:h-fit">
              <Card className="border-white bg-white/90 p-3.5 md:p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--color-muted)]">On this page</p>
                <ScrollSpyToc
                  items={onboardingCaseStudy.toc.map((item) => ({
                    ...item,
                    label: item.id === "final-design" ? "Final decision" : item.label
                  }))}
                />
              </Card>
            </aside>

            <article className="space-y-0">
              <section id="problem-framing" className="space-y-6 scroll-mt-28 pb-8 md:pb-10">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{onboardingCaseStudy.problemFraming.heading}</h2>
                {onboardingCaseStudy.problemFraming.intro.map((paragraph) => (
                  <p key={paragraph} className="content-prose">
                    {paragraph}
                  </p>
                ))}

                <FigureBlock figure={onboardingCaseStudy.problemFraming.activationFigure} />

                <h3 className="pt-1 text-xl font-semibold tracking-tight md:text-2xl">How I tackle the problem</h3>
                {onboardingCaseStudy.problemFraming.steps.map((step) => (
                  <Card key={step.title} className="space-y-4 border-white bg-white/90 p-5 md:p-6">
                    <h4 className="text-lg font-semibold tracking-tight md:text-xl">{step.title}</h4>
                    {step.body.map((paragraph) => (
                      <p key={paragraph} className="content-prose">
                        {paragraph}
                      </p>
                    ))}
                    {step.bullets && (
                      <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--color-muted)]">
                        {step.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {step.figures.map((figure) => (
                      <FigureBlock key={figure.src} figure={figure} />
                    ))}
                  </Card>
                ))}

                <Card className="space-y-4 border-white bg-[#f5f5f5] p-5 md:p-6">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{onboardingCaseStudy.frictionSummary.heading}</h3>
                  <p className="content-prose">{onboardingCaseStudy.frictionSummary.prompt}</p>
                  <div className="flex items-center justify-center overflow-hidden rounded-xl bg-white py-4">
                    <img
                      src={onboardingCaseStudy.frictionSummary.figure.src}
                      alt={onboardingCaseStudy.frictionSummary.figure.alt}
                      className="h-auto w-[25%] min-w-[110px] max-w-[170px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    {onboardingCaseStudy.frictionSummary.notes.map((note, index) => (
                      <article key={note} className="rounded-lg bg-white px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Note {index + 1}</p>
                        <p className="mt-1 text-sm font-semibold text-[var(--color-text)]">{note}</p>
                      </article>
                    ))}
                  </div>
                </Card>

                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{onboardingCaseStudy.problemDetails.heading}</h3>
                {onboardingCaseStudy.problemDetails.sections.map((detail) => (
                  <Card key={detail.title} className="space-y-4 border-white bg-white/90 p-5 md:p-6">
                    <h4 className="text-lg font-semibold tracking-tight md:text-xl">{detail.title}</h4>
                    <p className="content-prose">{detail.body}</p>
                    {detail.figure ? <FigureBlock figure={detail.figure} /> : null}
                    {detail.note ? <p className="rounded-lg bg-[#f5f5f5] px-4 py-3 text-sm font-medium text-[var(--color-text)]">{detail.note}</p> : null}
                  </Card>
                ))}

                <Card className="space-y-4 border-white bg-white/90 p-5 md:p-6">
                  <h4 className="text-xl font-semibold tracking-tight md:text-2xl">{onboardingCaseStudy.problemDetails.additionalProblems.heading}</h4>
                  <FigureBlock figure={onboardingCaseStudy.problemDetails.additionalProblems.figure} captionOverride={onboardingCaseStudy.problemDetails.additionalProblems.caption} />
                  <div className="overflow-hidden rounded-xl border border-white bg-[#f5f5f5]">
                    <div className="aspect-video w-full">
                      <iframe
                        src={onboardingCaseStudy.problemDetails.additionalProblems.gifEmbed}
                        title="Onboarding meme"
                        className="h-full w-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </Card>
              </section>

              <SectionDivider />

              <section id="solution" className="space-y-5 scroll-mt-28 py-8 md:py-10">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{onboardingCaseStudy.solution.heading}</h2>
                <p className="content-prose">{onboardingCaseStudy.solution.intro}</p>

                <Card className="space-y-4 border-white bg-white/90 p-5 md:p-6">
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{onboardingCaseStudy.solution.sprint.title}</h3>
                  <p className="content-prose">{onboardingCaseStudy.solution.sprint.body}</p>
                  <FigureBlock figure={onboardingCaseStudy.solution.sprint.figure} />
                  <p className="text-[15px] font-semibold text-[var(--color-text)]">{onboardingCaseStudy.solution.sprint.ideasHeading}</p>
                  <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--color-muted)]">
                    {onboardingCaseStudy.solution.sprint.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="grid gap-3 md:grid-cols-2">
                    {onboardingCaseStudy.solution.sprint.ideaFigures.map((figure) => (
                      <div key={figure.src} className="overflow-hidden rounded-xl bg-white p-2">
                        <img src={figure.src} alt={figure.alt} className="h-full w-full object-contain" loading="lazy" />
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-[var(--color-muted)]">{onboardingCaseStudy.solution.sprint.caption}</p>
                </Card>

                <Card className="space-y-4 border-white bg-white/90 p-5 md:p-6">
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{onboardingCaseStudy.solution.testing.title}</h3>
                  <p className="content-prose">{onboardingCaseStudy.solution.testing.body}</p>
                  <p className="text-[15px] font-semibold text-[var(--color-text)]">Here&apos;s what we learned from the prototype testing:</p>
                  <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--color-muted)]">
                    {onboardingCaseStudy.solution.testing.learned.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <FigureBlock figure={onboardingCaseStudy.solution.testing.figure} captionOverride={onboardingCaseStudy.solution.testing.caption} />
                </Card>

                <Card className="space-y-4 border-white bg-white/90 p-5 md:p-6">
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">{onboardingCaseStudy.solution.iterations.title}</h3>
                  <p className="content-prose">{onboardingCaseStudy.solution.iterations.body}</p>
                  <FigureBlock figure={onboardingCaseStudy.solution.iterations.figure} captionOverride={onboardingCaseStudy.solution.iterations.caption} />
                </Card>
              </section>

              <SectionDivider />

              <section id="final-design" className="space-y-5 scroll-mt-28 py-8 md:py-10">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{onboardingCaseStudy.finalDesigns.heading}</h2>
                <p className="content-prose">{onboardingCaseStudy.finalDesigns.intro}</p>

                {onboardingCaseStudy.finalDesigns.blocks.map((block) => (
                  <Card key={block.id} className="space-y-4 border-white bg-white/90 p-5 md:p-6">
                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">{block.title}</h3>
                    <p className="content-prose">{block.description}</p>
                    <BeforeAfterCompare
                      beforeSrc={block.beforeSrc}
                      afterSrc={block.afterSrc}
                      beforeLabel={block.beforeLabel}
                      afterLabel={block.afterLabel}
                      alt={block.alt}
                    />
                    <div className="grid gap-3 md:grid-cols-2">
                      {block.stats.map((stat) => (
                        <article key={stat.value} className="rounded-xl bg-[#f5f5f5] p-4">
                          <p className="text-base font-semibold text-[var(--color-text)] md:text-lg">{stat.value}</p>
                          <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{stat.description}</p>
                        </article>
                      ))}
                    </div>
                  </Card>
                ))}
              </section>

              <SectionDivider />

              <section id="results" className="space-y-5 scroll-mt-28 py-8 md:py-10">
                <Card className="space-y-4 border-white bg-white/90 p-5 md:p-6">
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{onboardingCaseStudy.feedbackImpact.heading}</h2>
                  <p className="content-prose">{onboardingCaseStudy.feedbackImpact.intro}</p>
                  <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--color-muted)]">
                    {onboardingCaseStudy.feedbackImpact.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <blockquote className="rounded-xl bg-[#f5f5f5] px-5 py-4 text-base italic text-[var(--color-text)]">
                    {onboardingCaseStudy.feedbackImpact.quote}
                  </blockquote>
                </Card>
              </section>
            </article>
          </div>
        </Container>
      </Section>

      <Section className="bg-[#181818] py-20 md:py-20">
        <Container className="max-w-[1000px]">
          <div className="flex flex-col items-center gap-20">
            <div className="flex w-full max-w-[800px] flex-col items-center gap-10 text-center">
              <div className="h-[112px] w-[112px] overflow-hidden rounded-full">
                <img src={homeContent.logo} alt="Design Port logo" className="h-full w-full object-cover" loading="lazy" />
              </div>

              <div className="flex flex-col items-center gap-4">
                <h2 className="text-5xl font-semibold leading-[1.06] tracking-[-0.02em] text-white md:text-[60px] md:leading-[68px]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                  Ready to work <span className="text-[#8e8e8e]">with me?</span>
                </h2>
                <p className="text-2xl leading-8 text-white" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
                  Then pick your phone &amp; call me or not..
                </p>
              </div>

              <Link href={`mailto:${homeContent.email}`} className="w-fit">
                <span className="framer-btn-primary">Contact Me</span>
              </Link>
            </div>

            <div className="flex w-full items-start justify-between gap-6 md:flex-row">
              <div className="flex max-w-[320px] flex-col gap-4">
                <p className="text-base leading-6 text-[#e0e0e0]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
                  Let&apos;s build the future of your product together &amp; better.
                </p>

                <div className="flex items-center gap-4">
                  {homeContent.socials.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-semibold tracking-[-0.01em] text-white transition hover:border-white/40 hover:bg-white/10"
                      style={{ fontFamily: '"Aileron", sans-serif' }}
                      aria-label={item.label}
                    >
                      {getSocialShortLabel(item.label)}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 text-white">
                <Link href={`mailto:${homeContent.email}`} className="text-base leading-6 tracking-[-0.01em]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                  {homeContent.email}
                </Link>
                <Link href={`tel:${homeContent.phone.replace(/\s+/g, "")}`} className="text-base leading-6 tracking-[-0.01em]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                  {homeContent.phone}
                </Link>
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex w-full items-center justify-between gap-4">
              <span className="text-sm text-transparent">.</span>
              <span className="text-sm text-[#8e8e8e]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
                {homeContent.footerNote}
              </span>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-base font-semibold text-[var(--color-text)]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)] md:text-base">{value}</p>
    </div>
  );
}

function FigureBlock({ figure, captionOverride }: { figure: { src: string; alt: string; caption?: string }; captionOverride?: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white bg-white">
      <img src={figure.src} alt={figure.alt} className="h-auto max-h-[560px] w-full object-cover" loading="lazy" />
      {captionOverride || figure.caption ? (
        <figcaption className="border-t border-white px-4 py-3 text-center text-sm text-[var(--color-muted)]">{captionOverride || figure.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function SectionDivider() {
  return <div className="h-px w-full bg-[var(--color-border)]" aria-hidden="true" />;
}

function getSocialShortLabel(label: string) {
  if (label.toLowerCase().includes("instagram")) {
    return "IG";
  }

  if (label.toLowerCase() === "x") {
    return "X";
  }

  if (label.toLowerCase().includes("youtube")) {
    return "YT";
  }

  return label.slice(0, 2).toUpperCase();
}
