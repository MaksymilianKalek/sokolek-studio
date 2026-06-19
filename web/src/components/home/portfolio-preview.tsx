import { type PointerEvent, useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type PortfolioPreviewProps = {
  onActiveChange: (isActive: boolean) => void
}

export function PortfolioPreview({ onActiveChange }: PortfolioPreviewProps) {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [portfolioCursor, setPortfolioCursor] = useState({
    isVisible: false,
    x: 0,
    y: 0,
  })
  const specs = [
    {
      label: t('portfolio.dogTok.labels.client'),
      value: t('portfolio.dogTok.data.client'),
    },
    {
      label: t('portfolio.dogTok.labels.industry'),
      value: t('portfolio.dogTok.data.industry'),
    },
    {
      label: t('portfolio.dogTok.labels.stack'),
      value: t('portfolio.dogTok.data.stack'),
    },
    {
      label: t('portfolio.dogTok.labels.year'),
      value: t('portfolio.dogTok.data.year'),
    },
  ]

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const mobileQuery = window.matchMedia('(max-width: 767px)')
    let observer: IntersectionObserver | null = null

    const observeSection = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        ([entry]) => {
          onActiveChange(entry.isIntersecting)
        },
        {
          rootMargin: mobileQuery.matches ? '-52% 0px -32% 0px' : '-65% 0px -35% 0px',
          threshold: 0,
        },
      )
      observer.observe(section)
    }

    observeSection()
    mobileQuery.addEventListener('change', observeSection)

    return () => {
      mobileQuery.removeEventListener('change', observeSection)
      observer?.disconnect()
      onActiveChange(false)
    }
  }, [onActiveChange])

  const showPortfolioCursor = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') {
      return
    }

    setPortfolioCursor({
      isVisible: true,
      x: event.clientX,
      y: event.clientY,
    })
  }

  const movePortfolioCursor = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') {
      return
    }

    setPortfolioCursor((currentCursor) => ({
      ...currentCursor,
      x: event.clientX,
      y: event.clientY,
    }))
  }

  const hidePortfolioCursor = () => {
    setPortfolioCursor((currentCursor) => ({
      ...currentCursor,
      isVisible: false,
    }))
  }

  return (
    <section
      ref={sectionRef}
      className="site-section-compact bg-paper text-ink"
    >
      <div id="portfolio" className="site-container site-anchor">
        <Reveal>
          <SectionLabel>{t('portfolio.label')}</SectionLabel>
        </Reveal>

        <Reveal>
          <h2 className="heading-md mt-8 max-w-6xl text-ink">
            {t('portfolio.heading')}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <article className="mt-10 grid items-stretch overflow-hidden lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="relative h-[20rem] overflow-hidden text-paper sm:h-[24rem] lg:h-[30rem]">
              <a
                href="https://dogtok.pl"
                target="_blank"
                rel="noreferrer"
                aria-label={`${t('common.visitLiveSite')}: ${t('portfolio.dogTok.subtitle')}`}
                onPointerEnter={showPortfolioCursor}
                onPointerMove={movePortfolioCursor}
                onPointerLeave={hidePortfolioCursor}
                onPointerCancel={hidePortfolioCursor}
                className="focus-ring group/image relative block h-full overflow-hidden lg:cursor-none"
              >
                <img
                  src="/portfolio/dogtok-screenshot-1600.webp"
                  srcSet="/portfolio/dogtok-screenshot-1600.webp 1600w, /portfolio/dogtok-screenshot-2400.webp 2400w, /portfolio/dogtok-screenshot-3200.webp 3200w"
                  sizes="(min-width: 1024px) 52vw, calc(100vw - 2.5rem)"
                  alt={`${t('portfolio.dogTok.subtitle')} website designed and developed by Sokołek Studio`}
                  width="1600"
                  height="766"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="portfolio-image-dim absolute inset-0 bg-ink-fixed/0 group-hover/image:bg-ink-fixed/18 group-focus-visible/image:bg-ink-fixed/18"
                />
              </a>
            </div>

            <div className="flex flex-col justify-between gap-10 pt-8 lg:pt-0">
              <div>
                <h3 className="heading-sm tracking-[-0.045em]">
                  {t('portfolio.dogTok.subtitle')}
                </h3>
                <p className="body-copy mt-5">
                  {t('portfolio.dogTok.summary')}
                </p>
                <dl className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="meta-text tracking-[0.2em] text-ink-muted">
                        {spec.label}
                      </dt>
                      <dd className="meta-text mt-2 text-ink-soft">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <a
                  href="https://dogtok.pl"
                  target="_blank"
                  rel="noreferrer"
                  className="action-text focus-ring group inline-flex w-fit items-center gap-3 py-3 text-ink"
                >
                  <span className="interactive-accent-link pb-0.5">
                    {t('common.visitLiveSite')}
                  </span>
                  <ArrowUpRight className="interactive-link-icon size-4" />
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden lg:block"
        style={{
          transform: `translate3d(${portfolioCursor.x}px, ${portfolioCursor.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <span
          className={`flex size-10 items-center justify-center ${
            portfolioCursor.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `scale(${portfolioCursor.isVisible ? 1 : 0.92})`,
            transitionDuration: 'var(--motion-fast)',
            transitionTimingFunction: 'var(--ease-expressive)',
            transitionProperty: 'opacity, transform',
          }}
        >
          <img
            src="/logo.svg"
            alt=""
            width="77"
            height="78"
            className="size-10"
          />
        </span>
      </span>
    </section>
  )
}
