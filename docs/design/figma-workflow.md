# Figma Implementation Plan — Port 26 AI

How to rebuild the website in Figma so the design file matches the live site, component-for-component, and becomes the source of truth for future design work.

Inputs: [components-inventory.md](components-inventory.md), [maketokens.md](maketokens.md). Tokens are already built in Figma (Primitives + Semantic + Text/Effect styles + spec sheet). This plan picks up from there.

---

## 1. Goal & success criteria

**Goal.** Every UI element a visitor sees on the live website exists as a reusable Figma component, named consistently, built on the existing token system, and assembled into page templates that visually match the deployed site.

**Done when:**
- A designer can drag any component from the assets panel and get the same look that ships in the live site.
- Every existing route on the site (`/`, `/casestudy/dashboard`, `/casestudy/design-system`, `/casestudy/onboarding`, `/not-found`) has a corresponding Figma frame at desktop width that matches a screenshot of the live page.
- No raw hex/px values are used inside components — everything resolves through the Primitives or Semantic collections.
- Every component has variants, properties, and a description that explains when to use it.

**Explicit non-goals.**
- We do **not** recreate motion in Figma. The hero canvas, hero phrase rotator, before/after slider, and process-card scroll animations live as static representations with notes.
- Mobile and tablet variants are deferred to a follow-up. Desktop (1440 width) only in this round.
- Dark mode tokens are deferred — only the `Light` semantic mode is wired today.

---

## 2. Figma file structure

Reorganize the existing pages so the file reads top-to-bottom in dependency order. Rename the pre-existing pages and add new ones.

| # | Page | Purpose |
|---|---|---|
| 1 | `📘 Cover` | One frame: file title, contributors, last-updated, link to repo, link to live site, status legend. |
| 2 | `📐 Tokens` | The existing spec sheet (move from `Components` page). Read-only contract. |
| 3 | `🧪 Icons` | Icon set as components — 1 frame per icon, all sized to 24×24 with consistent stroke. |
| 4 | `🧱 Atoms` | Button, Chip, Eyebrow, Avatar, Tag, Divider, BackLink, SocialIcon, etc. |
| 5 | `🧩 Molecules` | CTAButton, SectionHeader, InfoBlock, FigureBlock, ImpactMetric, GalleryCircleImage, HoverRollText, ScrollSpyTocItem, etc. |
| 6 | `🏛️ Organisms` | SiteHeader, SiteFooter, HeroBlock, ProcessSection, WorkCardSticky, AiExplorationCard, ExperienceGrid, GalleryGrid, CaseStudyHeroCard, CaseStudyContentSection. |
| 7 | `📄 Templates` | Full-page mockups: Home, Case Study (Design System), Case Study (Onboarding), Case Study (Dashboard), 404. |
| 8 | `🧰 Working` | Sandbox for in-progress work. Nothing here is the source of truth. |

**Naming convention for components:** PascalCase with optional category prefix. Example: `Button`, `Button/Primary`, `Card/Project`, `Icon/ArrowRight`. Use Figma's slash-separated names for nesting in the assets panel.

---

## 3. Build order (dependency-driven)

Don't build a Card before its constituent parts (Eyebrow, Heading, BodyText, Button) exist. The order below respects that.

```
Phase 0 — Foundations (already done)
   tokens, text styles, effect styles
        │
Phase 1 — Icons
   one component per inline SVG, normalized to 24×24
        │
Phase 2 — Atoms
   Button, Chip, Avatar, Tag, Divider, BackLink, SocialIcon
        │
Phase 3 — Molecules
   CTAButton, SectionHeader, InfoBlock, FigureBlock,
   ImpactMetric, GalleryCircleImage, HoverRollText,
   ScrollSpyTocItem, ProcessStepCard, CaseStudyContentSection
        │
Phase 4 — Organisms
   SiteHeader, SiteFooter, HeroBlock,
   ProcessSection, WorkCardSticky, AiExplorationCard,
   ExperienceGrid, GalleryGrid, CaseStudyHeroCard
        │
Phase 5 — Templates
   Home, Case Study (×3), 404
        │
Phase 6 — QA pass
   compare each template frame side-by-side against a live screenshot
```

Each phase blocks the next — don't move on until the phase is complete and reviewed.

---

## 4. Definition of Done — per component

Apply this checklist to **every** component before marking it complete. No exceptions; this is what makes the file usable.

