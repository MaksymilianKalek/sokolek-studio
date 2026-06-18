import { type ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

const REVEAL_EASE = [0.76, 0, 0.24, 1] as const

type MaskTextRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function MaskTextReveal({ children, className = '', delay = 0 }: MaskTextRevealProps) {
  return (
    <span className={`block overflow-hidden leading-none ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.2, delay, ease: REVEAL_EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

type DataRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function DataReveal({ children, className = '', delay = 0.45 }: DataRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

type DataItemProps = {
  children: ReactNode
  className?: string
}

export function DataItem({ children, className = '' }: DataItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 6 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: REVEAL_EASE },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

type ParallaxImageProps = {
  src: string
  alt: string
  className?: string
}

export function ParallaxImage({ src, alt, className = '' }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ y, scale: 1.15 }}
      />
    </div>
  )
}
