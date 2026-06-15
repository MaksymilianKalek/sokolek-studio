import { useState, useCallback, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Reveal } from './components/reveal'
import { GlassNav } from './components/glass-nav'
import { FloatingUnderlineInput, FloatingUnderlineTextarea } from './components/floating-underline-input'

function tokenizeHeading(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function App() {
  const { t, i18n } = useTranslation()
  const tokens = tokenizeHeading(t('hero.heading'))

  const photoContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: photoContainerRef,
    offset: ['start end', 'end start']
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

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
  }, [email, vision, setEmail, setVision])

  return (
    <>
      <div key={i18n.language} className="scroll-container relative w-full h-full overflow-y-auto overflow-x-hidden bg-canvas">

          <div className="flowing-gradient-bg" />

          <GlassNav />

          <div className="relative z-10 min-h-screen flex flex-col">

            <section className="px-4 sm:px-6 pt-32 sm:pt-40 md:pt-48 pb-16">
              <div className="glass-section mx-auto max-w-6xl px-6 sm:px-10 py-16 sm:py-20 md:py-24">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="mb-6 block text-[10px] tracking-[0.35em] text-ink-faint uppercase"
                >
                  {t('hero.label')}
                </motion.span>
                <h1 className="max-w-4xl font-satoshi text-[11vw] sm:text-[7.5vw] lg:text-[5.5rem] font-bold leading-[1.15] tracking-[-0.04em] text-ink">
                  {tokens.map((token, idx) => (
                    <span
                      key={idx}
                      className="inline-block"
                      style={{ marginRight: idx < tokens.length - 1 ? '0.27em' : '0' }}
                    >
                      <span className="inline-flex overflow-hidden px-[0.05em] -mx-[0.05em] pt-[0.1em] -mt-[0.1em] pb-[0.35em] -mb-[0.35em]">
                        <motion.span
                          initial={{ y: '100%', opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.4 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {token}
                        </motion.span>
                      </span>
                    </span>
                  ))}
                </h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 + (tokens.length * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  className="mt-16 flex flex-col gap-6 items-start"
                >
                  <p className="max-w-md text-sm leading-relaxed text-ink-muted">
                    {t('hero.description')}
                  </p>
                  <a
                    href="#inquiry"
                    className="group inline-flex items-center gap-1.5 text-[11px] tracking-[0.15em] text-ink uppercase transition-colors duration-300 hover:text-sage"
                  >
                    {t('hero.cta')}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>
              </div>
            </section>

            <main className="relative z-10 flex-1">

              <section id="disciplines" className="disciplines-bg scroll-mt-20 px-4 sm:px-6 py-12 sm:py-16">
                <div className="glass-section mx-auto max-w-6xl px-6 sm:px-10 py-12 sm:py-16">
                  <div className="grid gap-12 md:gap-16 md:grid-cols-12 items-start">
                    <div className="md:col-span-5 md:sticky md:top-32">
                      <span className="mb-4 block text-[10px] tracking-[0.35em] text-ink-faint uppercase">
                        {t('disciplines.label')}
                      </span>
                      <h2 className="font-satoshi text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-ink leading-tight">
                        {t('disciplines.heading')}
                      </h2>
                    </div>

                    <div className="md:col-span-7 flex flex-col">
                      {[0, 1, 2, 3].map((idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="service-row group border-b border-ink/10 py-10 last:border-b-0"
                        >
                          <div className="relative z-[1] flex items-start gap-4 sm:gap-6">
                            <span className="font-satoshi text-sm font-medium text-ink-faint/50 mt-2.5 tabular-nums">
                              0{idx + 1}
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-4">
                                <h3 className="service-title font-satoshi text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-ink group-hover:translate-x-4 flex items-center gap-3">
                                  {t(`disciplines.items.${idx}.title`)}
                                  <span className="opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
                                    →
                                  </span>
                                </h3>
                                <span className="text-[9px] tracking-[0.25em] text-ink-faint uppercase whitespace-nowrap mt-2">
                                  {t(`disciplines.items.${idx}.label`)}
                                </span>
                              </div>
                              <p className="mt-4 text-xs leading-relaxed text-ink-muted max-w-2xl">
                                {t(`disciplines.items.${idx}.desc`)}
                              </p>
                              <span className="block mt-3 text-[9px] tracking-[0.1em] text-ink-faint">
                                {t(`disciplines.items.${idx}.stack`)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section id="philosophy" className="scroll-mt-20 px-4 sm:px-6 py-12 sm:py-16">
                <div className="glass-section mx-auto max-w-6xl px-6 sm:px-10 py-12 sm:py-16">
                  <div className="grid gap-12 md:gap-16 md:grid-cols-12 items-start">
                    <div className="md:col-span-5">
                      <div className="group editorial-portrait">
                        <motion.div
                          ref={photoContainerRef}
                          initial={{ opacity: 0, scale: 0.97 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-[#E5E3DB]"
                        >
                          <motion.img
                            src="/hero-compressed-mono.jpg"
                            alt={t('philosophy.alt')}
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                            style={{ y: imageY }}
                            initial={{ scale: 1.15 }}
                            whileHover={{ scale: 1.22 }}
                            transition={{ duration: 0.7 }}
                            className="absolute inset-0 w-full h-[110%] -top-[5%] object-cover"
                          />
                        </motion.div>
                      </div>
                      <p className="mt-5 text-[10px] tracking-[0.25em] text-ink-faint uppercase">
                        {t('philosophy.caption')}
                      </p>
                    </div>

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
                        <div className="grid gap-8 sm:grid-cols-2 text-sm leading-relaxed text-ink-muted">
                          <p>{t('philosophy.p1')}</p>
                          <p>{t('philosophy.p2')}</p>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </div>
              </section>

              <section id="inquiry" className="scroll-mt-20 px-4 sm:px-6 py-12 sm:py-16">
                <div className="glass-section mx-auto max-w-2xl px-6 sm:px-10 py-12 sm:py-16">
                  <Reveal>
                    <span className="mb-4 block text-center text-[10px] tracking-[0.35em] text-ink-faint uppercase">
                      {t('contact.label')}
                    </span>
                    <h2 className="text-center font-satoshi text-3xl sm:text-5xl font-bold tracking-[-0.03em] text-ink">
                      {t('contact.heading')}
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
                      <form onSubmit={handleInquirySubmit} className="mt-16 w-full">
                        <FloatingUnderlineInput
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          label={t('contact.form.email_label')}
                        />

                        <FloatingUnderlineTextarea
                          required
                          rows={3}
                          value={vision}
                          onChange={(e) => setVision(e.target.value)}
                          label={t('contact.form.vision_label')}
                        />

                        <button
                          type="submit"
                          className="w-full flex h-14 items-center justify-center rounded-xl bg-ink text-canvas text-[11px] tracking-[0.2em] uppercase transition-all duration-500 hover:bg-sage active:scale-[0.995]"
                        >
                          {t('contact.form.submit')}
                        </button>
                      </form>
                    )}
                  </Reveal>
                </div>
              </section>

            </main>

            <footer className="relative z-10 px-4 sm:px-6 py-8 sm:py-12">
              <div className="glass-section mx-auto max-w-6xl px-6 sm:px-10 py-8">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row text-[11px] tracking-[0.1em] text-ink-faint">
                  <div className="flex flex-col items-center gap-1 sm:items-start">
                    <span className="font-satoshi text-sm font-bold tracking-tight text-ink">
                      Sokołek Studio
                    </span>
                    <span className="uppercase">{t('footer.location')}</span>
                  </div>
                  <span>© 2026 Sokołek Studio</span>
                </div>
              </div>
            </footer>

          </div>
      </div>
    </>
  )
}

export default App
