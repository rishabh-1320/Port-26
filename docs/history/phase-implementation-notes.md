# Port 26 Portfolio — Experience Layer Rebuild
## Detailed Implementation Plan (v2)

> **Audience:** This document is written for an autonomous coding agent that will execute the plan end-to-end. It assumes no prior conversation context. Every section is self-contained.
>
> **Owner:** Rishabh Choudhary (Product Designer)
> **Site:** https://port-26-website.vercel.app/
> **Repo root:** `/Users/ravish/Port/Port 26 AI`
> **Plan date:** 2026-05-13

---

## 0. Project Context

### 0.1 Stack
- **Framework:** Next.js 14 (App Router) — `apps/website` in the monorepo
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4
- **Animations:** GSAP 3.x (already installed as `gsap` in `apps/website`)
- **UI library:** Local `@packages/ui` workspace package (`Button`, `Card`, `Container`, `Section`)
- **Images:** `next/image` with Framer CDN + Unsplash as remote patterns
- **Deployment:** Vercel (auto-deploy from GitHub main branch)
- **Package manager:** **pnpm 10.x** (do NOT use npm — the lockfile is `pnpm-lock.yaml`)

### 0.2 Monorepo structure
```
/Users/ravish/Port/Port 26 AI/
├── apps/
│   ├── website/          ← main portfolio (this rebuild's scope)
│   ├── webapp/           ← unrelated, do not touch
│   └── ai-tool/          ← unrelated, do not touch
├── packages/
│   └── ui/               ← shared UI primitives (extend cautiously)
├── services/
│   └── website-api/      ← unrelated, do not touch
├── pnpm-lock.yaml
└── package.json
```

