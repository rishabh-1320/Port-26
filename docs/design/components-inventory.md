# Components Inventory — apps/website

A snapshot of every **extracted** React component currently in use on the public website, grouped using atomic design (atoms → molecules → organisms). Inline JSX in pages/sections is *not* counted as a component, but a separate "Should Be Extracted" section flags repeated inline patterns that are good candidates for promotion.

Scope: `apps/website/` and `packages/ui/`. Skipped: `apps/webapp` and `apps/ai-tool` (placeholder shells).

---

## 1. Atomic design — quick definitions

- **Atoms** — the smallest reusable bricks: a button, an input, a chip, a heading style. They don't depend on other components.
- **Molecules** — small clusters of atoms that work together: an avatar + name pair, a card, a form field with label + input + error.
- **Organisms** — larger composed sections: a header with logo + nav + CTA, a hero, a footer, a project list.
- **Templates / Pages** — full layouts. Out of scope for this inventory (those are the route files).

---

## 2. What exists today (extracted components)

### Atoms

| Component | File | Notes |
|---|---|---|
| `Button` | [packages/ui/src/primitives/button.tsx](packages/ui/src/primitives/button.tsx) | Two variants: `primary`, `ghost`. **Used only in `/casestudy/dashboard` and `/not-found`.** The home page and case-study CTAs use raw `framer-btn-primary` / `case-cta` CSS classes instead — see "Should Be Extracted" §4.1. |
| `Card` | [packages/ui/src/primitives/card.tsx](packages/ui/src/primitives/card.tsx) | Generic `<article>` with rounded border + padding. Used across all case-study pages and the home "Meet Rishabh" section. |

### Layout primitives

| Component | File | Notes |
|---|---|---|
| `Container` | [packages/ui/src/layout/container.tsx](packages/ui/src/layout/container.tsx) | `max-w-6xl` wrapper with horizontal padding. Used everywhere. |
| `Section` | [packages/ui/src/layout/section.tsx](packages/ui/src/layout/section.tsx) | `<section>` with vertical padding. Used everywhere. |

### Molecules

| Component | File | Used by |
|---|---|---|
| `HeroRotator` | [apps/website/components/home-hero-dynamic.tsx](apps/website/components/home-hero-dynamic.tsx) | Home hero — animated phrase rotator with per-character entry/exit. |
| `HeroGradientCanvas` | [apps/website/components/home-hero-dynamic.tsx](apps/website/components/home-hero-dynamic.tsx) | Home hero — canvas-based animated color blobs. |
| `BeforeAfterCompare` | [apps/website/components/case-study/before-after-compare.tsx](apps/website/components/case-study/before-after-compare.tsx) | Onboarding case study — slider over two images. |
| `ScrollSpyToc` | [apps/website/components/case-study/scroll-spy-toc.tsx](apps/website/components/case-study/scroll-spy-toc.tsx) | Design-system + onboarding case studies — sticky TOC that highlights the active section. |

### Organisms

| Component | File | Notes |
|---|---|---|
| `SiteHeader` | [apps/website/components/site-header.tsx](apps/website/components/site-header.tsx) | Sticky top nav: logo + byline, primary nav with hover roll-over animation, "Download Resume" CTA. |
| `SiteFooter` | [apps/website/components/site-footer.tsx](apps/website/components/site-footer.tsx) | **Currently `return null`** — comment explains the dark footer is rendered inline at the bottom of `HomeSections` instead. This is a placeholder, not a real component. |
| `HomeSections` | [apps/website/components/home-sections.tsx](apps/website/components/home-sections.tsx) | The entire home page (hero through footer) as a single 589-line component. Internally contains many sub-functions (Process card, AI card, Work cards, etc.) but they're **not exported and not reusable** — see §4. |

---

## 3. Total count

- **Real, reusable components: 9** (Button, Card, Container, Section, HeroRotator, HeroGradientCanvas, BeforeAfterCompare, ScrollSpyToc, SiteHeader)
- **Placeholder / no-op: 1** (SiteFooter)
- **Page-scoped wrapper: 1** (HomeSections — works as one giant organism)

This is a thin component library. The site visually has many more "things" — chips, eyebrows, CTAs, cards of multiple shapes — but they live as inline JSX with class names like `framer-btn-primary`, `case-tag`, `process-card`. Those are listed below.

---

## 4. Should be extracted (inline patterns repeated 2+ times)

Each row is a UI pattern that exists today as inline JSX in multiple places. Promoting these to components is the single biggest cleanup opportunity. Ranked roughly by how much pain they cause.

### 4.1 High-value extractions

