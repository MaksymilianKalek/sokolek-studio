import { useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'motion/react';
import { MaskedText } from './MaskedText';
import { useMediaQuery } from '../hooks/useMediaQuery';

const ASCII_PATTERN = `
┌──────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░  ┌───┐  ┌───┐  ░░░  │
│  ░░  │ ◆ │──│ ◇ │  ░░░  │
│  ░░  └───┘  └───┘  ░░░  │
│  ░░░░░░│░░░░░░│░░░░░░░  │
│  ░░  ┌─┴──────┴─┐  ░░░  │
│  ░░  │  SYSTEM  │  ░░░  │
│  ░░  └──────────┘  ░░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░  │
└──────────────────────────┘
`.trim();

interface DisciplineItem {
  id: string;
  label: string;
  title: string;
  desc: string;
  stack: string;
}

function SpotlightCard({
  item,
  index,
  isDesktop,
}: {
  item: DisciplineItem;
  index: number;
  isDesktop: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      className="relative group overflow-hidden rounded-sm p-10 md:p-14"
      style={{
        backgroundColor: 'var(--color-noir-surface)',
        backgroundImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.06) 0%, transparent 80%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
        '--mx': '50%',
        '--my': '50%',
      } as React.CSSProperties}
    >
      {isDesktop && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden"
          style={{
            maskImage: 'radial-gradient(circle 220px at var(--mx) var(--my), black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle 220px at var(--mx) var(--my), black 0%, transparent 70%)',
          }}
          aria-hidden="true"
        >
          <pre
            className="absolute inset-0 flex items-center justify-center font-mono text-[10px] leading-tight whitespace-pre select-none pointer-events-none"
            style={{ color: 'var(--color-noir-accent)', opacity: 0.15 }}
          >
            {ASCII_PATTERN}
          </pre>
        </div>
      )}

      <div className="relative z-10 pointer-events-none">
        <div
          className="font-serif italic text-sm tracking-wide lowercase mb-10 opacity-50"
          style={{ color: 'var(--color-noir-muted)' }}
        >
          {item.label}
        </div>

        <h3
          className="font-satoshi text-3xl md:text-4xl font-bold tracking-tighter mb-6"
          style={{ color: 'var(--color-noir-text)' }}
        >
          {item.title}
        </h3>

        <p
          className="font-inter text-lg md:text-xl leading-[1.8] mb-12"
          style={{ color: 'var(--color-noir-muted)' }}
        >
          {item.desc}
        </p>

        <div
          className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-40"
          style={{ color: 'var(--color-noir-text)' }}
        >
          {item.stack}
        </div>
      </div>
    </motion.div>
  );
}

export function Disciplines() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const items: DisciplineItem[] = [
    {
      id: '01',
      label: t('disciplines.items.0.label'),
      title: t('disciplines.items.0.title'),
      desc: t('disciplines.items.0.desc'),
      stack: t('disciplines.items.0.stack'),
    },
    {
      id: '02',
      label: t('disciplines.items.1.label'),
      title: t('disciplines.items.1.title'),
      desc: t('disciplines.items.1.desc'),
      stack: t('disciplines.items.1.stack'),
    },
    {
      id: '03',
      label: t('disciplines.items.2.label'),
      title: t('disciplines.items.2.title'),
      desc: t('disciplines.items.2.desc'),
      stack: t('disciplines.items.2.stack'),
    },
    {
      id: '04',
      label: t('disciplines.items.3.label'),
      title: t('disciplines.items.3.title'),
      desc: t('disciplines.items.3.desc'),
      stack: t('disciplines.items.3.stack'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="work"
      data-spotlight-section
      className="relative py-40"
      style={{ backgroundColor: 'var(--color-noir-bg)' }}
    >
      <div className="w-full">
        {/* Asymmetrical heading pushed to the extreme left */}
        <motion.div style={{ y: headingY }} className="pl-6 md:pl-12 lg:pl-0 lg:-ml-[2vw] mb-20 max-w-5xl">
          <div
            className="font-inter text-[10px] tracking-[0.4em] uppercase mb-12 ml-6 md:ml-12 lg:ml-[2vw] opacity-40"
            style={{ color: 'var(--color-noir-text)' }}
          >
            {t('disciplines.label')}
          </div>

          <MaskedText
            as="h2"
            className="font-satoshi text-[10vw] md:text-[8vw] lg:text-[7vw] font-black tracking-tighter leading-[0.85] uppercase"
          >
            {t('disciplines.heading').replace(/<[^>]*>/g, '')}
          </MaskedText>
        </motion.div>

        {/* Bento grid separated by negative space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 px-6 md:px-12 lg:px-24 mx-auto">
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className={index % 2 === 1 ? "md:mt-32" : ""}
            >
              <SpotlightCard
                item={item}
                index={index}
                isDesktop={isDesktop}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
