export function CaseFigurePlaceholder({ description, caption }: { description: string; caption?: string }) {
  return (
    <figure className="my-8">
      <div
        className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[var(--border-strong)]"
        style={{
          background:
            "linear-gradient(135deg, var(--surface-soft) 0%, #ffffff 50%, var(--surface-muted) 100%)",
        }}
      >
        {/* subtle grid pattern */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative flex flex-col items-center gap-4 px-8 text-center">
          {/* image icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 ring-1 ring-[var(--border-default)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[var(--text-muted)]" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M21 15l-4.5-4.5L7 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="max-w-md text-[13px] font-medium leading-relaxed text-[var(--text-secondary)] md:text-sm">
            {description}
          </p>

          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Visual pending
          </span>
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-center text-[13px] italic text-[var(--text-muted)] md:text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
