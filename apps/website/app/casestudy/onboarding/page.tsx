import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, Divider, Eyebrow, Section } from "@packages/ui";
import { ScrollSpyToc } from "@/components/case-study/scroll-spy-toc";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { CaseStudyFooter } from "@/components/case-study/case-study-footer";
import { CaseFigurePlaceholder } from "@/components/case-study/case-figure-placeholder";
import { CaseSection } from "@/components/case-study/case-section";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { HeroCard } from "@/components/case-study/hero-card";
import { SubCard } from "@/components/case-study/sub-card";

export const metadata: Metadata = {
  title: "HRMS Candidate Onboarding Redesign — Timelabs | Rishabh Choudhary",
  description:
    "How I rebuilt a digital candidate onboarding flow from an admin-panel nobody used into a self-service guided experience candidates could actually complete on their own.",
};

const toc = [
  { id: "snapshot", label: "Snapshot" },
  { id: "problem", label: "The problem" },
  { id: "what-i-fixed", label: "What I had to fix" },
  { id: "discovery", label: "Discovery" },
  { id: "redesign", label: "The redesign" },
  { id: "process", label: "How I worked through it" },
  { id: "outcome", label: "Where it landed" },
];

export default function OnboardingCaseStudyPage() {
  return (
    <>
      <ScrollProgressBar />

      <Section className="pb-8 pt-12 md:pb-10 md:pt-16">
        <Container>
          <Link href="/" className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
            ← Back to Home
          </Link>

          <div id="snapshot" className="mt-5 scroll-mt-28">
            <HeroCard
              title="Rebuilding digital candidate onboarding for HRMS, from old to new"
              meta={[
                { title: "Role", value: "UX Designer (sole designer)" },
                { title: "Company", value: "Timelabs · 2024–2025" },
                { title: "Timeline", value: "~2–3 weeks design, then build with engineering" },
              ]}
              footer={
                <CaseFigurePlaceholder
                  description="redesigned onboarding home — welcome, deadline, days left, % complete, clear step list"
                  caption="The redesigned onboarding home — you always know where you are and what's next."
                />
              }
            >
              <p className="content-prose">
                Timelabs had a digital candidate onboarding flow. Almost nobody used it.
              </p>
              <p className="content-prose mt-3">
                Candidates found it confusing, so HR ran onboarding manually — defeating the whole point of a digital flow. I rebuilt it into a clear, guided, self-service experience where candidates always know where they are, what&apos;s done, and what&apos;s next.
              </p>
              <p className="content-prose mt-3">
                It shipped, and onboarding got faster. HR went from <em>doing</em> the work to <em>approving</em> it.
              </p>
            </HeroCard>
          </div>
        </Container>
      </Section>

      <Section className="py-2 md:py-4">
        <Container>
          <div className="grid gap-5 md:grid-cols-[220px_minmax(0,860px)] md:gap-10">
            <aside className="md:sticky md:top-28 md:h-fit">
              <Eyebrow className="md:mb-3">On this page</Eyebrow>
              <ScrollSpyToc items={toc} />
            </aside>

            <article className="space-y-0">

              <CaseSection id="problem" heading="The problem: a digital flow nobody used">
                <p className="content-prose">
                  The onboarding flow already existed. It just didn&apos;t work as an experience.
                </p>
                <p className="content-prose mt-4">
                  It was built like an <strong>admin panel</strong> — tasks in tables, dense forms, manual document uploads. For a new hire on day one, it was confusing. They couldn&apos;t tell:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li>Where they were in the process</li>
                  <li>What was done</li>
                  <li>What was still pending</li>
                  <li>What to do next</li>
                </ul>
                <p className="content-prose mt-4">
                  So candidates avoided it. And when candidates don&apos;t self-serve, the work doesn&apos;t disappear — it lands on HR, who completed onboarding by hand for every new hire. A digital product that created manual work.
                </p>
                <CaseFigurePlaceholder
                  description="old admin-panel onboarding — task-table dashboard and a dense form screen"
                  caption="The old flow — tables, dense forms, and no sense of progress."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="what-i-fixed" heading="What I had to fix (and what I didn't)">
                <p className="content-prose">
                  The capabilities were already there. Mobile and email verification, document upload, document parsing — all of it existed.
                </p>
                <p className="content-prose mt-4">
                  <strong>The features weren&apos;t the problem. The experience was.</strong>
                </p>
                <p className="content-prose mt-4">
                  So this was never about adding features. It was about answering one question on every screen: <em>where am I, and what happens next?</em>
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="discovery" heading="Discovery: learning from the best onboarding flows">
                <p className="content-prose">
                  There was no research budget — this was requirements-driven. So I built my evidence base from references.
                </p>
                <p className="content-prose mt-4">
                  I studied how mature products handle account setup, verification, and documents — Zoho, Gusto, and others. How they show progress, handle verification, manage uploads, and close out completion. That became my playbook for what &ldquo;good&rdquo; looked like.
                </p>
                <CaseFigurePlaceholder
                  description="inspiration board — collected references from Zoho, Gusto, and similar products"
                  caption="References, not research — studying how mature products guide people through setup."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="redesign" heading="The redesign: from admin panel to guided journey">
                <p className="content-prose">
                  I rebuilt onboarding around two ideas — clarity and self-service.
                </p>
                <div className="mt-5 space-y-4">
                  <SubCard title="Always know where you stand">
                    <p className="content-prose">
                      A persistent progress tracker — &ldquo;X of 12 completed,&rdquo; a percentage, the deadline, days left. Every step shows its status: done, pending, or next.
                    </p>
                  </SubCard>
                  <SubCard title="One clear path">
                    <p className="content-prose">
                      The dense forms became a guided, step-by-step flow: verification → personal info → documents → policies → orientation → review &amp; sign. Each step is one focused task, not a wall of fields.
                    </p>
                  </SubCard>
                  <SubCard title="Self-service by default">
                    <p className="content-prose">
                      Everything HR used to do by hand, the candidate now does — verify, fill, upload. HR&apos;s job shrank to a final approval.
                    </p>
                  </SubCard>
                  <SubCard title="Small wins along the way">
                    <p className="content-prose">
                      Completion moments (&ldquo;Good Job Filling Verification&rdquo;) keep momentum and make a long process feel doable.
                    </p>
                  </SubCard>
                </div>
                <CaseFigurePlaceholder
                  description="the progress system — step list and progress tracker, with status and % always visible"
                  caption="The core fix — you always know where you are and what's next."
                />
                <CaseFigurePlaceholder
                  description="a key step — the document-upload step with Aadhar/PAN parsing"
                  caption="Same capabilities as before — now one clear step at a time."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="process" heading="How I worked through it">
                <p className="content-prose">
                  As the sole designer, I brainstormed and iterated over ~2–3 weeks, working from the outside in:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li><strong>Layout first</strong> — the onboarding home and overall structure; exploring the visual language and step model</li>
                  <li><strong>Then components</strong> — the verification/OTP cards, every state mapped (empty, error, re-enter, success)</li>
                  <li><strong>Then details</strong> — text fields, and the full range of upload states (uploading, reupload, file too large, unsupported, error)</li>
                  <li><strong>Then the refined flow</strong> — pulling it together with parsing, per-section progress, and completion moments</li>
                </ul>
                <CaseFigurePlaceholder
                  description="iteration boards side by side — layout explorations → verification cards → field/upload states"
                  caption="Layout, then components, then states — working from the structure inward."
                />
                <p className="content-prose mt-4">
                  Then I partnered with developers to build it.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="outcome" heading="Where it landed">
                <p className="content-prose">
                  The redesign shipped, and onboarding got faster.
                </p>
                <p className="content-prose mt-4">
                  The biggest shift wasn&apos;t visual — it was <em>who does the work</em>. Candidates could finally self-serve, so HR moved from <strong>completing</strong> onboarding to <strong>approving</strong> it. The digital flow started doing the job it was built for.
                </p>
                <CaseFigurePlaceholder
                  description="the 'Good Job Filling' completion celebration or completed-onboarding state"
                  caption="Onboarding that candidates actually finish — on their own."
                />
              </CaseSection>

            </article>
          </div>
        </Container>
      </Section>

      <CaseStudyNav current="onboarding" />
      <CaseStudyFooter />
    </>
  );
}
