import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { cx } from '../lib/class-names'

type SiteHeaderProps = {
  className?: string
  logoSrc?: string
  navigationClassName?: string
  onDesktopNavOffsetChange?: (offset: number) => void
}

const portfolioNavItem = { labelKey: 'nav.portfolio', href: '/portfolio' }

const navItems = [
  { labelKey: 'nav.services', href: '/#services' },
  portfolioNavItem,
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
      className="desktop-nav-item nav-text interactive-accent-link focus-ring cursor-pointer text-ink"
    >
      {nextLanguage.toUpperCase()}
    </button>
  )
}

export function SiteHeader({
  className = '',
  logoSrc = '/logo_new.svg',
  navigationClassName = '',
  onDesktopNavOffsetChange,
}: SiteHeaderProps) {
  const { t } = useTranslation()
  const headerRef = useRef<HTMLElement>(null)
  const desktopNavRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const desktopNav = desktopNavRef.current

    if (!header || !desktopNav || !onDesktopNavOffsetChange) {
      return
    }

    const updateOffset = () => {
      if (desktopNav.getClientRects().length === 0) {
        return
      }

      const offset = desktopNav.getBoundingClientRect().left - header.getBoundingClientRect().left
      onDesktopNavOffsetChange(Math.round(offset))
    }
    const resizeObserver = new ResizeObserver(updateOffset)

    resizeObserver.observe(header)
    resizeObserver.observe(desktopNav)
    updateOffset()

    return () => resizeObserver.disconnect()
  }, [onDesktopNavOffsetChange])

  return (
    <header ref={headerRef} className={cx('relative z-10 flex items-center justify-between gap-6', className)}>
      <a href="/" aria-label="Sokołek Studio" className="focus-ring">
        <img
          src={logoSrc}
          alt=""
          className="h-auto w-10"
        />
      </a>

      <nav
        ref={desktopNavRef}
        aria-label={t('nav.mainLabel')}
        className={cx('nav-text hidden items-center gap-7 sm:flex', navigationClassName)}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="desktop-nav-item interactive-accent-link focus-ring text-ink-soft"
          >
            {t(item.labelKey)}
          </a>
        ))}
        <LanguageSwitch />
      </nav>

      <div className={cx('nav-text flex items-center gap-5 sm:hidden', navigationClassName)}>
        <a
          href={portfolioNavItem.href}
          className="interactive-accent-link focus-ring text-ink-soft"
        >
          {t(portfolioNavItem.labelKey)}
        </a>
        <LanguageSwitch />
      </div>
    </header>
  )
}
