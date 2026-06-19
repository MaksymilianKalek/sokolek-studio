import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type ServiceItem = {
  description: string
  index: string
  title: string
  tags: string
}

export function Services() {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]

  return (
    <section className="site-section">
      <div id="services" className="site-container site-anchor">
        <Reveal>
          <SectionLabel>{t('services.label')}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="sticky top-10">
              <h2 className="heading-md max-w-xl">
                {t('services.heading')}
              </h2>
              <p className="body-copy mt-6 max-w-md">
                {t('services.description')}
              </p>
            </div>
          </Reveal>

          <div className="border-t border-line">
            {services.map((service, itemIndex) => (
              <Reveal key={service.index} delay={itemIndex * 0.08}>
                <article className="grid gap-5 border-b border-line py-8 sm:grid-cols-[6rem_0.75fr_1fr] sm:py-10">
                  <p className="meta-text text-ink-muted">
                    {service.index}
                  </p>
                  <h3 className="heading-sm">
                    {service.title}
                  </h3>
                  <div>
                    <p className="body-copy max-w-md">
                      {service.description}
                    </p>
                    <p className="meta-text mt-5 text-ink-soft">
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
