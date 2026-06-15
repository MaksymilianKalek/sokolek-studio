import { useEffect, useState } from 'react'
import { motion, useMotionValue } from 'motion/react'

export function HoloCursor() {
  const [visible, setVisible] = useState(false)
  const [isClickable, setIsClickable] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target) {
        const closestClickable = target.closest('a, button, [role="button"], input, textarea, select, [contenteditable="true"], .cursor-pointer')
        setIsClickable(!!closestClickable)
      }
    }

    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [x, y, visible])

  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  const translateX = isClickable ? '-45%' : '-33%'
  const translateY = isClickable ? '-22.4%' : '-26.4%'

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{
        x,
        y,
        translateX,
        translateY,
        opacity: visible ? 1 : 0,
      }}
    >
      <img
        src="/cursor.svg"
        alt="cursor"
        className={`w-10 h-[50px] ${isClickable ? 'hidden' : 'block'}`}
      />
      <img
        src="/clickable.svg"
        alt="clickable cursor"
        className={`w-10 h-[50px] ${isClickable ? 'block' : 'hidden'}`}
      />
    </motion.div>
  )
}
