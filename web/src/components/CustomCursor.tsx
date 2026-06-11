import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type CursorMode = 'default' | 'spotlight' | 'expanded';

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const sizeSpring = useSpring(8, { damping: 25, stiffness: 200 });
  const opacitySpring = useSpring(1, { damping: 30, stiffness: 300 });
  const blurSpring = useSpring(0, { damping: 25, stiffness: 200 });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        if (!target) return;

        const inSpotlight = target.closest('[data-spotlight-section]') !== null;
        const isExpandable = target.closest('[data-cursor-expand]') !== null;

        let newMode: CursorMode = 'default';
        if (isExpandable) {
          newMode = 'expanded';
        } else if (inSpotlight) {
          newMode = 'spotlight';
        }

        if (newMode !== mode) {
          setMode(newMode);
          switch (newMode) {
            case 'spotlight':
              sizeSpring.set(300);
              opacitySpring.set(0.25);
              blurSpring.set(60);
              break;
            case 'expanded':
              sizeSpring.set(60);
              opacitySpring.set(0.8);
              blurSpring.set(0);
              break;
            default:
              sizeSpring.set(8);
              opacitySpring.set(1);
              blurSpring.set(0);
              break;
          }
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
  }, [cursorX, cursorY, isVisible, mode, sizeSpring, opacitySpring, blurSpring]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[1000]"
      style={{
        x,
        y,
        width: sizeSpring,
        height: sizeSpring,
        opacity: isVisible ? opacitySpring : 0,
        filter: blurSpring.get() > 0 ? `blur(${blurSpring}px)` : undefined,
        backgroundColor: '#FFD000',
        translateX: '-50%',
        translateY: '-50%',
        mixBlendMode: mode === 'spotlight' ? 'screen' : 'difference',
      }}
    />
  );
}
