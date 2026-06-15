import { motion, useInView } from "motion/react"
import { useRef } from "react"

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export function AnimatedText({ text, className = "", delay = 0, once = true }: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "-10%" })

  // Split text into words, then words into characters for staggered animation
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="mr-2 md:mr-3 overflow-hidden flex pb-1">
          {word.split("").map((char, charIndex) => (
            <motion.span variants={child} key={charIndex} className="inline-block">
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  )
}
