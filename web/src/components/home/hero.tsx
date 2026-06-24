import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShaderGradientBackground } from '../shader-gradient-background';
import { SiteHeader } from '../site-header';
import { cx } from '../../lib/class-names';
import { TerminalWordmark } from './terminal-wordmark';
import { PrimaryCtaLink } from './ui';

type HeroProps = {
  isIntroActive: boolean;
  isIntroDismissing: boolean;
  onIntroTypingComplete: () => void;
  startTyping: boolean;
};

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

      <SiteHeader logoSrc="/logo_new_white.svg" />

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

          </div>
        </div>

        <div
          className={cx(
            'relative z-10 grid gap-y-6 sm:mt-0',
            'md:grid-cols-[minmax(0,var(--studio-axis,1.1fr))_minmax(18rem,1fr)_auto] md:items-start md:gap-y-8 md:pt-4',
          )}
          style={heroGridStyle}
        >
          <div className="hidden sm:block">
            <p className="heading-md max-w-3xl text-ink">
              {t('hero.subtitle')}
            </p>
          </div>

          <p className="heading-md relative z-10 mt-6 max-w-3xl text-ink sm:hidden">
              {t('hero.subtitle')}
            </p>

          <p className="body-copy max-w-md">
            {t('hero.description')}
          </p>

          <PrimaryCtaLink
            href="mailto:hello@sokolek.com"
            className="md:ml-8"
          >
            {t('common.startProject')}
          </PrimaryCtaLink>
        </div>
      </div>
    </section>
  );
}
