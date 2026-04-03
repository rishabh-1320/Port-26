# Vercel Project Matrix

| Project | Root Directory | Purpose | Required Env Vars |
|---|---|---|---|
| Website | `apps/website` | Public website | `WEBSITE_API_BASE_URL` |
| Website API | `services/website-api` | Separate backend for website content | none |
| Web App | `apps/webapp` | Secondary app shell | none |
| AI Tool | `apps/ai-tool` | Optional AI interface + proxy API | `OPENAI_API_KEY` (+ optional model/rate vars) |