| Pattern | Where it lives today | Why extract |
|---|---|---|
| **CTAButton** (primary lime pill) | `framer-btn-primary` in [site-header.tsx:38](apps/website/components/site-header.tsx#L38), [home-sections.tsx:294](apps/website/components/home-sections.tsx#L294); `case-cta` in [home-sections.tsx:399,512](apps/website/components/home-sections.tsx#L399), [casestudy/design-system/page.tsx:131](apps/website/app/casestudy/design-system/page.tsx#L131); `framer-btn-primary` again in onboarding case study. | Same visual button reimplemented at least 5 times. Some have an arrow icon, some don't. Replace with `<CTAButton variant="primary" icon={...}>` and unify with the existing `Button` primitive (which is currently underused). |
| **CTAButtonDisabled** | `case-cta-disabled` class — [home-sections.tsx:403,516](apps/website/components/home-sections.tsx#L403) | Disabled-state twin of the above. Should be a state on `CTAButton`, not a separate class. |
| **Footer (dark contact block)** | Inline in [home-sections.tsx:276–341](apps/website/components/home-sections.tsx#L276-L341) AND duplicated in [casestudy/design-system/page.tsx:113–178](apps/website/app/casestudy/design-system/page.tsx#L113-L178) AND onboarding case study. | ~65 lines of identical JSX (logo, headline, social pills, email/phone, divider, footer note) copied across files. The empty `SiteFooter` placeholder is the obvious home for this. |
| **Chip / Tag / Pill** | `framer-chip framer-chip-blue` (eyebrows), `framer-chip framer-chip-lime` (lime variant), `case-tag` (project tags), inline `<span className="rounded-full bg-blue-100/60 …">` in the gallery section. | Three+ implementations of the same shape. `<Chip variant="blue" \| "lime" \| "neutral">`. |
| **SectionHeader** (eyebrow + heading-with-grey-suffix + intro) | Repeated in every home section: Process, Works, AI Explorations, Meet Rishabh, Gallery — see [home-sections.tsx:62–71, 105–117, 141–153, 165–174, 219–226](apps/website/components/home-sections.tsx#L62). | 5 copies of the same three-stack pattern. `<SectionHeader eyebrow="My Work" title="My" highlight="Selected Works" intro="…" />`. |
| **SocialIconLink** | Inline in [home-sections.tsx:305–317](apps/website/components/home-sections.tsx#L305-L317) and re-implemented in [casestudy/design-system/page.tsx:142–154](apps/website/app/casestudy/design-system/page.tsx#L142-L154). | Round button with abbreviated social label (IG/X/YT). The `getSocialShortLabel` helper is also duplicated. |
| **HoverRollText** | `RollingNavText` (header) and `RollingLinkText` (footer) — same pattern, different files, slightly different markup. | Consolidate into one `<HoverRollText light={…}>`. |
| **InfoBlock** (label + value) | Inline `InfoBlock` in [casestudy/design-system/page.tsx:224](apps/website/app/casestudy/design-system/page.tsx#L224) AND duplicated as a separate copy in onboarding case study. | Two copies that should be one shared component. |
| **FigureBlock** (image with optional caption) | Inline `FigureBlock` in design-system page AND duplicated in onboarding page. | Same — extract once. |
| **ImpactMetric card** | Inline `<article>` in [casestudy/design-system/page.tsx:45–50](apps/website/app/casestudy/design-system/page.tsx#L45-L50) AND in onboarding's "Impact Overview" grid. | A small white card with eyebrow + value + description. |
| **CaseStudyHeroCard** (title + role/timeline grid + figure) | The Card block at the top of every case study — duplicated across design-system and onboarding pages. | High duplication; extract as a single template piece. |
| **BackToHomeLink** | Inline in every case-study page top. | Trivial but copied 3 times. |

### 4.2 Medium-value extractions

| Pattern | Where it lives today | Why extract |
|---|---|---|
| **WorkCard** (text + image two-pane sticky card) | [home-sections.tsx:487–541](apps/website/components/home-sections.tsx#L487) — `WorkTextCard` + `WorkImageCard` are local helpers. | Currently only used on the home page, but the structure is clearly its own thing and deserves to live in `components/`. |
| **AiExplorationCard** | [home-sections.tsx:365–411](apps/website/components/home-sections.tsx#L365) — local helper. | Same — local function, not exported. Promote to a real component file. |
| **ExperienceCard** (logo + period + role link) | Inline inside the "Meet Rishabh" section, [home-sections.tsx:177–212](apps/website/components/home-sections.tsx#L177). | Repeated for each experience item; clean candidate. |
| **ProcessStepCard** | [home-sections.tsx:346–363](apps/website/components/home-sections.tsx#L346) — `ProcessStepCardContent` local helper, plus the surrounding wrapper. | Promote to its own file; the bg-color/text-color logic is currently scattered helper functions. |
| **GalleryCircleImage** | Repeated 3 times in different rows in [home-sections.tsx:230–268](apps/website/components/home-sections.tsx#L230). | Identical markup; extract as a tiny component. |
| **CaseStudyContentSection** | Inline `CaseStudySection` in design-system page; the onboarding page does its own slightly different version. | Extract one shared component for "section heading + intro paragraphs + cards with optional bullets and figures." |
| **SectionDivider** | Inline in design-system page (`<div className="h-px w-full bg-[var(--color-border)]" />`). | One-line component but used many times. |

### 4.3 Icons — needs a system, not just extractions

There are several **inline SVG icons** scattered across pages with no shared system:

- Download arrow (header CTA — [site-header.tsx:39–41](apps/website/components/site-header.tsx#L39))
- Right arrow (case CTA — [home-sections.tsx:547–550](apps/website/components/home-sections.tsx#L547))
- Compare ⇆ glyph (BeforeAfterCompare)
- Four process-step icons (pencil, lightbulb, video, sparkle — [home-sections.tsx:445–483](apps/website/components/home-sections.tsx#L445))

Recommendation: build a single `<Icon name="…">` component backed by an SVG sprite or per-icon files in `components/icons/`. None of these icons have a consistent stroke width, viewBox, or sizing convention right now.

### 4.4 Heading / Text styles — cover with token-bound text styles instead

Most "heading" patterns on the page repeat the same inline style (`fontFamily: '"Aileron"…'`, `tracking-[-0.02em]`, etc.) about 20 times. Don't extract these as components — instead, ensure every text node uses the **Figma text styles** already defined (`type/h1`, `type/body`, etc.) and the matching CSS classes/utilities from the design tokens. That collapses 20 copies of inline `style={...}` into a single class.

---

## 5. Standard marketing-site checklist — what the site has vs. doesn't

For reference. Most missing items are not necessarily wrong — a portfolio doesn't need a pricing table — but flagging them is useful when you decide what to build next.

### Has

- [x] Top nav / Header
- [x] Hero (with animated headline + atmospheric gradient + product mockup)
- [x] Process / How-it-works section
- [x] Work / Project showcase (sticky-stacking cards)
- [x] AI Explorations / Side projects grid
- [x] About / experience cards
- [x] Image gallery
- [x] Contact CTA + dark footer with socials, email, phone
- [x] 404 page
- [x] Case-study sub-pages (3) with sticky TOC
- [x] Before/after slider (case-study only)

### Doesn't have, but a typical site would

- [ ] **Form primitives** — no `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `FormField`, `Label`. The site has zero forms today; if a contact form or newsletter signup is ever added, these will need to exist.
- [ ] **Avatar** — the round logo image is rendered inline 3+ times with `next/image`. A small `Avatar` component would be cleaner.
- [ ] **Modal / Dialog** — none. Add when a confirmation or media lightbox is needed.
- [ ] **Toast / Notification** — none.
- [ ] **Tabs**
- [ ] **Accordion / FAQ**
- [ ] **Breadcrumbs** — case studies are flat ("Back to Home"), so probably not needed.
- [ ] **Skip-to-content link** — accessibility nicety, currently absent.
- [ ] **Loading/Skeleton states** — no async UI yet.
- [ ] **Empty state**
- [ ] **Cookie / consent banner** — depends on jurisdiction.
- [ ] **Newsletter signup**
- [ ] **Testimonials**
- [ ] **Logo cloud / clients-worked-with strip**
- [ ] **Blog / Articles index + post template**

### Not applicable for a portfolio

- Pricing table
- Sign-in / Sign-up
- Dashboard / app shell
- Search

---

## 6. One-glance summary

- **Real components today: 9** — and most of them are layout/card primitives. Only `BeforeAfterCompare` and the two hero animation pieces are visually distinctive.
- **The biggest single problem:** the dark footer is inline-duplicated across 3+ files. Extracting `SiteFooter` (currently a no-op placeholder) is the single highest-leverage cleanup.
- **The second biggest problem:** every CTA on the site uses a hand-rolled CSS class (`framer-btn-primary`, `case-cta`) instead of the existing `Button` primitive. There are at least 5 visually-identical implementations.
- **The third:** chips/tags exist in three flavors, none extracted.
- **No icon system, no form primitives.** Both will be needed before the site grows.
