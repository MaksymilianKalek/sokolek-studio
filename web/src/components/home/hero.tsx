import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ShaderGradientBackground } from '../shader-gradient-background';
import { TerminalWordmark } from './terminal-wordmark';

type HeroProps = {
  isIntroActive: boolean;
  isIntroDismissing: boolean;
  onIntroTypingComplete: () => void;
  startTyping: boolean;
};

function LanguageSwitch() {
  const { i18n, t } = useTranslation();
  const activeLanguage = i18n.language.startsWith('en') ? 'pl' : 'en';
  const nextLanguage = activeLanguage === 'en' ? 'pl' : 'en';

  return (
    <button
      aria-label={t('nav.language')}
      type="button"
      onClick={() => i18n.changeLanguage(nextLanguage)}
      className="nav-text interactive-accent-link focus-ring cursor-pointer text-ink"
    >
      {activeLanguage.toUpperCase()}
    </button>
  );
}

function getSecondWordAxisPrefix(value: string) {
  const firstSpaceIndex = value.indexOf(' ');

  if (firstSpaceIndex === -1) {
    return '';
  }

  return value.slice(0, firstSpaceIndex + 1);
}

export function Hero({
  isIntroActive,
  isIntroDismissing,
  onIntroTypingComplete,
  startTyping,
}: HeroProps) {
  const { t } = useTranslation();
  const heroTitle = t('hero.title');
  const studioAxisPrefix = getSecondWordAxisPrefix(heroTitle);
  const studioAxisMeasureRef = useRef<HTMLSpanElement>(null);
  const [studioAxis, setStudioAxis] = useState<number | null>(null);
  const navItems = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.contact'), href: '#contact' },
  ];
  const heroGridStyle = studioAxis
    ? ({ '--studio-axis': `${studioAxis}px` } as CSSProperties)
    : undefined;
  useEffect(() => {
    const measureNode = studioAxisMeasureRef.current;

    if (!measureNode || studioAxisPrefix.length === 0) {
      return;
    }

    const updateStudioAxis = () => {
      setStudioAxis(Math.ceil(measureNode.getBoundingClientRect().width));
    };
    const resizeObserver = new ResizeObserver(updateStudioAxis);

    updateStudioAxis();
    resizeObserver.observe(measureNode);
    window.addEventListener('resize', updateStudioAxis);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateStudioAxis);
    };
  }, [studioAxisPrefix]);

  return (
    <section className="hero-shader-shell relative flex min-h-svh flex-col overflow-hidden px-5 py-5 sm:min-h-dvh sm:px-8 lg:px-10">
      <ShaderGradientBackground />

      <header className="relative z-10 flex items-center justify-between gap-6">
        <img
          src="/logo_new_white.svg"
          alt=""
          className="h-auto w-10"
        />

        <nav
          aria-label="Main navigation"
          className="nav-text hidden items-center gap-7 sm:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="interactive-accent-link focus-ring text-ink-soft"
            >
              {item.label}
            </a>
          ))}
          <LanguageSwitch />
        </nav>

        <div className="sm:hidden">
          <LanguageSwitch />
        </div>
      </header>

      <div
        id="top"
        className="flex flex-1 flex-col justify-between pb-0 pt-6 sm:justify-end sm:gap-10 sm:pb-14 sm:pt-28 lg:pb-16"
      >
        <div className="flex min-h-0 flex-1 flex-col justify-center sm:flex-none sm:justify-start">
          <div className="max-w-[94rem]">
            <h1 aria-label={heroTitle} className="relative font-satoshi">
              <span
                ref={studioAxisMeasureRef}
                aria-hidden="true"
                className="hero-wordmark pointer-events-none absolute left-0 top-0 -z-10 whitespace-pre opacity-0"
              >
                {studioAxisPrefix}
              </span>
              <TerminalWordmark
                key={heroTitle}
                isActive={startTyping}
                isIntroActive={isIntroActive}
                isOnIntroCurtain={isIntroActive && !isIntroDismissing}
                onTyped={onIntroTypingComplete}
                word={heroTitle}
              />
            </h1>

            <p className="heading-md relative z-10 mt-6 max-w-3xl text-ink sm:hidden">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>

        <div
          className="relative z-10 grid gap-y-6 sm:mt-0 md:grid-cols-[minmax(0,var(--studio-axis,1.1fr))_minmax(18rem,1fr)_auto] md:items-start md:gap-y-8 md:pt-4"
          style={heroGridStyle}
        >
          <p className="heading-md hidden max-w-3xl text-ink sm:block">
            {t('hero.subtitle')}
          </p>

          <p className="body-copy max-w-md">
            {t('hero.description')}
          </p>

          <a
            href="mailto:hello@sokolek.com"
            className="primary-cta focus-ring action-text group inline-flex w-fit items-center gap-3 px-5 py-3 md:ml-8"
          >
            <span className="relative z-10">{t('common.startProject')}</span>
            <ArrowUpRight className="primary-cta-icon relative z-10 size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
