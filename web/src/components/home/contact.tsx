import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

export function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <Reveal>
        <div className="mx-auto max-w-[92rem] border-t border-ink pt-8">
          <SectionLabel>{t('nav.contact')}</SectionLabel>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <h2 className="font-satoshi text-6xl font-semibold leading-[0.9] tracking-[-0.06em] sm:text-8xl lg:text-[10rem]">
              {t('manifesto.sectionTwo.heading_part1')}{' '}
              <span className="font-serif font-normal italic tracking-[-0.035em]">
                {t('manifesto.sectionTwo.heading_part2')}
              </span>
            </h2>

            <div>
              <p className="max-w-xl font-inter text-lg leading-8 text-ink-soft">
                {t('manifesto.sectionTwo.description')}
              </p>
              <a
                href="mailto:hello@sokolek.com"
                className="group relative mt-8 inline-flex w-fit items-center gap-3 px-5 py-3 font-mono text-[10px] font-medium uppercase tracking-widest text-paper outline-none transition-colors duration-700 ease-in-out focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
              >
                <span className="absolute inset-0 bg-ink opacity-100 transition-opacity duration-700 ease-in-out group-hover:opacity-0" />
                <span className="accent-gradient absolute inset-0 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100" />
                <span className="relative z-10">{t('footer.contact')}</span>
                <ArrowUpRight className="relative z-10 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
