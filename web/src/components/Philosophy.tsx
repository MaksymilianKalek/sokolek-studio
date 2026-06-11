import { Trans, useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { MaskedText } from './MaskedText';

export function Philosophy() {
  const { t } = useTranslation();

  return (
    <section id="philosophy" className="w-full bg-transparent py-32">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 grid grid-cols-12 gap-y-16 md:gap-6">

        <div className="col-span-12 md:col-span-5 flex flex-col justify-start text-left">
          <div>
            <MaskedText className="font-inter text-sm tracking-widest uppercase mb-16 text-[#8A867D]">
              {t('philosophy.label')}
            </MaskedText>

            <MaskedText
              as="h2"
              className="font-satoshi text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-16 text-[#3E3A35] uppercase"
              delay={0.15}
            >
              {t('philosophy.heading')}
            </MaskedText>

            <MaskedText className="font-satoshi text-3xl md:text-4xl font-medium leading-[1.3] text-[#3E3A35]" delay={0.3}>
              <Trans
                i18nKey="philosophy.quote"
                components={[
                  <span className="font-serif italic text-[1.1em] text-[#69635C] lowercase tracking-normal mx-2" key="0" />,
                ]}
              />
            </MaskedText>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="space-y-8 bg-[#F2EFEB] p-10 md:p-16 rounded-[2rem]"
          >
            <p className="font-inter text-lg md:text-xl text-[#3E3A35] leading-[1.8]">
              {t('philosophy.p1')}
            </p>
            <p className="font-inter text-lg md:text-xl text-[#3E3A35] leading-[1.8]">
              {t('philosophy.p2')}
            </p>

            <div className="pt-16 mt-16 border-t border-[#8A867D]/20 flex items-center justify-between">
              <div className="font-serif text-xl italic text-[#8A867D]">
                {t('philosophy.caption')}
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-white/50 text-[#8A867D]">
                <span className="font-serif italic text-sm">M&K</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
