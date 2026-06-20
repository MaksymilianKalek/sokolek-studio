import { type CSSProperties, useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ShaderGradientBackground } from '../shader-gradient-background'
import { TerminalWordmark } from './terminal-wordmark'

type HeroProps = {
  isIntroActive: boolean
  isIntroComplete: boolean
  onIntroTypingComplete: () => void
  startTyping: boolean
}

function LanguageSwitch() {
  const { i18n, t } = useTranslation()
  const activeLanguage = i18n.language.startsWith('en') ? 'en' : 'pl'

  return (
    <div
      aria-label={t('nav.language')}
      className="flex items-center gap-2 font-mono text-base font-medium leading-[1.1] tracking-[-0.025em] text-ink-muted"
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
  )
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
  isIntroComplete,
  onIntroTypingComplete,
  startTyping,
}: HeroProps) {
  const { t } = useTranslation()
  const heroTitle = t('hero.title')
  const studioAxisPrefix = getSecondWordAxisPrefix(heroTitle)
  const studioAxisMeasureRef = useRef<HTMLSpanElement>(null)
  const [studioAxis, setStudioAxis] = useState<number | null>(null)
  const navItems = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.contact'), href: '#contact' },
  ]
  const heroGridStyle = studioAxis
    ? ({ '--studio-axis': `${studioAxis}px` } as CSSProperties)
    : undefined
  const introRevealClassName = isIntroComplete
    ? 'opacity-100 translate-y-0'
    : 'pointer-events-none opacity-0 translate-y-3'

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
    <section className="hero-shader-shell relative flex min-h-svh flex-col overflow-hidden px-5 py-5 sm:min-h-dvh sm:px-8 lg:px-10">
      <ShaderGradientBackground />

      <header
        className={`relative z-10 flex items-center justify-between gap-6 transition-all duration-700 ease-[var(--ease-expressive)] ${introRevealClassName}`}
      >
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

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 font-mono text-base font-medium leading-[1.1] tracking-[-0.025em] sm:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="interactive-accent-link focus-ring text-ink-soft"
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitch />
        </nav>

        <div className="sm:hidden">
          <LanguageSwitch />
        </div>
      </header>

      <div
        id="top"
        className="flex flex-1 flex-col pb-12 pt-16 sm:justify-end sm:gap-10 sm:pb-14 sm:pt-28 lg:pb-16"
      >
        <div className="flex min-h-0 flex-1 flex-col justify-center sm:flex-none sm:justify-start">
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
                onTyped={onIntroTypingComplete}
                word={heroTitle}
              />
            </h1>

            <p
              className={`heading-sm relative z-10 mt-6 max-w-2xl text-[2.125rem] leading-[1.04] text-ink transition-all duration-700 ease-[var(--ease-expressive)] sm:hidden ${introRevealClassName}`}
            >
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        <div
          className={`relative z-10 grid gap-y-6 transition-all duration-700 ease-[var(--ease-expressive)] md:grid-cols-[minmax(0,var(--studio-axis,1.1fr))_minmax(18rem,1fr)_auto] md:items-start md:gap-y-8 md:pt-4 ${introRevealClassName}`}
          style={heroGridStyle}
        >
          <p className="heading-sm hidden max-w-2xl text-[2.125rem] leading-[1.04] text-ink sm:block sm:text-[clamp(1.875rem,4vw,3rem)] sm:leading-[1.1]">
            {t('hero.subtitle')}
          </p>

          <p className="body-copy max-w-md text-[1.0625rem] leading-[1.14] sm:text-base sm:leading-[1.1]">
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
