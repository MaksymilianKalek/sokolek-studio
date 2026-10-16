import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionIntro } from './ui'

export function Philosophy() {
  const { t } = useTranslation()
  const principles = t('manifesto.principles', { returnObjects: true }) as string[]

  return (
    <section className="site-section">
      <div id="about" className="site-container site-anchor">
        <SectionIntro
          label={t('manifesto.label')}
          heading={t('manifesto.sectionOne.heading')}
          headingClassName="max-w-[11ch]"
          description={t('hero.description')}
        />

        <div className="section-content-offset grid gap-6 lg:grid-cols-[minmax(20rem,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-10">
          <Reveal>
            <figure className="overflow-hidden bg-ink">
              <img
                src="/photos/KiM-23bw.jpg"
                alt={t('manifesto.imageAlt')}
                width="1536"
                height="2308"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover object-[center_42%]"
              />
            </figure>
          </Reveal>

          <div className="surface-dark section-stack card-padding">
            <Reveal delay={0.08}>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="heading-sm text-ink">
                    {t('manifesto.sectionTwo.heading_part1')}
                  </h3>
                  <p className="body-copy content-offset-tight">
                    {t('manifesto.sectionOne.description')}
                  </p>
                </div>

                <div>
                  <h3 className="heading-sm !font-serif !font-normal italic tracking-[-0.035em] text-ink">
                    {t('manifesto.sectionTwo.heading_part2')}
                  </h3>
                  <p className="body-copy content-offset-tight">
                    {t('manifesto.sectionTwo.description')}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <ol className="grid gap-5">
                {principles.map((principle, index) => (
                  <li
                    key={principle}
                    className="meta-text grid gap-4 text-ink sm:grid-cols-[3rem_1fr]"
                  >
                    <span className="text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.2}>
              <div>
                <p className="heading-sm max-w-3xl text-ink">
                  {t('manifesto.openScope.heading')}
                </p>
                <p className="body-copy content-offset-tight max-w-2xl">
                  {t('manifesto.openScope.description')}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
