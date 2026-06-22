import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

export function AiPhilosophy() {
  const { t } = useTranslation()

  return (
    <section className="site-section section-major-chapter bg-ink text-paper">
      <div className="site-container">
        <Reveal>
          <SectionLabel className="text-paper/42">{t('philosophy.label')}</SectionLabel>
        </Reveal>

        <div className="section-offset max-w-6xl">
          <Reveal>
            <h2 className="heading-md text-paper">
              {t('philosophy.heading')}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="content-offset font-satoshi text-[clamp(1.5rem,3vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.035em] text-paper/68">
              {t('philosophy.description')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
