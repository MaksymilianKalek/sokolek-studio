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
    <section id="contact" className="w-full bg-transparent py-40">
      <div className="w-full">
        <div className="grid grid-cols-12 gap-y-24 md:gap-6 px-6 md:px-12 lg:px-24 max-w-[100rem] mx-auto">

          <div className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col justify-start text-left">
            <div>
              <MaskedText className="font-mono text-[10px] tracking-[0.4em] uppercase mb-16 opacity-40 text-[var(--color-noir-text)]">
                {t('contact.label')}
              </MaskedText>

              <MaskedText
                as="h2"
                className="font-satoshi text-[11vw] md:text-[9vw] lg:text-[8vw] font-black tracking-tighter leading-[0.85] mb-12 uppercase text-[var(--color-noir-text)]"
                delay={0.15}
              >
                <Trans
                  i18nKey="contact.heading"
                  components={[
                    <span className="font-serif italic text-[#a0a0a0] lowercase tracking-normal md:ml-12" key="0" />,
                  ]}
                />
              </MaskedText>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-inter text-xl text-[var(--color-noir-muted)] leading-[1.8] max-w-lg mt-12 md:ml-[10vw]"
              >
                {t('contact.description')}
              </motion.p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-7 lg:col-start-6 flex flex-col justify-start mt-12 md:mt-32">
            <div 
              className="rounded-sm p-10 md:p-20"
              style={{ 
                backgroundColor: 'var(--color-noir-surface)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)'
              }}
            >
              {status === 'idle' ? (
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="w-full flex flex-col"
                >
                  <div className="mb-16 group">
                    <label htmlFor="email" className="block font-serif italic lowercase text-lg mb-6 text-[var(--color-noir-muted)] transition-colors group-focus-within:text-[var(--color-noir-text)]">
                      {t('contact.form.email_label')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder={t('contact.form.email_placeholder')}
                      className="w-full border-b border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] py-4 px-4 text-2xl font-satoshi placeholder-[rgba(255,255,255,0.2)] text-[var(--color-noir-text)] focus:outline-none focus:border-[var(--color-noir-accent)] focus:bg-[rgba(255,255,255,0.1)] transition-colors duration-300"
                      data-cursor-expand
                    />
                  </div>

                  <div className="mb-24 group">
                    <label htmlFor="vision" className="block font-serif italic lowercase text-lg mb-6 text-[var(--color-noir-muted)] transition-colors group-focus-within:text-[var(--color-noir-text)]">
                      {t('contact.form.vision_label')}
                    </label>
                    <textarea
                      id="vision"
                      required
                      rows={3}
                      placeholder={t('contact.form.vision_placeholder')}
                      className="w-full border-b border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.05)] py-4 px-4 text-2xl font-satoshi placeholder-[rgba(255,255,255,0.2)] text-[var(--color-noir-text)] focus:outline-none focus:border-[var(--color-noir-accent)] focus:bg-[rgba(255,255,255,0.1)] transition-colors duration-300 resize-none"
                      data-cursor-expand
                    ></textarea>
                  </div>

                  <MagneticElement className="self-start">
                    <button
                      type="submit"
                      data-cursor-expand
                      className="inline-flex items-center justify-center font-inter text-[13px] font-bold tracking-widest uppercase px-14 py-6 rounded-full transition-all duration-500 hover:scale-105"
                      style={{ backgroundColor: 'var(--color-noir-accent)', color: 'var(--color-noir-surface)' }}
                    >
                      {t('contact.form.submit')}
                    </button>
                  </MagneticElement>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex flex-col items-center justify-center text-center py-20"
                >
                  <h3 className="font-satoshi text-6xl font-black tracking-tighter mb-8 text-[var(--color-noir-text)] uppercase">{t('contact.success.heading')}</h3>
                  <p className="font-serif italic lowercase text-2xl text-[var(--color-noir-muted)] leading-[1.8]">{t('contact.success.desc')}</p>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
