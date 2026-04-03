import { Container, Section } from "@packages/ui";
import { ChatPanel } from "@/components/chat-panel";

export default function AiToolHome() {
  return (
    <Section className="min-h-screen py-16">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">AI Tool (Phase 3)</h1>
        <p className="mt-4 text-[var(--color-muted)]">
          This app uses a backend proxy route so your API key stays server-side. Add `OPENAI_API_KEY` in Vercel before
          production use.
        </p>
        <div className="mt-8">
          <ChatPanel />
        </div>
      </Container>
    </Section>
  );
}
