import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { cx } from '../../lib/class-names'
import { SectionLabel } from './section-label'
import { PrimaryCtaLink } from './ui'

type ContactProps = {
  inverted?: boolean
}

export function Contact({ inverted = false }: ContactProps) {
  const { t } = useTranslation()
  const sectionClassName = inverted
    ? 'footer-contact-section text-paper'
    : 'site-section'
  const labelClassName = inverted ? 'text-paper/42' : undefined
  const descriptionClassName = inverted ? 'text-paper/72' : 'text-ink-soft'
  const secondaryDescriptionClassName = inverted ? 'text-paper/88' : 'text-ink'

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
              <p className={cx('body-copy-lg max-w-xl', descriptionClassName)}>
                {t('contact.description')}
              </p>
              <p className={cx('body-copy content-offset-tight max-w-xl', secondaryDescriptionClassName)}>
                {t('contact.secondaryDescription')}
              </p>
              <PrimaryCtaLink
                href="mailto:hello@sokolek.com"
                inverted={inverted}
                className="action-offset"
              >
                {t('footer.contact')}
              </PrimaryCtaLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
