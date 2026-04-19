import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, Container, Section } from "@packages/ui";
import { ScrollSpyToc } from "@/components/case-study/scroll-spy-toc";
import { designSystemCaseStudy, type DesignSystemFigure, type DesignSystemSection } from "@/lib/design-system-case-study";
import { homeContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: designSystemCaseStudy.metadataTitle,
  description: designSystemCaseStudy.metadataDescription
};

export default function DesignSystemCaseStudyPage() {
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
                {designSystemCaseStudy.heroTitle}
                <span className="block">{designSystemCaseStudy.heroSubtitle}</span>
              </h1>

              <div className="mt-6 grid gap-4 rounded-2xl bg-[#f5f5f5] p-4 md:grid-cols-3">
                <InfoBlock title="Overview" value={designSystemCaseStudy.overview} />
                <InfoBlock title="My role" value={designSystemCaseStudy.myRole} />
                <InfoBlock title="Timeline" value={designSystemCaseStudy.timeline} />
              </div>

              <div className="mt-6">
                <FigureBlock figure={designSystemCaseStudy.heroFigure} />
              </div>
            </Card>

            <Card className="border-white bg-[#f5f5f5] p-5 md:p-6">
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Impact Overview</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {designSystemCaseStudy.impactOverview.map((metric) => (
                  <article key={metric.title} className="rounded-xl bg-white/90 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">{metric.title}</p>
                    <p className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{metric.value}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{metric.description}</p>
                  </article>
                ))}
              </div>
            </Card>

            <Card className="space-y-3 border-white bg-white/90 p-5 md:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">{designSystemCaseStudy.attribution.title}</p>
              <p className="text-base leading-7 text-[var(--color-text)]">
                Inspired by <span className="font-semibold">{designSystemCaseStudy.attribution.author}</span> on {designSystemCaseStudy.attribution.publication}.
              </p>
              <p className="text-sm leading-6 text-[var(--color-muted)]">{designSystemCaseStudy.attribution.note}</p>
              <Link href={designSystemCaseStudy.attribution.href} target="_blank" rel="noreferrer" className="inline-flex w-fit text-sm font-semibold text-[var(--color-brand)] hover:underline">
                Read original article
              </Link>
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
                <ScrollSpyToc items={designSystemCaseStudy.toc} />
              </Card>
            </aside>

            <article className="space-y-0">
              <CaseStudySection section={designSystemCaseStudy.introduction} />
              <SectionDivider />
              <CaseStudySection section={designSystemCaseStudy.exploration} />
              <SectionDivider />
              <CaseStudySection section={designSystemCaseStudy.patternsAndComponents} />
              <SectionDivider />
              <CaseStudySection section={designSystemCaseStudy.templates} />
              <SectionDivider />
              <CaseStudySection section={designSystemCaseStudy.documentation} />
              <SectionDivider />
              <CaseStudySection section={designSystemCaseStudy.engineering} />
              <SectionDivider />

              <section id={designSystemCaseStudy.reflection.id} className="space-y-5 scroll-mt-28 py-8 md:py-10">
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{designSystemCaseStudy.reflection.heading}</h2>
                {designSystemCaseStudy.reflection.intro.map((paragraph) => (
                  <p key={paragraph} className="content-prose">
                    {paragraph}
                  </p>
                ))}
                <blockquote className="rounded-xl bg-[#f5f5f5] px-5 py-4 text-base italic text-[var(--color-text)]">
                  {designSystemCaseStudy.reflection.quote}
                </blockquote>
                <div className="space-y-4">
                  {designSystemCaseStudy.reflection.figures.map((figure) => (
                    <FigureBlock key={figure.src} figure={figure} />
                  ))}
                </div>
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
                <Image src={homeContent.logo} alt="Design Port logo" width={1969} height={1969} sizes="112px" className="h-full w-full object-cover" />
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

function CaseStudySection({ section }: { section: DesignSystemSection }) {
  return (
    <section id={section.id} className="space-y-5 scroll-mt-28 py-8 md:py-10">
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{section.heading}</h2>
      {section.intro.map((paragraph) => (
        <p key={paragraph} className="content-prose">
          {paragraph}
        </p>
      ))}

      {section.cards.map((card) => (
        <Card key={card.title} className="space-y-4 border-white bg-white/90 p-5 md:p-6">
          <h3 className="text-lg font-semibold tracking-tight md:text-xl">{card.title}</h3>
          {card.body.map((paragraph) => (
            <p key={paragraph} className="content-prose">
              {paragraph}
            </p>
          ))}
          {card.bullets ? (
            <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--color-muted)]">
              {card.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {card.figures?.length === 1 ? (
            <FigureBlock figure={card.figures[0]} />
          ) : null}
          {card.figures && card.figures.length > 1 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {card.figures.map((figure) => (
                <FigureBlock key={figure.src} figure={figure} compact />
              ))}
            </div>
          ) : null}
        </Card>
      ))}
    </section>
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

function FigureBlock({ figure, compact = false }: { figure: DesignSystemFigure; compact?: boolean }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white bg-white">
      <Image
        src={figure.src}
        alt={figure.alt}
        width={1440}
        height={900}
        sizes={compact ? "(max-width: 809px) 100vw, 430px" : "(max-width: 809px) 100vw, 860px"}
        className={compact ? "h-auto w-full object-contain" : "h-auto max-h-[560px] w-full object-contain"}
      />
      {figure.caption ? <figcaption className="border-t border-white px-4 py-3 text-center text-sm text-[var(--color-muted)]">{figure.caption}</figcaption> : null}
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
