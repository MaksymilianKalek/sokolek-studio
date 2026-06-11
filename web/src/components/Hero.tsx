import { useEffect, useRef, useState, useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'motion/react';
import { MagneticElement } from './MagneticElement';
import { MaskedText } from './MaskedText';

function Crosshair({ className }: { className: string }) {
  return <span className={`absolute text-[#3E3A35]/15 text-xs font-mono select-none pointer-events-none ${className}`}>+</span>;
}

export function Hero() {
  const { t } = useTranslation();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 30, mass: 5 };
  const sphereX = useSpring(mouseX, springConfig);

  const { scrollY } = useScroll();
  const orbParallaxY = useTransform(scrollY, [0, 1000], [0, -200]);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const [fontWeight, setFontWeight] = useState(700);

  const handleHeadingMouse = useCallback((e: React.MouseEvent) => {
    if (!headingRef.current) return;
    const rect = headingRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
    const maxDist = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));
    const normalized = Math.min(dist / maxDist, 1);
    const weight = Math.round(800 - normalized * 200);
    setFontWeight(weight);
  }, []);

  const handleHeadingLeave = useCallback(() => {
    setFontWeight(700);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const labelParts = t('hero.label').split('—');

  return (
    <section className="relative w-full min-h-[90vh] flex items-center px-6 md:px-12 py-32 bg-transparent overflow-hidden">

      <motion.div
        className="absolute right-[5%] top-[15%] w-[50vw] h-[50vw] rounded-full pointer-events-none z-0 bg-[#FFD000] opacity-[0.12] blur-[120px] md:blur-[180px]"
        style={{ x: sphereX, y: orbParallaxY }}
        animate={{
          scale: [1, 1.05, 0.98, 1],
          rotate: [0, 90, -90, 0],
        }}
        transition={{
          duration: 25,
          ease: 'linear',
          repeat: Infinity,
        }}
      />

      <div className="w-full max-w-[100rem] mx-auto grid grid-cols-12 gap-6 z-10 relative">
        {/* Grid Crosshairs */}
        <Crosshair className="top-0 left-0" />
        <Crosshair className="top-0 right-0" />
        <Crosshair className="bottom-0 left-0" />
        <Crosshair className="bottom-0 right-0" />

        <div className="col-span-12 lg:col-span-10 xl:col-span-9 flex flex-col items-start text-left">

          <MaskedText className="font-inter text-sm tracking-widest uppercase mb-16 text-[#8A867D]" delay={0.2}>
            {labelParts[0]}
            <span className="text-[#FFD000]">—</span>
            {labelParts[1]}
          </MaskedText>

          <MaskedText
            as="h1"
            className="font-satoshi text-[12vw] md:text-[9vw] lg:text-[8vw] tracking-[-0.06em] text-[#3E3A35] mb-12 leading-[0.85] uppercase"
            delay={0.4}
          >
            <span
              ref={headingRef}
              onMouseMove={handleHeadingMouse}
              onMouseLeave={handleHeadingLeave}
              style={{ fontWeight, transition: 'font-weight 0.3s ease' }}
            >
              <Trans
                i18nKey="hero.heading"
                components={[
                  <span
                    data-cursor-expand
                    className="font-serif italic text-[1.05em] text-[#69635C] lowercase tracking-normal mx-1 md:mx-3"
                    key="0"
                  />,
                ]}
              />
            </span>
          </MaskedText>

          <MaskedText as="p" className="font-inter text-xl md:text-2xl max-w-2xl text-[#8A867D] mb-16 leading-[1.6]" delay={0.6}>
            {t('hero.description')}
          </MaskedText>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.8 }}
          >
            <MagneticElement>
              <a
                href="#contact"
                className="inline-block font-inter text-[15px] font-medium tracking-wide uppercase bg-[#FFD000] text-[#1A1A1A] px-10 py-5 hover:brightness-110 transition-all duration-700 rounded-full"
              >
                {t('hero.cta')}
              </a>
            </MagneticElement>
          </motion.div>

        </div>

        {/* Live Metadata */}
        <div className="col-span-12 lg:col-span-2 xl:col-span-3 hidden lg:flex items-end justify-end pb-4">
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#8A867D]/40">
            Idx: 01 // Sys_Active
          </span>
        </div>
      </div>
    </section>
  );
}
