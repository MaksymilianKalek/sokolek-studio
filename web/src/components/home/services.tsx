import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionIntro } from './ui'

type ServiceItem = {
  description: string
  index: string
  tags: string
  title: string
}

export function Services() {
  const { t } = useTranslation()
  const items = t('services.items', { returnObjects: true }) as ServiceItem[]
  const heading = t('services.heading')
  const headingBreakIndex = heading.indexOf('. ')
  const headingFirstLine = headingBreakIndex === -1
    ? heading
    : heading.slice(0, headingBreakIndex + 1)
  const headingSecondLine = headingBreakIndex === -1
    ? null
    : heading.slice(headingBreakIndex + 2)

  return (
    <section className="site-section">
      <div id="services" className="site-container site-anchor">
        <SectionIntro
          label={t('services.label')}
          heading={(
            <>
              <span className="block">{headingFirstLine}</span>
              {headingSecondLine ? (
                <span className="block">{headingSecondLine}</span>
              ) : null}
            </>
          )}
        />

        <ol className="section-content-offset grid gap-6 md:grid-cols-3 lg:gap-8">
          {items.map((item, index) => (
            <Reveal key={item.index} delay={index * 0.08}>
              <li className="surface-dark card-padding flex h-full flex-col justify-between border border-line">
                <div>
                  <p className="meta-text text-ink-muted">
                    {item.index}
                  </p>
                  <h3 className="heading-sm content-offset text-ink">
                    {item.title}
                  </h3>
                  <p className="body-copy content-offset-tight">
                    {item.description}
                  </p>
                </div>
                {/* <p className="meta-text action-offset text-ink-soft">
                  {item.tags}
                </p> */}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
