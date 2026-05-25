export function CaseCtaLabel({ label }: { label: string }) {
  return (
    <>
      <span>{label}</span>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="case-cta-icon">
        <path d="M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
