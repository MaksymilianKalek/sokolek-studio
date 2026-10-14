import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionIntro } from './ui'

type ProcessItem = {
  description: string
  index: string
  title: string
}

export function Process() {
  const { t } = useTranslation()
  const items = t('process.items', { returnObjects: true }) as ProcessItem[]

  return (
    <section className="site-section">
      <div className="site-container">
        <SectionIntro
          label={t('process.label')}
          heading={t('process.heading')}
          description={t('process.description')}
        />

        <ol className="surface-dark section-content-offset grid gap-0 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.index} delay={index * 0.08}>
              <li className="card-padding relative flex min-h-full flex-col justify-center border-b border-line last:border-b-0 md:border-r xl:min-h-[30rem] xl:last:border-r-0">
                <div className="mx-auto w-full max-w-sm">
                  <p className="meta-text text-ink-muted">
                    {item.index}
                  </p>
                  <h3 className={`heading-sm content-offset ${index === 1 ? 'text-accent' : 'text-ink'}`}>
                    {item.title}
                  </h3>
                  <p className="body-copy content-offset-tight">
                    {item.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
