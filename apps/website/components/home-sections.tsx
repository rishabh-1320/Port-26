import Image from "next/image";
import Link from "next/link";
import { Card, Container, Section } from "@packages/ui";
import { HeroGradientCanvas, HeroRotator } from "@/components/home-hero-dynamic";
import type { HomeContent, ProcessStep } from "@/lib/types";

type HomeSectionsProps = {
  content: HomeContent;
};

export function HomeSections({ content }: HomeSectionsProps) {
  const heroPhrases = getHeroPhrases(content.hero.highlight, content.hero.support);

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="pb-0 pt-[40px] md:pt-[64px] xl:pt-[80px]">
        <Container className="relative max-w-[1600px]">
          <div className="hero-gradient-field pointer-events-none">
            <HeroGradientCanvas />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 text-center md:gap-10 xl:gap-20">
            <div className="relative z-20 flex w-full max-w-[1000px] flex-col items-center gap-4">
              <h1
                className="text-balance text-[40px] font-semibold leading-[52px] tracking-[-0.02em] text-[#181818] md:text-[64px] md:leading-[76px] xl:text-[80px] xl:leading-[96px]"
                style={{ fontFamily: '"Aileron", sans-serif' }}
              >
                <span className="block">{content.hero.lead}</span>
                <HeroRotator phrases={heroPhrases} />
              </h1>

              <p
                className="mt-2 max-w-[680px] text-[18px] leading-[26px] text-[#5f5f5f] md:text-[20px] md:leading-[30px]"
                style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}
              >
                {content.hero.intro}
              </p>
            </div>

            <div className="relative z-10 w-full">
              <div className="relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-t-[24px] border border-white/60 bg-[#18181814] p-2 pb-0 backdrop-blur-[10px]">
                <Image
                  src={content.hero.image}
                  alt="Dashboard Graphic"
                  width={2290}
                  height={1474}
                  priority
                  sizes="(max-width: 809px) calc(100vw - 32px), (max-width: 1439px) min(1000px, calc(100vw - 32px)), 1000px"
                  className="pointer-events-none h-auto w-full select-none rounded-t-[16px] object-cover object-top"
                />
              </div>

              <div className="hero-mockup-mask pointer-events-none absolute bottom-0 left-1/2 z-20 w-full max-w-[1000px] -translate-x-1/2" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── MY DESIGN PROCESS ─── */}
      <Section id="how-it-works" className="process-section">
        <Container className="process-container">
          <div className="process-headline">
            <span className="framer-chip framer-chip-blue process-chip">How do i work?</span>
            <h2 className="process-title" style={{ fontFamily: '"Aileron", sans-serif' }}>
              My Design <span className="text-[#8e8e8e]">Process</span>
            </h2>
            <p className="process-intro" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.01em" }}>
              {content.processIntro}
            </p>
          </div>

          <div className="process-content">
            <div className="process-lines" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={`process-guide-${index}`} className="process-line-column">
                  <span className="process-line-label">{`${index + 1}`.padStart(2, "0")}</span>
                  <span className="process-line-track" />
                </div>
              ))}
            </div>

            <div className="process-cards">
              {content.processSteps.map((step, index) => (
                <div key={step.id} className={getProcessRowClasses(index)}>
                  <article
                    className="process-card process-card-motion"
                    style={{
                      backgroundColor: step.bgColor,
                      animationDelay: `${index * 90}ms`,
                      animationFillMode: "forwards"
                    }}
                  >
                    <ProcessStepCardContent step={step} />
                  </article>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── WORKS / MY BEST WORK ─── */}
      <Section id="features" className="section-deferred bg-[#f5f5f5] py-16 md:py-20">
        <Container className="max-w-[1600px]">
          <div className="mx-auto mb-16 flex max-w-[640px] flex-col items-center space-y-4 text-center">
            <span className="framer-chip framer-chip-blue">My Work</span>
            <h2
              className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl"
              style={{ fontFamily: '"Aileron", sans-serif' }}
            >
              My <span className="text-[#8e8e8e]">Selected Works</span>
            </h2>
            <p className="max-w-[700px] text-xl leading-8 text-[#181818]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
              {content.workIntro}
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-10 md:gap-12">
            {content.works.map((item, index) => (
              <div
                key={item.id}
                className="sticky w-full"
                style={{
                  top: `clamp(${84 + index * 10}px, calc(4vw + ${72 + index * 6}px), ${112 + index * 18}px)`,
                  zIndex: 20 + index
                }}
              >
                <div className="flex w-full flex-col items-stretch gap-2.5 rounded-[30px] border border-black/[0.08] bg-[#f8f8f7] p-2.5 shadow-[0_20px_60px_-45px_rgba(24,24,24,0.65)] md:min-h-[460px] md:flex-row">
                  <WorkTextCard item={item} index={index} />
                  <WorkImageCard item={item} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── AI EXPLORATION ─── */}
      <Section id="ai-exploration" className="section-deferred bg-white pb-[120px] pt-[40px] md:pb-[128px] md:pt-[64px] xl:pb-[160px] xl:pt-[80px]">
        <Container className="max-w-[1600px]">
          <div className="mx-auto mb-10 flex w-full max-w-[1000px] flex-col items-center gap-2 text-center md:mb-12">
            <span className="framer-chip framer-chip-blue">Pet Projects</span>
            <h2
              className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl"
              style={{ fontFamily: '"Aileron", sans-serif' }}
            >
              AI <span className="text-[#8e8e8e]">Explorations</span>
            </h2>
            <p className="max-w-[740px] text-[18px] leading-[26px] text-[#181818] md:text-[20px] md:leading-[30px]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.01em" }}>
              Stay motivated and improve faster with practical tips from me.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 md:flex-row">
            {content.aiExplorations.map((item) => (
              <AiExplorationCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── MEET RISHABH / ABOUT ─── */}
      <Section id="about" className="section-deferred pb-[40px] pt-[120px] md:pb-[64px] md:pt-[128px] xl:pb-[80px] xl:pt-[160px]">
        <Container className="max-w-[1600px]">
          <div className="mx-auto mb-10 flex w-full max-w-[1000px] flex-col items-center gap-2 text-center md:mb-12">
            <span className="framer-chip framer-chip-lime">{content.coursesTitle}</span>
            <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl" style={{ fontFamily: '"Aileron", sans-serif' }}>
              Meet <span className="text-[#8e8e8e]">Rishabh!</span>
            </h2>
            <p className="max-w-[1000px] text-[18px] leading-[26px] text-[#181818] md:text-[20px] md:leading-[30px]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.01em" }}>
              {content.coursesIntro}
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-2 rounded-[24px] bg-[#f5f5f5] p-2 md:grid-cols-2">
            {content.experiences.map((item) => (
              <Card key={item.company} className="flex h-full flex-col gap-4 rounded-2xl bg-white p-6 md:p-7">
                <div className="flex items-center gap-2 text-sm leading-6 text-[#8e8e8e]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                  <span>{item.periodStart}</span>
                  <span aria-hidden="true">-</span>
                  <span>{item.periodEnd}</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 overflow-hidden rounded-[10px] bg-[#f5f5f5]">
                    <Image
                      src={item.logoSrc}
                      alt={`${item.company} logo`}
                      width={200}
                      height={200}
                      sizes="40px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                    {item.company}
                  </h3>
                </div>
                <p className="flex-1 text-base leading-7 text-[#8e8e8e]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
                  {item.description}
                </p>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center rounded-2xl bg-[#f5f5f5] px-4 py-2 text-sm font-medium tracking-[-0.01em] text-[#181818]"
                  style={{ fontFamily: '"Aileron", sans-serif' }}
                >
                  {item.role}
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── IMAGE GALLERY — FUN STUFF ─── */}
      <Section id="gallery" className="section-deferred bg-[#f5f5f5] py-16 md:py-20">
        <Container>
          <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center space-y-4 text-center">
            <span className="rounded-full bg-blue-100/60 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-600">Fun Stuff</span>
            <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl" style={{ fontFamily: '"Aileron", sans-serif' }}>
              Image <span className="text-[#8e8e8e]">gallery</span>
            </h2>
            <p className="max-w-lg text-[var(--color-muted)] md:text-lg">{content.galleryIntro}</p>
          </div>

          <div className="mx-auto max-w-[1000px] space-y-2 rounded-3xl bg-[#f5f5f5] p-2">
            <div className="flex justify-center gap-2">
              {content.gallery.slice(0, 4).map((item, i) => (
                <div key={`g1-${i}`} className="aspect-square w-[240px] shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={512}
                    height={512}
                    sizes="(max-width: 809px) 30vw, 240px"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              {content.gallery.slice(4, 7).map((item, i) => (
                <div key={`g2-${i}`} className="aspect-square w-[240px] shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={512}
                    height={512}
                    sizes="(max-width: 809px) 30vw, 240px"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              {content.gallery.slice(7, 8).map((item, i) => (
                <div key={`g3-${i}`} className="aspect-square w-[240px] overflow-hidden rounded-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={512}
                    height={512}
                    sizes="(max-width: 809px) 30vw, 240px"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── FOOTER / CONTACT ─── */}
      <Section className="section-deferred bg-[#181818] py-20 md:py-20">
        <Container className="max-w-[1000px]">
          <div className="flex flex-col items-center gap-20">
            <div className="flex w-full max-w-[800px] flex-col items-center gap-10 text-center">
              <div className="h-[112px] w-[112px] overflow-hidden rounded-full">
                <Image src={content.logo} alt="Design Port logo" width={1969} height={1969} sizes="112px" className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col items-center gap-4">
                <h2 className="text-5xl font-semibold leading-[1.06] tracking-[-0.02em] text-white md:text-[60px] md:leading-[68px]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                  Ready to work <span className="text-[#8e8e8e]">with me?</span>
                </h2>
                <p className="text-2xl leading-8 text-white" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
                  Then pick your phone &amp; call me or not..
                </p>
              </div>

              <Link href={`mailto:${content.email}`} className="w-fit">
                <span className="framer-btn-primary">Contact Me</span>
              </Link>
            </div>

            <div className="flex w-full items-start justify-between gap-6 md:flex-row">
              <div className="flex max-w-[320px] flex-col gap-4">
                <p className="text-base leading-6 text-[#e0e0e0]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
                  Let&apos;s build the future of your product together &amp; better.
                </p>

                <div className="flex items-center gap-4">
                  {content.socials.map((item) => (
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
                <Link href={`mailto:${content.email}`} className="group text-base leading-6 tracking-[-0.01em]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                  <RollingLinkText text={content.email} light />
                </Link>
                <Link href={`tel:${content.phone.replace(/\s+/g, "")}`} className="group text-base leading-6 tracking-[-0.01em]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                  <RollingLinkText text={content.phone} light />
                </Link>
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="flex w-full items-center justify-between gap-4">
              <span className="text-sm text-transparent">.</span>
              <span className="text-sm text-[#8e8e8e]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
                {content.footerNote}
              </span>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ProcessStepCardContent({ step }: { step: ProcessStep }) {
  return (
    <div className="process-card-content">
      <div className="process-card-header">
        <div className="process-card-icon-wrap">
          <ProcessStepIcon id={step.id} />
        </div>
        <h3 className="process-card-title" style={{ color: getProcessTitleColor(step.id), fontFamily: '"Aileron", sans-serif' }}>
          {step.title}
        </h3>
      </div>

      <p className="process-card-description" style={{ color: getProcessDescriptionColor(step.id, step.textColor), fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.01em" }}>
        {step.description}
      </p>
    </div>
  );
}

function AiExplorationCard({ item }: { item: HomeContent["aiExplorations"][0] }) {
  return (
    <div className="flex flex-1 flex-col gap-4 rounded-[26px] border border-black/[0.08] bg-[#fafafa] p-2.5">
      <div className="w-[70%] self-center overflow-hidden rounded-[18px]">
        <Image
          src={item.image}
          alt={item.title}
          width={1200}
          height={750}
          sizes="(max-width: 809px) 100vw, (max-width: 1439px) 50vw, 780px"
          className="aspect-[4/3] h-full w-full object-cover"
          unoptimized={isSvgUrl(item.image)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 rounded-[18px] bg-white p-5 md:p-6">
        <h3 className="text-[28px] font-semibold leading-[1.06] tracking-[-0.02em] md:text-[34px]" style={{ fontFamily: '"Aileron", sans-serif' }}>
          {item.title}
        </h3>

        <p className="text-[16px] leading-7 text-[#6f6f6f]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.01em" }}>
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={`${item.id}-${tag}`} className="case-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-2">
          {item.active && item.href ? (
            <Link href={item.href} className="case-cta w-fit">
              <CaseCtaLabel label={item.ctaLabel} />
            </Link>
          ) : (
            <span className="case-cta-disabled w-fit" aria-disabled="true">
              <CaseCtaLabel label={item.ctaLabel} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function getProcessRowClasses(index: number) {
  if (index === 0) {
    return "process-row process-row-01";
  }

  if (index === 1) {
    return "process-row process-row-02";
  }

  if (index === 2) {
    return "process-row process-row-03";
  }

  return "process-row process-row-04";
}

function getProcessTitleColor(id: string) {
  return id === "03" || id === "04" ? "#ffffff" : "#181818";
}

function getProcessDescriptionColor(id: string, defaultColor: string) {
  if (id === "04") {
    return "#e0e0e0";
  }

  if (id === "03") {
    return "#ffffff";
  }

  return defaultColor;
}

function ProcessStepIcon({ id }: { id: string }) {
  const stroke = id === "03" || id === "04" ? "#ffffff" : "#181818";

  if (id === "01") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#4FA1FF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20l4-1 10-10a2.2 2.2 0 0 0-3.1-3.1L4.9 15.8 4 20z" />
        <path d="M13.7 6.3l4 4" />
      </svg>
    );
  }

  if (id === "02") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20c-4.2 0-7-2.8-7-7 0-4.7 3.4-8.4 7-9 3.6.6 7 4.3 7 9 0 4.2-2.8 7-7 7z" />
        <path d="M12 4v16" />
        <path d="M7 11c2.5 0 4.5 1.6 5 4" />
        <path d="M17 11c-2.5 0-4.5 1.6-5 4" />
      </svg>
    );
  }

  if (id === "03") {
    return (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#ffffff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
        <path d="M10 9l5 3-5 3V9z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#BBF451" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
      <path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
    </svg>
  );
}

/* ─── Sub-components for Works section ─── */

function WorkTextCard({ item, index }: { item: HomeContent["works"][0]; index: number }) {
  return (
    <div className="relative flex min-h-[340px] flex-1 flex-col justify-between overflow-hidden rounded-[24px] border border-black/[0.03] bg-white p-6 md:min-h-[445px] md:basis-[58%] md:p-8">
      <div className="pointer-events-none absolute bottom-2 right-2 select-none text-[132px] font-bold leading-none text-black/[0.035] md:bottom-3 md:right-3 md:text-[176px]">0{index + 1}</div>

      <div className="relative z-10 flex flex-col gap-4">
        <h3 className="text-[34px] font-semibold leading-[1.03] tracking-[-0.02em] md:text-[46px]" style={{ fontFamily: '"Aileron", sans-serif' }}>
          {item.title}
        </h3>

        <p className="max-w-[58ch] text-[16px] leading-7 text-[#686868]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={`${item.id}-${tag}`} className="case-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-6">
        {item.active && item.href ? (
          <Link href={item.href} className="case-cta w-fit">
            <CaseCtaLabel label={item.ctaLabel} />
          </Link>
        ) : (
          <span className="case-cta-disabled w-fit" aria-disabled="true">
            <CaseCtaLabel label={item.ctaLabel} />
          </span>
        )}
      </div>
    </div>
  );
}

function WorkImageCard({ item }: { item: HomeContent["works"][0] }) {
  return (
    <div className="group relative flex-1 overflow-hidden rounded-[24px] border border-black/[0.03] bg-white p-2 md:basis-[42%] md:p-2.5">
      <div className="h-full overflow-hidden rounded-[20px] bg-[#f2f2f2]">
        <Image
          src={item.image}
          alt={item.title}
          width={1600}
          height={1200}
          sizes="(max-width: 809px) 100vw, (max-width: 1439px) 50vw, 780px"
          className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          unoptimized={isSvgUrl(item.image)}
        />
      </div>
    </div>
  );
}

function CaseCtaLabel({ label }: { label: string }) {
  return (
    <>
      <span>{label}</span>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="case-cta-icon">
        <path d="M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}

function RollingLinkText({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <span className="relative inline-flex h-6 overflow-hidden">
      <span className={`transition-transform duration-300 group-hover:-translate-y-6 ${light ? "text-white" : "text-[#181818]"}`}>
        <span className="block">{text}</span>
        <span className="block">{text}</span>
      </span>
    </span>
  );
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

function getHeroPhrases(highlight: string, support: string) {
  const phrases = [highlight, support].filter((value): value is string => Boolean(value?.trim()));
  return phrases.length > 0 ? phrases : [support];
}

function isSvgUrl(url: string) {
  return url.split("?")[0]?.toLowerCase().endsWith(".svg");
}
