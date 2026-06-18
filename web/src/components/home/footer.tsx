import { ArrowUpRight } from 'lucide-react'
import { DataItem, DataReveal, MaskTextReveal } from './motion-primitives'

export function Footer() {
  return (
    <footer
      id="contact"
      className="grid min-h-[82dvh] bg-paper text-ink md:grid-cols-[30%_70%]"
    >
      <aside className="grid content-between px-5 py-10 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-neutral-500 sm:px-8 lg:px-10">
        <DataReveal className="grid gap-3">
          <DataItem>[CONTACT]</DataItem>
          <DataItem>[INTAKE: OPEN]</DataItem>
        </DataReveal>

        <DataReveal className="grid gap-4" delay={0.55}>
          <DataItem>
            <a
              href="mailto:hello@sokolek.com"
              className="group inline-flex w-fit gap-3 border-b border-ink pb-2 text-ink outline-none transition-colors hover:border-[var(--color-brand-orange)] focus-visible:ring-2 focus-visible:ring-ink"
            >
              [HELLO@SOKOLEK.COM]
              <ArrowUpRight className="size-4" />
            </a>
          </DataItem>
          <DataItem>[POZNAŃ / 2026]</DataItem>
        </DataReveal>
      </aside>

      <div className="px-5 py-16 sm:px-8 lg:px-10">
        <h2 className="font-satoshi text-6xl font-medium leading-none tracking-tighter text-ink md:text-[7vw]">
          <MaskTextReveal>Build the thing</MaskTextReveal>
          <MaskTextReveal delay={0.12}>that refuses the</MaskTextReveal>
          <MaskTextReveal delay={0.24}>
            <span className="font-serif italic tracking-normal">template.</span>
          </MaskTextReveal>
        </h2>
      </div>
    </footer>
  )
}
