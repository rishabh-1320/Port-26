import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button, Card, Container, Section } from "@packages/ui";
import { hrmsCaseStudy, homeContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "HRMS Dashboard Case Study",
  description: "Case study for the HRMS Attendance Dashboard designed by Rishabh Choudhary."
};

export default function HrmsDashboardPage() {
  return (
    <>
      <Section className="pb-8 pt-12 md:pb-10 md:pt-16">
        <Container>
          <Link href="/" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
            Back to Home
          </Link>

          <Card className="mt-5 border-none bg-white/85 p-7 shadow-[0_24px_70px_-42px_rgba(9,18,13,0.45)] md:p-10">
            <p className="section-eyebrow">Project Overview</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-6xl">{hrmsCaseStudy.title}</h1>
            <p className="mt-4 max-w-3xl text-[var(--color-muted)] md:text-lg">{hrmsCaseStudy.subtitle}</p>

            <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
              <div>
                <p className="font-semibold text-[var(--color-muted)]">Role</p>
                <p className="mt-1 text-[var(--color-text)]">{hrmsCaseStudy.role}</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-muted)]">Duration</p>
                <p className="mt-1 text-[var(--color-text)]">{hrmsCaseStudy.duration}</p>
              </div>
            </div>

            <p className="content-prose mt-6 max-w-3xl">{hrmsCaseStudy.overview}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`mailto:${homeContent.email}`}>
                <Button>Contact Me</Button>
              </Link>
              <Link href={homeContent.resumeUrl} target="_blank" rel="noreferrer">
                <Button variant="ghost">Download Resume</Button>
              </Link>
            </div>
          </Card>
        </Container>
      </Section>

      <Section className="py-6 md:py-8">
        <Container className="space-y-5">
          {hrmsCaseStudy.steps.map((step, index) => (
            <Card key={step.title} className="overflow-hidden bg-white/85 p-0">
              <div className="grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
                <div className="p-6 md:p-8">
                  <p className="section-eyebrow">Step {index + 1}</p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{step.title}</h2>
                  <p className="content-prose mt-4">{step.description}</p>
                </div>
                <div className="relative min-h-64 w-full">
                  <Image src={step.image} alt={step.alt} fill sizes="(max-width: 809px) 100vw, 40vw" className="object-cover" />
                </div>
              </div>
            </Card>
          ))}
        </Container>
      </Section>

      <Section className="py-10">
        <Container>
          <Card className="bg-white/80 text-center">
            <p className="text-2xl font-semibold tracking-tight">{hrmsCaseStudy.thanksNote}</p>
            <p className="mt-2 text-[var(--color-muted)]">Ready to work with me?</p>
            <div className="mt-5">
              <Link href={`mailto:${homeContent.email}`}>
                <Button>Send a mail</Button>
              </Link>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
