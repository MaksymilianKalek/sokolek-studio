import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cx } from '../../lib/class-names'

const cursorBlinkDuration = 1
const introDismissDelay = 0
const typingInterval = 118

type TerminalWordmarkProps = {
  isActive: boolean
  isIntroActive: boolean
  isOnIntroCurtain: boolean
  onTyped: () => void
  word: string
}

export function TerminalWordmark({
  isActive,
  isIntroActive,
  isOnIntroCurtain,
  onTyped,
  word,
}: TerminalWordmarkProps) {
  const prefersReducedMotion = useReducedMotion()
  const [typedText, setTypedText] = useState('')
  const visibleText = isActive ? (prefersReducedMotion ? word : typedText) : ''
  const isTypingComplete = typedText === word

  useEffect(() => {
    if (!isActive) {
      return
    }

    if (prefersReducedMotion) {
      onTyped()
      return
    }

    let index = 0
    let dismissIntroTimer: number | undefined
    const typingTimer = window.setInterval(() => {
      index += 1
      setTypedText(word.slice(0, index))

      if (index === word.length) {
        window.clearInterval(typingTimer)

        dismissIntroTimer = window.setTimeout(() => {
          onTyped()
        }, introDismissDelay)
      }
    }, typingInterval)

    return () => {
      window.clearInterval(typingTimer)

      if (dismissIntroTimer) {
        window.clearTimeout(dismissIntroTimer)
      }
    }
  }, [isActive, onTyped, prefersReducedMotion, word])

  return (
    <span
      aria-hidden="true"
      className={cx(
        'hero-wordmark relative z-[10000] inline-flex min-h-[1.08em] items-center gap-2',
        isIntroActive && 'intro-wordmark-color-transition',
        isOnIntroCurtain ? 'text-paper-fixed' : 'text-ink',
      )}
    >
      <span>{visibleText}</span>
      <motion.span
        key={isTypingComplete ? 'cursor-complete' : 'cursor-active'}
        className="accent-gradient mt-[0.08em] h-[0.72em] w-[0.08em]"
        animate={
          prefersReducedMotion
            ? { opacity: 0 }
            : {
                opacity: isTypingComplete ? [1, 1, 0, 0] : [1, 1, 0, 0],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: cursorBlinkDuration,
                times: [0, 0.5, 0.5, 1],
                repeat: isTypingComplete ? 2 : Infinity,
                ease: 'linear',
              }
        }
      />
    </span>
  )
}
