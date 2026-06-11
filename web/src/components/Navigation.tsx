import { useTranslation } from 'react-i18next';
import { MagneticElement } from './MagneticElement';

export function Navigation() {
  const { t, i18n } = useTranslation();

  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-12 py-8 bg-transparent sticky top-0 z-50 mix-blend-difference">
      <MagneticElement>
        <div 
          data-cursor-expand
          className="font-satoshi font-bold text-xl tracking-tight text-[#FAFAFA]"
        >
          Sokołek Studio
        </div>
      </MagneticElement>
      <div className="hidden md:flex items-center gap-10 font-inter text-[13px] tracking-widest uppercase text-[#FAFAFA]">
        <MagneticElement>
          <a href="#work" data-cursor-expand className="opacity-70 hover:opacity-100 hover:text-[#FFD000] transition-all duration-500">
            {t('nav.work')}
          </a>
        </MagneticElement>
        <MagneticElement>
          <a href="#philosophy" data-cursor-expand className="opacity-70 hover:opacity-100 hover:text-[#FFD000] transition-all duration-500">
            {t('nav.philosophy')}
          </a>
        </MagneticElement>
        <MagneticElement>
          <a href="#contact" data-cursor-expand className="opacity-70 hover:opacity-100 hover:text-[#FFD000] transition-all duration-500">
            {t('nav.contact')}
          </a>
        </MagneticElement>
        
        <div className="flex items-center gap-4 ml-4 pl-8 border-l border-[#FAFAFA]/20">
          <MagneticElement>
            <button
              onClick={() => i18n.changeLanguage('en')}
              data-cursor-expand
              className={`transition-all duration-500 ${i18n.language.startsWith('en') ? 'opacity-100 text-[#FFD000]' : 'opacity-40 hover:opacity-100'}`}
            >
              EN
            </button>
          </MagneticElement>
          <MagneticElement>
            <button
              onClick={() => i18n.changeLanguage('pl')}
              data-cursor-expand
              className={`transition-all duration-500 ${i18n.language.startsWith('pl') ? 'opacity-100 text-[#FFD000]' : 'opacity-40 hover:opacity-100'}`}
            >
              PL
            </button>
          </MagneticElement>
        </div>
      </div>
    </nav>
  );
}
