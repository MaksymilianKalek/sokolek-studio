import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'
import { PrimaryCtaLink } from './ui'

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
              <PrimaryCtaLink
                href="mailto:hello@sokolek.com"
                className="action-offset"
              >
                {t('midPageCta.cta')}
              </PrimaryCtaLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
