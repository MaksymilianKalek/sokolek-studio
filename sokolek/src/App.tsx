import { useState, useCallback } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useTranslation, Trans } from 'react-i18next'
import { useSmoothScroll } from './hooks/use-smooth-scroll'
import { Reveal } from './components/reveal'
import { GlassNav } from './components/glass-nav'

function App() {
  useSmoothScroll()
  const { t, i18n } = useTranslation()

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [vision, setVision] = useState('')


  const handleInquirySubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (email && vision) {
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setEmail('')
        setVision('')
      }, 5000)
    }
  }, [email, vision])

  return (
    <div key={i18n.language} className="glow-border text-ink-muted antialiased">
      <GlassNav />
      <div className="scroll-container flex-1 min-h-0 w-full rounded-[25px] bg-canvas overflow-y-auto overflow-x-hidden flex flex-col relative">
        <main className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">

        <section className="pb-32 pt-32 sm:pt-40 md:pt-48">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 block text-[10px] tracking-[0.35em] text-ink-faint uppercase"
          >
            {t('hero.label')}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl font-satoshi text-[11vw] sm:text-[7.5vw] lg:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.04em] text-ink"
          >
            <Trans
              i18nKey="hero.heading"
              components={[
                <em className="font-light not-italic text-sage" key="0" />,
                <em className="font-light not-italic text-terracotta" key="1" />
              ]}
            />
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-md text-sm leading-relaxed text-ink-muted">
              {t('hero.description')}
            </p>
            <a
              href="#inquiry"
              className="group inline-flex items-center gap-2 text-[11px] tracking-[0.15em] text-ink uppercase transition-colors duration-300 hover:text-sage"
            >
              {t('hero.cta')}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </section>

        <section id="disciplines" className="disciplines-bg scroll-mt-20 py-24 sm:py-32">
          <Reveal>
            <span className="mb-4 block text-[10px] tracking-[0.35em] text-ink-faint uppercase">
              {t('disciplines.label')}
            </span>
            <h2 className="max-w-lg font-satoshi text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-ink leading-tight">
              <Trans
                i18nKey="disciplines.heading"
                components={[
                  <em className="font-light not-italic text-sage" key="0" />
                ]}
              />
            </h2>
          </Reveal>

          <div className="relative z-10 mt-16 sm:mt-20 grid gap-5 sm:grid-cols-2">
            {[0, 1, 2, 3].map((idx) => (
              <Reveal
                key={idx}
                delay={idx * 0.1}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-satoshi text-sm font-medium text-ink-faint/50 tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="text-[9px] tracking-[0.25em] text-sage uppercase">
                    {t(`disciplines.items.${idx}.label`)}
                  </span>
                </div>

                <h3 className="font-satoshi text-lg sm:text-xl font-semibold tracking-[-0.02em] text-ink leading-snug mb-3">
                  {t(`disciplines.items.${idx}.title`)}
                </h3>

                <p className="text-sm leading-relaxed text-ink-muted mb-4">
                  {t(`disciplines.items.${idx}.desc`)}
                </p>
                <span className="block text-[10px] tracking-[0.1em] text-ink-faint">
                  {t(`disciplines.items.${idx}.stack`)}
                </span>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="philosophy" className="scroll-mt-20 py-24 sm:py-32">
          <div className="grid gap-12 md:gap-16 md:grid-cols-12 items-start">
            <Reveal className="md:col-span-5">
              <div className="group editorial-portrait">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-[#E5E3DB]">
                  <img
                    src="/hero-compressed.jpg"
                    alt={t('philosophy.alt')}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="block w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <p className="mt-5 text-[10px] tracking-[0.25em] text-ink-faint uppercase">
                {t('philosophy.caption')}
              </p>
            </Reveal>

            <div className="md:col-span-7 lg:col-span-6 lg:col-start-7 space-y-10 md:pt-6">
              <Reveal>
                <span className="mb-3 block text-[10px] tracking-[0.35em] text-ink-faint uppercase">
                  {t('philosophy.label')}
                </span>
                <h2 className="font-satoshi text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-ink leading-tight">
                  {t('philosophy.heading')}
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <blockquote className="font-satoshi text-2xl sm:text-[2.5rem] sm:leading-[1.2] font-bold tracking-[-0.03em] text-ink">
                  <Trans
                    i18nKey="philosophy.quote"
                    components={[
                      <em className="font-light not-italic text-terracotta" key="0" />
                    ]}
                  />
                </blockquote>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="grid gap-8 sm:grid-cols-2 text-sm leading-relaxed text-ink-muted">
                  <p>{t('philosophy.p1')}</p>
                  <p>{t('philosophy.p2')}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="inquiry" className="scroll-mt-20 py-24 sm:py-32">
          <Reveal className="mx-auto max-w-2xl">
            <span className="mb-4 block text-center text-[10px] tracking-[0.35em] text-ink-faint uppercase">
              {t('contact.label')}
            </span>
            <h2 className="text-center font-satoshi text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-ink">
              <Trans
                i18nKey="contact.heading"
                components={[
                  <em className="font-light not-italic text-sage" key="0" />
                ]}
              />
            </h2>
            <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-ink-muted">
              {t('contact.description')}
            </p>

            {formSubmitted ? (
              <div className="mt-20 py-16 text-center">
                <span className="mb-2 block text-[10px] tracking-[0.35em] text-sage uppercase">
                  {t('contact.success.label')}
                </span>
                <p className="font-satoshi text-xl font-semibold text-ink">{t('contact.success.heading')}</p>
                <p className="mt-2 text-xs text-ink-muted">
                  {t('contact.success.desc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="glass-card mt-16 space-y-10 p-8 sm:p-10">
                <div className="border-b border-ink/10 pb-3 transition-colors duration-300 focus-within:border-sage">
                  <span className="mb-1.5 block text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                    {t('contact.form.email_label')}
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('contact.form.email_placeholder')}
                    className="w-full bg-transparent font-inter text-base text-ink placeholder-ink-faint/50 outline-none"
                  />
                </div>

                <div className="border-b border-ink/10 pb-3 transition-colors duration-300 focus-within:border-sage">
                  <span className="mb-1.5 block text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                    {t('contact.form.vision_label')}
                  </span>
                  <textarea
                    required
                    rows={3}
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    placeholder={t('contact.form.vision_placeholder')}
                    className="w-full resize-none bg-transparent font-inter text-base text-ink placeholder-ink-faint/50 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex h-14 items-center justify-center rounded-xl bg-ink text-canvas text-[11px] tracking-[0.2em] uppercase transition-all duration-500 hover:bg-sage active:scale-[0.995]"
                >
                  {t('contact.form.submit')}
                </button>
              </form>
            )}
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:px-10 sm:flex-row text-[11px] tracking-[0.1em] text-ink-faint">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-satoshi text-sm font-bold tracking-tight text-ink">
              Sokołek Studio
            </span>
            <span className="uppercase">{t('footer.location')}</span>
          </div>
          <span>© 2026 Sokołek Studio</span>
        </div>
      </footer>
      </div>
    </div>
  )
}

export default App
