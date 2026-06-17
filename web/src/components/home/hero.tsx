import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { TerminalWordmark } from './terminal-wordmark'

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col px-5 py-5 sm:px-8 lg:px-10">
      <header className="flex items-center justify-between gap-6">
        <a
          href="#top"
          className="font-satoshi text-sm font-semibold tracking-tight outline-none transition-opacity hover:opacity-60 focus-visible:ring-2 focus-visible:ring-ink"
        >
          Sokołek
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-inter text-sm text-ink-soft outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div
        id="top"
        className="flex flex-1 flex-col justify-end gap-10 pb-10 pt-28 sm:pb-14 lg:pb-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[94rem]"
        >
          <p className="mb-5 font-inter text-xs font-medium uppercase tracking-[0.24em] text-ink-muted">
            Boutique design and AI services studio
          </p>
          <h1 aria-label="Sokołek Studio" className="font-satoshi">
            <TerminalWordmark />
          </h1>
        </motion.div>

        <div className="grid gap-8 border-t border-line pt-6 md:grid-cols-[1.1fr_0.9fr_auto] md:items-end">
          <p className="max-w-2xl font-satoshi text-2xl font-medium leading-[1.06] tracking-[-0.035em] text-ink sm:text-4xl md:text-5xl">
            We design sharp brands, AI-enabled interfaces, and web systems for founders who
            care about the last five percent.
          </p>

          <p className="max-w-md font-inter text-base leading-7 text-ink-soft">
            Quiet strategy, distinctive visuals, and senior engineering in one compact team.
            No bloated process. No generic templates. Just useful digital craft.
          </p>

          <a
            href="mailto:hello@sokolek.com"
            className="group relative inline-flex w-fit items-center gap-3 px-5 py-3 font-inter text-sm font-medium text-ink outline-none transition-colors before:absolute before:inset-0 before:ring-1 before:ring-ink before:transition-opacity hover:text-paper hover:before:opacity-0 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          >
            <span className="accent-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10">Start a project</span>
            <ArrowUpRight className="relative z-10 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
