import { useTranslation } from 'react-i18next'
import { cx } from '../lib/class-names'

type SiteHeaderProps = {
  className?: string
  logoSrc?: string
}

const navItems = [
  { labelKey: 'nav.services', href: '/#services' },
  { labelKey: 'nav.portfolio', href: '/realizacje' },
  { labelKey: 'common.about', href: '/#founder-background' },
  { labelKey: 'nav.contact', href: '/#contact' },
]

export function LanguageSwitch() {
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language
  const nextLanguage = currentLanguage.startsWith('en') ? 'pl' : 'en'

  return (
    <button
      aria-label={t('nav.language')}
      type="button"
      onClick={() => i18n.changeLanguage(nextLanguage)}
      className="nav-text interactive-accent-link focus-ring cursor-pointer text-ink"
    >
      {nextLanguage.toUpperCase()}
    </button>
  )
}

export function SiteHeader({
  className = '',
  logoSrc = '/logo_new.svg',
}: SiteHeaderProps) {
  const { t } = useTranslation()

  return (
    <header className={cx('relative z-10 flex items-center justify-between gap-6', className)}>
      <a href="/" aria-label="Sokołek Studio" className="focus-ring">
        <img
          src={logoSrc}
          alt=""
          className="h-auto w-10"
        />
      </a>

      <nav
        aria-label="Main navigation"
        className="nav-text hidden items-center gap-7 sm:flex"
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="interactive-accent-link focus-ring text-ink-soft"
          >
            {t(item.labelKey)}
          </a>
        ))}
        <LanguageSwitch />
      </nav>

      <div className="sm:hidden">
        <LanguageSwitch />
      </div>
    </header>
  )
}
