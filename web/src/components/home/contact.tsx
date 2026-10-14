import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'
import { PrimaryCtaLink } from './ui'

type ContactProps = {
  embedded?: boolean
}

export function Contact({ embedded = false }: ContactProps) {
  const { t } = useTranslation()
  const sectionClassName = embedded
    ? 'footer-contact-section'
    : 'site-section'

  return (
    <section className={sectionClassName}>
      <Reveal>
        <div id="contact" className="site-container site-anchor">
          <SectionLabel>{t('nav.contact')}</SectionLabel>
          <div className="editorial-grid section-offset lg:items-end">
            <h2 className="heading-md">
              {t('contact.heading_part1')}{' '}
              <span className="font-serif font-normal italic tracking-[-0.035em]">
                {t('contact.heading_part2')}
              </span>
            </h2>

            <div>
              <p className="body-copy max-w-xl">
                {t('contact.description')}
              </p>
              <p className="body-copy content-offset-tight max-w-xl">
                {t('contact.secondaryDescription')}
              </p>
              <PrimaryCtaLink
                href="mailto:hello@sokolek.com"
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
