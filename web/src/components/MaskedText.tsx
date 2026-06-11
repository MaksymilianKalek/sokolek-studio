import { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface MaskedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'span' | 'p';
}

const EASE = [0.76, 0, 0.24, 1] as const;

export function MaskedText({ children, className = '', delay = 0, as = 'div' }: MaskedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const Tag = as;

  return (
    <Tag ref={ref as never} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: '0%' } : { y: '100%' }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
