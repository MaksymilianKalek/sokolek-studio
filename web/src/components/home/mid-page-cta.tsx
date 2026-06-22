import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

export function MidPageCta() {
  const { t } = useTranslation()

  return (
    <section className="site-section section-commercial-close chapter-surface-warm text-ink">
      <Reveal>
        <div className="site-container py-8 sm:py-10">
          <SectionLabel>{t('midPageCta.label')}</SectionLabel>
          <div className="editorial-grid editorial-grid-compact section-offset lg:items-end">
            <h2 className="heading-md max-w-5xl">
              {t('midPageCta.heading')}
            </h2>

            <div>
              <p className="body-copy-lg max-w-xl text-ink-soft">
                {t('midPageCta.description')}
              </p>
              <a
                href="mailto:hello@sokolek.com"
                className="primary-cta focus-ring action-text group action-offset inline-flex w-fit items-center gap-3 px-5 py-3"
              >
                <span className="relative z-10">{t('midPageCta.cta')}</span>
                <ArrowUpRight className="primary-cta-icon relative z-10 size-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