### 0.3 Website file structure (current)
```
apps/website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                              ← imports HomeSections
│   ├── globals.css                           ← all global CSS + Aileron @font-face
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── not-found.tsx
│   ├── casestudy/
│   │   ├── dashboard/page.tsx                ← HRMS case study
│   │   ├── design-system/page.tsx            ← Plasma case study
│   │   └── onboarding/page.tsx               ← Lingobase case study
│   └── therapist-coupon-ops-b7k3m9/page.tsx  ← hidden internal page, do not touch
├── components/
│   ├── home-sections.tsx                     ← entire homepage layout
│   ├── home-hero-dynamic.tsx                 ← HeroRotator + HeroGradientCanvas (Canvas 2D, to be replaced)
│   ├── site-header.tsx                       ← top nav
│   ├── site-footer.tsx                       ← returns null (DEAD CODE — delete in Phase 5)
│   ├── gsap-reveal.tsx                       ← already-built reveal wrapper, KEEP
│   ├── redeem-coupon-overlay.tsx             ← unrelated, do not touch
│   └── case-study/
│       ├── before-after-compare.tsx
│       └── scroll-spy-toc.tsx
├── hooks/
│   └── use-gsap-reveal.ts                    ← already built, KEEP
├── lib/
│   ├── site-content.ts                       ← all homepage data
│   ├── onboarding-case-study.ts              ← Lingobase data
│   ├── design-system-case-study.ts           ← Plasma data
│   ├── types.ts
│   └── gsap-utils.ts                         ← GSAP lazy loader + presets, KEEP
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

### 0.4 Conventions to follow
- **Client components** require `"use client"` directive (App Router)
- **Server components** by default — only mark `"use client"` when using hooks/state/refs
- **Path alias:** `@/` resolves to `apps/website/` (e.g., `@/lib/gsap-utils`)
- **UI primitives import:** `import { Container } from "@packages/ui"`
- **Image domains** must be added to `next.config.mjs` `remotePatterns` before use
- **TypeScript:** No `any`. Use `unknown` + narrowing if type is genuinely dynamic.
- **No comments in code unless explicitly needed** to explain non-obvious logic
- **Tailwind only** for utility styling. Component-scoped CSS goes in `globals.css` with a clear class prefix (`hero-`, `process-`, etc.)
- **All animations** must respect `prefers-reduced-motion: reduce`

### 0.5 Build & verify
After every phase:
```bash
cd "/Users/ravish/Port/Port 26 AI/apps/website"
npx tsc --noEmit                    # Type check
pnpm build                          # Production build
```
If either fails, fix before moving on. Do not stack phases on a broken state.

### 0.6 Critical decisions already made (do NOT re-litigate)
| Decision | Choice |
|---|---|
| Animation library | GSAP (installed). Use existing `gsap-utils.ts`. |
| Smooth scroll | Native CSS `scroll-behavior: smooth`. Do NOT install Lenis. |
| Custom cursor | **SKIP.** Not in scope. |
| Page transitions | Fade-only (no curtain/wipe). |
| Gradient renderer | WebGL fragment shader, no library (no Three.js, no OGL). |
| Token strategy | CSS custom properties + Tailwind extend. No CSS-in-JS. |
| Font | Keep Aileron, optimise loading. Do NOT change to a new font. |

### 0.7 Performance targets
| Metric | Current | Target |
|---|---|---|
| First Load JS (home `/`) | 87.3KB | < 100KB |
| First Load JS (case studies) | 101–103KB | < 115KB |
| Largest Contentful Paint | unknown | < 2.0s on 4G |
| Cumulative Layout Shift | unknown | < 0.05 |
| Hero gradient FPS | 24 (CPU) | 30+ (GPU) |
| Lighthouse Performance | unknown | > 90 |
| Lighthouse Accessibility | unknown | > 95 |

### 0.8 Browser support matrix
- Chrome / Edge / Safari latest 2 versions
- Firefox latest 2 versions
- iOS Safari 15+
- Chrome Android latest
- **No IE11.** No legacy browsers. Modern syntax allowed.
- WebGL 1.0 (universally supported). No WebGL 2 required.

### 0.9 Pages in scope
| Route | Status | Action |
|---|---|---|
| `/` | live | Full polish |
| `/casestudy/dashboard` | live | Full polish |
| `/casestudy/onboarding` | live | Full polish |
| `/casestudy/design-system` | live | Full polish |
| `/case-study/*` | empty pages (150B) | **Leave as-is.** Aliases / legacy. |
| `/therapist-coupon-ops-b7k3m9` | hidden | **Do NOT touch.** |
| `/ai/ai-shopping-assistant` | 404 | Linked from homepage — **remove link** if AI explorations array becomes non-empty later. Currently empty. |

---

## 1. North Star Principles

Every implementation decision must filter through these four. If a feature violates any of them, drop the feature or rework it.

1. **Lightweight** — first load JS stays under 100KB on `/`. GPU does heavy lifting. Animations deferred to scroll. No library is added unless it's < 10KB and replaces > 10KB of custom code.
2. **High-end** — interactions feel intentional. Micro-animations have purpose (not decoration). Easing is `expo.out` or `power4.out` (never `linear` or `ease`).
3. **Fluid** — 60fps on M1 MacBook, 30fps on mid-range mobile. No layout shift > 0.05 CLS. Transitions cap at 700ms (no slower).
4. **Accessible** — keyboard navigable, screen-reader complete, respects `prefers-reduced-motion`, WCAG 2.1 AA contrast on all text.

---

## PHASE 0 — Design Tokens Foundation

**Objective:** Replace scattered inline styles and hardcoded hex values with a single source of truth (CSS custom properties + Tailwind theme).

**Risk:** Low — pure refactor, no visual changes intended.

**Estimated time:** 2 hours

### 0.1 Files to modify
- `apps/website/app/globals.css` — add `:root` token block
- `apps/website/tailwind.config.ts` — extend theme to consume tokens
- `apps/website/lib/design-tokens.ts` — **NEW** — TypeScript exports for animation code

### 0.2 Token definitions

Add to top of `globals.css` `:root` block (replace existing `--color-*` variables):

```css
:root {
  /* Surface */
  --surface-base:    #ffffff;
  --surface-soft:    #f8f8f7;
  --surface-muted:   #f5f5f5;
  --surface-dark:    #181818;

  /* Text */
  --text-primary:    #181818;
  --text-secondary:  #5f5f5f;
  --text-muted:      #8e8e8e;
  --text-inverse:    #ffffff;

  /* Brand */
  --brand-lime:      #BBF451;
  --brand-lime-hover:#A6DB46;
  --brand-blue:      #007AFF;
  --brand-warm:      #FFF89A;

  /* Borders */
  --border-default:  #e5e5e5;
  --border-strong:   #d2d2d2;
  --border-subtle:   rgba(0, 0, 0, 0.06);

  /* Radius */
  --radius-sm:  8px;
  --radius-md:  12px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-2xl: 30px;

  /* Easing */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-expo:  cubic-bezier(0.19, 1, 0.22, 1);
  --ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);

  /* Duration */
  --dur-fast:    200ms;
  --dur-default: 400ms;
  --dur-slow:    700ms;
  --dur-reveal:  900ms;

  /* Z-index scale */
  --z-base:    0;
  --z-content: 10;
  --z-overlay: 20;
  --z-nav:     40;
  --z-modal:   50;
}
```

**Preserve backward compatibility:** Keep old `--color-bg`, `--color-text`, `--color-muted`, `--color-brand`, `--color-border` for now — they're referenced in case-study pages. Map them to the new tokens:

```css
:root {
  --color-bg: var(--surface-base);
  --color-text: var(--text-primary);
  --color-muted: var(--text-muted);
  --color-brand: var(--surface-dark);
  --color-border: var(--border-default);
  --color-chip: var(--surface-muted);
  --color-surface: var(--surface-base);
  --color-brand-strong: #0f0f0f;
}
```

### 0.3 Tailwind config extension

```ts
// tailwind.config.ts
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "var(--surface-base)",
          soft: "var(--surface-soft)",
          muted: "var(--surface-muted)",
          dark: "var(--surface-dark)"
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          inverse: "var(--text-inverse)"
        },
        brand: {
          lime: "var(--brand-lime)",
          "lime-hover": "var(--brand-lime-hover)",
          blue: "var(--brand-blue)",
          warm: "var(--brand-warm)"
        }
      },
      borderRadius: {
        DEFAULT: "var(--radius-md)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)"
      },
      transitionTimingFunction: {
        "out-quart": "var(--ease-out-quart)",
        "out-expo": "var(--ease-out-expo)"
      },
      transitionDuration: {
        fast: "200ms",
        DEFAULT: "400ms",
        slow: "700ms",
        reveal: "900ms"
      },
      animation: {
        "fade-up": "fade-up 0.7s var(--ease-out-quart) forwards"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};
```

### 0.4 TypeScript token exports

Create `apps/website/lib/design-tokens.ts`:

```ts
export const COLORS = {
  surface: {
    base: "#ffffff",
    soft: "#f8f8f7",
    muted: "#f5f5f5",
    dark: "#181818"
  },
  text: {
    primary: "#181818",
    secondary: "#5f5f5f",
    muted: "#8e8e8e",
    inverse: "#ffffff"
  },
  brand: {
    lime: "#BBF451",
    limeHover: "#A6DB46",
    blue: "#007AFF",
    warm: "#FFF89A"
  }
} as const;

export const EASE = {
  outQuart: "power4.out",  // GSAP equivalent of cubic-bezier(0.25, 1, 0.5, 1)
  outExpo: "expo.out",
  inOut: "power2.inOut"
} as const;

