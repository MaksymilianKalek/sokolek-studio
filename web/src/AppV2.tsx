import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from "motion/react"
import { useRef, type ReactNode } from "react"
import { SmoothScroll } from "./components/SmoothScroll"

const AMBER = "#ffb50a"
const RED = "#e6000f"
const WHITE = "#ffffff"
const BLACK = "#111111"

function ColorBlock({
  bg,
  color,
  children,
  className = "",
  delay = 0,
}: {
  bg: string
  color: string
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.92, opacity: 0, y: 40 }}
      animate={inView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ backgroundColor: bg, color }}
      className={`rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  )
}

function RotatingWord({ words, className = "" }: { words: string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <span ref={ref} className={`inline-block overflow-hidden relative ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={word}
          initial={{ y: "110%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.08,
          }}
          className={i === 0 ? "inline-block" : "hidden"}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

function FloatingTag({ label, color, delay = 0 }: { label: string; color: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ scale: 1.08, rotate: 2 }}
      style={{ borderColor: color, color }}
      className="inline-flex items-center gap-2 border-2 rounded-full px-5 py-2 font-satoshi text-sm font-bold uppercase tracking-wider cursor-default select-none"
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </motion.div>
  )
}

export default function AppV2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const percent = Math.round(latest * 100)
    if (percentRef.current) {
      percentRef.current.textContent = `${percent.toString().padStart(3, "0")}%`
    }
    if (barRef.current) {
      barRef.current.style.height = `${percent}%`
    }
  })

  const heroTextY = useTransform(scrollYProgress, [0, 0.15], [0, -120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative w-full bg-white selection:bg-amber selection:text-white">

        <div className="fixed top-6 right-8 z-50 flex items-center gap-4">
          <div className="relative h-[60px] w-[2px] rounded-full overflow-hidden" style={{ backgroundColor: `${BLACK}15` }}>
            <div
              ref={barRef}
              className="absolute top-0 left-0 w-full rounded-full transition-all duration-75 origin-top"
              style={{ height: "0%", backgroundColor: RED }}
            />
          </div>
          <span
            ref={percentRef}
            className="font-mono text-[10px] tracking-[0.15em] font-bold"
            style={{ color: `${BLACK}50` }}
          >
            000%
          </span>
        </div>

        <header className="fixed top-0 left-0 w-full z-50 px-8 md:px-14 py-6 flex justify-between items-center">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-satoshi text-base md:text-lg font-black tracking-tight uppercase cursor-pointer select-none"
            style={{ color: BLACK }}
          >
            Sokołek Studio
          </motion.h3>
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center gap-8 font-satoshi text-xs font-bold tracking-widest uppercase"
            style={{ color: `${BLACK}80` }}
          >
            <a href="#manifesto" className="hover:opacity-60 transition-opacity">Manifesto</a>
            <a href="#services" className="hover:opacity-60 transition-opacity">Services</a>
            <a href="#approach" className="hover:opacity-60 transition-opacity">Approach</a>
            <a
              href="#contact"
              className="px-5 py-2 rounded-full text-white font-bold text-xs tracking-wider transition-transform hover:scale-105"
              style={{ backgroundColor: RED }}
            >
              Let's Talk
            </a>
          </motion.nav>
        </header>

        <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-14 overflow-hidden pt-24">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[30vw] -right-[20vw] w-[80vw] h-[80vw] rounded-full opacity-[0.06]"
              style={{ backgroundColor: AMBER }}
            />
            <motion.div
              animate={{
                rotate: [0, -360],
              }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[20vw] -left-[15vw] w-[60vw] h-[60vw] rounded-full opacity-[0.04]"
              style={{ backgroundColor: RED }}
            />
          </div>

          <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="flex flex-col gap-4 mb-10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100px" }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-[4px] rounded-full"
                style={{ backgroundColor: AMBER }}
              />
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="font-mono text-xs tracking-[0.25em] uppercase font-bold"
                style={{ color: RED }}
              >
                Digital & AI Agency
              </motion.p>
            </div>

            <h1 className="font-satoshi font-black uppercase leading-[0.9] tracking-tighter" style={{ color: BLACK }}>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[13vw] md:text-[10vw]"
              >
                We Build
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[13vw] md:text-[10vw]"
                style={{ color: RED }}
              >
                The Future
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[8vw] md:text-[6vw] font-light italic"
                style={{ color: AMBER }}
              >
                of Digital.
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 flex flex-wrap gap-3"
            >
              <FloatingTag label="AI Systems" color={RED} delay={1.0} />
              <FloatingTag label="Design" color={AMBER} delay={1.1} />
              <FloatingTag label="Engineering" color={BLACK} delay={1.2} />
              <FloatingTag label="Strategy" color={RED} delay={1.3} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: `${BLACK}40` }}>
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[2px] h-8 rounded-full"
              style={{ backgroundColor: `${BLACK}20` }}
            />
          </motion.div>
        </section>

        <section id="manifesto" className="relative px-6 md:px-14 py-24 md:py-40">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <ColorBlock bg={RED} color={WHITE} className="p-10 md:p-16 md:col-span-2" delay={0}>
                <p className="font-mono text-xs tracking-[0.2em] uppercase mb-6 opacity-70">Our Manifesto</p>
                <h2 className="font-satoshi text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95]">
                  Precision meets<br />bold vision.
                </h2>
                <div className="mt-8 h-[3px] w-20 rounded-full" style={{ backgroundColor: AMBER }} />
              </ColorBlock>

              <ColorBlock bg={AMBER} color={BLACK} className="p-10 md:p-14" delay={0.1}>
                <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4 opacity-60">Philosophy</p>
                <p className="font-inter text-lg md:text-xl leading-relaxed font-medium">
                  We don't build websites. We architect digital experiences that transform businesses.
                  Every pixel serves a purpose. Every line of code tells a story.
                </p>
              </ColorBlock>

              <ColorBlock bg={BLACK} color={WHITE} className="p-10 md:p-14" delay={0.2}>
                <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4 opacity-50">Approach</p>
                <p className="font-inter text-lg md:text-xl leading-relaxed opacity-80">
                  Boutique by choice. We maintain a deliberately small roster of clients,
                  pouring obsessive attention into each partnership. Quality over quantity, always.
                </p>
              </ColorBlock>
            </div>
          </div>
        </section>

        <section id="services" className="relative px-6 md:px-14 py-24 md:py-40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:mb-24">
              <RotatingWord
                words={["What We Do"]}
                className="font-satoshi text-5xl md:text-8xl font-black uppercase tracking-tighter"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-[4px] w-full max-w-md mt-6 origin-left rounded-full"
                style={{ backgroundColor: AMBER }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ColorBlock bg={WHITE} color={BLACK} className="p-10 md:p-12 border-2 border-[#11111110] group" delay={0}>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-satoshi text-7xl md:text-8xl font-black opacity-[0.06]">01</span>
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${AMBER}20` }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: AMBER }} />
                  </motion.div>
                </div>
                <h3 className="font-satoshi text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                  Design<br />Systems
                </h3>
                <p className="font-inter text-base leading-relaxed opacity-50 mb-8">
                  Structural typography systems, spatial computing layouts, design asset pipelines,
                  and high-fidelity motion systems that adapt across every device.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Brand Architecture", "Spatial UI/UX", "Motion Design", "Asset Pipelines"].map((tag, i) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full font-bold"
                      style={{
                        backgroundColor: i % 2 === 0 ? `${AMBER}15` : `${RED}10`,
                        color: i % 2 === 0 ? AMBER : RED,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </ColorBlock>

              <ColorBlock bg={RED} color={WHITE} className="p-10 md:p-12" delay={0.15}>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-satoshi text-7xl md:text-8xl font-black opacity-[0.15]">02</span>
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/15"
                  >
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </motion.div>
                </div>
                <h3 className="font-satoshi text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                  Core<br />Engineering
                </h3>
                <p className="font-inter text-base leading-relaxed opacity-70 mb-8">
                  Performance-critical backends, real-time streaming services, secure distributed
                  infrastructures, and type-safe systems built for scale.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Distributed Systems", "Type-Safe", "API Design", "Cloud Infra"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full font-bold bg-white/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </ColorBlock>

              <ColorBlock bg={AMBER} color={BLACK} className="p-10 md:p-12" delay={0.3}>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-satoshi text-7xl md:text-8xl font-black opacity-[0.1]">03</span>
                  <motion.div
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${BLACK}15` }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: BLACK }} />
                  </motion.div>
                </div>
                <h3 className="font-satoshi text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                  AI<br />Systems
                </h3>
                <p className="font-inter text-base leading-relaxed opacity-60 mb-8">
                  Enterprise AI frameworks, local LLM deployment, semantic search and RAG pipelines,
                  multi-agent orchestration moving AI into production.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Agent Automation", "RAG Pipelines", "Model Tuning", "Cognitive AI"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full font-bold"
                      style={{ backgroundColor: `${BLACK}15` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </ColorBlock>
            </div>
          </div>
        </section>

        <section id="approach" className="relative px-6 md:px-14 py-24 md:py-40 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <ColorBlock bg={BLACK} color={WHITE} className="p-10 md:p-16 md:col-span-8" delay={0}>
                <p className="font-mono text-xs tracking-[0.2em] uppercase mb-6 opacity-40">How We Work</p>
                <h2 className="font-satoshi text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95] mb-8">
                  Obsessively<br />
                  <span style={{ color: AMBER }}>crafted</span> systems.
                </h2>
                <p className="font-inter text-lg leading-relaxed opacity-50 max-w-2xl">
                  We treat every project like it's our magnum opus.
                  From the initial architecture to the final deployment,
                  we obsess over the details that separate good from extraordinary.
                </p>
              </ColorBlock>

              <div className="md:col-span-4 flex flex-col gap-6">
                <ColorBlock bg={AMBER} color={BLACK} className="p-8 flex-1" delay={0.1}>
                  <span className="font-satoshi text-5xl font-black">97%</span>
                  <p className="font-inter text-sm mt-2 opacity-60">Client retention rate</p>
                </ColorBlock>
                <ColorBlock bg={RED} color={WHITE} className="p-8 flex-1" delay={0.2}>
                  <span className="font-satoshi text-5xl font-black">∞</span>
                  <p className="font-inter text-sm mt-2 opacity-70">Attention to detail</p>
                </ColorBlock>
              </div>

              <ColorBlock bg={RED} color={WHITE} className="p-10 md:p-14 md:col-span-4" delay={0.15}>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="font-satoshi text-6xl font-black">→</span>
                    <h3 className="font-satoshi text-xl font-black uppercase tracking-tight mt-4">Discovery</h3>
                  </div>
                  <p className="font-inter text-sm leading-relaxed opacity-70 mt-4">
                    Deep-dive into your business, users, and technical landscape.
                  </p>
                </div>
              </ColorBlock>

              <ColorBlock bg={AMBER} color={BLACK} className="p-10 md:p-14 md:col-span-4" delay={0.25}>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="font-satoshi text-6xl font-black">⚡</span>
                    <h3 className="font-satoshi text-xl font-black uppercase tracking-tight mt-4">Build</h3>
                  </div>
                  <p className="font-inter text-sm leading-relaxed opacity-60 mt-4">
                    Rapid iteration with weekly deliverables and transparent progress.
                  </p>
                </div>
              </ColorBlock>

              <ColorBlock bg={WHITE} color={BLACK} className="p-10 md:p-14 md:col-span-4 border-2 border-[#11111110]" delay={0.35}>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <span className="font-satoshi text-6xl font-black" style={{ color: RED }}>✦</span>
                    <h3 className="font-satoshi text-xl font-black uppercase tracking-tight mt-4">Launch & Scale</h3>
                  </div>
                  <p className="font-inter text-sm leading-relaxed opacity-50 mt-4">
                    Battle-tested deployment, monitoring, and continuous optimization.
                  </p>
                </div>
              </ColorBlock>
            </div>
          </div>
        </section>

        <section className="relative px-6 md:px-14 py-24 md:py-40">
          <div className="max-w-7xl mx-auto">
            <ColorBlock bg={AMBER} color={BLACK} className="p-10 md:p-20 text-center" delay={0}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="font-mono text-xs tracking-[0.25em] uppercase mb-8 opacity-60">The Numbers</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                  {[
                    { value: "50+", label: "Projects Delivered" },
                    { value: "12", label: "Countries Served" },
                    { value: "8+", label: "Years of Craft" },
                    { value: "24/7", label: "Support & Monitoring" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    >
                      <span className="font-satoshi text-4xl md:text-6xl font-black">{stat.value}</span>
                      <p className="font-inter text-sm mt-2 opacity-60">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ColorBlock>
          </div>
        </section>

        <section id="contact" className="relative px-6 md:px-14 py-24 md:py-40">
          <div className="max-w-7xl mx-auto">
            <ColorBlock bg={RED} color={WHITE} className="p-10 md:p-20 relative overflow-hidden" delay={0}>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20"
                  style={{ backgroundColor: AMBER }}
                />
                <motion.div
                  animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10"
                  style={{ backgroundColor: WHITE }}
                />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-mono text-xs tracking-[0.25em] uppercase mb-8 opacity-70"
                >
                  Ready to start?
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-satoshi text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-[0.9] mb-8"
                >
                  Let's Talk.
                </motion.h2>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="h-[3px] w-32 md:w-48 rounded-full mb-10 origin-center"
                  style={{ backgroundColor: AMBER }}
                />

                <motion.a
                  href="mailto:hello@sokolek.com"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-satoshi text-lg md:text-xl font-bold tracking-wider uppercase transition-shadow hover:shadow-2xl"
                  style={{ backgroundColor: WHITE, color: RED }}
                >
                  hello@sokolek.com
                  <span className="text-2xl">→</span>
                </motion.a>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="font-mono text-xs tracking-widest uppercase mt-10 opacity-50"
                >
                  Based in Poland · Deploying Globally
                </motion.p>
              </div>
            </ColorBlock>
          </div>
        </section>

        <footer className="px-6 md:px-14 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-satoshi text-sm font-bold uppercase tracking-tight" style={{ color: BLACK }}>
            © Sokołek Studio 2026
          </span>
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-widest uppercase" style={{ color: `${BLACK}40` }}>
            <span>Systems</span>
            <span style={{ color: AMBER }}>·</span>
            <span>Design</span>
            <span style={{ color: RED }}>·</span>
            <span>Intelligence</span>
          </div>
        </footer>

      </div>
    </SmoothScroll>
  )
}
