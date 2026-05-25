type StatusBarProps = {
  text: string;
};

export function StatusBar({ text }: StatusBarProps) {
  return (
    <div className="flex items-center justify-center border-b border-[var(--border-default)] bg-[var(--surface-soft)] px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#34c759]" aria-hidden="true" />
        <p className="text-xs font-medium tracking-[-0.01em] text-[var(--text-secondary)]">{text}</p>
      </div>
    </div>
  );
}
