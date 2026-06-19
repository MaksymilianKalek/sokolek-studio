type SectionLabelProps = {
  children: string
  className?: string
}

export function SectionLabel({ children, className = 'text-ink-muted' }: SectionLabelProps) {
  return <p className={`meta-text tracking-[0.24em] ${className}`}>{children}</p>
}
