# Making Design Tokens — A Working Manual

A self-contained guide to designing, naming, structuring, and implementing design tokens in Figma (with a clean handoff to a Tailwind v4 codebase). Written so any agent or designer can pick this up and execute end-to-end.

---

## 1. What is a design token?

A **design token** is a named entity that stores a single design decision — a color, a number (spacing/radius/font-size), a string (font-family), a boolean, or a composite style (typography, shadow). The point isn't the value; it's the *name*. Names let designers and engineers reference the same decision across the entire system.

Two shifts make this worth doing:

1. **Decoupling decision from implementation.** `--color-action-primary` is a decision; `#bbf451` is an implementation. The decision is what callers depend on. The implementation can be swapped (rebrand, dark mode, A/B test) without touching every component.
2. **Single source of truth between Figma and code.** Figma Variables can be exported and consumed in CSS/Tailwind. The same token name appears in both worlds.

---

## 2. The three-tier model (Primitive → Semantic → Component)

Modern systems use **three tiers**, each layer referencing the one below it. Don't skip a tier. Skipping creates the exact pain tokens are meant to fix.

### Tier 1 — Primitives (a.k.a. global, base, raw)

Raw values with no purpose. Just the palette.

```
neutral.0  = #ffffff
neutral.50 = #fafafa
neutral.100 = #f5f5f5
…
neutral.900 = #181818
neutral.950 = #0f0f0f

lime.400 = #bbf451
lime.500 = #a6db46

space.0  = 0
space.1  = 4
space.2  = 8
space.4  = 16
…

radius.md = 16
radius.full = 999

font.size.body = 16
font.size.h1 = 60
```

Primitives are **never used directly by components.** They exist only to be referenced by semantic tokens. (One exception in code: utility scales like Tailwind's `space-4` are fine for layout because they aren't a "decision" — they're already the system's primitive scale.)

### Tier 2 — Semantic (a.k.a. alias, purposeful, decision)

Intent-based names that point at primitives. **This is the layer your components and screens consume.**

```
color.surface.default       → neutral.0    (#ffffff)
color.surface.subtle        → neutral.100  (#f5f5f5)
color.text.primary          → neutral.900  (#181818)
color.text.muted            → neutral.500  (#8e8e8e)
color.border.default        → neutral.200  (#e5e5e5)
color.accent.lime           → lime.400
color.accent.lime.hover     → lime.500
color.action.primary.bg     → lime.400
color.action.primary.text   → neutral.900
space.gutter                → space.6  (24)
radius.button               → radius.md (16)
```

When the lime accent changes to violet, you flip *one* primitive (or one alias). When dark mode arrives, you add a "dark" mode to the semantic collection — same token names, different primitive references.

### Tier 3 — Component (a.k.a. local, scoped)

