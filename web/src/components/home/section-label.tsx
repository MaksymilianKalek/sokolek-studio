type SectionLabelProps = {
  children: string
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="font-inter text-xs font-medium uppercase tracking-[0.24em] text-ink-muted">
      {children}
    </p>
  )
}
