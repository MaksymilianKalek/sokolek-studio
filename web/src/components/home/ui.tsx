import { type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cx } from '../../lib/class-names'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type PrimaryCtaLinkProps = {
  children: ReactNode
  className?: string
  href: string
  inverted?: boolean
}

export function PrimaryCtaLink({
  children,
  className = '',
  href,
  inverted = false,
}: PrimaryCtaLinkProps) {
  const toneClassName = inverted
    ? 'primary-cta primary-cta--inverted focus-ring-inverted'
    : 'primary-cta focus-ring'

  return (
    <a
      href={href}
      className={cx(
        toneClassName,
        'action-text group inline-flex w-fit items-center gap-3 px-5 py-3',
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <ArrowUpRight className="primary-cta-icon relative z-10 size-4" />
    </a>
  )
}

type AccentTextLinkProps = {
  children: ReactNode
  className?: string
  href: string
}

export function AccentTextLink({
  children,
  className = '',
  href,
}: AccentTextLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        'action-text focus-ring group inline-flex w-fit items-center gap-3 py-3 text-ink',
        className,
      )}
    >
      <span className="interactive-accent-link pb-0.5">
        {children}
      </span>
      <ArrowUpRight className="interactive-link-icon size-4" />
    </a>
  )
}

type SectionIntroProps = {
  description?: string
  heading: string
  label: string
}

export function SectionIntro({
  description,
  heading,
  label,
}: SectionIntroProps) {
  return (
    <>
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>

      <div className="editorial-grid editorial-grid-compact section-offset">
        <Reveal>
          <h2 className="heading-md max-w-4xl">
            {heading}
          </h2>
        </Reveal>

        {description ? (
          <Reveal delay={0.08}>
            <p className="body-copy max-w-xl text-ink-soft lg:pt-2">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </>
  )
}

type IndexedCardProps = {
  description: string
  index: string
  title: string
}

export function IndexedCard({
  description,
  index,
  title,
}: IndexedCardProps) {
  return (
    <article className="card-padding min-h-full border border-line">
      <p className="meta-text text-ink-muted">
        {index}
      </p>
      <h3 className="heading-sm content-offset max-w-xl">
        {title}
      </h3>
      <p className="body-copy content-offset-tight max-w-xl">
        {description}
      </p>
    </article>
  )
}
