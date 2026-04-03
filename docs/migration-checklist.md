# Migration Checklist (Website First)

## 1) Framer freeze and export

- Freeze Framer content edits during migration window.
- Export/download all assets: images, icons, fonts, videos.
- Copy SEO metadata per page (title, description, social preview text).
- Save screenshot baselines for desktop and mobile.

## 2) Content mapping

- Map Framer pages to Next.js routes:
  - Home -> `/`
  - Work -> `/work`
  - About -> `/about`
  - Contact -> `/contact`
- Put canonical content in `services/website-api/lib/content.ts`.

## 3) Build and verify website

- Update theme and components in `apps/website` to match Framer.
- Validate route rendering and responsive behavior.
- Validate `/robots.txt` and `/sitemap.xml`.

## 4) Backend checks

- Verify `GET /health` returns `{ ok: true }`.
- Verify `GET /api/site-config` returns nav and headline data.
- Verify `GET /api/pages/:slug` returns page payload or 404.

## 5) Deploy

- Deploy `services/website-api` first.
- Set `WEBSITE_API_BASE_URL` in `apps/website` project.
- Deploy `apps/website` and verify live integration.

## 6) Phase progression

- Phase 2: `apps/webapp` static shell -> deployment.
- Phase 3: `apps/ai-tool` with `OPENAI_API_KEY` -> deployment.
