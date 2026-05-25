# apps/website

The main public portfolio site for Rishabh Choudhary. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and GSAP.

**Status**: Active — primary workspace  
**Live URL**: https://port-26-website.vercel.app

---

## Local development

Run from the **repo root**:

```bash
npm install          # install all workspace deps (run once)
npm run dev:website  # → http://localhost:3000
```

Or run directly from this directory:

```bash
cd apps/website
npm run dev
```

---

## Key directories

```
apps/website/
├── app/               # Next.js App Router (pages and layouts)
│   ├── page.tsx       # Homepage
│   └── casestudy/     # Case study pages (dashboard, onboarding, design-system)
├── components/        # React components
│   └── case-study/    # Components used only in case study pages
├── lib/               # All site content as typed data + utilities
│   ├── site-content.ts           # Homepage content
│   ├── onboarding-case-study.ts  # Lingobase case study content
│   ├── design-system-case-study.ts
│   └── types.ts
├── hooks/             # Custom React hooks
└── public/            # Static assets (case study images, videos)
```

See [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md) for the full codebase guide.

---

## Updating content

All site text, images, and structured data lives in `apps/website/lib/`. You never need to touch component files to update content.

| What you want to change | File to edit |
|-------------------------|-------------|
| Homepage text, hero, work cards | `lib/site-content.ts` |
| HRMS dashboard case study | `lib/site-content.ts` (hrmsCaseStudy) |
| Lingobase onboarding case study | `lib/onboarding-case-study.ts` |
| Plasma design system case study | `lib/design-system-case-study.ts` |

---

## Adding a new case study

1. Add assets to `public/case-study/<slug>/`
2. Create `lib/<slug>-case-study.ts` with typed content
3. Create `app/casestudy/<slug>/page.tsx` to render it
4. Add a work card to `homeContent.works` in `lib/site-content.ts`

---

## Environment variables

```bash
NEXT_PUBLIC_SITE_URL=https://your-website.vercel.app
WEBSITE_API_BASE_URL=https://your-api.vercel.app
```

Copy `.env.example` at the repo root to `.env.local` here.

---

## Deployment

Deployed as a standalone Vercel project with root directory `apps/website`.  
Requires `WEBSITE_API_BASE_URL` to be set to the live URL of `services/website-api`.

See [`docs/github-vercel-setup.md`](../../docs/github-vercel-setup.md) for the full deployment guide.
