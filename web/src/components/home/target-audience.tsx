import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { IndexedCard, SectionIntro } from './ui'

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
        <SectionIntro
          label={t('targetAudience.label')}
          heading={t('targetAudience.heading')}
          description={t('targetAudience.description')}
        />

        <div className="section-offset grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.index} delay={index * 0.08}>
              <IndexedCard
                index={item.index}
                title={item.title}
                description={item.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
