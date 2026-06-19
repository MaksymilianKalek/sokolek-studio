import { type ReactNode } from 'react'
import { motion } from 'motion/react'
import { motionTransition } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        ...motionTransition.entrance,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
