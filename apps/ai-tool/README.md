# apps/ai-tool

AI tool with a secure server-side API proxy. **Planned — not yet in active development.**

**Status**: Placeholder shell (Next.js scaffold only)  
**Dev port**: 3003

---

## Local development

```bash
npm run dev:ai-tool  # → http://localhost:3003
```

---

## Architecture intent

This app will use Next.js Route Handlers as a secure proxy layer for AI API calls, keeping API keys server-side and never exposed to the browser.

Development will begin once `apps/website` reaches a stable state.

See the root [README.md](../../README.md) for the overall platform roadmap.
