import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

export function Philosophy() {
  const { t } = useTranslation()
  const principles = t('manifesto.principles', { returnObjects: true }) as string[]

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Reveal>
          <div>
            <SectionLabel>{t('manifesto.label')}</SectionLabel>
            <h2 className="mt-5 font-satoshi text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">
              {t('manifesto.sectionOne.heading')}
            </h2>
          </div>
        </Reveal>

        <div className="space-y-12">
          <Reveal delay={0.08}>
            <p className="font-satoshi text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl">
              {t('manifesto.sectionTwo.heading_part1')}{' '}
              <span className="font-serif font-normal italic tracking-[-0.035em]">
                {t('manifesto.sectionTwo.heading_part2')}
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="grid gap-5 font-inter text-base leading-7 text-ink-soft sm:grid-cols-2">
              <p>{t('manifesto.sectionOne.description')}</p>
              <p>{t('manifesto.sectionTwo.description')}</p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ol className="border-t border-line">
              {principles.map((principle) => (
                <li
                  key={principle}
                  className="border-b border-line py-5 font-mono text-[10px] uppercase tracking-widest text-ink"
                >
                  {principle}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
