import { useTranslation } from 'react-i18next';
import { MagneticElement } from './MagneticElement';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#F2EFEB] py-16 rounded-t-[2rem]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <MagneticElement>
          <div className="font-satoshi font-bold text-xl tracking-tight text-[#32302C] mb-4 md:mb-0">
            Sokołek Studio
          </div>
        </MagneticElement>
        <div className="font-inter text-sm tracking-widest uppercase text-[#8A867D]">
          {t('footer.location')}
        </div>
      </div>
    </footer>
  );
}
