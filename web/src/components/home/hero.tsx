import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { TerminalWordmark } from './terminal-wordmark'

export function Hero() {
  const { i18n, t } = useTranslation()
  const navItems = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.contact'), href: '#contact' },
  ]
  const activeLanguage = i18n.language.startsWith('en') ? 'en' : 'pl'

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
              className="font-mono text-[10px] uppercase tracking-widest text-ink-soft outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ink"
            >
              {item.label}
            </a>
          ))}
          <div
            aria-label={t('nav.language')}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted"
          >
            {(['pl', 'en'] as const).map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => i18n.changeLanguage(language)}
                className={`outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ink ${
                  activeLanguage === language ? 'text-ink' : 'text-ink-muted'
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <div
        id="top"
        className="flex flex-1 flex-col justify-end gap-10 pb-10 pt-28 sm:pb-14 lg:pb-16"
      >
        <div className="max-w-[94rem]">
          <p className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-ink-muted">
            {t('hero.subtitle')}
          </p>
          <h1 aria-label={t('hero.title')} className="font-satoshi">
            <TerminalWordmark key={t('hero.title')} word={t('hero.title')} />
          </h1>
        </div>

        <div className="grid gap-8 border-t border-line pt-6 md:grid-cols-[1.1fr_0.9fr_auto] md:items-end">
          <p className="max-w-2xl font-satoshi text-2xl font-medium leading-[1.06] tracking-[-0.035em] text-ink sm:text-4xl md:text-5xl">
            {t('hero.subtitle')}
          </p>

          <p className="max-w-md font-inter text-base leading-7 text-ink-soft">
            {t('hero.description')}
          </p>

          <a
            href="mailto:hello@sokolek.com"
            className="group relative inline-flex w-fit items-center gap-3 px-5 py-3 font-mono text-[10px] font-medium uppercase tracking-widest text-ink outline-none transition-colors duration-700 ease-in-out before:absolute before:inset-0 before:ring-1 before:ring-ink before:transition-opacity before:duration-700 before:ease-in-out hover:text-paper hover:before:opacity-0 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          >
            <span className="accent-gradient absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />
            <span className="relative z-10">{t('common.startProject')}</span>
            <ArrowUpRight className="relative z-10 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
