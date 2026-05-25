import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow, Section } from "@packages/ui";
import { homeContent } from "@/lib/site-content";

const CASE_STUDIES = [
  {
    id: "chestnut",
    workId: "work-chestnut",
    title: "Standardizing Chestnut",
    subtitle: "Insurance SaaS · Design system in code",
    year: "2025–2026",
    tags: ["Product", "Design System"],
    href: "/casestudy/chestnut",
  },
  {
    id: "dashboard",
    workId: "work-hrms",
    title: "HR Analytics Dashboard",
    subtitle: "Attendance & workforce insights for enterprise",
    year: "2023–2024",
    tags: ["Data", "Enterprise"],
    href: "/casestudy/dashboard",
  },
  {
    id: "onboarding",
    workId: "work-onboarding",
    title: "HRMS Candidate Onboarding",
    subtitle: "From admin-panel nobody used to self-service flow",
    year: "2024–2025",
    tags: ["UX", "Enterprise"],
    href: "/casestudy/onboarding",
  },
  {
    id: "design-system",
    workId: "work-design-system",
    title: "Arksaber Design System",
    subtitle: "Whitelabel design system, Figma to code",
    year: "",
    tags: ["Design System", "Code"],
    href: "/casestudy/design-system",
  },
] as const;

export function CaseStudyNav({ current }: { current: string }) {
  const others = CASE_STUDIES.filter((cs) => cs.id !== current);

  return (
    <Section className="border-t border-[var(--border-default)] bg-[var(--surface-soft)] py-12 md:py-16">
      <Container>
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <Eyebrow>More case studies</Eyebrow>
          <span className="text-eyebrow font-medium text-[var(--text-muted)]">Swipe →</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
          {others.map((cs) => {
            const workCard = homeContent.works.find((w) => w.id === cs.workId);
            const image = workCard?.image;

            return (
              <Link
                key={cs.id}
                href={cs.href}
                className="group flex-none snap-start w-80 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-white transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--text-primary)] hover:shadow-card-hover"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f0f0f0]">
                  {image && (
                    <Image
                      src={image}
                      alt={cs.title}
                      fill
                      sizes="288px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[15px] font-semibold leading-snug tracking-tight text-[var(--text-primary)]">
                      {cs.title}
                    </h3>
                    <span className="mt-0.5 flex-none text-base text-[var(--text-muted)] transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-[var(--text-primary)]">
                      →
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">{cs.subtitle}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--color-border)] bg-[#f5f5f5] px-2 py-0.5 text-[11px] font-medium text-[var(--color-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {cs.year && <p className="text-[11px] text-[var(--color-muted)]">{cs.year}</p>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
