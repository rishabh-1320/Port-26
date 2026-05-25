export function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-eyebrow font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">{title}</p>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-primary)] md:text-base">{value}</p>
    </div>
  );
}
