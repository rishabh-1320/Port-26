import type { Metadata } from "next";
import Link from "next/link";
import { Container, Divider, Eyebrow, Section } from "@packages/ui";
import { ScrollSpyToc } from "@/components/case-study/scroll-spy-toc";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { CaseStudyFooter } from "@/components/case-study/case-study-footer";
import { CaseFigurePlaceholder } from "@/components/case-study/case-figure-placeholder";
import { CaseSection } from "@/components/case-study/case-section";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { HeroCard } from "@/components/case-study/hero-card";
import { MetricCard } from "@/components/case-study/metric-card";
import { GsapReveal } from "@/components/gsap-reveal";
import { chestnutCaseStudy } from "@/lib/chestnut-case-study";

export const metadata: Metadata = {
  title: chestnutCaseStudy.metadataTitle,
  description: chestnutCaseStudy.metadataDescription,
};

export default function ChestnutCaseStudyPage() {
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
              title={chestnutCaseStudy.title}
              meta={[
                { title: "Role", value: chestnutCaseStudy.role },
                { title: "Company", value: `${chestnutCaseStudy.company} · ${chestnutCaseStudy.year}` },
                { title: "Tools", value: chestnutCaseStudy.tools },
              ]}
              footer={
                <CaseFigurePlaceholder
                  description="Chestnut redesigned screens + the Bonsai design system"
                  caption="The redesigned product and the design system that standardizes it."
                />
              }
            >
              <p className="content-prose">
                <strong>Chestnut is a producer performance management platform for the insurance world.</strong> It worked — but it was inconsistent and hard to use. The same action looked different on every screen, and simple things felt complicated.
              </p>
              <p className="content-prose mt-3">
                I audited the entire product, catalogued every inconsistency, and rebuilt it into one standardized system of components and patterns. Then I took it further: instead of handing developers Figma files, I built the design system in code.
              </p>
              <p className="content-prose mt-3">
                <strong>The result:</strong> 30–40% fewer UX inconsistencies, and 20–25% less design-to-dev rework.
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
              <ScrollSpyToc items={chestnutCaseStudy.toc} />
            </aside>

            <article className="space-y-0">

              {/* ─── PART A ─── */}

              <CaseSection id="what-chestnut-is" heading="First, what Chestnut actually is">
                <p className="content-prose">
                  <strong>Insurance gets sold through middlemen.</strong> An insurance company rarely sells a policy directly to you. They sell through carriers, agencies, and IMOs.
                </p>
                <p className="content-prose mt-4">
                  Those middlemen hire producers (agents) who sell the policies to real customers.
                </p>
                <p className="content-prose mt-4">
                  <strong>Chestnut is the software those middlemen use to manage their producers</strong> — tracking compliance, payouts, and performance. Day-to-day, it&apos;s used by admins and managers, not the agents themselves.
                </p>
                <p className="content-prose mt-4">
                  The terminology — carriers, producers, IMOs — is the language the clients use. I had to learn it to design for it.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="problem" heading="The problem: a product at war with itself">
                <p className="content-prose">
                  <strong>Chestnut wasn&apos;t broken. It wasn&apos;t outdated. It was inconsistent.</strong>
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li>The same button showed up in five different styles</li>
                  <li>Tables were designed a dozen different ways</li>
                  <li>The same action — applying a filter, setting a condition — behaved differently depending on where you were</li>
                </ul>
                <p className="content-prose mt-4">
                  You could feel it just using the thing. Nothing was technically wrong, but nothing agreed with anything else.
                </p>
                <p className="content-prose mt-4">
                  <strong>That inconsistency is what made it hard to use.</strong> Every screen quietly asked the user to relearn it.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="audit" heading="The audit: cataloguing the chaos">
                <p className="content-prose">
                  <strong>You can&apos;t fix inconsistency you haven&apos;t measured.</strong> So I went through the entire product and documented every variation of every element.
                </p>
                <p className="content-prose mt-4">Components:</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li>Every type of button — and every version of the &ldquo;same&rdquo; button</li>
                  <li>Every table and table header — different icons, spacing, padding, sometimes a completely different element doing the same job</li>
                  <li>Every navigation pattern</li>
                </ul>
                <p className="content-prose mt-4">Then interactions:</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li>How many different ways did the product let you do the same thing — apply a filter, set a condition?</li>
                  <li>More than there should&apos;ve been. I recorded all of them.</li>
                </ul>
                <p className="content-prose mt-4">
                  <strong>By the end, the mess wasn&apos;t a feeling anymore. It was a documented list</strong> — every component and every pattern, in one place.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="unified-system" heading="The goal and the system">
                <p className="content-prose">
                  With every inconsistency catalogued, the job got clear: <strong>collapse all those variations into one standardized set of components and patterns — and make them better than the originals.</strong>
                </p>
                <p className="content-prose mt-4">
                  Not &ldquo;pick one of the five buttons.&rdquo; Design the right button, the right table, the right filter pattern — once.
                </p>
                <p className="content-prose mt-4">
                  I rebuilt the core components from the ground up — <strong>buttons, tables, headers, and their states</strong> — plus the interaction patterns that tied them together. One source of truth for how Chestnut should look and behave.
                </p>

                <h3 className="mt-8 text-h3-sm font-semibold tracking-tight md:text-h3">Shipping the system in code</h3>
                <p className="content-prose mt-3">
                  <strong>Here&apos;s where I changed how I work.</strong>
                </p>
                <p className="content-prose mt-4">
                  Normally a designer hands off Figma files and hopes the build matches. I didn&apos;t want that gap. So instead of delivering the system in Figma, I built it in code.
                </p>
                <p className="content-prose mt-4">What that looked like:</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li>Set up a <strong>Storybook</strong> to visualize every component</li>
                  <li>Built out a proper <strong>component library</strong></li>
                  <li>Chestnut&apos;s front-end was already <strong>shadcn-based</strong> — a head start, but the components weren&apos;t complete or built the way we needed</li>
                  <li>Modified them into Chestnut&apos;s own design system: <strong>Bonsai</strong></li>
                </ul>
                <p className="content-prose mt-4">
                  Once Bonsai existed, I started delivering my designs in code instead of Figma.
                </p>
                <p className="content-prose mt-4">
                  <strong>This is where AI earns its place in my workflow.</strong> Prototyping and shipping in code used to be slow — in Figma you place every frame, component, and pixel by hand. With AI, I prompt and the agent builds. It&apos;s faster. And more importantly, it closes the gap between what I design and what ships. <strong>The design system stopped being a picture of components. It became the components.</strong>
                </p>
                <CaseFigurePlaceholder
                  description="Bonsai design system / Storybook — the component library in code"
                  caption="Bonsai — Chestnut's design system, running in Storybook."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="impact" heading="The impact">
                <div className="grid gap-4 md:grid-cols-2">
                  <MetricCard value="30–40%" label="fewer UX inconsistencies across the product" />
                  <MetricCard value="20–25%" label="less design-to-dev rework — because the system shipped as code, not as a spec" />
                </div>
              </CaseSection>

              {/* ─── PART 2 CHAPTER OPENER ─── */}
              <div id="part-2" className="my-16 scroll-mt-28 md:my-24">
                <div className="mb-8 flex items-center gap-4">
                  <div className="h-px flex-1 bg-[var(--border-default)]" aria-hidden="true" />
                  <span className="text-eyebrow font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">Part 02</span>
                  <div className="h-px flex-1 bg-[var(--border-default)]" aria-hidden="true" />
                </div>

                <GsapReveal preset="fadeUp">
                  <h2 className="text-center text-[32px] font-semibold leading-[1.1] tracking-[-0.02em] md:text-[40px]">
                    Creating a complex variable — without leaving your work
                  </h2>
                </GsapReveal>

                <GsapReveal preset="fadeUp" delay={0.08}>
                  <div className="mt-8">
                    <CaseFigurePlaceholder
                      description="the trigger — Payment Logic field with the type-ahead dropdown open, '+ New variable' pinned at the bottom"
                      caption="The whole feature starts here — a 'New variable' option living inside the search the admin is already using."
                    />
                  </div>
                </GsapReveal>
              </div>

              <Divider />

              <CaseSection id="setup" heading="The setup">
                <p className="content-prose">
                  Remember what Chestnut does: it works out what insurance producers get paid.
                </p>
                <p className="content-prose mt-4">
                  Admins build that math as <strong>payment logic</strong> — a formula assembled from <strong>variables</strong>. A variable might be a policy field, a producer attribute, or a calculated value that combines several of them. Premium, agent code, policy year, a persistency rate — these are the building blocks of a payout.
                </p>
                <p className="content-prose mt-4">
                  So configuring payment logic is one of the highest-stakes things you can do in the product. <strong>Get it wrong and a producer gets paid the wrong amount — real money, at scale.</strong> The people doing it are admins who know the platform, the variables, and the insurance industry cold.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="dead-end" heading="The dead end">
                <p className="content-prose">
                  Here&apos;s the moment that broke the flow.
                </p>
                <p className="content-prose mt-4">
                  You&apos;re deep in building a payment logic. You reach for a variable — and it doesn&apos;t exist yet. Maybe it&apos;s a brand-new attribute. Maybe it&apos;s a value that combines several others.
                </p>
                <p className="content-prose mt-4">
                  In the old world, you had one option: <strong>stop, leave, and lose your work.</strong> Go to Settings → Variables, pick a type, create it, then come back and rebuild your payment logic.
                </p>
                <p className="content-prose mt-4">
                  For the most careful task in the product, the tool forced a detour at the worst possible moment.
                </p>

                <h3 className="mt-8 text-h3-sm font-semibold tracking-tight md:text-h3">The tension I was designing against</h3>
                <p className="content-prose mt-3">
                  This is what made it interesting. Two pulls, working against each other:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li><strong>Make it easier.</strong> Kill the detour. Let people create a variable right where they need it.</li>
                  <li><strong>Don&apos;t make it careless.</strong> Variable creation is risky. The name has to match the system. The logic has to be right. This is no place for a sloppy shortcut.</li>
                </ul>
                <p className="content-prose mt-4">
                  <strong>Easy entry, but a rigorous flow.</strong> That was the line to walk.
                </p>
              </CaseSection>

              <Divider />

              <CaseSection id="flow" heading="The door, and the flow behind it">
                <p className="content-prose">
                  I didn&apos;t invent a new place to go. I used the one the admin was already standing in.
                </p>
                <p className="content-prose mt-4">
                  When you build payment logic, you type a variable name and a filtered list of suggestions appears — standard type-ahead the admins use constantly. I added one thing, pinned to the bottom of that list: <strong>&ldquo;+ New variable.&rdquo;</strong>
                </p>
                <p className="content-prose mt-4">Why this, and not some big new entry point:</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-[var(--text-secondary)] marker:text-[var(--text-muted)]">
                  <li>It rides a behavior people already have — <strong>nothing new to learn</strong></li>
                  <li>It appears exactly when it&apos;s needed — mid-search, mid-thought</li>
                  <li><strong>The payment logic stays open behind it.</strong> No lost work.</li>
                </ul>
                <p className="content-prose mt-4">
                  The humble part of the feature is humble on purpose. The door is small and familiar. It&apos;s what&apos;s behind it that does the heavy lifting.
                </p>

                <CaseFigurePlaceholder
                  description="Step 1 & 2 — Create Variable modal: variable type (Custom / Expression / Analytic) then analytic type (Summation / Growth / Persistency) with plain-language examples"
                  caption="Behind the door: a guided flow, not a blank form."
                />

                <h3 className="mt-8 text-h3-sm font-semibold tracking-tight md:text-h3">A guided flow through a genuinely hard task</h3>
                <p className="content-prose mt-3">
                  Clicking &ldquo;+ New variable&rdquo; opens a stepped, guided flow — because authoring one of these is genuinely complex, and a blank form would be dangerous.
                </p>
                <div className="relative mt-6 pl-14 md:pl-16">
                  {/* connecting rail */}
                  <div
                    className="pointer-events-none absolute left-[18px] top-[18px] bottom-[18px] w-px bg-[var(--border-default)] md:left-[20px]"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col gap-4">
                    <NumberedStep n={1} title="Variable type">
                      <p className="content-prose">Custom, Expression, or Analytic.</p>
                    </NumberedStep>
                    <NumberedStep n={2} title="Analytic type">
                      <p className="content-prose">
                        Summation, Growth, or Persistency — each with a one-line, plain-English example (&ldquo;13th-month policy retention rate&rdquo;). I leaned on this the whole way: <strong>translating dense actuarial concepts into language a person can actually choose between.</strong>
                      </p>
                    </NumberedStep>
                    <NumberedStep n={3} title="Configure metrics">
                      <p className="content-prose">
                        For a persistency variable: name it, choose how persistency is measured (% of policies retained, dollar value of premium retained, recurring premium persistency…), and the type of date it keys off. Every option carries a description, so the admin isn&apos;t guessing at meaning.
                      </p>
                    </NumberedStep>
                    <NumberedStep n={4} title="Period & filters">
                      <p className="content-prose">
                        Set the baseline period, the persistency window, and optional filters — line of business, product, policy status, producer level.
                      </p>
                    </NumberedStep>
                  </div>
                </div>
                <p className="content-prose mt-4">
                  Progressive disclosure the whole way down. You never face the entire complexity at once; each step asks for one decision and explains it.
                </p>

                <CaseFigurePlaceholder
                  description="Step 3 — configure metrics for persistency, with the metric and type-of-date dropdowns and their descriptions"
                  caption="Every choice explained in plain language — actuarial concepts made selectable."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="preview" heading="The preview: seeing before you commit">
                <p className="content-prose">
                  This was my call, and it&apos;s the part I&apos;m most sure about.
                </p>
                <p className="content-prose mt-4">
                  When the stakes are this high, the admin shouldn&apos;t have to imagine the outcome — they should <strong>see it</strong>. So Step 4 ends in a live preview: apply the configuration, and Chestnut shows real producers (by NPN) with their actual persistency values.
                </p>
                <p className="content-prose mt-4">
                  Before you create the variable that will feed someone&apos;s payout, you watch what it produces. <strong>It turns an act of faith into an act of confirmation.</strong>
                </p>
                <CaseFigurePlaceholder
                  description="Step 4 — period & filters with the live preview loaded — real NPNs and persistency values"
                  caption="A live preview of real numbers — so a high-stakes decision is confirmed, not guessed."
                />
              </CaseSection>

              <Divider />

              <CaseSection id="part2-outcome" heading="How it was built, and where it landed">
                <p className="content-prose">
                  I designed the entire flow — all four steps, every state.
                </p>
                <p className="content-prose mt-4">
                  The <strong>analytic variable</strong> type itself was new. Engineering created it, and I was in from the start, designing the experience around it as it took shape. It worked well enough that it was later added to Settings too — the same creation flow, now living in both places.
                </p>
                <p className="content-prose mt-4">
                  I built on <strong>Bonsai</strong> (the design system from Part A) wherever I could, but this feature pushed past it. Several pieces had to be <strong>custom</strong>: the variable-type cards, the second set of radio selectors, and a few more — patterns Bonsai didn&apos;t have yet.
                </p>
                <p className="content-prose mt-4">
                  I worked closely with the <strong>Chestnut PM</strong> through design, then with the <strong>engineers</strong> through the build — largely making sure the design decisions survived into the shipped product.
                </p>
                <p className="content-prose mt-4">
                  <strong>It shipped, and it&apos;s live.</strong> The full flow — the in-context trigger, the four steps, the preview — is in the product.
                </p>
                <p className="content-prose mt-4">
                  The dead end is gone. An admin who hits a missing variable no longer leaves, no longer loses their work, and no longer flies blind. They create exactly what they need, see it work, and keep going.
                </p>
                <blockquote className="mt-5 rounded-xl bg-[var(--surface-muted)] px-5 py-4 text-base italic text-[var(--text-primary)]">
                  Make the easy thing easy, and the careful thing safe.
                </blockquote>
              </CaseSection>

            </article>
          </div>
        </Container>
      </Section>

      <CaseStudyNav current="chestnut" />
      <CaseStudyFooter />
    </>
  );
}

function NumberedStep({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* step number badge */}
      <div className="absolute -left-14 top-0 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[var(--brand-lime)] text-base font-bold text-[var(--text-primary)] ring-4 ring-white md:-left-16 md:h-[42px] md:w-[42px]">
        {n}
      </div>

      <div className="rounded-2xl border border-[var(--border-default)] bg-white p-5 md:p-6">
        <h4 className="text-[15px] font-semibold tracking-tight text-[var(--text-primary)] md:text-base">{title}</h4>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}
