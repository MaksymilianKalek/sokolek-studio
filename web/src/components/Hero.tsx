import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'motion/react';
import { MagneticElement } from './MagneticElement';

const HEAVY_SPRING = { damping: 20, stiffness: 100 };
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

function RevealLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '110%', rotateX: -15 }}
        animate={{ y: '0%', rotateX: 0 }}
        transition={{ ...HEAVY_SPRING, delay }}
        style={{ transformOrigin: 'bottom left' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const accentY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-noir-bg)' }}
    >
      {/* Decorative vertical brutalist line */}
      <motion.div
        className="absolute bottom-0 left-[8%] md:left-[5%] w-[1px] h-[40vh] pointer-events-none"
        style={{
          y: accentY,
          background: 'linear-gradient(180deg, transparent, var(--color-noir-border))',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full pl-6 md:pl-12 lg:pl-[15vw] pr-6 md:pr-12">
        <motion.div
          className="flex flex-col items-start"
          style={{ y: textY }}
        >
          <motion.div
            className="font-inter text-xs tracking-[0.3em] uppercase mb-16 opacity-60"
            style={{ color: 'var(--color-noir-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.1 }}
          >
            Butikowe rzemiosło cyfrowe — Poznań
          </motion.div>

          <h1 className="sr-only">{t('hero.heading')}</h1>

          <div
            aria-hidden="true"
            className="leading-[0.85] md:leading-[0.9]"
            style={{ fontSize: 'clamp(4rem, 11vw, 12rem)' }}
          >
            <RevealLine delay={0.3}>
              <span className="font-satoshi font-black uppercase tracking-tighter text-[var(--color-noir-text)] whitespace-nowrap">
                Czysty kod
              </span>
            </RevealLine>
            <RevealLine delay={0.5}>
              <span className="font-serif italic lowercase text-[#a0a0a0] ml-12 md:ml-[15vw] whitespace-nowrap">
                świetny design
              </span>
            </RevealLine>
          </div>

          <motion.div
            style={{ y: subtitleY }}
            className="mt-16 max-w-xl md:ml-[15vw]"
          >
            <motion.p
              className="font-inter text-xl md:text-2xl leading-[1.8]"
              style={{ color: 'var(--color-noir-muted)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.9 }}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.1 }}
              className="mt-12"
            >
              <MagneticElement>
                <a
                  href="#contact"
                  data-cursor-expand
                  className="inline-flex items-center justify-center font-inter text-[13px] font-bold tracking-widest uppercase px-12 py-5 rounded-full transition-all duration-500 hover:scale-105"
                  style={{
                    backgroundColor: 'var(--color-noir-accent)',
                    color: 'var(--color-noir-surface)',
                  }}
                >
                  {t('hero.cta')}
                </a>
              </MagneticElement>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
