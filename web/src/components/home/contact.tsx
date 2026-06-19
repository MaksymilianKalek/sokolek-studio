import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type ContactProps = {
  inverted?: boolean
}

export function Contact({ inverted = false }: ContactProps) {
  const { t } = useTranslation()
  const sectionClassName = inverted
    ? 'px-0 py-20 text-paper lg:py-28'
    : 'px-5 py-24 sm:px-8 lg:px-10 lg:py-32'
  const labelClassName = inverted ? 'text-paper/42' : undefined
  const descriptionClassName = inverted ? 'text-paper/62' : 'text-ink-soft'
  const ctaClassName = inverted ? 'primary-cta primary-cta--inverted' : 'primary-cta'

  return (
    <section className={sectionClassName}>
      <Reveal>
        <div id="contact" className="mx-auto max-w-[92rem] scroll-mt-6">
          <SectionLabel className={labelClassName}>{t('nav.contact')}</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h2 className="font-satoshi type-heading-md font-semibold leading-[1.1] tracking-[-0.04em]">
              {t('contact.heading_part1')}{' '}
              <span className="font-serif font-normal italic tracking-[-0.035em]">
                {t('contact.heading_part2')}
              </span>
            </h2>

            <div>
              <p className={`max-w-xl font-inter type-body-lg leading-[1.1] ${descriptionClassName}`}>
                {t('contact.description')}
              </p>
              <a
                href="mailto:hello@sokolek.com"
                className={`${ctaClassName} group mt-8 inline-flex w-fit items-center gap-3 px-5 py-3 font-mono type-micro font-medium uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink`}
              >
                <span className="relative z-10">{t('footer.contact')}</span>
                <ArrowUpRight className="primary-cta-icon relative z-10 size-4" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
