import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type ProcessItem = {
  description: string
  index: string
  title: string
}

export function Process() {
  const { t } = useTranslation()
  const items = t('process.items', { returnObjects: true }) as ProcessItem[]

  return (
    <section className="site-section section-related-process bg-paper text-ink">
      <div className="site-container">
        <Reveal>
          <SectionLabel>{t('process.label')}</SectionLabel>
        </Reveal>

        <div className="editorial-grid editorial-grid-compact section-offset">
          <Reveal>
            <h2 className="heading-md max-w-4xl">
              {t('process.heading')}
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="body-copy max-w-xl text-ink-soft lg:pt-2">
              {t('process.description')}
            </p>
          </Reveal>
        </div>

        <ol className="section-offset-compact grid gap-0 border-t border-line md:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.index} delay={index * 0.08}>
              <li className="relative min-h-full border-b border-line py-8 md:border-r md:px-5 md:last:border-r-0">
                <p className="meta-text text-ink-muted">
                  {item.index}
                </p>
                <h3 className="heading-sm content-offset max-w-sm">
                  {item.title}
                </h3>
                <p className="body-copy content-offset-tight max-w-sm">
                  {item.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
