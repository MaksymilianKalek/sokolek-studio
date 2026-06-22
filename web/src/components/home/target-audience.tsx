import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type TargetAudienceItem = {
  description: string
  index: string
  title: string
}

export function TargetAudience() {
  const { t } = useTranslation()
  const items = t('targetAudience.items', { returnObjects: true }) as TargetAudienceItem[]

  return (
    <section className="site-section-compact section-related-target chapter-surface-warm text-ink">
      <div className="site-container">
        <Reveal>
          <SectionLabel>{t('targetAudience.label')}</SectionLabel>
        </Reveal>

        <div className="editorial-grid editorial-grid-compact section-offset">
          <Reveal>
            <h2 className="heading-md max-w-4xl">
              {t('targetAudience.heading')}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="body-copy max-w-xl text-ink-soft lg:pt-2">
              {t('targetAudience.description')}
            </p>
          </Reveal>
        </div>

        <div className="section-offset grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.index} delay={index * 0.08}>
              <article className="card-padding min-h-full border border-line">
                <p className="meta-text text-ink-muted">
                  {item.index}
                </p>
                <h3 className="heading-sm content-offset max-w-xl">
                  {item.title}
                </h3>
                <p className="body-copy content-offset-tight max-w-xl">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
