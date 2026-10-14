import { useTranslation } from 'react-i18next'
import { Contact } from './contact'

const footerLinks = [
  { labelKey: 'nav.services', href: '/#services' },
  { labelKey: 'nav.portfolio', href: '/portfolio' },
  { labelKey: 'common.about', href: '/#founder-background' },
  { labelKey: 'nav.contact', href: '/#contact' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="surface-dark site-gutter overflow-hidden pb-6">
      <div className="site-container">
        <Contact embedded />
        <div className="grid gap-8 text-ink-muted sm:grid-cols-[1fr_auto] sm:items-end">
          <nav
            aria-label={t('nav.footerLabel')}
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-text interactive-accent-link focus-ring transition-colors hover:text-ink"
              >
                {t(link.labelKey)}
              </a>
            ))}
          </nav>

          <div className="flex flex-wrap gap-x-6 gap-y-3 sm:justify-end">
            <p className="nav-text">© 2026 Sokołek Studio</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
