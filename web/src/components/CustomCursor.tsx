import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scaleSpring = useSpring(1, { damping: 20, stiffness: 200 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const overSerif = target?.closest('[data-cursor-expand]') !== null;
        if (overSerif !== isExpanded) {
          setIsExpanded(overSerif);
          scaleSpring.set(overSerif ? 2.5 : 1);
        }
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, isVisible, isExpanded, scaleSpring]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[1000]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: scaleSpring,
        opacity: isVisible ? 1 : 0,
        backgroundColor: isExpanded ? '#FFD000' : '#3E3A35',
        mixBlendMode: isExpanded ? 'multiply' : 'difference',
      }}
    />
  );
}
