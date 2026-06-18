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

    const observer = new IntersectionObserver(
      ([entry]) => {
        onActiveChange(entry.isIntersecting)
      },
      {
        rootMargin: '-58% 0px -35% 0px',
        threshold: 0,
      },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      onActiveChange(false)
    }
  }, [onActiveChange])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="bg-paper px-5 py-24 text-ink sm:px-8 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-[92rem]">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionLabel>{t('portfolio.label')}</SectionLabel>
              <h2 className="mt-5 max-w-4xl font-satoshi text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-ink sm:text-7xl">
                {t('portfolio.heading')}
              </h2>
            </div>
            <p className="max-w-sm font-inter text-sm leading-6 text-ink-soft">
              {t('portfolio.description')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <article className="mt-14 grid items-stretch overflow-hidden border border-line lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[26rem] overflow-hidden text-paper lg:min-h-0">
              <div className="accent-gradient absolute inset-x-0 top-0 z-10 h-1" />
              <div className="h-full overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.22)]">
                <img
                  src="/portfolio/dogtok.webp"
                  alt={`${t('portfolio.dogTok.subtitle')} website designed and developed by Sokołek Studio`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-16 border-t border-line p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                  {t('portfolio.dogTok.data.stack')}
                </p>
                <h3 className="mt-5 font-satoshi text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                  {t('portfolio.dogTok.subtitle')}
                </h3>
                <p className="mt-6 font-inter text-base leading-7 text-ink-soft">
                  {t('portfolio.dogTok.summary')}
                </p>
                <dl className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
                  {specs.map((spec) => (
                    <div key={spec.label}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                        {spec.label}
                      </dt>
                      <dd className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-ink-soft">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://dogtok.pl"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex w-fit items-center gap-3 px-5 py-3 font-mono text-[10px] font-medium uppercase tracking-widest text-ink outline-none transition-colors duration-700 ease-in-out before:absolute before:inset-0 before:ring-1 before:ring-ink/35 before:transition-opacity before:duration-700 before:ease-in-out hover:text-paper hover:before:opacity-0 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
                >
                  <span className="accent-gradient absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />
                  <span className="relative z-10">{t('common.visitLiveSite')}</span>
                  <ArrowUpRight className="relative z-10 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <a
                  href="mailto:hello@sokolek.com?subject=Portfolio%20case%20inquiry"
                  className="group inline-flex w-fit items-center gap-3 py-3 font-mono text-[10px] font-medium uppercase tracking-widest text-ink-soft outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
                >
                  <span className="border-b border-line pb-0.5 transition-colors group-hover:border-ink-muted">
                    {t('common.similarWork')}
                  </span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
