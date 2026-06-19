import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { TerminalWordmark } from './terminal-wordmark'

type HeroProps = {
  isIntroActive: boolean
  isIntroDismissing: boolean
  onIntroTypingComplete: () => void
  startTyping: boolean
}

function getSecondWordAxisPrefix(value: string) {
  const firstSpaceIndex = value.indexOf(' ')

  if (firstSpaceIndex === -1) {
    return ''
  }

  return value.slice(0, firstSpaceIndex + 1)
}

export function Hero({
  isIntroActive,
  isIntroDismissing,
  onIntroTypingComplete,
  startTyping,
}: HeroProps) {
  const { i18n, t } = useTranslation()
  const heroTitle = t('hero.title')
  const studioAxisPrefix = getSecondWordAxisPrefix(heroTitle)
  const studioAxisMeasureRef = useRef<HTMLSpanElement>(null)
  const [studioAxis, setStudioAxis] = useState<number | null>(null)
  const navItems = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.contact'), href: '#contact' },
  ]
  const activeLanguage = i18n.language.startsWith('en') ? 'en' : 'pl'
  const heroGridStyle = studioAxis
    ? ({ '--studio-axis': `${studioAxis}px` } as CSSProperties)
    : undefined

  useEffect(() => {
    const measureNode = studioAxisMeasureRef.current

    if (!measureNode || studioAxisPrefix.length === 0) {
      return
    }

    const updateStudioAxis = () => {
      setStudioAxis(Math.ceil(measureNode.getBoundingClientRect().width))
    }
    const resizeObserver = new ResizeObserver(updateStudioAxis)

    updateStudioAxis()
    resizeObserver.observe(measureNode)
    window.addEventListener('resize', updateStudioAxis)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateStudioAxis)
    }
  }, [studioAxisPrefix])

  return (
    <section className="relative flex min-h-svh flex-col px-5 py-5 sm:min-h-dvh sm:px-8 lg:px-10">
      <header className="flex items-center justify-between gap-6">
        <div
          aria-label={heroTitle}
          className="inline-flex size-9 items-center justify-center sm:size-10"
        >
          <img
            src="/logo.svg"
            alt=""
            width="77"
            height="78"
            className="h-full w-full"
          />
        </div>

        <nav aria-label="Main navigation" className="hidden items-center gap-7 sm:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="interactive-accent-link focus-ring nav-text text-ink-soft"
            >
              {item.label}
            </a>
          ))}
          <div
            aria-label={t('nav.language')}
            className="nav-text flex items-center gap-2 text-ink-muted"
          >
            {(['pl', 'en'] as const).map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => i18n.changeLanguage(language)}
                className={`interactive-accent-link focus-ring cursor-pointer ${
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
          <h1 aria-label={heroTitle} className="relative font-satoshi">
            <span
              ref={studioAxisMeasureRef}
              aria-hidden="true"
              className="hero-wordmark pointer-events-none absolute left-0 top-0 -z-10 whitespace-pre opacity-0"
            >
              {studioAxisPrefix}
            </span>
            <TerminalWordmark
              key={heroTitle}
              isActive={startTyping}
              isIntroActive={isIntroActive}
              isOnIntroCurtain={isIntroActive && !isIntroDismissing}
              onTyped={onIntroTypingComplete}
              word={heroTitle}
            />
          </h1>
        </div>

        <div
          className="grid gap-y-8 pt-4 md:grid-cols-[minmax(0,var(--studio-axis,1.1fr))_minmax(18rem,1fr)_auto] md:items-start"
          style={heroGridStyle}
        >
          <p className="heading-sm max-w-2xl text-ink">
            {t('hero.subtitle')}
          </p>

          <p className="body-copy max-w-md">
            {t('hero.description')}
          </p>

          <a
            href="mailto:hello@sokolek.com"
            className="primary-cta focus-ring action-text group inline-flex w-fit items-center gap-3 px-5 py-3 md:ml-8"
          >
            <span className="relative z-10">{t('common.startProject')}</span>
            <ArrowUpRight className="primary-cta-icon relative z-10 size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
