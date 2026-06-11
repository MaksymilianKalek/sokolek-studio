import { Trans, useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { MaskedText } from './MaskedText';

export function Philosophy() {
  const { t } = useTranslation();

  return (
    <section id="philosophy" className="w-full bg-transparent py-40">
      <div className="w-full">
        <div className="grid grid-cols-12 gap-y-24 md:gap-6 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto">
          
          <div className="col-span-12 md:col-span-10 lg:col-span-8 flex flex-col justify-start text-left">
            <div>
              <MaskedText className="font-mono text-[10px] tracking-[0.4em] uppercase mb-16 opacity-40 text-[var(--color-noir-text)]">
                {t('philosophy.label')}
              </MaskedText>

              <MaskedText
                as="h2"
                className="font-satoshi text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] mb-20 text-[var(--color-noir-text)] uppercase"
                delay={0.15}
              >
                {t('philosophy.heading')}
              </MaskedText>

              <MaskedText className="font-serif italic text-3xl md:text-5xl lg:text-6xl font-normal leading-[1.2] text-[#a0a0a0] lowercase ml-6 md:ml-24" delay={0.3}>
                <Trans
                  i18nKey="philosophy.quote"
                  components={[
                    <span className="font-satoshi font-black uppercase text-[var(--color-noir-text)] tracking-tighter not-italic text-[0.8em] mx-3 align-middle" key="0" />,
                  ]}
                />
              </MaskedText>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7 flex flex-col justify-start mt-20 md:mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="space-y-10 p-12 md:p-16 rounded-sm"
              style={{ 
                backgroundColor: 'var(--color-noir-surface)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
            >
              <p className="font-inter text-xl md:text-2xl text-[var(--color-noir-muted)] leading-[1.8] font-light tracking-wide">
                {t('philosophy.p1')}
              </p>
              <p className="font-inter text-xl md:text-2xl text-[var(--color-noir-muted)] leading-[1.8] font-light tracking-wide">
                {t('philosophy.p2')}
              </p>

              <div className="pt-20 mt-20 border-t border-[rgba(255,255,255,0.05)] flex items-center justify-between">
                <div className="font-serif italic text-lg text-[var(--color-noir-text)] opacity-60 lowercase">
                  {t('philosophy.caption')}
                </div>
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border border-[rgba(255,255,255,0.1)] text-[var(--color-noir-text)] opacity-40 hover:opacity-100 transition-opacity duration-500"
                  data-cursor-expand
                >
                  <span className="font-satoshi font-bold text-sm tracking-widest">M&K</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
