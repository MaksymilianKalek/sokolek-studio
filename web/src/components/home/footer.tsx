import { useTranslation } from 'react-i18next'

const footerLinks = [
  { labelKey: 'nav.services', href: '#services' },
  { labelKey: 'nav.portfolio', href: '#portfolio' },
  { labelKey: 'nav.contact', href: '#contact' },
  { labelKey: 'footer.contact', href: 'mailto:hello@sokolek.com' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer-inverted overflow-hidden bg-ink px-5 pb-6 pt-10 text-paper sm:px-8 lg:px-10">
      <div className="border-t border-paper/16 pt-10 sm:pt-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="space-y-6">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-paper/45">
              {t('common.about')}
            </p>
            <p className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-widest text-paper/38">
              {t('footer.meta')}
              <br />
              {t('footer.location')}
            </p>
          </div>

          <div className="max-w-4xl">
            <p className="font-satoshi text-3xl font-medium leading-[1.02] tracking-[-0.045em] text-paper sm:text-4xl lg:text-5xl">
              {t('footer.heading_main')}{' '}
              <span className="font-serif font-normal italic tracking-[-0.035em]">
                {t('footer.heading_italic')}
              </span>
            </p>
            <p className="mt-8 max-w-2xl font-inter text-base leading-7 text-paper/62">
              {t('footer.description')}
            </p>
            <a
              href="mailto:hello@sokolek.com"
              className="mt-8 inline-flex font-mono text-[10px] font-medium uppercase tracking-widest text-paper/52 outline-none transition-colors duration-500 ease-in-out hover:text-paper focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
            >
              {t('footer.contact')}
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mt-20 select-none text-center font-serif text-[30vw] font-normal italic leading-[0.7] tracking-[-0.09em] text-paper sm:mt-24 sm:text-[23vw] lg:mt-28 lg:text-[18vw]"
        >
          Sokołek
        </div>

        <div className="mt-12 grid gap-8 border-t border-paper/16 pt-6 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-paper/42 sm:grid-cols-[1fr_auto] sm:items-end">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="outline-none transition-colors duration-500 ease-in-out hover:text-paper focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end">
            <p>© 2026 Sokołek Studio</p>
            <p>{t('common.builtIn')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
