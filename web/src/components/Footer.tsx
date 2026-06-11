import { useTranslation } from 'react-i18next';
import { MagneticElement } from './MagneticElement';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[var(--color-noir-surface)] py-20 mt-20">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <MagneticElement>
          <div 
            data-cursor-expand
            className="font-satoshi font-black text-2xl tracking-tighter uppercase text-[var(--color-noir-text)] mb-8 md:mb-0"
          >
            Sokołek Studio
          </div>
        </MagneticElement>
        <div className="font-serif italic lowercase text-lg text-[var(--color-noir-muted)]">
          {t('footer.location')}
        </div>
      </div>
    </footer>
  );
}
