import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { motionDuration, motionTransition } from '../lib/motion'

type LoadingCurtainProps = {
  className?: string
  isDismissing: boolean
  onComplete: () => void
  onReadyToType: () => void
}

export function LoadingCurtain({
  className = 'fixed inset-0',
  isDismissing,
  onComplete,
  onReadyToType,
}: LoadingCurtainProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let delayTimer: number | undefined
    const frame = window.requestAnimationFrame(() => {
      delayTimer = window.setTimeout(() => {
        onReadyToType()
        document.documentElement.classList.remove('site-loading')
      }, 0)
    })

    return () => {
      window.cancelAnimationFrame(frame)

      if (delayTimer) {
        window.clearTimeout(delayTimer)
      }
    }
  }, [onReadyToType])

  if (!isVisible) {
    return null
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`${className} z-[9999] bg-ink`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isDismissing ? 0 : 1 }}
      transition={
        prefersReducedMotion
          ? { duration: motionDuration.instant }
          : motionTransition.theme
      }
      onAnimationComplete={() => {
        if (isDismissing) {
          setIsVisible(false)
          onComplete()
        }
      }}
    />
  )
}
