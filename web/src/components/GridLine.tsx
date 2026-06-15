import { motion } from "motion/react"

interface GridLineProps {
  direction?: "horizontal" | "vertical"
  position: string // Tailwind classes for positioning e.g. "top-10 left-0"
  delay?: number
}

export function GridLine({ direction = "horizontal", position, delay = 0 }: GridLineProps) {
  const isHorizontal = direction === "horizontal"
  
  return (
    <motion.div
      initial={{ scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute bg-white/10 z-0 ${position} ${
        isHorizontal ? "h-[1px] w-full origin-left" : "w-[1px] h-full origin-top"
      }`}
    />
  )
}
