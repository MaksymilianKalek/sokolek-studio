import { useTranslation } from 'react-i18next'
import { Contact } from './contact'

const footerLinks = [
  { labelKey: 'nav.services', href: '#services' },
  { labelKey: 'nav.portfolio', href: '#portfolio' },
  { labelKey: 'nav.contact', href: '#contact' },
]

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer-inverted overflow-hidden bg-ink px-5 pb-6 text-paper sm:px-8 lg:px-10">
      <div className="site-container">
        <Contact inverted />
        <div className="grid gap-8 text-paper/42 sm:grid-cols-[1fr_auto] sm:items-end">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-text interactive-accent-link focus-ring-inverted transition-colors hover:text-paper"
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
