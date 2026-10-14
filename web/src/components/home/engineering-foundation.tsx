import { useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Reveal } from '../reveal'
import { SectionIntro } from './ui'

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
    <div className={shouldLockCards ? 'surface-dark section-top-padding' : 'surface-dark'}>
      <section
        ref={sectionRef}
        className="relative"
        style={{
          height: shouldLockCards ? `${lockContentHeight + horizontalDistance}px` : undefined,
        }}
      >
        <div
          ref={stickyContentRef}
          className={shouldLockCards ? 'site-gutter section-bottom-padding sticky overflow-hidden' : 'site-section'}
          style={shouldLockCards ? {
            top: horizontalLockTopOffset,
          } : undefined}
        >
          <div id="founder-background" className="site-container site-anchor">
            <SectionIntro
              label={t('engineeringFoundation.label')}
              note={t('engineeringFoundation.note')}
              heading={t('engineeringFoundation.heading')}
              headingClassName="max-w-4xl"
              description={t('engineeringFoundation.description')}
            />

            <div
              ref={viewportRef}
              className={`section-content-offset min-w-0 ${canUseHorizontalLayout ? 'overflow-hidden' : ''}`}
            >
              <motion.div
                ref={trackRef}
                className={canUseHorizontalLayout ? 'flex gap-6 pb-3 lg:gap-8' : 'grid gap-6 lg:gap-8'}
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
      </section>
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
      className="surface-light engineering-pillar-card card-padding flex h-full flex-col justify-between border border-line"
    >
      <div>
        <p className="meta-text text-ink-muted">
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 className="heading-sm content-offset max-w-2xl">
          {pillar.title}
        </h3>
        <p className="body-copy content-offset-tight max-w-2xl">
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
