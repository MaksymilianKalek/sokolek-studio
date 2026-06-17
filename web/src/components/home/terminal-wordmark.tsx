import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const WORDMARK = 'Sokołek Studio'

export function TerminalWordmark() {
  const prefersReducedMotion = useReducedMotion()
  const [typedText, setTypedText] = useState('')
  const visibleText = prefersReducedMotion ? WORDMARK : typedText

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTypedText(WORDMARK.slice(0, index))

      if (index === WORDMARK.length) {
        window.clearInterval(timer)
      }
    }, 92)

    return () => window.clearInterval(timer)
  }, [prefersReducedMotion])

  return (
    <span
      aria-hidden="true"
      className="inline-flex min-h-[1.08em] items-center gap-2 font-mono text-[clamp(3.2rem,12vw,11.5rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-ink"
    >
      <span>{visibleText}</span>
      <motion.span
        className="accent-gradient mt-[0.08em] h-[0.72em] w-[0.08em]"
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 1, repeat: Infinity, ease: 'linear' }
        }
      />
    </span>
  )
}
