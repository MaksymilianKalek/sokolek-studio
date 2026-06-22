import { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type EngineeringPillar = {
  outcome: string
  role: string
  stack: string[]
  title: string
}

const horizontalLockTopOffset = '1.5rem'
const horizontalLockScrollOffset = '24px'

export function EngineeringFoundation() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const stickyContentRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [canLockHorizontally, setCanLockHorizontally] = useState(false)
  const [horizontalDistance, setHorizontalDistance] = useState(0)
  const [lockContentHeight, setLockContentHeight] = useState(0)
  const pillars = t('engineeringFoundation.pillars', { returnObjects: true }) as EngineeringPillar[]
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start ${horizontalLockScrollOffset}`, 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -horizontalDistance])

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    const stickyContent = stickyContentRef.current

    if (!viewport || !track || !stickyContent) {
      return
    }

    const updateLockMetrics = () => {
      setHorizontalDistance(Math.max(track.scrollWidth - viewport.clientWidth, 0))
      setLockContentHeight(Math.ceil(stickyContent.getBoundingClientRect().height))
    }

    updateLockMetrics()

    const resizeObserver = new ResizeObserver(updateLockMetrics)
    resizeObserver.observe(stickyContent)
    resizeObserver.observe(viewport)
    resizeObserver.observe(track)
    window.addEventListener('resize', updateLockMetrics)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateLockMetrics)
    }
  }, [])

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const updateLockAvailability = () => {
      setCanLockHorizontally(mediaQuery.matches)
    }

    updateLockAvailability()
    mediaQuery.addEventListener('change', updateLockAvailability)

    return () => {
      mediaQuery.removeEventListener('change', updateLockAvailability)
    }
  }, [])

  const canUseHorizontalLayout = canLockHorizontally && !prefersReducedMotion
  const shouldLockCards = canUseHorizontalLayout && horizontalDistance > 0 && lockContentHeight > 0

  return (
    <div className={shouldLockCards ? 'bg-paper pt-20 lg:pt-24' : undefined}>
      <section
        ref={sectionRef}
        className="relative bg-paper text-ink"
        style={{
          height: shouldLockCards ? `${lockContentHeight + horizontalDistance}px` : undefined,
        }}
      >
        <div
          ref={stickyContentRef}
          className={shouldLockCards ? 'sticky overflow-hidden px-5 pb-20 pt-0 sm:px-8 lg:px-10' : 'site-section section-engineering-chapter'}
          style={shouldLockCards ? {
            top: horizontalLockTopOffset,
          } : undefined}
        >
          <div className="site-container">
            <Reveal>
              <SectionLabel className="text-ink-muted">
                {t('engineeringFoundation.label')}
              </SectionLabel>
            </Reveal>

            <div className="section-offset">
              <Reveal>
                <IntroCopy />
              </Reveal>

              <div
                ref={viewportRef}
                className={`section-offset-compact min-w-0 ${canUseHorizontalLayout ? 'overflow-hidden' : ''}`}
              >
                <motion.div
                  ref={trackRef}
                  className={canUseHorizontalLayout ? 'flex gap-4 pb-3' : 'grid gap-4'}
                  style={shouldLockCards ? { x } : undefined}
                >
                  {pillars.map((pillar, index) => {
                    const card = <PillarCard index={index} pillar={pillar} />

                    if (canUseHorizontalLayout) {
                      return (
                        <div
                          key={pillar.title}
                          className="w-[82vw] max-w-[40rem] shrink-0 snap-start sm:w-[34rem] lg:w-[38rem]"
                        >
                          {card}
                        </div>
                      )
                    }

                    return (
                      <Reveal key={pillar.title} delay={index * 0.08}>
                        {card}
                      </Reveal>
                    )
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function IntroCopy() {
  const { t } = useTranslation()

  return (
    <div className="editorial-grid">
      <div>
        <p className="meta-text text-ink-muted">
          {t('engineeringFoundation.note')}
        </p>
        <h2 className="heading-md content-offset-tight max-w-4xl text-ink">
          {t('engineeringFoundation.heading')}
        </h2>
      </div>
      <p className="body-copy max-w-xl text-ink-soft lg:pt-2">
        {t('engineeringFoundation.description')}
      </p>
    </div>
  )
}

function PillarCard({
  index,
  pillar,
}: {
  index: number
  pillar: EngineeringPillar
}) {
  return (
    <article
      className="engineering-pillar-card card-padding flex flex-col justify-between border border-line"
    >
      <div>
        <p className="meta-text text-ink-muted">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="content-offset max-w-2xl font-satoshi text-4xl font-medium tracking-[-0.035em] text-ink">
          {pillar.title}
        </h3>
        <p className="body-copy content-offset-tight max-w-2xl text-ink-soft">
          {pillar.outcome}
        </p>
      </div>

      <div className="action-offset">
        <p className="meta-text text-ink">
          {pillar.role}
        </p>
        <div className="content-offset-tight flex flex-wrap gap-2">
          {pillar.stack.map((tag) => (
            <span
              key={tag}
              className="meta-text border border-line px-2.5 py-2 text-ink-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
