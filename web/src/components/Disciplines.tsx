import { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'motion/react';
import { MaskedText } from './MaskedText';
import { useMediaQuery } from '../hooks/useMediaQuery';

function Crosshair({ className }: { className: string }) {
  return <span className={`absolute text-[#3E3A35]/15 text-xs font-mono select-none pointer-events-none z-10 ${className}`}>+</span>;
}

const CARD_SHADOW = '0 4px 20px rgba(0,0,0,0.02), inset 0 0 0 1px rgba(0,0,0,0.04)';

export function Disciplines() {
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  const innerParallax = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);

  const items = [
    {
      id: '01',
      label: t('disciplines.items.0.label'),
      title: t('disciplines.items.0.title'),
      desc: t('disciplines.items.0.desc'),
      stack: t('disciplines.items.0.stack'),
      theme: 'light' as const,
    },
    {
      id: '02',
      label: t('disciplines.items.1.label'),
      title: t('disciplines.items.1.title'),
      desc: t('disciplines.items.1.desc'),
      stack: t('disciplines.items.1.stack'),
      theme: 'dark' as const,
    },
    {
      id: '03',
      label: t('disciplines.items.2.label'),
      title: t('disciplines.items.2.title'),
      desc: t('disciplines.items.2.desc'),
      stack: t('disciplines.items.2.stack'),
      theme: 'light' as const,
    },
    {
      id: '04',
      label: t('disciplines.items.3.label'),
      title: t('disciplines.items.3.title'),
      desc: t('disciplines.items.3.desc'),
      stack: t('disciplines.items.3.stack'),
      theme: 'light' as const,
    },
  ];

  return (
    <section id="work">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 pt-32 pb-16">
        <div className="font-inter text-sm tracking-widest uppercase mb-8 text-[#8A867D]">
          {t('disciplines.label')}
        </div>
        <MaskedText
          as="h2"
          className="font-satoshi text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-[#3E3A35] uppercase max-w-4xl"
        >
          <Trans
            i18nKey="disciplines.heading"
            components={[
              <span data-cursor-expand className="font-serif italic text-[1.1em] text-[#69635C] lowercase tracking-normal ml-2" key="0" />,
            ]}
          />
        </MaskedText>
      </div>

      {isDesktop ? (
        <div ref={scrollRef} className="h-[300vh] relative">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.div
              className="flex gap-6 pl-12 relative"
              style={{ x }}
            >
              {items.map((item, index) => {
                const isDark = item.theme === 'dark';
                const isHovered = hoveredId === item.id;
                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`relative flex flex-col rounded-[2rem] overflow-hidden w-[40vw] min-w-[40vw] shrink-0 ${
                      isDark ? 'bg-[#1A1A19] text-[#F9F8F4]' : 'bg-[#F2EFEB] text-[#3E3A35]'
                    }`}
                    style={{ boxShadow: isDark ? 'none' : CARD_SHADOW }}
                  >
                    {isDark && (
                      <motion.div
                        className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#FFD000]"
                        animate={{ scale: isHovered ? 8 : 1, opacity: isHovered ? 0.15 : 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    {/* Inner parallax container */}
                    <motion.div className="p-12" style={{ x: innerParallax }}>
                      <div className={`font-inter text-xs tracking-widest uppercase mb-16 self-start inline-block px-4 py-2 rounded-full ${
                        isDark ? 'bg-white/10 text-[#F9F8F4]' : 'bg-white/50 text-[#8A867D]'
                      }`}>
                        {item.label}
                      </div>
                      <h3 className="font-satoshi text-4xl md:text-5xl font-bold tracking-tight mb-6">
                        {item.title}
                      </h3>
                      <p className={`font-inter text-lg leading-[1.6] mb-12 ${
                        isDark ? 'text-white/70' : 'text-[#8A867D]'
                      }`}>
                        {item.desc}
                      </p>
                      <div className={`font-inter text-sm font-medium uppercase tracking-wide ${
                        isDark ? 'text-white' : 'text-[#3E3A35]'
                      }`}>
                        {item.stack}
                      </div>
                    </motion.div>

                    {/* Crosshair at gap intersection */}
                    {index < items.length - 1 && (
                      <Crosshair className="-right-[15px] top-1/2 -translate-y-1/2" />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="px-6 pb-32 flex flex-col gap-6">
          {items.map((item, index) => {
            const isDark = item.theme === 'dark';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                className={`relative flex flex-col p-8 rounded-[2rem] overflow-hidden ${
                  isDark ? 'bg-[#1A1A19] text-[#F9F8F4]' : 'bg-[#F2EFEB] text-[#3E3A35]'
                }`}
                style={{ boxShadow: isDark ? 'none' : CARD_SHADOW }}
              >
                {isDark && (
                  <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#FFD000]" />
                )}
                <div className={`font-inter text-xs tracking-widest uppercase mb-12 self-start px-4 py-2 rounded-full ${
                  isDark ? 'bg-white/10 text-[#F9F8F4]' : 'bg-white/50 text-[#8A867D]'
                }`}>
                  {item.label}
                </div>
                <h3 className="font-satoshi text-3xl font-bold tracking-tight mb-4">
                  {item.title}
                </h3>
                <p className={`font-inter text-base leading-[1.6] mb-8 ${
                  isDark ? 'text-white/70' : 'text-[#8A867D]'
                }`}>
                  {item.desc}
                </p>
                <div className={`font-inter text-sm font-medium uppercase tracking-wide ${
                  isDark ? 'text-white' : 'text-[#3E3A35]'
                }`}>
                  {item.stack}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
