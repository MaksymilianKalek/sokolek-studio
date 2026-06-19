import { useEffect, useRef } from 'react'
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

  return (
    <section
      ref={sectionRef}
      className="bg-paper px-5 py-20 text-ink sm:px-8 lg:px-10 lg:py-24"
    >
      <div id="portfolio" className="mx-auto max-w-[92rem] scroll-mt-6">
        <Reveal>
          <SectionLabel>{t('portfolio.label')}</SectionLabel>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-start">
            <div>
              <h2 className="max-w-4xl font-satoshi type-heading-md font-semibold leading-[1.1] tracking-[-0.04em] text-ink">
                {t('portfolio.heading')}
              </h2>
            </div>
            <p className="max-w-sm font-inter type-body leading-[1.1] text-ink-soft">
              {t('portfolio.description')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <article className="mt-10 grid items-stretch overflow-hidden lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="relative h-[20rem] overflow-hidden text-paper sm:h-[24rem] lg:h-[30rem]">
              <div className="accent-gradient absolute inset-x-0 top-0 z-10 h-1" />
              <div className="h-full overflow-hidden">
                <img
                  src="/portfolio/dogtok-1600.webp"
                  srcSet="/portfolio/dogtok-1600.webp 1600w, /portfolio/dogtok-2400.webp 2400w"
                  sizes="(min-width: 1024px) 52vw, calc(100vw - 2.5rem)"
                  alt={`${t('portfolio.dogTok.subtitle')} website designed and developed by Sokołek Studio`}
                  width="1600"
                  height="1067"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-10 pt-8 lg:pt-0">
              <div>
                <p className="font-mono type-micro uppercase tracking-[0.2em] text-ink-muted">
                  {t('portfolio.dogTok.data.stack')}
                </p>
                <h3 className="mt-5 font-satoshi type-heading-sm font-medium leading-[1.1] tracking-[-0.045em]">
                  {t('portfolio.dogTok.subtitle')}
                </h3>
                <p className="mt-5 font-inter type-body leading-[1.1] text-ink-soft">
                  {t('portfolio.dogTok.summary')}
                </p>
                <dl className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="font-mono type-micro uppercase tracking-[0.2em] text-ink-muted">
                        {spec.label}
                      </dt>
                      <dd className="mt-2 font-mono type-micro uppercase leading-[1.1] tracking-widest text-ink-soft">
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
                  className="group inline-flex w-fit items-center gap-3 py-3 font-mono type-micro font-medium uppercase tracking-widest text-ink outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
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
