import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SiteHeader } from '../site-header';
import { cx } from '../../lib/class-names';
// import { ShaderGradientBackground } from '../shader-gradient-background';
import { TerminalWordmark } from './terminal-wordmark';
import { PrimaryCtaLink } from './ui';

type HeroProps = {
  isIntroActive: boolean;
  isIntroDismissing: boolean;
  onIntroTypingComplete: () => void;
  startTyping: boolean;
};

type HeroSubtitleProps = {
  className?: string;
  label: string;
  lines: string[];
};

function HeroSubtitle({ className = '', label, lines }: HeroSubtitleProps) {
  return (
    <p aria-label={label} className={cx('heading-md text-balance text-ink', className)}>
      <span aria-hidden="true" className="hero-contrast-surface hero-subtitle-surface">
        {lines.map((line) => (
          <span key={line} className="whitespace-nowrap">
            {line}
          </span>
        ))}
      </span>
    </p>
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
  const heroSubtitle = t('hero.subtitle');
  const heroSubtitleLines = t('hero.subtitleLines', { returnObjects: true }) as string[];
  const studioAxisPrefix = getSecondWordAxisPrefix(heroTitle);
  const studioAxisMeasureRef = useRef<HTMLSpanElement>(null);
  const [studioAxis, setStudioAxis] = useState<number | null>(null);
  const [desktopNavOffset, setDesktopNavOffset] = useState<number | null>(null);
  const heroGridStyle = {
    ...(studioAxis ? { '--studio-axis': `${studioAxis}px` } : {}),
    ...(desktopNavOffset ? { '--hero-nav-start-offset': `${desktopNavOffset}px` } : {}),
  } as CSSProperties;
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
    <section className="hero-surface site-gutter relative flex min-h-svh flex-col overflow-hidden py-5 sm:min-h-dvh">
      {/* <ShaderGradientBackground /> */}
      <img
        aria-hidden="true"
        alt=""
        src="/photos/grain_black_white.jpg"
        width="3864"
        height="2576"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="site-container flex flex-1 flex-col">
        <SiteHeader
          logoSrc="/logo_new_white.svg"
          navigationClassName="hero-contrast-surface hero-navigation-surface"
          onDesktopNavOffsetChange={setDesktopNavOffset}
        />

        <div
          id="top"
          className="flex flex-1 flex-col justify-between pb-0 pt-6 sm:justify-end sm:gap-7 sm:pb-14 sm:pt-28 lg:pb-16"
        >
          <div className="flex min-h-0 flex-1 flex-col justify-center sm:flex-none sm:justify-start">
            <div className="max-w-[94rem]">
              <h1
                aria-label={heroTitle}
                className={cx(
                  'hero-contrast-surface hero-wordmark-surface relative w-fit max-w-full font-satoshi',
                  isIntroActive && 'z-[10000]',
                )}
              >
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
            </div>
          </div>

          <div
            className={cx(
              'relative z-10 grid gap-y-6 sm:mt-0',
              'md:grid-cols-[minmax(0,var(--studio-axis,1.1fr))_minmax(18rem,1fr)_auto] md:items-start md:gap-y-8 md:pt-4',
            )}
            style={heroGridStyle}
          >
            <div className="hidden sm:block md:col-span-2 md:col-start-1 md:row-start-1">
              <HeroSubtitle
                label={heroSubtitle}
                lines={heroSubtitleLines}
                className="max-w-5xl"
              />
            </div>

            <HeroSubtitle
              label={heroSubtitle}
              lines={heroSubtitleLines}
              className="relative z-10 mt-6 max-w-3xl sm:hidden"
            />

            <div className="hero-nav-aligned-action md:col-span-3 md:col-start-1 md:row-start-1 md:self-end">
              <PrimaryCtaLink
                href="mailto:hello@sokolek.com"
                className="hero-contrast-surface"
              >
                {t('common.startProject')}
              </PrimaryCtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
