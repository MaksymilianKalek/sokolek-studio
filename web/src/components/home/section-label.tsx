type SectionLabelProps = {
  children: string
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="font-mono text-[10px] uppercase leading-relaxed tracking-widest text-current">
      [{children}]
    </div>
  )
}
