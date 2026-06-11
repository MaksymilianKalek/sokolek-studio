import { useRef } from 'react';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'motion/react';

interface ScrollDistortionProps {
  children: React.ReactNode;
}

export function ScrollDistortion({ children }: ScrollDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Transform scroll velocity into a skew amount
  // We clamp the velocity mapping to avoid extreme distortion
  const skewVelocity = useTransform(scrollVelocity, [-3000, 0, 3000], [1.5, 0, -1.5]);
  
  // Apply a spring for elastic snapback when scrolling stops
  const skewY = useSpring(skewVelocity, {
    stiffness: 400,
    damping: 20,
    mass: 0.5
  });

  return (
    <motion.div
      ref={containerRef}
      style={{ skewY, transformOrigin: 'center' }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