export const DURATION = {
  fast: 0.2,
  default: 0.4,
  slow: 0.7,
  reveal: 0.9
} as const;
```

### 0.5 Acceptance criteria
- [ ] `pnpm build` succeeds with zero TypeScript errors
- [ ] Visual diff vs previous version: zero changes (tokens preserve all values)
- [ ] No hardcoded hex values remain in `home-sections.tsx` for colors that have token equivalents
- [ ] Existing case study pages still render correctly (backward-compat tokens working)

### 0.6 Verification
```bash
# Search for any remaining hardcoded brand-colour hex values in JSX:
grep -rn "#BBF451\|#bbf451\|#007AFF\|#007aff" apps/website/components apps/website/app | grep -v ".css"
# Should return zero results.
```

---

## PHASE 1 — WebGL Hero Shader (Signature Visual)

**Objective:** Replace the Canvas 2D bouncing-blob gradient with a GPU-rendered WebGL shader that fills 100vw at any screen size.

**Risk:** Medium — WebGL has subtle browser quirks. Test on Safari iOS specifically.

**Estimated time:** 4 hours

### 1.1 Files to create
- `apps/website/components/hero-shader-canvas.tsx` — **NEW** (replaces `HeroGradientCanvas` export from `home-hero-dynamic.tsx`)
- `apps/website/lib/shaders/hero-gradient.glsl.ts` — **NEW** — shader source as TypeScript string exports

### 1.2 Files to modify
- `apps/website/components/home-hero-dynamic.tsx` — **REMOVE** `HeroGradientCanvas` export (keep `HeroRotator`)
- `apps/website/components/home-sections.tsx` — replace import + move gradient out of `<Container>`
- `apps/website/app/globals.css` — update `.hero-gradient-field` positioning

### 1.3 Shader source

Create `apps/website/lib/shaders/hero-gradient.glsl.ts`:

```ts
export const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = `
precision mediump float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color_lime;
uniform vec3 u_color_blue;
uniform vec3 u_color_warm;

// Simplex 2D noise — Ashima Arts (public domain)
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                          dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = v_uv;
  vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
  vec2 p = uv * aspect;

  float t = u_time * 0.08;

  // Two layered noise fields at different scales
  float n1 = snoise(p * 1.2 + vec2(t, t * 0.7));
  float n2 = snoise(p * 2.4 - vec2(t * 0.5, t));
  float n = (n1 * 0.6 + n2 * 0.4) * 0.5 + 0.5;

  // Soft gradient mask from bottom (more colour) to top (white)
  float mask = smoothstep(0.0, 1.0, 1.0 - uv.y);

  // Mix the three brand colours via noise
  vec3 base = vec3(1.0);
  vec3 c1 = mix(base, u_color_lime, smoothstep(0.4, 0.7, n) * mask * 0.55);
  vec3 c2 = mix(c1, u_color_blue, smoothstep(0.55, 0.85, n1) * mask * 0.35);
  vec3 c3 = mix(c2, u_color_warm, smoothstep(0.6, 0.9, n2) * mask * 0.25);

  gl_FragColor = vec4(c3, 1.0);
}
`;
```

### 1.4 React component

Create `apps/website/components/hero-shader-canvas.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "@/lib/shaders/hero-gradient.glsl";

const FPS_CAP = 30;
const RENDER_SCALE = 0.5;

const COLOR_LIME = [187 / 255, 244 / 255, 81 / 255] as const;
const COLOR_BLUE = [79 / 255, 161 / 255, 255 / 255] as const;
const COLOR_WARM = [255 / 255, 248 / 255, 154 / 255] as const;

