type SectionLabelProps = {
  children: string
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-ink-muted">
      {children}
    </p>
  )
}
