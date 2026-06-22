import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type ServiceItem = {
  description: string
  featuredLabel?: string
  index: string
  title: string
  tags: string
}

export function Services() {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]

  return (
    <section className="site-section section-chapter-hero-follow">
      <div id="services" className="site-container site-anchor">
        <Reveal>
          <SectionLabel>{t('services.label')}</SectionLabel>
        </Reveal>

        <div className="editorial-grid section-offset">
          <Reveal>
            <div className="sticky top-10">
              <h2 className="heading-md max-w-2xl">
                {t('services.heading')}
              </h2>
              <p className="body-copy content-offset max-w-md">
                {t('services.description')}
              </p>
            </div>
          </Reveal>

          <div className="border-t border-line">
            {services.map((service, itemIndex) => (
              <Reveal key={service.index} delay={itemIndex * 0.08}>
                <article className={`service-row-grid section-row-padding border-b border-line ${service.featuredLabel ? 'bg-ink px-4 text-paper sm:px-5' : ''}`}>
                  <p className={`meta-text ${service.featuredLabel ? 'text-paper/42' : 'text-ink-muted'}`}>
                    {service.index}
                  </p>
                  <div>
                    {service.featuredLabel ? (
                      <p className="meta-text mb-4 text-paper/42">
                        {service.featuredLabel}
                      </p>
                    ) : null}
                    <h3 className="heading-sm">
                      {service.title}
                    </h3>
                  </div>
                  <div>
                    <p className={`body-copy max-w-md ${service.featuredLabel ? '!text-paper/72' : ''}`}>
                      {service.description}
                    </p>
                    <p className={`meta-text content-offset-tight ${service.featuredLabel ? 'text-paper/52' : 'text-ink-soft'}`}>
                      {service.tags}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