export function HeroShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!gl) {
      // Fallback: render a static CSS gradient via class
      canvas.classList.add("hero-shader-fallback");
      return;
    }

    // ---- compile shaders ----
    const compile = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // ---- fullscreen quad ----
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // ---- uniforms ----
    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uColorLime = gl.getUniformLocation(program, "u_color_lime");
    const uColorBlue = gl.getUniformLocation(program, "u_color_blue");
    const uColorWarm = gl.getUniformLocation(program, "u_color_warm");

    gl.uniform3fv(uColorLime, COLOR_LIME);
    gl.uniform3fv(uColorBlue, COLOR_BLUE);
    gl.uniform3fv(uColorWarm, COLOR_WARM);

    // ---- lifecycle state ----
    let raf = 0;
    let lastTick = 0;
    let isRunning = false;
    let isVisible = true;
    const frameInterval = 1000 / FPS_CAP;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr * RENDER_SCALE;
      const h = canvas.clientHeight * dpr * RENDER_SCALE;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uResolution, w, h);
      }
    };

    const renderFrame = (time: number) => {
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (time: number) => {
      if (!isRunning) return;
      if (time - lastTick < frameInterval) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastTick = time;
      renderFrame(time);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || isRunning || !isVisible) return;
      isRunning = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(raf);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") stop();
      else if (isVisible) start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();
    if (reduceMotion) {
      renderFrame(0);
    } else {
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-shader-canvas" aria-hidden="true" />;
}
```

### 1.5 CSS updates

Replace existing `.hero-gradient-field`, `.hero-gradient-canvas-shell`, `.hero-gradient-canvas` rules with:

```css
.hero-gradient-field {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  bottom: 1px;
  width: 100vw;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-shader-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  will-change: contents;
}

/* Fallback for browsers without WebGL */
.hero-shader-fallback {
  background:
    radial-gradient(circle at 30% 80%, rgba(187, 244, 81, 0.4), transparent 60%),
    radial-gradient(circle at 70% 70%, rgba(79, 161, 255, 0.35), transparent 60%),
    radial-gradient(circle at 50% 90%, rgba(255, 248, 154, 0.25), transparent 50%);
}

@media (max-width: 809.98px) {
  .hero-gradient-field {
    top: 40%;
  }
}
```

### 1.6 Layout integration

In `home-sections.tsx`, the hero `<Section>` currently nests the gradient field inside `<Container>`. Restructure so gradient sits as a sibling outside container:

```tsx
<Section className="pb-0 pt-[40px] md:pt-[64px] xl:pt-[80px] relative">
  <div className="hero-gradient-field">
    <HeroShaderCanvas />
  </div>

  <Container className="relative max-w-[1600px] z-content">
    {/* existing hero content unchanged */}
  </Container>
</Section>
```

The key change: the gradient field is a sibling of `<Container>`, not a child. Section becomes `position: relative` to anchor it.

### 1.7 Cleanup
- Remove `HeroGradientCanvas` function (lines 88-258) from `home-hero-dynamic.tsx`. Keep `HeroRotator`.
- Remove `.hero-gradient-canvas-shell` and `.hero-gradient-canvas` rules from `globals.css`.
- Update import in `home-sections.tsx`:
  ```tsx
  import { HeroRotator } from "@/components/home-hero-dynamic";
  import { HeroShaderCanvas } from "@/components/hero-shader-canvas";
  ```

### 1.8 Acceptance criteria
- [ ] Gradient fills 100vw on a 1920px monitor (no white space on sides)
- [ ] Gradient fills 100vw on 375px mobile (no horizontal overflow)
- [ ] On reduced-motion: single static frame renders, no animation
- [ ] When scrolled past hero: animation stops (verify via DevTools Performance tab — no `requestAnimationFrame` activity)
- [ ] When tab is hidden: animation stops
- [ ] No console errors in Chrome / Firefox / Safari
- [ ] Lighthouse Performance score does not drop
- [ ] FPS counter shows 30fps stable on M1 MacBook Air

### 1.9 Verification
```bash
# Build must pass
cd "/Users/ravish/Port/Port 26 AI/apps/website"
pnpm build

# Run dev and verify in browser:
pnpm dev
# Open http://localhost:3000
# Open DevTools → Performance → record 5s → confirm <5% CPU usage on gradient

# Open Safari (Mac) and verify shader compiles (Safari has stricter WebGL rules)
```

### 1.10 Known WebGL pitfalls
- **Safari iOS**: requires `precision mediump float;` declaration at top of fragment shader (already in spec above)
- **Mobile GPUs**: may not support `highp` — use `mediump` everywhere
- **Context loss**: when GPU is overcommitted, browser may drop WebGL context. The cleanup `return` in `useEffect` handles unmount, but for context loss specifically add: `canvas.addEventListener("webglcontextlost", (e) => e.preventDefault())` — optional, ship without first
- **Premultiplied alpha**: explicitly set `premultipliedAlpha: false` in `getContext()` options (already in spec)

---

## PHASE 2 — Global Interaction Layer

**Objective:** Build site-wide interaction primitives that elevate every page.

**Risk:** Low — additive features, can be removed individually if they don't feel right.

**Estimated time:** 3 hours

### 2.1 Smooth scroll

In `globals.css`, add to top of file:

```css
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```

**Verification:** click any `#features` / `#about` anchor → smooth scroll instead of jump.

### 2.2 Magnetic button hook

Create `apps/website/hooks/use-magnetic.ts`:

```ts
"use client";

import { useEffect, useRef } from "react";

interface UseMagneticOptions {
  strength?: number;    // 0–1, how much to pull (default 0.3)
  radius?: number;      // px proximity to activate (default 100)
}

export function useMagnetic<T extends HTMLElement = HTMLElement>(
  options: UseMagneticOptions = {}
) {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch / no-hover devices
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let isInRange = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      // Lerp for smoothness
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        el.style.transform = `translate(${currentX}px, ${currentY}px)`;
        raf = requestAnimationFrame(animate);
      } else {
        el.style.transform = currentX === 0 && currentY === 0 ? "" : `translate(${currentX}px, ${currentY}px)`;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < radius + Math.max(rect.width, rect.height) / 2) {
        if (!isInRange) {
          isInRange = true;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(animate);
        }
        targetX = dx * strength;
        targetY = dy * strength;
      } else if (isInRange) {
        isInRange = false;
        targetX = 0;
        targetY = 0;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, radius]);

  return ref;
}
```

### 2.3 Magnetic button wrapper

Create `apps/website/components/magnetic-button.tsx`:

```tsx
"use client";

import { useMagnetic } from "@/hooks/use-magnetic";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
  as?: "div" | "span";
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  radius = 80,
  as: Tag = "span"
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLDivElement>({ strength, radius });
  // @ts-expect-error dynamic tag with forwarded ref
  return <Tag ref={ref} className={className} style={{ display: "inline-block", willChange: "transform" }}>{children}</Tag>;
}
```

**Apply to:**
- Hero "View Selected Work" button — wrap inner `<span>` only (not the `<Link>`)
- Hero "Contact Me" button — same
- Footer "Contact Me" button
- Case study "Send a mail" / "Contact Me" CTAs

**Pattern:**
```tsx
<Link href="/#features">
  <MagneticButton>
    <span className="framer-btn-primary">View Selected Work</span>
  </MagneticButton>
</Link>
```

### 2.4 Scroll-aware navigation

Modify `apps/website/components/site-header.tsx`. Add scroll state:

```tsx
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setIsScrolled(window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

Update header className to use the state:

```tsx
<header className={`
  sticky top-0 z-nav transition-all duration-default ease-out-quart
  ${isScrolled
    ? "bg-white/85 backdrop-blur-[12px] border-b border-border-default"
    : "bg-white/40 backdrop-blur-[6px] border-b border-transparent"
  }
`}>
```

### 2.5 Page transitions

Create `apps/website/components/page-transition.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stage, setStage] = useState<"in" | "idle">("idle");
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      setStage("in");
      const t = setTimeout(() => setStage("idle"), 400);
      previousPath.current = pathname;
      return () => clearTimeout(t);
    }
  }, [pathname]);

  return (
    <div className={`page-transition page-transition--${stage}`}>
      {children}
    </div>
  );
}
```

Add CSS:

```css
.page-transition {
  opacity: 1;
  transition: opacity 0.4s var(--ease-out-quart);
}
.page-transition--in {
  animation: page-fade-in 0.4s var(--ease-out-quart) forwards;
}
@keyframes page-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .page-transition,
  .page-transition--in { animation: none; opacity: 1; }
}
```

Wrap children in `apps/website/app/layout.tsx`:

```tsx
<body>
  <PageTransition>
    <SiteHeader content={homeContent} />
    {children}
  </PageTransition>
