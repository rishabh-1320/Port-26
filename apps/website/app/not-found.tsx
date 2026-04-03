import Link from "next/link";
import { Button, Container, Section } from "@packages/ui";

export default function NotFound() {
  return (
    <Section>
      <Container className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-muted)]">404</p>
        <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-[var(--color-muted)]">This route is not configured yet.</p>
        <div className="mt-8">
          <Link href="/">
            <Button>Back Home</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
