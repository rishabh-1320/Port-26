import { Card, Container, Section } from "@packages/ui";

const modules = [
  {
    title: "Dashboard",
    body: "Placeholder module for account overview and analytics."
  },
  {
    title: "Settings",
    body: "Configure profile, preferences, and feature flags."
  },
  {
    title: "Activity",
    body: "Track timeline events and recent actions in one place."
  }
];

export default function WebAppHome() {
  return (
    <Section className="min-h-screen py-16">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight">Web App v1 Shell</h1>
        <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
          This static-first app is ready for the second migration phase. You can add auth, data, and forms later without
          restructuring deployment.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {modules.map((module) => (
            <Card key={module.title}>
              <h2 className="text-lg font-semibold">{module.title}</h2>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{module.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
