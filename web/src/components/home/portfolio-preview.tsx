import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type PortfolioPreviewProps = {
  onActiveChange: (isActive: boolean) => void
}

const dogTokScreenshotSrc = '/portfolio/dogtok-screenshot-960.webp'
const dogTokScreenshotSrcSet = '/portfolio/dogtok-screenshot-640.webp 640w, /portfolio/dogtok-screenshot-960.webp 960w, /portfolio/dogtok-screenshot-1200.webp 1200w, /portfolio/dogtok-screenshot-1600.webp 1600w, /portfolio/dogtok-screenshot-2400.webp 2400w, /portfolio/dogtok-screenshot-3200.webp 3200w'
const dogTokScreenshotSizes = '(min-width: 1024px) 52vw, calc(100vw - 2.5rem)'
const dogTokPreloadSelector = 'link[data-dogtok-screenshot-preload="true"]'

let hasRequestedDogTokPreload = false

function preloadDogTokScreenshot() {
  if (hasRequestedDogTokPreload || document.querySelector(dogTokPreloadSelector)) {
    return
  }

  hasRequestedDogTokPreload = true

  const preloadLink = document.createElement('link')
  preloadLink.rel = 'preload'
  preloadLink.as = 'image'
  preloadLink.href = dogTokScreenshotSrc
  preloadLink.type = 'image/webp'
  preloadLink.setAttribute('imagesrcset', dogTokScreenshotSrcSet)
  preloadLink.setAttribute('imagesizes', dogTokScreenshotSizes)
  preloadLink.setAttribute('data-dogtok-screenshot-preload', 'true')
  document.head.append(preloadLink)
}

export function PortfolioPreview({ onActiveChange }: PortfolioPreviewProps) {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
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

  useEffect(() => {
    const preloadOnScrollIntent = () => {
      preloadDogTokScreenshot()
    }

    const options = { once: true, passive: true }
    window.addEventListener('wheel', preloadOnScrollIntent, options)
    window.addEventListener('touchmove', preloadOnScrollIntent, options)

    return () => {
      window.removeEventListener('wheel', preloadOnScrollIntent)
      window.removeEventListener('touchmove', preloadOnScrollIntent)
    }
  }, [])

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
                className="focus-ring group/image relative block h-full overflow-hidden"
              >
                <img
                  src={dogTokScreenshotSrc}
                  srcSet={dogTokScreenshotSrcSet}
                  sizes={dogTokScreenshotSizes}
                  alt={`${t('portfolio.dogTok.subtitle')} website designed and developed by Sokołek Studio`}
                  width="960"
                  height="460"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="auto"
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
    </section>
  )
}
