import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type ServiceItem = {
  description: string
  featuredLabel?: string
  index: string
  title: string
  tags: string
}

export function Services() {
  const { i18n, t } = useTranslation()
  const services = t('services.items', { returnObjects: true }) as ServiceItem[]
  const serviceListRef = useRef<HTMLDivElement>(null)
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language
  const heading = t('services.heading')
  const headingBreakIndex = heading.indexOf('. ')
  const headingFirstLine = headingBreakIndex === -1
    ? heading
    : heading.slice(0, headingBreakIndex + 1)
  const headingSecondLine = headingBreakIndex === -1
    ? null
    : heading.slice(headingBreakIndex + 2)

  useLayoutEffect(() => {
    const serviceList = serviceListRef.current

    if (!serviceList) {
      return
    }

    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    let measurementFrame: number | undefined
    let isActive = true

    const measureUniformRowHeight = () => {
      if (!isActive) {
        return
      }

      if (measurementFrame !== undefined) {
        window.cancelAnimationFrame(measurementFrame)
      }

      measurementFrame = window.requestAnimationFrame(() => {
        measurementFrame = undefined

        if (!hoverQuery.matches) {
          serviceList.style.removeProperty('--service-row-height')
          serviceList.classList.remove('service-list--measuring')
          return
        }

        serviceList.classList.add('service-list--measuring')
        serviceList.style.removeProperty('--service-row-height')

        const rowHeights = Array.from(
          serviceList.querySelectorAll<HTMLElement>('.service-row'),
        ).map((row) => row.getBoundingClientRect().height)
        const tallestRowHeight = Math.max(0, ...rowHeights)

        serviceList.style.setProperty(
          '--service-row-height',
          `${Math.ceil(tallestRowHeight + 16)}px`,
        )
        serviceList.classList.remove('service-list--measuring')
      })
    }

    measureUniformRowHeight()
    window.addEventListener('resize', measureUniformRowHeight)
    hoverQuery.addEventListener('change', measureUniformRowHeight)
    void document.fonts.ready.then(measureUniformRowHeight)

    return () => {
      isActive = false

      if (measurementFrame !== undefined) {
        window.cancelAnimationFrame(measurementFrame)
      }

      window.removeEventListener('resize', measureUniformRowHeight)
      hoverQuery.removeEventListener('change', measureUniformRowHeight)
      serviceList.style.removeProperty('--service-row-height')
      serviceList.classList.remove('service-list--measuring')
    }
  }, [currentLanguage])

  return (
    <section className="site-section">
      <div id="services" className="site-container site-anchor">
        <Reveal>
          <SectionLabel>{t('services.label')}</SectionLabel>
        </Reveal>

        <div className="services-editorial-grid section-offset">
          <Reveal>
            <div className="sticky top-10">
              <h2 className="heading-md max-w-2xl">
                <span className="block">{headingFirstLine}</span>
                {headingSecondLine ? (
                  <span className="block">{headingSecondLine}</span>
                ) : null}
              </h2>
              <p className="body-copy content-offset max-w-md">
                {t('services.description')}
              </p>
            </div>
          </Reveal>

          <div ref={serviceListRef} className="service-list">
            {services.map((service, itemIndex) => (
              <Reveal key={service.index} delay={itemIndex * 0.08}>
                <article
                  className={`service-row service-row-grid section-row-padding cursor-pointer ${service.featuredLabel ? 'surface-dark px-4 sm:px-5' : ''}`}
                  tabIndex={0}
                >
                  <p className="meta-text text-ink-muted">
                    {service.index}
                  </p>
                  <div className="service-title-cell">
                    {service.featuredLabel ? (
                      <p className="service-featured-label meta-text mb-4 text-ink-muted">
                        {service.featuredLabel}
                      </p>
                    ) : null}
                    <h3 className="heading-sm">
                      {service.title}
                    </h3>
                  </div>
                  <div>
                    <div className="service-description-reveal">
                      <div className="service-description-reveal-content">
                        <p className="body-copy max-w-md">
                          {service.description}
                        </p>
                      </div>
                    </div>
                    <p className="meta-text content-offset-tight text-ink-soft">
                      {service.tags}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