</body>
```

### 2.6 Acceptance criteria
- [ ] Anchor links on home (`/#features`, `/#about`) scroll smoothly
- [ ] Magnetic effect works on desktop, disabled on touch devices (test in Chrome DevTools mobile emulation)
- [ ] Magnetic effect disabled when `prefers-reduced-motion` is on (test via DevTools rendering tab)
- [ ] Navbar background opacity / blur changes at 40px scroll
- [ ] Navigating between pages fades smoothly
- [ ] Bundle size increase < 3KB

---

## PHASE 3 — Home Page Section Polish

**Objective:** Each section gets a deliberate motion treatment. Apply GSAP scroll reveals consistently.

**Risk:** Low — additive.

**Estimated time:** 4 hours

### 3.1 Remove CSS `process-card-motion` animation

Delete the entire `.process-card-motion` and `@keyframes process-card-in` rules from `globals.css`. The cards currently animate on page load — wrong. Replace with GSAP ScrollTrigger.

### 3.2 Process section: scroll-triggered animation

In `home-sections.tsx`, the process section already has `<GsapReveal childSelector=".process-row" stagger={0.12}>`. Verify:
- Cards start at `opacity: 0, y: 48, scale: 0.96`
- Animate to `opacity: 1, y: 0, scale: 1` on scroll-in
- Stagger 0.12s between cards
- Alternating slide direction: odd cards from left, even from right

Update `gsap-utils.ts` to add a new preset:

```ts
export const slideAlternate = {
  // Used by .process-row directly — caller selects per-row direction
  from: { opacity: 0, y: 48, willChange: "transform, opacity" },
  to: { opacity: 1, y: 0, duration: 0.85, ease: "expo.out" }
};
```

### 3.3 Process line animation

The vertical guide lines (`.process-line-track`) currently appear full-height. Animate their `height` from 0 → 100% on scroll-in.

Add to `useEffect` in process section (or extend `GsapReveal`):

```tsx
useEffect(() => {
  const tracks = document.querySelectorAll(".process-line-track");
  if (tracks.length === 0) return;
  // ... GSAP scaleY from 0 to 1 with transform-origin top
}, []);
```

### 3.4 Hero mockup parallax

In hero section, the dashboard mockup image gets a subtle Y-axis parallax:

```tsx
const mockupRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!mockupRef.current) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  registerGsap().then((gsap) => {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.to(mockupRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        }
      });
    });
  });
}, []);
```

### 3.5 Work cards — refined hover

Currently the work image has `group-hover:scale-[1.02]`. Upgrade:

```tsx
<Image
  className="aspect-[4/3] h-full w-full object-cover transition-transform duration-slow ease-out-quart group-hover:scale-[1.05]"
  ...
/>
```

Add subtle Y translate to the entire card on hover (CSS):

```css
.work-card { transition: transform 400ms var(--ease-out-quart); }
.work-card:hover { transform: translateY(-4px); }
```

Apply `work-card` class to the work card outer div in `home-sections.tsx`.

### 3.6 Work card image: scroll reveal

Each work card image should scale-up from `0.96 → 1` as it enters viewport:

```tsx
<GsapReveal preset="scaleUp" delay={index * 0.06}>
  <WorkImageCard item={item} />
</GsapReveal>
```

### 3.7 About cards — hover state

Add to experience Card hover:

```css
.card-experience {
  transition: transform 400ms var(--ease-out-quart), box-shadow 400ms var(--ease-out-quart);
}
.card-experience:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px -28px rgba(24, 24, 24, 0.25);
}
```

Logo hover rotation:

```css
.card-experience img { transition: transform 400ms var(--ease-out-quart); }
.card-experience:hover img { transform: rotate(6deg); }
```

### 3.8 Gallery rework

**Current problem:** Two separate DOM trees (mobile `grid-cols-2 md:hidden` + desktop `hidden md:block`).

**New approach:** single responsive grid.

Replace the gallery DOM with:

```tsx
<div className="gallery-grid">
  {content.gallery.map((item, index) => (
    <GsapReveal key={`gallery-${index}`} preset="fadeUp" delay={index * 0.04}>
      <div className={`gallery-item gallery-item-${(index % 4) + 1}`}>
        <Image
          src={item.src}
          alt={item.alt}
          width={600}
          height={600}
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 240px"
          className="h-full w-full object-cover transition-transform duration-slow ease-out-quart hover:scale-105"
        />
      </div>
    </GsapReveal>
  ))}
</div>
```

Add CSS:

```css
.gallery-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  max-width: 640px;
  margin: 0 auto;
}

.gallery-item {
  overflow: hidden;
  border-radius: 9999px;
  aspect-ratio: 1;
}

@media (min-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1000px;
    gap: 16px;
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
}
```

This cuts DOM image elements from ~32 to ~8 (one per image, rendered once).

### 3.9 Footer split-text on scroll

The "Ready to work with me?" headline gets a character-level entrance:

Create simple split utility (avoid GSAP SplitText plugin which is premium). Use `Array.from(text).map`:

```tsx
function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <span key={i} className="inline-block opacity-0 translate-y-4 split-char" style={{ animationDelay: `${i * 20}ms` }} aria-hidden="true">
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
```

CSS:

```css
.split-char {
  animation: split-char-in 0.6s var(--ease-out-quart) forwards;
}
@keyframes split-char-in {
  to { opacity: 1; transform: translateY(0); }
}
```

Trigger on scroll-into-view using `IntersectionObserver` or wrap the section in `<GsapReveal>`.