- [ ] Lives on the correct page (Atoms / Molecules / Organisms).
- [ ] Named per the convention (e.g., `Button/Primary`, `Card/Project`).
- [ ] All fills/strokes/text colors bound to **semantic** variables (not primitive, not raw).
- [ ] All spacing uses **semantic spacing** variables (`space/lg`, `space/xl`) where one applies; auto-layout gaps reference those.
- [ ] All radii use semantic or primitive radius variables.
- [ ] All text uses a Text Style (`type/h1`, `type/body`, etc.) — no raw font sizes.
- [ ] Has every needed **Variant** (e.g., `state=default | hover | disabled`, `variant=primary | ghost`).
- [ ] Has every needed **Property** (text fields exposed, boolean toggles for icons, instance swap for nested components).
- [ ] Has a one-line **Description** explaining when to use it.
- [ ] Is **resizable** with auto-layout — no fixed widths inside reusable components unless the component is fixed-size by nature (icon, avatar).
- [ ] Has a "Specs" cluster on the same canvas: 1 frame showing all variants side by side, with state labels.
- [ ] Source code reference noted in the description: e.g., "Maps to `<CTAButton>` — see `components/cta-button.tsx`."

---

## 5. Per-component spec — what to build

Cross-references back to the inventory and to the source file. "Status" reflects what exists in code today: `extracted` (already a real React component), `inline` (lives as inline JSX, needs promotion in code too).

### 5.1 Phase 1 — Icons

Build each as a 24×24 component on the `🧪 Icons` page, with a 1.6 stroke-width default and a `Color` variable property.

