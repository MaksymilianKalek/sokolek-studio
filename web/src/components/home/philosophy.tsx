import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

export function Philosophy() {
  const { t } = useTranslation()
  const principles = t('manifesto.principles', { returnObjects: true }) as string[]

  return (
    <section className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[92rem]">
        <Reveal>
          <SectionLabel>{t('manifesto.label')}</SectionLabel>
        </Reveal>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <h2 className="font-satoshi type-heading-md font-semibold leading-[1.1] tracking-[-0.04em]">
              {t('manifesto.sectionOne.heading')}
            </h2>
          </Reveal>

          <div className="space-y-12">
            <Reveal delay={0.08}>
              <p className="font-satoshi type-heading-sm font-medium leading-[1.1] tracking-[-0.04em] text-ink">
                {t('manifesto.sectionTwo.heading_part1')}{' '}
                <span className="font-serif font-normal italic tracking-[-0.035em]">
                  {t('manifesto.sectionTwo.heading_part2')}
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="grid gap-5 font-inter type-body leading-[1.1] text-ink-soft sm:grid-cols-2">
                <p>{t('manifesto.sectionOne.description')}</p>
                <p>{t('manifesto.sectionTwo.description')}</p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ol className="grid gap-5">
                {principles.map((principle, index) => (
                  <li
                    key={principle}
                    className="grid gap-4 font-mono type-micro uppercase tracking-widest text-ink sm:grid-cols-[3rem_1fr]"
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
