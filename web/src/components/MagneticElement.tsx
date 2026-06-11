import { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticElement({ children, className = "", strength = 20 }: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  
  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-strength, strength]), springConfig);
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-strength, strength]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    
    // Normalize -0.5 to 0.5
    mouseX.set(xPos / width - 0.5);
    mouseY.set(yPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ duration: 0.3 }}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
