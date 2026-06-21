import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

export function Philosophy() {
  const { t } = useTranslation()
  const principles = t('manifesto.principles', { returnObjects: true }) as string[]

  return (
    <section className="site-section">
      <div id="about" className="site-container site-anchor">
        <Reveal>
          <SectionLabel>{t('manifesto.label')}</SectionLabel>
        </Reveal>

        <div className="editorial-grid section-offset lg:items-start">
          <Reveal>
            <h2 className="heading-md">
              {t('manifesto.sectionOne.heading')}
            </h2>
          </Reveal>

          <div className="section-stack">
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
          </div>
        </div>
      </div>
    </section>
  )
}
