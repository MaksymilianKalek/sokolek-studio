import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'
import { AccentWord } from './ui'

export function AiPhilosophy() {
  const { t } = useTranslation()
  const heading = t('philosophy.heading')
  const accentWord = t('philosophy.accentWord')

  return (
    <section className="surface-dark site-section">
      <div className="site-container">
        <Reveal>
          <SectionLabel>{t('philosophy.label')}</SectionLabel>
        </Reveal>

        <div className="section-offset max-w-[86rem]">
          <Reveal>
            <h2 className="heading-md text-ink">
              <AccentWord text={heading} word={accentWord} />
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="heading-sm content-offset max-w-[48ch] text-ink-soft">
              {t('philosophy.description')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
