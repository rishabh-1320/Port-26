"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card, Container, Section } from "@packages/ui";
import type { HomeContent, ProcessStep } from "@/lib/types";

type HomeSectionsProps = {
  content: HomeContent;
};

const HERO_ROTATION_MS = 3600;
const HERO_STAGGER_MS = 22;

export function HomeSections({ content }: HomeSectionsProps) {
  const heroPhrases = useMemo(() => {
    const phrases = [content.hero.highlight, content.hero.support].filter((value): value is string => Boolean(value?.trim()));
    return phrases.length > 0 ? phrases : [content.hero.support];
  }, [content.hero.highlight, content.hero.support]);

  return (
    <>
      {/* ─── HERO ─── */}
      <Section className="pb-0 pt-14 md:pt-20">
        <Container className="max-w-[1600px]">
          <style>{`
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.08); }
              66% { transform: translate(-20px, 20px) scale(0.94); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob { animation: blob 7s infinite; }
            .animation-delay-2000 { animation-delay: 2s; }
            .animation-delay-4000 { animation-delay: 4s; }
          `}</style>

          <div className="relative z-10 flex flex-col items-center gap-8 text-center">
            <div className="relative z-20 flex max-w-[900px] flex-col items-center gap-3">
              <h1
                className="text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.02em] text-[#181818] md:text-[80px] md:leading-[88px]"
                style={{ fontFamily: '"Aileron", sans-serif' }}
              >
                <span className="block">{content.hero.lead}</span>
                <HeroRotator phrases={heroPhrases} />
              </h1>

              <p
                className="mt-5 max-w-[92%] text-lg leading-7 text-[#5f5f5f] md:max-w-[44%] md:leading-[30px]"
                style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}
              >
                {content.hero.intro}
              </p>
            </div>

            <div className="relative z-10 mt-4 flex w-full max-w-[1000px] justify-center">
              <div className="pointer-events-none absolute inset-x-0 -top-20 -z-10 flex h-[600px] w-full justify-center opacity-60">
                <div className="animate-blob absolute left-1/4 top-10 h-[350px] w-[350px] rounded-full bg-[#BBF451] mix-blend-multiply blur-[100px]" />
                <div className="animate-blob animation-delay-2000 absolute right-1/3 top-0 h-[350px] w-[350px] rounded-full bg-[#4FA1FF] mix-blend-multiply blur-[100px]" />
                <div className="animate-blob animation-delay-4000 absolute bottom-10 left-1/3 h-[400px] w-[400px] rounded-full bg-[#FFF89A] mix-blend-multiply blur-[100px]" />
              </div>

              <div className="relative w-full overflow-hidden rounded-t-[24px] border border-white/60 bg-[#18181814] p-2 pb-0 backdrop-blur-[10px]">
                <img
                  src={content.hero.image}
                  alt="Dashboard Graphic"
                  className="pointer-events-none h-auto w-full select-none rounded-t-[16px] object-cover object-top"
                  loading="eager"
                />
              </div>

              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-[240px]"
                style={{
                  mask: "linear-gradient(transparent 0%, #000 100%)",
                  WebkitMask: "linear-gradient(transparent 0%, #000 100%)",
                  backgroundColor: "white"
                }}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── MY DESIGN PROCESS ─── */}
      <Section className="py-20 md:py-24">
        <Container className="max-w-[1600px]">
          <div className="mx-auto mb-14 flex max-w-[640px] flex-col items-center space-y-4 text-center">
            <span className="section-eyebrow">How do I work?</span>
            <h2
              className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl"
              style={{ fontFamily: '"Aileron", sans-serif' }}
            >
              My Design <span className="text-[#8e8e8e]">Process</span>
            </h2>
            <p className="max-w-[560px] text-xl leading-8 text-[#181818]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
              {content.processIntro}
            </p>
          </div>

          <div className="mx-auto w-full max-w-[1066px]">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
                <div className="mx-auto flex h-full w-full max-w-[1000px] justify-between px-1">
                  {content.processSteps.map((step) => (
                    <div key={`guide-${step.id}`} className="flex h-full w-px flex-col items-center">
                      <span className="text-sm tracking-[-0.01em] text-[#d8d8d8]">{step.id}</span>
                      <span className="mt-2 h-full w-px bg-gradient-to-b from-[#e0e0e0] via-[#e0e0e0]/70 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-6 md:gap-7 lg:gap-8">
                <div className="flex flex-col gap-6 md:gap-7 lg:hidden">
                  {content.processSteps.map((step, index) => (
                    <article
                      key={step.id}
                      className="relative w-full max-w-[600px] self-center overflow-hidden rounded-2xl border border-white/70 p-4 opacity-0 shadow-[0_26px_44px_-30px_rgba(24,24,24,0.45),0_10px_18px_-14px_rgba(24,24,24,0.24)] motion-safe:animate-fade-up md:p-5"
                      style={{
                        backgroundColor: step.bgColor,
                        color: step.textColor,
                        animationDelay: `${index * 80}ms`,
                        animationFillMode: "forwards"
                      }}
                    >
                      <ProcessStepCardContent step={step} />
                    </article>
                  ))}
                </div>

                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="flex flex-col gap-8">
                    {content.processSteps.slice(0, 2).map((step, index) => (
                      <article
                        key={step.id}
                        className="relative w-full overflow-hidden rounded-2xl border border-white/70 p-5 opacity-0 shadow-[0_26px_44px_-30px_rgba(24,24,24,0.45),0_10px_18px_-14px_rgba(24,24,24,0.24)] motion-safe:animate-fade-up"
                        style={{
                          backgroundColor: step.bgColor,
                          color: step.textColor,
                          animationDelay: `${index * 80}ms`,
                          animationFillMode: "forwards"
                        }}
                      >
                        <ProcessStepCardContent step={step} />
                      </article>
                    ))}
                  </div>

                  <div className="flex flex-col gap-8">
                    {content.processSteps.slice(2, 4).map((step, index) => (
                      <article
                        key={step.id}
                        className="relative w-full overflow-hidden rounded-2xl border border-white/70 p-5 opacity-0 shadow-[0_26px_44px_-30px_rgba(24,24,24,0.45),0_10px_18px_-14px_rgba(24,24,24,0.24)] motion-safe:animate-fade-up"
                        style={{
                          backgroundColor: step.bgColor,
                          color: step.textColor,
                          animationDelay: `${(index + 2) * 80}ms`,
                          animationFillMode: "forwards"
                        }}
                      >
                        <ProcessStepCardContent step={step} />
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── WORKS / MY BEST WORK ─── */}
      <Section id="features" className="bg-[#f5f5f5] py-16 md:py-20">
        <Container className="max-w-[1600px]">
          <div className="mx-auto mb-16 flex max-w-[640px] flex-col items-center space-y-4 text-center">
            <span className="section-eyebrow">My Best Work</span>
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

          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-12 lg:gap-[clamp(72px,8vh,120px)]">
            {content.works.map((item, index) => (
              <div
                key={item.id}
                className="sticky"
                style={{
                  top: `clamp(${84 + index * 10}px, calc(4vw + ${72 + index * 6}px), ${112 + index * 18}px)`,
                  zIndex: 20 + index
                }}
              >
                <div className="flex w-full flex-col items-stretch gap-4 rounded-[22px] border border-black/[0.06] bg-[#fafafa] p-3 shadow-[0_10px_24px_-22px_rgba(24,24,24,0.35)] md:flex-row">
                  {index % 2 === 0 ? (
                    <>
                      <WorkTextCard item={item} index={index} />
                      <WorkImageCard item={item} />
                    </>
                  ) : (
                    <>
                      <WorkImageCard item={item} />
                      <WorkTextCard item={item} index={index} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── AI EXPLORATION ─── */}
      <Section id="ai-exploration" className="py-16 md:py-20">
        <Container className="max-w-[1600px]">
          <div className="mx-auto mb-16 flex max-w-[600px] flex-col items-center space-y-4 text-center">
            <span className="section-eyebrow">AI Explorations</span>
            <h2
              className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl"
              style={{ fontFamily: '"Aileron", sans-serif' }}
            >
              Side <span className="text-[#8e8e8e]">Projects</span>
            </h2>
          </div>

          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 md:flex-row">
            {content.aiExplorations.map((item) => (
              <div key={item.id} className="flex-1 overflow-hidden rounded-2xl bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={`${item.id}-${tag}`} className="rounded-full border border-black/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#8e8e8e]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-semibold tracking-[-0.02em]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-base leading-7 text-[#8e8e8e]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
                    {item.description}
                  </p>

                  {item.active && item.href ? (
                    <Link href={item.href} className="mt-2 w-fit">
                      <span className="framer-btn-primary">{item.ctaLabel}</span>
                    </Link>
                  ) : (
                    <span className="framer-btn-neutral mt-2 w-fit" aria-disabled="true">
                      {item.ctaLabel}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ─── MEET RISHABH / ABOUT ─── */}
      <Section id="about" className="py-16 md:py-20">
        <Container>
          <div className="mx-auto mb-16 flex max-w-[600px] flex-col items-center space-y-4 text-center">
            <span className="section-eyebrow">{content.coursesTitle}</span>
            <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl" style={{ fontFamily: '"Aileron", sans-serif' }}>
              Meet <span className="text-[#8e8e8e]">Rishabh!</span>
            </h2>
            <p className="max-w-[480px] text-[var(--color-muted)] md:text-lg">{content.coursesIntro}</p>
          </div>

          <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-4 md:flex-row">
            {content.experiences.map((item) => (
              <Card key={item.company} className="flex flex-1 flex-col gap-4 rounded-2xl bg-white p-6">
                <div className="flex items-center gap-2 text-sm leading-6 text-[#8e8e8e]" style={{ fontFamily: '"Aileron", sans-serif' }}>
                  <span>{item.periodStart}</span>
                  <span aria-hidden="true">-</span>
                  <span>{item.periodEnd}</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="h-10 w-10 overflow-hidden rounded-[10px] bg-[#f5f5f5]">
                    <img src={item.logoSrc} alt={`${item.company} logo`} className="h-full w-full object-cover" loading="lazy" />
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
                  className="inline-flex w-fit items-center rounded-2xl bg-[#f5f5f5] px-4 py-2 text-sm font-medium tracking-[-0.01em] text-[#181818] transition-colors duration-200 hover:bg-[#ececec]"
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
      <Section id="gallery" className="bg-[#f5f5f5] py-16 md:py-20">
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
                  <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              {content.gallery.slice(4, 7).map((item, i) => (
                <div key={`g2-${i}`} className="aspect-square w-[240px] shrink-0 overflow-hidden rounded-full">
                  <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              {content.gallery.slice(7, 8).map((item, i) => (
                <div key={`g3-${i}`} className="aspect-square w-[240px] overflow-hidden rounded-full">
                  <img src={item.src} alt={item.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ─── FOOTER / CONTACT ─── */}
      <Section className="bg-[#181818] py-20 md:py-20">
        <Container className="max-w-[1000px]">
          <div className="flex flex-col items-center gap-20">
            <div className="flex w-full max-w-[800px] flex-col items-center gap-10 text-center">
              <div className="h-[112px] w-[112px] overflow-hidden rounded-full">
                <img src={content.logo} alt="Design Port logo" className="h-full w-full object-cover" loading="lazy" />
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

function HeroRotator({ phrases }: { phrases: string[] }) {
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0] || "");
  const [nextPhrase, setNextPhrase] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setCurrentPhrase(phrases[0] || "");
    setNextPhrase(null);
    setIsTransitioning(false);
  }, [phrases]);

  useEffect(() => {
    if (phrases.length < 2) {
      return;
    }

    let transitionTimeoutId: number | null = null;
    const intervalId = window.setInterval(() => {
      setCurrentPhrase((previousPhrase) => {
        const currentIndex = Math.max(phrases.indexOf(previousPhrase), 0);
        const upcomingPhrase = phrases[(currentIndex + 1) % phrases.length];

        setNextPhrase(upcomingPhrase);
        setIsTransitioning(true);

        if (transitionTimeoutId !== null) {
          window.clearTimeout(transitionTimeoutId);
        }

        transitionTimeoutId = window.setTimeout(() => {
          setCurrentPhrase(upcomingPhrase);
          setNextPhrase(null);
          setIsTransitioning(false);
        }, 560);

        return previousPhrase;
      });
    }, HERO_ROTATION_MS);

    return () => {
      window.clearInterval(intervalId);
      if (transitionTimeoutId !== null) {
        window.clearTimeout(transitionTimeoutId);
      }
    };
  }, [phrases]);

  return (
    <span className={`hero-rotator ${isTransitioning ? "is-transitioning" : ""}`} aria-live="polite">
      <span className="sr-only">{currentPhrase}</span>
      <HeroLine text={currentPhrase} variant="current" />
      {nextPhrase && <HeroLine text={nextPhrase} variant="next" />}
    </span>
  );
}

function ProcessStepCardContent({ step }: { step: ProcessStep }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-[10px] text-sm font-semibold"
            style={{ backgroundColor: step.textColor === "#ffffff" ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.08)" }}
          >
            {step.id}
          </div>
          <h3 className="text-xl font-semibold leading-7 tracking-[-0.02em] md:text-[22px]" style={{ fontFamily: '"Aileron", sans-serif' }}>
            {step.title}
          </h3>
        </div>

        <p className="text-base leading-6 md:text-[18px]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: "-0.01em", opacity: step.textColor === "#ffffff" ? 0.9 : 0.88 }}>
          {step.description}
        </p>
      </div>
    </>
  );
}

function HeroLine({ text, variant }: { text: string; variant: "current" | "next" }) {
  const words = text.trim().split(/\s+/);
  let charOffset = 0;

  return (
    <span className={`hero-line hero-line-${variant}`} aria-hidden="true">
      {words.map((word, wordIndex) => {
        const currentOffset = charOffset;
        charOffset += word.length + 1;

        return (
          <span key={`${text}-word-${wordIndex}`} className="hero-word">
            {Array.from(word).map((character, index) => (
              <span key={`${text}-${wordIndex}-${index}`} className="hero-char" style={{ transitionDelay: `${(currentOffset + index) * HERO_STAGGER_MS}ms` }}>
                {character}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

/* ─── Sub-components for Works section ─── */

function WorkTextCard({ item, index }: { item: HomeContent["works"][0]; index: number }) {
  return (
    <div className="relative flex min-h-[400px] flex-1 flex-col justify-between overflow-hidden rounded-2xl bg-white p-7 md:p-8">
      <div className="pointer-events-none absolute right-0 top-0 -mr-3 select-none text-[180px] font-bold leading-none text-black/[0.03]">0{index + 1}</div>

      <div className="relative z-10 flex flex-col gap-3.5">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={`${item.id}-${tag}`} className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#8e8e8e]">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-[30px] font-semibold leading-[1.04] tracking-[-0.02em] md:text-[44px]" style={{ fontFamily: '"Aileron", sans-serif' }}>
          {item.title}
        </h3>
        <p className="max-w-[88%] text-[15px] leading-6 text-[#7f7f7f]" style={{ fontFamily: '"Aileron", sans-serif', letterSpacing: '-0.01em' }}>
          {item.description}
        </p>
      </div>

      <div className="relative z-10 mt-6">
        {item.active && item.href ? (
          <Link href={item.href} className="w-fit">
            <span className="framer-btn-primary">{item.ctaLabel}</span>
          </Link>
        ) : (
          <span className="framer-btn-neutral w-fit" aria-disabled="true">
            {item.ctaLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function WorkImageCard({ item }: { item: HomeContent["works"][0] }) {
  return (
    <div className="group relative flex-1 overflow-hidden rounded-2xl bg-white p-2 md:p-2.5">
      <div className="h-full overflow-hidden rounded-[18px] bg-[#f2f2f2]">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    </div>
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
