import Image from "next/image";
import { Container, Section } from "@packages/ui";
import { HeroShaderCanvas } from "@/components/hero-shader-canvas";
import { HeroMockupWrapper } from "@/components/hero-mockup-wrapper";
import { GsapReveal } from "@/components/gsap-reveal";
import type { HomeContent } from "@/lib/types";

export function HeroSection({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <Section className="relative pb-0 pt-[40px] md:pt-[64px] xl:pt-[80px]">
      <div className="hero-gradient-field">
        <HeroShaderCanvas />
      </div>

      <Container className="relative z-10 max-w-[1600px]">
        <div className="relative z-10 flex flex-col items-center gap-10 text-center md:gap-16 xl:gap-28">
          <GsapReveal preset="fadeUp" delay={0.1} className="relative z-20 flex w-full max-w-[900px] flex-col items-center gap-6">
            <h1 className="text-balance text-[38px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#181818] md:text-[58px] xl:text-[72px]">
              {hero.h1}
            </h1>

            <p
              className="max-w-[640px] text-[18px] leading-[28px] text-[#5f5f5f] md:text-[20px] md:leading-[30px]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {hero.subLine}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2">
              {hero.metrics.map((metric) => (
                <span key={metric} className="text-sm font-semibold tracking-[-0.01em] text-[#181818]">
                  {metric}
                </span>
              ))}
            </div>
          </GsapReveal>

          <GsapReveal preset="scaleUp" delay={0.35} className="relative z-10 w-full">
            <HeroMockupWrapper>
              <div className="relative mx-auto w-full max-w-[1000px] overflow-hidden rounded-t-[24px] border border-white/60 bg-[#18181814] p-2 pb-0 backdrop-blur-[10px]">
                <Image
                  src={hero.image}
                  alt="Product UI screenshot"
                  width={2290}
                  height={1474}
                  priority
                  sizes="(max-width: 809px) calc(100vw - 32px), (max-width: 1439px) min(1000px, calc(100vw - 32px)), 1000px"
                  className="pointer-events-none h-auto w-full select-none rounded-t-[16px] object-cover object-top"
                />
              </div>
              <div className="hero-mockup-mask pointer-events-none absolute bottom-0 left-1/2 z-20 w-full max-w-[1000px] -translate-x-1/2" />
            </HeroMockupWrapper>
          </GsapReveal>
        </div>
      </Container>
    </Section>
  );
}
