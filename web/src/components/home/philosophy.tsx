import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

export function Philosophy() {
  const { t } = useTranslation()
  const principles = t('manifesto.principles', { returnObjects: true }) as string[]

  return (
    <section className="site-section">
      <div className="site-container">
        <Reveal>
          <SectionLabel>{t('manifesto.label')}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <h2 className="heading-md">
              {t('manifesto.sectionOne.heading')}
            </h2>
          </Reveal>

          <div className="space-y-12">
            <Reveal delay={0.08}>
              <p className="heading-sm text-ink">
                {t('manifesto.sectionTwo.heading_part1')}{' '}
                <span className="font-serif font-normal italic tracking-[-0.035em]">
                  {t('manifesto.sectionTwo.heading_part2')}
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="body-copy grid gap-5 sm:grid-cols-2">
                <p>{t('manifesto.sectionOne.description')}</p>
                <p>{t('manifesto.sectionTwo.description')}</p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
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
