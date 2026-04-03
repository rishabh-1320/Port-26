import { Container } from "@packages/ui";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8 text-sm text-[var(--color-muted)]">
      <Container className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Ravish Studio</p>
        <p>Built with Next.js and deployed on Vercel.</p>
      </Container>
    </footer>
  );
}
