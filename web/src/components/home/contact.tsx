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
    ? 'footer-contact-section text-paper'
    : 'site-section'
  const labelClassName = inverted ? 'text-paper/42' : undefined
  const descriptionClassName = inverted ? 'text-paper/62' : 'text-ink-soft'
  const secondaryDescriptionClassName = inverted ? 'text-paper/82' : 'text-ink'
  const ctaClassName = inverted ? 'primary-cta primary-cta--inverted' : 'primary-cta'
  const focusClassName = inverted ? 'focus-ring-inverted' : 'focus-ring'

  return (
    <section className={sectionClassName}>
      <Reveal>
        <div id="contact" className="site-container site-anchor">
          <SectionLabel className={labelClassName}>{t('nav.contact')}</SectionLabel>
          <div className="editorial-grid section-offset lg:items-end">
            <h2 className="heading-md">
              {t('contact.heading_part1')}{' '}
              <span className="font-serif font-normal italic tracking-[-0.035em]">
                {t('contact.heading_part2')}
              </span>
            </h2>

            <div>
              <p className={`body-copy-lg max-w-xl ${descriptionClassName}`}>
                {t('contact.description')}
              </p>
              <p className={`body-copy content-offset-tight max-w-xl ${secondaryDescriptionClassName}`}>
                {t('contact.secondaryDescription')}
              </p>
              <a
                href="mailto:hello@sokolek.com"
                className={`${ctaClassName} ${focusClassName} action-text group action-offset inline-flex w-fit items-center gap-3 px-5 py-3`}
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
