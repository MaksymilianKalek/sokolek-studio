import { useTranslation } from 'react-i18next';
import { MagneticElement } from './MagneticElement';

export function Navigation() {
  const { t } = useTranslation();

  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-8 py-8 bg-transparent sticky top-0 z-50">
      <MagneticElement>
        <div className="font-satoshi font-bold text-xl tracking-tight text-[#32302C]">
          Sokołek Studio
        </div>
      </MagneticElement>
      <div className="hidden md:flex items-center gap-10 font-inter text-[15px] text-[#8A867D]">
        <MagneticElement>
          <a href="#work" className="hover:text-[#32302C] transition-colors duration-700">
            {t('nav.work')}
          </a>
        </MagneticElement>
        <MagneticElement>
          <a href="#philosophy" className="hover:text-[#32302C] transition-colors duration-700">
            {t('nav.philosophy')}
          </a>
        </MagneticElement>
        <MagneticElement>
          <a href="#contact" className="hover:text-[#32302C] transition-colors duration-700">
            {t('nav.contact')}
          </a>
        </MagneticElement>
      </div>
      {/* Mobile menu button could go here, keeping simple for now */}
    </nav>
  );
}
