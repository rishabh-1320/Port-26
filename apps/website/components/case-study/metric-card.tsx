import { Card } from "@packages/ui";

export function MetricCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="border-white bg-white/90 p-5 md:p-6">
      <p className="text-h2 font-semibold tracking-tight text-[var(--text-primary)]">{value}</p>
      <p className="mt-2 text-body-sm text-[var(--text-muted)]">{label}</p>
    </Card>
  );
}