Component-specific decisions. Start them **local to the component** (CSS file, Figma component description, design spec). Promote to global only when **three or more components need them** (Eightshapes' rule of thumb — avoids premature abstraction).

```
button.padding.x          → space.6  (24)
button.padding.y          → space.2.5 (10)
button.radius             → radius.md (16)
button.bg.primary         → color.action.primary.bg
input.border.focus        → color.action.primary.bg
```

Most projects ship without component tokens at all and just use semantic tokens directly inside components. That's fine. Add component tokens only when you feel duplication pain.

---

## 3. Naming conventions

Naming is the part teams underestimate. Bad names rot fast and tokens become un-greppable.

### 3.1 The Eightshapes taxonomy (Nathan Curtis)

Names are built from these levels, picked à la carte:

| Level group | Levels | Example values |
|---|---|---|
| **Namespace** | system, theme, domain | `esds`, `ocean`, `consumer` |
| **Object** | component-group, component, element | `forms`, `input`, `left-icon` |
| **Base** | category, property, concept | `color`, `font`, `space` / `text`, `bg`, `border` / `feedback`, `action` |
| **Modifier** | variant, state, scale, mode | `primary`, `hover`, `500`, `on-dark` |

**Rules of the road:**

- **Pick the levels you need, not all of them.** A token like `color.text.primary` has category + property + variant. Adding `color.text.primary.default.on-light` for a system that only ships one mode is noise.
- **Order is consistent within a system, even if you choose differently from another team.** Three valid orders: hierarchical (`color-interactive-background`), readability-first (`interactive-background-color`), or pair category+property (`color-background-interactive`). Pick one. Don't mix.
- **Modifiers go last.** State, scale, mode all sit at the tail because they're variations of an already-named decision: `color.action.primary.hover`, not `color.hover.action.primary`.
- **Mode is usually last-of-last** with an `on-` prefix: `color.action.primary.bg.on-dark`.
- **Avoid homonyms.** `type` is a homonym (TypeScript type vs. typography). Prefer `font` for typography. Prefer `kind` or `variant` for the other meaning.
- **Homogeneity within, heterogeneity between.** Group similar things into one concept (`feedback` = success/warning/error) and split unlike things into different concepts (don't lump `feedback` and `action` together).
- **No marketing names in primitives.** `color.brand.peacock` belongs in semantic, not primitive. Primitive should be `color.blue.500`.

### 3.2 Hierarchy syntax in Figma vs. CSS

| Figma variable name | CSS variable | Tailwind v4 utility |
|---|---|---|
| `color/text/primary` | `--color-text-primary` | `text-text-primary` (or rename for ergonomics) |
| `space/gutter` | `--spacing-gutter` | `p-gutter`, `gap-gutter` |
| `radius/button` | `--radius-button` | `rounded-button` |

Figma uses `/` as a folder separator inside variable names — `color/text/primary` displays as a nested folder in the UI. This is purely cosmetic for organization; the underlying name is still flat.

### 3.3 Concrete naming choices for THIS project

We'll use a flat, hierarchical, slash-separated style. No system namespace (single-product repo).

```
Primitives (collection: "Primitives")
  color/neutral/0..950
  color/lime/400, 500
  color/blue/400, 500, 600
  color/black, color/white
  size/0, size/1, size/2 … size/96   (in px)
  radius/none, sm, md, lg, pill
  font/family/sans
  font/weight/regular, semibold, bold
  font/size/12 … 60
  font/lineHeight/16 … 68
  font/letterSpacing/tight, tighter, wide

Semantic (collection: "Semantic", modes: Light [+ Dark later])
  color/bg/default, subtle, inverse
  color/text/primary, secondary, muted, inverse, onAccent, disabled
  color/border/default, strong, subtle
  color/accent/lime, lime.hover, blue
  color/action/primary/bg, bg.hover, text
  color/action/secondary/bg, text
  color/feedback/success, warning, error, info        ← reserved, no values yet
  space/xs, sm, md, lg, xl, 2xl, 3xl, 4xl
  radius/control, card, pill
  shadow/xs, sm, md, lg                                ← effect styles, not variables
  type/display, h1, h2, h3, body.lg, body, body.sm, eyebrow, button   ← text styles
```

---

## 4. Token categories worth covering for a website

Don't try to ship every category on day one. The minimum viable token set for a marketing/portfolio site is **color + spacing + radius + typography**. Add the rest as the system matures.

| Category | Variable type in Figma | Notes |
|---|---|---|
| **Color** | `COLOR` | Backgrounds, text, borders, accents, feedback. The biggest category. |
| **Spacing** | `FLOAT` | A single number scale (4-px or 8-px base) that powers padding, margin, gap. |
| **Radius** | `FLOAT` | Usually 5–7 steps: 0, 4, 8, 12, 16, 24, 999. |
| **Typography** | `FLOAT` (size, line-height, weight as number) + Text Styles | Figma Text Styles compose font-family, weight, size, line-height, letter-spacing. Bind the numeric parts to variables. |
| **Shadow / Elevation** | Effect Styles (color inside can be a variable) | Shadows aren't first-class variables. Use Effect Styles with names like `shadow/md`. Ramp 4–5 steps. |
| **Border width** | `FLOAT` | Often just 1, 2, 4. Not always tokenized — fine. |
| **Opacity** | `FLOAT` (0..1) | If you use repeated alphas (`overlay/scrim`, `disabled/40`) — token them. |
| **Z-index / Layer** | `FLOAT` | nav, dropdown, modal, toast — token if you have ≥3 stacked layers. |
| **Motion** | `FLOAT` (duration ms) + `STRING` (easing) | `motion/duration/fast = 150`, `motion/easing/standard = "cubic-bezier(0.22, 1, 0.36, 1)"`. |
| **Breakpoints** | `FLOAT` | If your design system uses them (e.g., 640, 810, 1280, 1440). |
| **Sizing** | `FLOAT` | Container max-widths, icon sizes (16, 20, 24, 32, 48). |

---

## 5. Figma Variables — implementation rules

### 5.1 Variable types Figma supports

- `COLOR` — hex/rgb. Use for every color token.
- `FLOAT` — numbers. Use for spacing, radius, font-size, line-height, font-weight (as number), opacity, durations, breakpoints.
- `STRING` — text. Use for font-family, easing curves, content (rare).
- `BOOLEAN` — true/false. Use for "show feature X" toggles in design — rare for tokens.

Figma does **not** have a `TYPOGRAPHY` or `SHADOW` variable type. For those, you use **Text Styles** and **Effect Styles** that consume variables internally.

### 5.2 Collections

A **Collection** is a group of related variables that share the same set of **modes**. Recommended split:

- **Primitives** collection — single mode named `Default`. The raw palette.
- **Semantic** collection — modes are `Light`, `Dark` (+ optional `High Contrast`, `Brand A`, etc.). Every variable in this collection has one value per mode.

Why split? Because primitives are mode-agnostic (#181818 is #181818 in any theme). Mixing them with semantic would force you to define a value per mode for things that don't change per mode.

### 5.3 Modes

Within a collection, a **mode** stores one value per variable. Modes are how you ship light/dark, brand variants, density variants. Modes apply at the *frame* level — set a frame to mode `Dark` and every semantic variable resolves to its dark value.

For this project:
- Primitives → 1 mode (`Default`)
- Semantic → 1 mode now (`Light`). Add `Dark` later when needed; the token *names* stay the same.

### 5.4 Aliasing (the load-bearing feature)

A variable can have either a literal value or an **alias** to another variable. Semantic tokens should *always* alias primitives, never hold raw values.

```
Semantic: color/text/primary → alias → Primitives: color/neutral/900
```

When you change `color/neutral/900` from `#181818` to `#101010`, every component bound to `color/text/primary` updates instantly. That's the whole point.

### 5.5 Scoping

Each variable has a **scope** that controls which UI properties suggest it. Set `color/text/*` to scope = "Text" so it shows up in the text fill picker but not in stroke pickers. Scoping reduces the wrong-token-picked-by-mistake error rate.

### 5.6 Text Styles

Compose typography here. Bind the numeric inputs to variables.

- Font family ← a `STRING` variable or the literal `"Aileron"`.
- Font weight ← a `FLOAT` variable (e.g., `font/weight/semibold = 600`).
- Font size ← a `FLOAT` variable.
- Line height ← a `FLOAT` variable.
- Letter spacing ← a `FLOAT` variable (note: in Figma this is a percent value — `-0.02em` becomes `-2%`).

Name styles by **role**, not size: `type/h1`, `type/body`, `type/eyebrow` — not `type/60-bold`.

### 5.7 Effect Styles (shadows)

Create one effect style per shadow level: `shadow/xs`, `shadow/sm`, `shadow/md`, `shadow/lg`, `shadow/xl`. Inside each, the **color** of each shadow layer can be bound to a color variable (e.g., `color/shadow/default` aliased to a primitive black with low alpha). The numeric offsets/blurs cannot be bound to variables yet — they sit as literal values inside the Effect Style.

---

## 6. The plan for THIS project (Port 26 AI)

Audited from `apps/website/app/globals.css` and case-study CSS. The current palette is small and warm-neutral with a lime accent. The plan below preserves every existing value and slots it into a clean tier system — no visual change required.

### 6.1 Primitives (collection: `Primitives`, mode: `Default`)

**Color — Neutral ramp**
```
color/neutral/0    #ffffff
color/neutral/50   #fafafa
color/neutral/100  #f8f8f7
color/neutral/150  #f5f5f5
color/neutral/200  #f2f2f2
color/neutral/300  #e5e5e5
color/neutral/350  #e0e0e0
color/neutral/400  #d2d2d2
color/neutral/500  #9ca3af
color/neutral/550  #8e8e8e
color/neutral/600  #6f6f6f
color/neutral/650  #686868
color/neutral/700  #5f5f5f
color/neutral/800  #3f3f3f
color/neutral/900  #181818
color/neutral/950  #131313
color/neutral/1000 #0f0f0f
```

**Color — Accent: Lime**
```
color/lime/400  #bbf451
color/lime/500  #a6db46
```

**Color — Accent: Blue**
```
color/blue/400  #4FA1FF
color/blue/500  #007aff
color/blue/600  #2563eb
```

**Color — Pure**
```
color/black     #000000
color/white     #ffffff
```

**Color — Alpha (for shadows/overlays)**
```
color/alpha/black/3   rgba(0,0,0,0.03)
color/alpha/black/8   rgba(0,0,0,0.08)
color/alpha/black/15  rgba(0,0,0,0.15)
color/alpha/black/45  rgba(9,18,13,0.45)
color/alpha/black/65  rgba(24,24,24,0.65)
color/alpha/white/88  rgba(255,255,255,0.88)
```

**Size scale (px) — used for both spacing and component sizing**
```
size/0   0
size/1   4
size/2   8
size/3   12
size/4   16
size/5   20
size/6   24
size/8   32
size/10  40
size/12  48
size/16  64
size/20  80
size/24  96
```

**Radius (px)**
```
radius/none  0
radius/sm    4
radius/md    16
radius/lg    24
radius/pill  50
radius/full  999
```

**Font**
```
font/family/sans               "Aileron, Inter, Segoe UI, sans-serif"
font/weight/regular            400
font/weight/semibold           600
font/weight/bold               700

font/size/12 … font/size/60     (12, 14, 15, 16, 18, 20, 24, 40, 48, 60)
font/lineHeight/16 … 68         (16, 18, 20, 22, 24, 26, 28, 32, 48, 54, 68)
font/letterSpacing/tighter     -2     (encoded as Figma percent: -2%)
font/letterSpacing/tight       -1
font/letterSpacing/normal       0
font/letterSpacing/wide         11    (uppercase eyebrow)
```

### 6.2 Semantic (collection: `Semantic`, mode: `Light`)

**Surface**
```
color/bg/default     → color/neutral/0       (#ffffff)
color/bg/subtle      → color/neutral/150     (#f5f5f5)
color/bg/muted       → color/neutral/200     (#f2f2f2)
color/bg/inverse     → color/neutral/900     (#181818)
```

**Text**
```
color/text/primary    → color/neutral/900    (#181818)
color/text/secondary  → color/neutral/700    (#5f5f5f)
color/text/muted      → color/neutral/550    (#8e8e8e)
color/text/inverse    → color/neutral/0      (#ffffff)
color/text/disabled   → color/alpha/black/45
```

**Border**
```
color/border/default  → color/neutral/300    (#e5e5e5)
color/border/subtle   → color/neutral/350    (#e0e0e0)
color/border/strong   → color/neutral/900    (#181818)
```

**Accent / Action**
```
color/accent/lime          → color/lime/400
color/accent/lime/hover    → color/lime/500
color/accent/blue          → color/blue/500

color/action/primary/bg          → color/lime/400
color/action/primary/bg/hover    → color/lime/500
color/action/primary/text        → color/neutral/900

color/action/secondary/bg        → color/neutral/150
color/action/secondary/text      → color/text/disabled
```

**Feedback (reserved — add real values when first feedback UI ships)**
```
color/feedback/success    (placeholder → color/lime/500)
color/feedback/warning    (placeholder → color/lime/400)
color/feedback/error      (placeholder → #d92d20 — TODO)
color/feedback/info       → color/blue/500
```

**Spacing** (T-shirt names → primitive sizes)
```
space/xs    → size/1   (4)
space/sm    → size/2   (8)
space/md    → size/3   (12)
space/lg    → size/4   (16)
space/xl    → size/6   (24)
space/2xl   → size/8   (32)
space/3xl   → size/10  (40)
space/4xl   → size/16  (64)
space/5xl   → size/20  (80)
```

**Radius**
```
radius/control  → radius/md    (16, button/card)
radius/card     → radius/md    (16)
radius/pill     → radius/full  (999, chips/eyebrows)
radius/chip     → radius/pill  (50)
```

### 6.3 Text Styles (`Semantic`, composed from primitives)

| Style name | Family | Weight | Size | Line | Tracking |
|---|---|---|---|---|---|
| `type/display` | sans | 600 | 60 | 68 | tighter (-2%) |
| `type/h1` | sans | 600 | 48 | 54 | tighter |
| `type/h2` | sans | 600 | 40 | 48 | tighter |
| `type/h3` | sans | 600 | 24 | 32 | tighter |
| `type/body/lg` | sans | 400 | 20 | 28 | normal |
| `type/body` | sans | 400 | 16 | 24 | normal |
| `type/body/sm` | sans | 400 | 14 | 20 | normal |
| `type/button` | sans | 600 | 16 | 24 | tight (-1%) |
| `type/chip` | sans | 600 | 12 | 18 | tight |
| `type/eyebrow` | sans | 700 | 12 | 16 | wide (11%, UPPERCASE) |

Provide responsive variants (`type/h1/desktop`, `type/h1/tablet`, `type/h1/mobile`) only if the design needs them. Current CSS does — desktop H1 is 60/68, tablet is 48/54, mobile is 40/48.

### 6.4 Effect Styles (shadows)

Current code uses these ambient shadows: `rgba(0,0,0,.03)`, `.08`, `.15`. Build a 4-step ramp:

| Style | Layer 1 | Layer 2 |
|---|---|---|
| `shadow/xs` | `0 1 2 0 alpha/black/3` | — |
| `shadow/sm` | `0 1 2 0 alpha/black/8` | — |
| `shadow/md` | `0 4 12 -2 alpha/black/8` | `0 2 4 -1 alpha/black/3` |
| `shadow/lg` | `0 12 32 -8 alpha/black/15` | `0 4 8 -2 alpha/black/8` |

Bind the shadow color of each layer to the corresponding `color/alpha/black/*` variable.

### 6.5 What's NOT being tokenized yet (and why)

- **Component tokens.** Skip. Components don't have enough duplication yet to justify a third tier. Promote later if/when needed.
- **Motion tokens.** The codebase has scattered `0.2s ease`, `0.42s cubic-bezier(...)`, `0.72s cubic-bezier(...)`. Worth tokenizing in v2 — defer.
- **Breakpoints.** The codebase uses 810px and 1440px. Two breakpoints don't justify a token. If a third lands, tokenize.
- **Z-index.** No stacking issues yet. Defer.

---

## 7. Step-by-step: creating these in Figma

The order matters — semantic tokens can't alias primitives that don't exist yet.

1. **Create the `Primitives` collection** with one mode `Default`.
2. **Add color primitives** in this order: neutral → lime → blue → pure → alpha. Use folder names (`color/neutral/0`, etc.) so they nest in the variable panel.
3. **Add float primitives**: size scale, radius scale, font sizes, font line-heights, font weights, font letter-spacings.
4. **Add string primitive**: `font/family/sans`.
5. **Create the `Semantic` collection** with one mode `Light`.
6. **Add semantic color variables** as aliases to the primitives. Set the **scope** on each (e.g., `color/text/*` scoped to "Text" only).
7. **Add semantic spacing variables** as aliases to size primitives. Scope to "Gap" / "Width and height" / "Stroke" as appropriate.
8. **Add semantic radius variables** aliased to radius primitives. Scope to "Corner radius."
9. **Create text styles** under names `type/*`. For each, bind size/line-height/weight to primitives (Figma calls this "Apply variable" inside the text-style editor).
10. **Create effect styles** under names `shadow/*`. Bind the color of each shadow layer to the matching `color/alpha/black/*` variable.
11. **Sanity check**: build a small swatch frame on the `Components` page that displays every semantic color, every text style, every shadow level. This is your living spec sheet — designers should never edit token values without updating it.

---

## 8. Tailwind v4 mapping (when you push tokens to code)

Tailwind v4 reads CSS variables defined under `@theme`. You can hand-author them or generate from a Figma export (Tokens Studio plugin, or a custom export script through the Figma REST API).

```css
@theme {
  /* --- Primitives --- */
  --color-neutral-0:   #ffffff;
  --color-neutral-100: #f5f5f5;
  --color-neutral-900: #181818;
  --color-lime-400:    #bbf451;
  --color-lime-500:    #a6db46;
  /* … */

  /* --- Semantic (light) --- */
  --color-bg-default:       var(--color-neutral-0);
  --color-text-primary:     var(--color-neutral-900);
  --color-text-muted:       #8e8e8e;
  --color-border-default:   #e5e5e5;
  --color-action-primary:   var(--color-lime-400);
  --color-action-primary-hover: var(--color-lime-500);

  /* --- Spacing --- */
  --spacing-xs: 0.25rem;   /* 4 */
  --spacing-sm: 0.5rem;    /* 8 */
  --spacing-md: 0.75rem;
  --spacing-lg: 1rem;
  --spacing-xl: 1.5rem;
  --spacing-2xl: 2rem;
  /* … */

  /* --- Radius --- */
  --radius-control: 1rem;     /* 16 */
  --radius-pill:    9999px;
}
```

Tailwind v4 autogenerates utility classes from the variable names: `bg-bg-default`, `text-text-primary`, `p-xl`, `rounded-control`. The double-prefix (`bg-bg-default`) is awkward — many teams flatten the variable name (use `--color-surface` instead of `--color-bg-default`) so utilities read cleaner (`bg-surface`).

Dark mode in v4: add a `@theme` block under `@media (prefers-color-scheme: dark) { :root { … } }` (or a `[data-theme="dark"]` selector) that re-maps the same semantic variables to different primitive values.

---

## 9. Governance — keeping tokens healthy

- **Every new color/spacing in a design has to pass through tokens.** No raw hex codes in production components. Lint with Stylelint or the Tokens Studio inspector.
- **Token PRs are reviewed by a designer + an engineer.** Names are forever; values are cheap.
- **Deprecate, don't delete.** Mark old tokens `@deprecated` and let them resolve to the new value for one release cycle, then remove.
- **Document the *why* in the token description.** Figma variables have a description field. Use it: "muted text — body copy on white surfaces only."
- **Keep the swatch frame current** (step 11 in §7). It's the contract. If the swatch and Figma library disagree, someone broke the system.

---

## 10. Quick reference — checklist for any new project

- [ ] Two collections: `Primitives` and `Semantic`.
- [ ] Primitives: color ramps, size scale, radius scale, font sizes/lineheights/weights, alpha colors.
- [ ] Semantic: bg/text/border/accent/action/feedback colors; t-shirt spacing; t-shirt radius.
- [ ] Text Styles named by role (`type/h1`, `type/body`), bound to font primitives.
- [ ] Effect Styles for shadows (`shadow/sm`–`shadow/lg`) with color bound to alpha primitives.
- [ ] Scope every variable so the right one auto-suggests in the right slot.
- [ ] Light mode now; reserve mode names for dark/high-contrast even if values are pending.
- [ ] One swatch/spec frame on the `Components` page showing every token.
- [ ] No raw hex/px in production components — only token references.
