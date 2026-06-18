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
    <section id="services" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <div className="sticky top-10">
            <SectionLabel>{t('services.label')}</SectionLabel>
            <h2 className="mt-5 max-w-xl font-satoshi text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">
              {t('services.heading')}
            </h2>
          </div>
        </Reveal>

        <div className="border-t border-line">
          {services.map((service, itemIndex) => (
            <Reveal key={service.index} delay={itemIndex * 0.08}>
              <article className="grid gap-5 border-b border-line py-8 sm:grid-cols-[6rem_0.75fr_1fr] sm:py-10">
                <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                  {service.index}
                </p>
                <h3 className="font-satoshi text-3xl font-medium leading-none tracking-[-0.035em]">
                  {service.title}
                </h3>
                <p className="font-mono text-[10px] uppercase leading-relaxed tracking-widest text-ink-soft">
                  {service.tags}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
