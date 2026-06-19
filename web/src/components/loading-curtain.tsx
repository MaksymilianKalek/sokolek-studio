import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type LoadingCurtainProps = {
  isDismissing: boolean
  onComplete: () => void
  onReadyToType: () => void
}

export function LoadingCurtain({ isDismissing, onComplete, onReadyToType }: LoadingCurtainProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let delayTimer: number | undefined
    const frame = window.requestAnimationFrame(() => {
      delayTimer = window.setTimeout(() => {
        onReadyToType()
        document.documentElement.classList.remove('site-loading')
      }, 500)
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
      className="fixed inset-0 z-[9999] bg-ink"
      initial={{ opacity: 1 }}
      animate={{ opacity: isDismissing ? 0 : 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.65, ease: [0.76, 0, 0.24, 1] }
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