### 3.10 Acceptance criteria
- [ ] No animations fire on initial load (only on scroll)
- [ ] Hero mockup drifts upward as user scrolls past hero
- [ ] Process cards animate in with alternating directions on scroll
- [ ] Process vertical guide lines draw in on scroll
- [ ] Work cards lift -4px on hover
- [ ] Gallery renders as single grid (verify DOM in inspector: ~8 image elements, not 16+)
- [ ] All hover effects disabled on touch devices (use `@media (hover: hover)`)

---

## PHASE 4 — Case Study Pages Polish

**Objective:** Apply consistent treatment across all 3 case study pages.

**Risk:** Low — additive.

**Estimated time:** 4 hours

### 4.1 Shared: Reading progress bar

Create `apps/website/components/scroll-progress-bar.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? scrolled / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
```

CSS:

```css
.scroll-progress {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: transparent;
  z-index: 50;
  pointer-events: none;
}
.scroll-progress-bar {
  height: 100%;
  background: var(--brand-lime);
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform 0.05s linear;
}
```

Add to each case study page (above `<Section>`):

```tsx
<ScrollProgressBar />
```

### 4.2 Shared: ToC active indicator

Modify `scroll-spy-toc.tsx` (read it first to understand current structure). Add a lime dot before the active item:

```tsx
{isActive && <span className="absolute -left-3 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-brand-lime" />}
```

### 4.3 Shared: Section heading reveals

Wrap each H2 in case studies with `<GsapReveal preset="fadeUp">`. Currently most don't have this. Pattern:

```tsx
<GsapReveal preset="fadeUp" className="...">
  <h2>...</h2>
</GsapReveal>
```

### 4.4 Shared: Image scroll reveal

All case study images (`<FigureBlock>`, `<Image>` direct uses) should scale-up on scroll-in. Add a wrapper:

Create `apps/website/components/case-study/case-figure.tsx`:

```tsx
"use client";

import Image from "next/image";
import { GsapReveal } from "@/components/gsap-reveal";

interface CaseFigureProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export function CaseFigure({ src, alt, caption, width = 1600, height = 900 }: CaseFigureProps) {
  return (
    <GsapReveal preset="scaleUp">
      <figure className="case-figure">
        <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 768px) 100vw, 860px" className="case-figure-image" />
        {caption && <figcaption className="case-figure-caption">{caption}</figcaption>}
      </figure>
    </GsapReveal>
  );
}
```

### 4.5 Onboarding-specific: counter animation

Replace the static `value` strings ("36% increase...") with animated counters. Create `apps/website/components/animated-counter.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;        // target number (e.g. 36)
  suffix?: string;      // e.g. "%"
  prefix?: string;      // e.g. "+"
  duration?: number;    // ms
}

export function AnimatedCounter({ value, suffix = "", prefix = "", duration = 1400 }: AnimatedCounterProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (t: number) => {
          const elapsed = t - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
          setCurrent(Math.round(value * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{prefix}{current}{suffix}</span>;
}
```

In onboarding page, wherever you have "36%" / "37%" / "200%" etc, replace with:

```tsx
<AnimatedCounter value={36} suffix="% increase in sign-up attempt rate" />
```

Or for blended copy:

```tsx
<>
  <AnimatedCounter value={36} suffix="%" /> increase in sign-up attempt rate
</>
```

### 4.6 Dashboard-specific: step progression

The 6 steps each get a vertical progress dot on left margin (desktop) or top (mobile). Add:

```tsx
<aside className="hidden md:block sticky top-32 h-fit">
  <ol className="step-dots">
    {hrmsCaseStudy.steps.map((_, i) => (
      <li key={i} className="step-dot" data-active={activeStep === i} />
    ))}
  </ol>
</aside>
```

Use `IntersectionObserver` to set `activeStep`. CSS:

```css
.step-dots { display: flex; flex-direction: column; gap: 12px; }
.step-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--border-default);
  transition: background 300ms var(--ease-out-quart), transform 300ms var(--ease-out-quart);
}
.step-dot[data-active="true"] {
  background: var(--brand-lime);
  transform: scale(1.4);
}
```

### 4.7 Design system specific: token grid reveal

The documentation modules already form a grid. Add staggered reveal:

```tsx
<GsapReveal preset="fadeUp" childSelector=".token-card" stagger={0.08}>
  {/* token cards inside */}
</GsapReveal>
```

### 4.8 Acceptance criteria
- [ ] Reading progress bar visible at top of every case study page
- [ ] ToC active item shows lime dot
- [ ] All case study images scale-in on scroll
- [ ] Counter animates from 0 to target on viewport entry (onboarding only)
- [ ] No animations fire above the fold on page load — only on scroll
- [ ] Each case study still loads under 115KB First Load JS

---

## PHASE 5 — Performance Pass

**Objective:** Verify all targets met. Audit and fix any regressions.

**Risk:** Low — verification phase.

**Estimated time:** 2 hours

### 5.1 Image audit

Run through every `<Image>` usage and verify:

| Property | Rule |
|---|---|
| `priority` | Only on above-fold images (hero, first work card). Remove from all others. |
| `sizes` | Always set. Match actual rendered size (e.g., 240px gallery, not 100vw). |
| `placeholder="blur"` + `blurDataURL` | Hero image only. Generate via `next/image` build tool or `plaiceholder`. |
| `quality` | Default 75. Acceptable. |
| `loading` | Default lazy (Next.js handles this). Verify no eager loads below-fold. |

For the hero image specifically, generate a blur placeholder. Use `plaiceholder` (~5KB) or just inline a base64 of a 10x10 blurred version:

```tsx
<Image
  src={content.hero.image}
  alt="Dashboard Graphic"
  width={2290}
  height={1474}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."  // 10x10 blurred jpeg
  sizes="..."
/>
```

### 5.2 Font optimisation

Change `font-display` for all three Aileron @font-face rules:

```css
font-display: optional;  /* was: swap */
```

This eliminates FOUT. Aileron loads silently in background; falls back to system font on first paint; applies on next render.

Preload Aileron 600 (most common weight) in `apps/website/app/layout.tsx`:

```tsx
<head>
  <link
    rel="preload"
    href="https://framerusercontent.com/assets/suQ36PpzxORmpGk06KApyPNrO0.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</head>
```

### 5.3 Remove dead code

Delete `apps/website/components/site-footer.tsx` entirely. It returns `null` and is never imported anywhere useful.

```bash
# Verify it's safe to delete:
grep -rn "site-footer\|SiteFooter" apps/website
# If any imports remain, remove them too.
```

### 5.4 Bundle analysis

```bash
cd "/Users/ravish/Port/Port 26 AI/apps/website"
ANALYZE=true pnpm build
```

(Requires `@next/bundle-analyzer` setup in `next.config.mjs`. If not configured, add it:)

```js
import withBundleAnalyzer from "@next/bundle-analyzer";
const baseConfig = { /* existing */ };
export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(baseConfig);
```

Install: `pnpm add -D @next/bundle-analyzer --filter @apps/website`

Verify in the analyser report:
- GSAP is loaded only on pages that use it (dynamic import working)
- WebGL shader code is in the home page bundle only
- No accidental large libraries pulled in

### 5.5 Lighthouse audit

Open Chrome DevTools → Lighthouse → run on:
- `/` (home)
- `/casestudy/dashboard`
- `/casestudy/onboarding`
- `/casestudy/design-system`

Mobile + Desktop. Target scores:
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

Record results in a comment. Fix any items scoring below threshold.

### 5.6 Acceptance criteria
- [ ] First Load JS (home) < 100KB
- [ ] First Load JS (each case study) < 115KB
- [ ] All Lighthouse mobile scores ≥ 90 Performance, ≥ 95 Accessibility
- [ ] No FOUT visible on first load
- [ ] No layout shift > 0.05 (CLS metric in Lighthouse)
- [ ] `SiteFooter` component file deleted

---

## PHASE 6 — Accessibility Pass

**Objective:** WCAG 2.1 AA compliance across all pages.

**Risk:** Medium — may surface contrast issues requiring colour or copy changes.

**Estimated time:** 3 hours

### 6.1 Colour contrast audit

For every text/background pair, verify contrast ratio ≥ 4.5:1 (normal text) or ≥ 3:1 (large text 18px+).

Use a tool: https://webaim.org/resources/contrastchecker/ or Chrome DevTools "Inspect → Accessibility → Contrast".

Known risks:
| Combination | Estimated ratio | Action |
|---|---|---|
| `#181818` on `#BBF451` (lime CTA) | ~10:1 | ✅ Passes |
| `#181818` on `#007AFF` (blue chip) | ~3.2:1 | ⚠️ Borderline. Use white text. |
| `#ffffff` on `#007AFF` | ~4.5:1 | ✅ Passes |
| `#8e8e8e` on `#ffffff` (muted text) | ~3.5:1 | ⚠️ Fails AA for body. Use `#5f5f5f` instead, or reserve `#8e8e8e` only for 18px+ text. |
| `#e0e0e0` on `#181818` (footer subhead) | ~12:1 | ✅ Passes |

