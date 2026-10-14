import { type ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cx } from '../../lib/class-names'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

type AccentWordProps = {
  text: string
  word: string
}

export function AccentWord({ text, word }: AccentWordProps) {
  const wordStart = text.indexOf(word)

  if (wordStart === -1) {
    return text
  }

  return (
    <>
      {text.slice(0, wordStart)}
      <span className="text-accent">{word}</span>
      {text.slice(wordStart + word.length)}
    </>
  )
}

type PrimaryCtaLinkProps = {
  ariaLabel?: string
  children: ReactNode
  className?: string
  href: string
  rel?: string
  target?: string
}

export function PrimaryCtaLink({
  ariaLabel,
  children,
  className = '',
  href,
  rel,
  target,
}: PrimaryCtaLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      rel={rel}
      target={target}
      className={cx(
        'primary-cta focus-ring',
        'action-text group inline-flex w-fit items-center gap-3 px-5 py-3',
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <ArrowUpRight className="primary-cta-icon relative z-10 size-4" />
    </a>
  )
}

type SectionIntroProps = {
  className?: string
  description?: string
  descriptionClassName?: string
  heading: ReactNode
  headingClassName?: string
  label: string
  note?: string
}

export function SectionIntro({
  className = '',
  description,
  descriptionClassName = '',
  heading,
  headingClassName = '',
  label,
  note,
}: SectionIntroProps) {
  return (
    <>
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>

      <div className={cx('editorial-grid editorial-grid-compact section-offset', className)}>
        <Reveal>
          <div>
            {note ? <p className="meta-text text-ink-muted">{note}</p> : null}
            <h2 className={cx('heading-md max-w-6xl', note && 'content-offset-tight', headingClassName)}>
              {heading}
            </h2>
          </div>
        </Reveal>

        {description ? (
          <Reveal delay={0.08}>
            <p className={cx('body-copy max-w-2xl', descriptionClassName)}>
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
      <h3 className="heading-sm content-offset max-w-3xl">
        {title}
      </h3>
      <p className="body-copy content-offset-tight max-w-2xl">
        {description}
      </p>
    </article>
  )
}