| Icon | Source | Notes |
|---|---|---|
| `Icon/ArrowRight` | [home-sections.tsx:547](apps/website/components/home-sections.tsx#L547) | Used in case CTAs. |
| `Icon/ArrowDownTray` (download) | [site-header.tsx:39](apps/website/components/site-header.tsx#L39) | "Download Resume" button. |
| `Icon/Compare` (⇆) | [before-after-compare.tsx:46](apps/website/components/case-study/before-after-compare.tsx#L46) | Before/after slider handle. |
| `Icon/Process/01-Pencil` | [home-sections.tsx:448](apps/website/components/home-sections.tsx#L448) | Process step 01. |
| `Icon/Process/02-Bulb` | [home-sections.tsx:457](apps/website/components/home-sections.tsx#L457) | Process step 02. |
| `Icon/Process/03-Video` | [home-sections.tsx:468](apps/website/components/home-sections.tsx#L468) | Process step 03. |
| `Icon/Process/04-Sparkle` | [home-sections.tsx:477](apps/website/components/home-sections.tsx#L477) | Process step 04. |

### 5.2 Phase 2 — Atoms

| Component | Status | Variants / Properties | Source |
|---|---|---|---|
| `Button` | extracted | Variants: `primary`, `ghost`. States: `default`, `hover`, `disabled`. Property: `label` (text), `iconLeft` (boolean + instance swap). | [packages/ui/src/primitives/button.tsx](packages/ui/src/primitives/button.tsx) |
| `Chip` | inline | Variants: `blue`, `lime`, `neutral`. Property: `label`. | `framer-chip-*`, `case-tag` classes |
| `Eyebrow` | inline | Single variant. Uppercase tracking. Property: `label`. | `section-eyebrow` class |
| `Avatar` | inline | Sizes: `36`, `40`, `112`. Property: `image` (image fill swap). | Inline next/image circles |
| `Tag` | inline | Same shape as Chip neutral. Decide: collapse into Chip variant? Default: yes — only ship `Chip`. | `case-tag` |
| `Divider` | inline | Variants: `default`, `subtle`. Single line, semantic border color. | `<div className="h-px …">` |
| `BackLink` | inline | Property: `href` (text), `label`. Maps to "Back to Home" link. | Top of every case study |
| `SocialIcon` | inline | Property: `label` (IG/X/YT/etc). 40×40 round. | Footer social row |

### 5.3 Phase 3 — Molecules

| Component | Status | Variants / Properties | Source |
|---|---|---|---|
| `CTAButton` | inline | Variants: `primary`, `disabled`. Property: `label`, `iconRight` (boolean). Uses `Icon/ArrowRight` instance. | `framer-btn-primary` / `case-cta` |
| `SectionHeader` | inline | Property: `eyebrow`, `titleLeft`, `titleHighlight` (the grey suffix), `intro`. | Repeated 5× in `home-sections.tsx` |
| `HoverRollText` | inline | Variants: `dark` (header), `light` (footer). Static representation; note motion. | `RollingNavText` / `RollingLinkText` |
| `InfoBlock` | inline | Property: `title`, `value`. Small label-over-value pair used in case-study hero. | Case study hero grid |
| `FigureBlock` | inline | Variants: `default`, `compact`. Property: `image` (swap), `caption` (text + visibility toggle). | Case study figures |
| `ImpactMetric` | inline | Property: `title`, `value`, `description`. | Case study impact grid |
| `GalleryCircleImage` | inline | Single variant. Property: `image`. 240×240 round. | Home gallery rows |
| `ScrollSpyTocItem` | extracted (parent) | Variants: `default`, `active`. Property: `label`. | [scroll-spy-toc.tsx](apps/website/components/case-study/scroll-spy-toc.tsx) |
| `ProcessStepCard` | inline | Property: `id` (drives icon/colors), `title`, `description`, `bgColor`. Variants: light bg / dark bg (different text colors). | `ProcessStepCardContent` helper |
| `CaseStudyContentCard` | inline | Property: `title`, `body` (rich text), `bullets` (boolean), `figures` (instance, optional). | `CaseStudySection` helper |

### 5.4 Phase 4 — Organisms

| Component | Status | Variants / Properties | Source |
|---|---|---|---|
| `SiteHeader` | extracted | Single variant. Property: nav items (component instance list), CTA label. | [site-header.tsx](apps/website/components/site-header.tsx) |
| `SiteFooter` | inline (placeholder) | Single variant. Composes Avatar, CTAButton, SocialIcon row, HoverRollText, Divider. | Footer block in `home-sections.tsx` |
| `HeroBlock` | partly extracted | Property: `lead`, `rotatingPhrase`, `intro`, `mockupImage`. **Static representation** of the rotator and gradient — annotate with a sticky note. | Home hero |
| `ProcessSection` | inline | Composes 4 `ProcessStepCard`s in a zigzag layout. Includes the dotted vertical guides as a decorative layer. | Process section |
| `WorkCardSticky` | inline | Property: `title`, `description`, `tags` (instance list of Chip), `image`, `index` (drives the giant `0X` watermark), `state` (active/disabled CTA). | `WorkTextCard` + `WorkImageCard` |
| `AiExplorationCard` | inline | Property: `title`, `description`, `image`, `tags`, `cta` state. | `AiExplorationCard` helper |
| `ExperienceCard` | inline | Property: `period`, `logo`, `company`, `description`, `role`. Used in a 2-up grid. | "Meet Rishabh" Cards |
| `GalleryGrid` | inline | Property: 8 image swaps for the 4-3-1 layout. | Gallery section |
| `CaseStudyHeroCard` | inline | Property: `heroTitle`, `heroSubtitle`, `overview`, `myRole`, `timeline`, `figureOrVideo` (instance swap). | Top Card of each case study |

### 5.5 Phase 5 — Templates

One frame per route, at desktop width 1440px (or 1600px to match the live `max-w-[1600px]` containers). Frames are composed entirely of organisms — no raw shapes.

| Template | Composes | Source route |
|---|---|---|
| `Template/Home` | `SiteHeader` → `HeroBlock` → `ProcessSection` → `WorkCardSticky` ×3 → `AiExplorationCard` ×N → `ExperienceCard` grid → `GalleryGrid` → `SiteFooter` | `/` |
| `Template/CaseStudy/DesignSystem` | `SiteHeader` → `BackLink` → `CaseStudyHeroCard` → `ImpactMetric` row → attribution Card → `ScrollSpyToc` (sidebar) + `CaseStudyContentSection` ×6 → `SiteFooter` | `/casestudy/design-system` |
| `Template/CaseStudy/Onboarding` | Same composition as Design System, swap content + use `BeforeAfterCompare` static frame. | `/casestudy/onboarding` |
| `Template/CaseStudy/Dashboard` | `SiteHeader` → `BackLink` → simpler `CaseStudyHeroCard` → step Cards → thanks Card → `SiteFooter` | `/casestudy/dashboard` |
| `Template/NotFound` | `SiteHeader` → centered 404 block with `Button` → `SiteFooter` | `/not-found` |

---

## 6. Static representations for motion / interactivity

Things that can't be replicated in Figma. Build the static look, add a sticky-note annotation explaining what happens at runtime, and link to the source file.

| Pattern | Static representation | Annotation |
|---|---|---|
| Hero phrase rotator | Show one phrase in the position; add a second variant frame with the next phrase. | "Rotates every 3.6s. Per-character entry/exit at 22ms stagger. Source: `home-hero-dynamic.tsx`." |
| Hero gradient canvas | Solid soft gradient (lime + blue + yellow blobs) baked as a static fill or radial gradient. | "Animated canvas at runtime. fps-capped to 24, pauses when off-screen. Source: `home-hero-dynamic.tsx`." |
| Before/after slider | Two image instances with a vertical handle line at 50%. Add a "drag handle" pill marker. | "Drag-to-reveal slider in code. Source: `before-after-compare.tsx`." |
| HoverRollText | One static label. | "On hover, label scrolls up to reveal a duplicate. 300ms ease." |
| Sticky work cards | Show the cards stacked in a single tall frame at their resting positions. | "Each card uses `position: sticky` with stair-step `top` values to stack as you scroll." |
| ProcessCard fly-in | Show all 4 cards in their final positions. | "Cards translate from +120px on the X-axis with 90ms stagger when the section enters viewport." |

---

## 7. Quality gates

**Per-phase gate.** A phase is "done" only when all components in it pass the §4 Definition of Done. No moving on with half-built components.

**Per-template gate.** A template frame is "done" when, placed side-by-side with a live screenshot at the same width, the layout, spacing, and color match. Tolerances:
- Spacing within ±2px is fine (auto-layout rounding).
- Color must be exact — if it differs, you've used the wrong token. Fix the binding, not the value.
- Font: Figma uses Inter (Aileron isn't installed). This is acceptable — note it once on the Cover page.

**File-level gate.** When all phases are done:
- Run a quick "find-and-fix" on the file: any layer with a raw hex fill or a manually-typed font size is a token violation. Fix or document why.
- Every component should have an instance somewhere in `📄 Templates`. Components with zero instances are either dead or need to land in a template.

---

## 8. Suggested cadence

A rough estimate, assuming one designer working full-time on this. Adjust as needed.

| Phase | Time estimate |
|---|---|
| Phase 1 — Icons (7 icons) | 0.5 day |
| Phase 2 — Atoms (8 components) | 1 day |
| Phase 3 — Molecules (~11 components) | 2 days |
| Phase 4 — Organisms (~9 components) | 3 days (the templates here are visually rich) |
| Phase 5 — Templates (5 routes) | 2 days |
| Phase 6 — QA pass | 1 day |
| **Total** | **~9.5 days** |

Two-person parallel work: split atoms+molecules between designers, then merge before organisms.

---

## 9. Code follow-ups (not Figma work, but flagged here)

The inventory called out patterns that should also be extracted **in code**, not just in Figma. Three highest-leverage:

1. **Move the dark footer into `SiteFooter`** — currently `return null`, but copied inline into 3+ files.
2. **Replace `framer-btn-primary` / `case-cta` with a real `<CTAButton>` component** — consolidate with the existing underused `Button` primitive.
3. **Build an `<Icon name>` component** — the 7 inline SVGs across the codebase have no consistent convention.

These are tracked in `components-inventory.md` §4 — not part of this Figma plan, but worth doing in parallel so design and code stay in sync.

---

## 10. Risks & open questions

- **Aileron font isn't installed in Figma.** Inter is the documented fallback in the codebase CSS. Decision: ship the Figma file in Inter, accept the small visual delta, note it once on the cover page. Alternative: install Aileron in the Tcules workspace fonts — requires admin.
- **Scope creep into mobile/tablet.** Easy to slip into "let me do responsive variants while I'm here." Don't. Desktop now, responsive in a follow-up plan.
- **Component vs. variant confusion for ProcessStepCard.** Two cards have light backgrounds, two have dark. Build as a single component with a `theme=light|dark` variant, not four separate components.
- **CaseStudyContentSection on the onboarding page is slightly different from the design-system page** — it has an extra "How I tackle the problem" sub-heading style. Decide during Phase 3 whether that's a variant or a separate component. Recommend: variant `withSubheading=true|false`.
- **Gallery layout** is 4-3-1 today and probably fragile. In Figma, build it as a single fixed-grid component rather than three flex rows — it'll be more predictable when content swaps.

---

## 11. Quick start for whoever picks this up

1. Read [maketokens.md](maketokens.md) and [components-inventory.md](components-inventory.md) once.
2. Open the Figma file. Reorganize pages per §2.
3. Move the existing token spec sheet to the `📐 Tokens` page.
4. Start Phase 1: build the 7 icons. Do the whole phase before moving on.
5. After each phase, run the Definition of Done checklist (§4) on every component you just built.
6. After Phase 5, do the QA pass (§7) against live screenshots from the deployed Vercel site.
