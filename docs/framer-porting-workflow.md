# Framer Porting Workflow

## Fast path options

### Option A: Export-assisted

1. In Framer, use data portability/export features available in your account.
2. Keep exported assets/content in `docs/` or project assets folder.
3. Rebuild into reusable React components in `apps/website`.

### Option B: Mirror-assisted (free)

1. Mirror your published Framer site:

```bash
./scripts/mirror-framer.sh https://your-site.framer.website ./tmp/framer-mirror
```

2. Use mirrored output as source-of-truth reference for:
- text copy
- asset filenames
- route structure
- layout spacing

3. Rebuild in Next.js. Do not deploy mirrored HTML directly as final product.

## Recommended rebuild sequence

1. Header + footer
2. Homepage hero and top sections
3. Internal pages (work/about/contact)
4. Motion and polish
5. SEO metadata and accessibility pass

## What to replace first in this repo

- `services/website-api/lib/content.ts` with your real content.
- `apps/website/components/home-sections.tsx` with your Framer-equivalent sections.
- `apps/website/app/[slug]/page.tsx` section rendering for each migrated page.
