import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { MagneticElement } from './MagneticElement';
import { MaskedText } from './MaskedText';

export function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="w-full bg-transparent py-32">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 grid grid-cols-12 gap-y-16 md:gap-6">

        <div className="col-span-12 md:col-span-5 flex flex-col justify-start text-left">
          <div>
            <MaskedText className="font-inter text-sm tracking-widest uppercase mb-16 text-[#8A867D]">
              {t('contact.label')}
            </MaskedText>

            <MaskedText
              as="h2"
              className="font-satoshi text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-12 text-[#3E3A35] uppercase"
              delay={0.15}
            >
              <Trans
                i18nKey="contact.heading"
                components={[
                  <span className="font-serif italic text-[1.1em] text-[#69635C] lowercase tracking-normal mx-2" key="0" />,
                ]}
              />
            </MaskedText>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-inter text-lg text-[#8A867D] leading-[1.8] max-w-md"
            >
              {t('contact.description')}
            </motion.p>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-start">
          <div className="bg-[#F2EFEB] rounded-[2rem] p-10 md:p-16">
            {status === 'idle' ? (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="w-full flex flex-col"
              >
                <div className="mb-12">
                  <label htmlFor="email" className="block font-inter text-sm font-medium mb-4 text-[#8A867D] uppercase tracking-widest">
                    {t('contact.form.email_label')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder={t('contact.form.email_placeholder')}
                    className="w-full border-b border-[#DCD8D2] bg-transparent py-4 text-lg font-inter placeholder-[#8A867D]/50 text-[#3E3A35] focus:outline-none focus:border-[#3E3A35] transition-colors duration-500"
                  />
                </div>

                <div className="mb-16">
                  <label htmlFor="vision" className="block font-inter text-sm font-medium mb-4 text-[#8A867D] uppercase tracking-widest">
                    {t('contact.form.vision_label')}
                  </label>
                  <textarea
                    id="vision"
                    required
                    rows={4}
                    placeholder={t('contact.form.vision_placeholder')}
                    className="w-full border-b border-[#DCD8D2] bg-transparent py-4 text-lg font-inter placeholder-[#8A867D]/50 text-[#3E3A35] focus:outline-none focus:border-[#3E3A35] transition-colors duration-500 resize-none"
                  ></textarea>
                </div>

                <MagneticElement className="self-start">
                  <button
                    type="submit"
                    className="font-inter text-[15px] font-medium tracking-wide uppercase bg-[#FFD000] text-[#1A1A1A] px-10 py-5 hover:brightness-110 transition-all duration-700 rounded-full"
                  >
                    {t('contact.form.submit')}
                  </button>
                </MagneticElement>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-[#F9F8F4] flex items-center justify-center mb-8">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#3E3A35]">
                    <path d="M20 6L9 17L4 12" strokeLinecap="square" strokeLinejoin="miter" />
                  </svg>
                </div>
                <h3 className="font-satoshi text-3xl font-bold tracking-tight mb-4 text-[#3E3A35] uppercase">{t('contact.success.heading')}</h3>
                <p className="font-inter text-[#8A867D] leading-[1.8]">{t('contact.success.desc')}</p>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
