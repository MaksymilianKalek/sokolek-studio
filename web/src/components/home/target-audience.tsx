import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { AccentWord, IndexedCard, SectionIntro } from './ui'

type TargetAudienceItem = {
  description: string
  index: string
  title: string
}

export function TargetAudience() {
  const { t } = useTranslation()
  const items = t('targetAudience.items', { returnObjects: true }) as TargetAudienceItem[]
  const heading = t('targetAudience.heading')
  const accentWord = t('targetAudience.accentWord')

  return (
    <section className="surface-dark site-section-compact">
      <div className="site-container">
        <SectionIntro
          label={t('targetAudience.label')}
          heading={<AccentWord text={heading} word={accentWord} />}
          description={t('targetAudience.description')}
        />

        <div className="section-content-offset grid gap-4 md:grid-cols-2">
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
