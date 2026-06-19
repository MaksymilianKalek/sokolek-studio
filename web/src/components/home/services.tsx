import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type ServiceItem = {
  index: string
  title: string
  tags: string
}

export function Services() {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div id="services" className="mx-auto max-w-[92rem] scroll-mt-6">
        <Reveal>
          <SectionLabel>{t('services.label')}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <div className="sticky top-10">
              <h2 className="max-w-xl font-satoshi type-heading-md font-semibold leading-[1.1] tracking-[-0.04em]">
                {t('services.heading')}
              </h2>
            </div>
          </Reveal>

          <div className="border-t border-line">
            {services.map((service, itemIndex) => (
              <Reveal key={service.index} delay={itemIndex * 0.08}>
                <article className="grid gap-5 border-b border-line py-8 sm:grid-cols-[6rem_0.75fr_1fr] sm:py-10">
                  <p className="font-mono type-micro uppercase tracking-widest text-ink-muted">
                    {service.index}
                  </p>
                  <h3 className="font-satoshi type-heading-sm font-medium leading-[1.1] tracking-[-0.035em]">
                    {service.title}
                  </h3>
                  <p className="font-mono type-micro uppercase leading-[1.1] tracking-widest text-ink-soft">
                    {service.tags}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