**Action items:**
- Audit all `text-[#8e8e8e]` usages in JSX. If applied to body text < 18px, change to `text-text-secondary` (#5f5f5f).
- Verify blue chip foreground colours.

### 6.2 Focus states

Currently the site relies on browser default focus rings. Add explicit focus styles:

```css
@layer base {
  :focus-visible {
    outline: 2px solid var(--brand-blue);
    outline-offset: 3px;
    border-radius: 4px;
  }
  /* Buttons get a more deliberate ring */
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--brand-blue);
    outline-offset: 3px;
  }
}
```

### 6.3 Skip link

Add to `layout.tsx`:

```tsx
<body>
  <a href="#main" className="skip-link">Skip to main content</a>
  <SiteHeader content={homeContent} />
  <main id="main">{children}</main>
</body>
```

CSS:

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 8px;
  background: var(--surface-dark);
  color: var(--text-inverse);
  padding: 12px 20px;
  border-radius: var(--radius-md);
  z-index: 100;
  text-decoration: none;
  font-weight: 600;
  transition: top 200ms var(--ease-out-quart);
}
.skip-link:focus {
  top: 12px;
}
```

### 6.4 Keyboard navigation audit

Tab through every page. Verify:
- All interactive elements reachable
- Tab order is logical (top → bottom, left → right)
- No focus traps
- Mobile menu opens with Enter, closes with Escape (already implemented in `site-header.tsx`)

### 6.5 Screen reader audit

Test with VoiceOver (Mac: Cmd+F5). Verify:
- Hero rotator: announces full sentence, not just current word
- Decorative SVGs: `aria-hidden="true"`
- Images: every `<Image>` has meaningful `alt` (currently good — verified in audit report)
- Headings: hierarchy doesn't skip (H1 → H2 → H3, no H1 → H4)

### 6.6 Reduced motion

Add a global respect rule (already partially present, formalise it):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

This is a blanket safety net. Individual components should already check the media query (WebGL shader, magnetic buttons, GSAP reveals all do).

### 6.7 Acceptance criteria
- [ ] All body text passes WCAG AA (4.5:1)
- [ ] Focus rings visible and consistent
- [ ] Skip link works (Tab on first visit shows it)
- [ ] Tab through home page is fully keyboard-navigable
- [ ] VoiceOver announces all content sensibly
- [ ] All animations stop when reduced-motion is on (test with Chrome DevTools Rendering tab)
- [ ] Lighthouse Accessibility ≥ 95 on all pages

---

## PHASE 7 — Responsiveness Verification

**Objective:** Confirm flawless rendering at every breakpoint.

**Risk:** Low — testing.

**Estimated time:** 2 hours

### 7.1 Viewport matrix

Test every page at these widths in Chrome DevTools device toolbar:

| Width | Profile |
|---|---|
| 375px | iPhone SE / small mobile |
| 414px | iPhone 14 Pro |
| 768px | iPad portrait |
| 1024px | iPad landscape / 13" laptop |
| 1440px | Standard MacBook Pro |
| 1920px | Full HD desktop |
| 2560px | Ultrawide (verify gradient fills) |

### 7.2 Per-page checklist

For each page × each width:
- [ ] No horizontal scroll
- [ ] Hero gradient fills full width
- [ ] Text doesn't orphan (single word on last line)
- [ ] Images don't overflow containers
- [ ] CTAs are tappable (44×44px minimum)
- [ ] Navigation works (hamburger on mobile, links on desktop)
- [ ] Sticky elements stay sticky (ToC on case studies)

### 7.3 Mobile-specific tweaks

Disable / reduce on mobile (`@media (max-width: 767px)`):
- Magnetic buttons → disabled (already gated by `(hover: hover)`)
- Hero mockup parallax → disable (jank-prone on mobile scroll)
- Reading progress bar → keep, but verify it doesn't sit under iOS notch
- Process card alternating slide → use single direction on mobile (always fadeUp)

### 7.4 Touch target audit

Verify on mobile:
- All buttons ≥ 44×44px
- Social icons in footer ≥ 44px tap area (use padding to enlarge if visual icon is smaller)
- Hamburger button ≥ 44px (already 44px per code)
- ToC items ≥ 44px tap height on mobile

### 7.5 Acceptance criteria
- [ ] No layout breaks at any tested width
- [ ] No horizontal overflow anywhere
- [ ] All interactive elements meet touch target minimum on mobile
- [ ] Hero shader visible and animated on all viewports

---

## 📋 Final Verification Checklist

Before declaring complete, verify:

### Functionality
- [ ] Home page loads without errors
- [ ] All 3 case study pages load without errors
- [ ] Hero gradient animates and fills viewport at all sizes
- [ ] All scroll animations trigger on viewport entry, not on load
- [ ] Magnetic buttons feel responsive on desktop
- [ ] Smooth scroll works for anchor links
- [ ] Mobile menu opens / closes correctly
- [ ] All images load (no broken sources)
- [ ] All internal links work (no 404s)

### Performance
- [ ] First Load JS `/` ≤ 100KB
- [ ] First Load JS case studies ≤ 115KB
- [ ] Lighthouse Performance ≥ 90 (mobile + desktop, all pages)
- [ ] No CLS > 0.05
- [ ] Hero shader runs ≥ 30fps

### Accessibility
- [ ] Lighthouse Accessibility ≥ 95 all pages
- [ ] All body text passes WCAG AA contrast
- [ ] Keyboard navigable end-to-end
- [ ] Reduced-motion respected throughout
- [ ] Skip link works

### Responsiveness
- [ ] No horizontal scroll at any tested viewport
- [ ] All breakpoints transition cleanly
- [ ] Touch targets ≥ 44px on mobile

### Build
- [ ] `pnpm build` succeeds with zero errors
- [ ] `npx tsc --noEmit` reports zero errors
- [ ] No ESLint warnings introduced
- [ ] All new files have correct `"use client"` directives

---

## 🚨 Common Pitfalls

### WebGL
- Do NOT use `gl.getError()` in production — it forces sync GPU stalls. Only use for debugging.
- Always check `gl` context is not null before each call (handled in spec).
- Mobile Safari may silently fail shader compile if precision is missing.

### GSAP
- Always dynamically import (`await import("gsap")`) to keep it out of the initial bundle.
- Kill ScrollTriggers in cleanup functions to prevent memory leaks.
- Don't use `gsap.set()` inside render — only inside `useEffect`.

### Next.js
- Image domains must be in `next.config.mjs` `remotePatterns` BEFORE the image is used.
- `priority` is for above-fold only — overuse kills performance.
- Server components can't use `useState`, `useEffect`, refs — mark `"use client"`.

### Tailwind
- After adding tokens to `tailwind.config.ts`, the build needs to restart.
- Class names must be statically detectable (no `bg-${dynamic}` strings).

---

## 🧭 Build Order Summary

```
Phase 0 (Tokens)
  ↓
Phase 1 (WebGL Hero)        ← can be done in parallel with Phase 2 if separating dev work
  ↓
Phase 2 (Interactions)
  ↓
Phase 3 (Home polish)
  ↓
Phase 4 (Case studies)
  ↓
Phase 5 (Performance)
  ↓
Phase 6 (Accessibility)
  ↓
Phase 7 (Responsive verification)
  ↓
Final review + ship
```

**Total estimated time:** 24 hours of focused work. Realistic over 3–4 calendar days with breaks.

---

## 📤 Handoff Notes for the Executing Agent

1. **Read Section 0 carefully** before writing any code — especially file paths, package manager, and conventions.
2. **Use absolute paths** in all file operations. Working directory may drift.
3. **Run `pnpm build` and `npx tsc --noEmit` after every phase** before moving to the next.
4. **If any phase fails the build, STOP and fix** before continuing. Do not stack broken state.
5. **Test in the browser** after Phases 1, 2, 3, 4 — visual verification is essential for animation work.
6. **Commit after each phase** with a descriptive message:
   - `phase 0: design tokens foundation`
   - `phase 1: webgl hero shader`
   - etc.
7. **Do not change copy** beyond what's specified. The audit copy fixes are already shipped.
8. **Do not redesign** the layout. The structure is approved. This is execution layer only.
9. **Ask the owner before** adding any new dependency outside what's in this plan.

---

*Document version: 2.0 · Created 2026-05-13 · For Port 26 Portfolio (`port-26-website.vercel.app`)*
