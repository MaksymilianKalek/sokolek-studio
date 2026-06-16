import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  useVelocity,
  useMotionValueEvent,
} from "motion/react"
import { useRef } from "react"
import { SmoothScroll } from "./components/SmoothScroll"

const INK = "#101010"
const PAPER = "#ffffff"
const NAVY = INK
const AMBER = INK
const WHITE = INK

export default function AppV3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })
  const scrollVelocity = useVelocity(scrollYProgress)
  const skewFromVelocity = useTransform(scrollVelocity, [-0.5, 0, 0.5], [-12, 0, 12])
  const smoothSkew = useSpring(skewFromVelocity, { stiffness: 120, damping: 30 })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const percent = Math.round(latest * 100)
    if (percentRef.current) percentRef.current.textContent = `SCROLL DEPTH: ${percent.toString().padStart(3, "0")}%`
    if (barRef.current) barRef.current.style.height = `${percent}%`
  })

  // STAGE 1: TITLE (0.00 - 0.08)
  const s1Op = useTransform(smoothProgress, [0, 0.02, 0.07, 0.08], [1, 1, 0, 0])
  const s1TitleX = useTransform(smoothProgress, [0, 0.02, 0.07, 0.08], [0, 0, -120, -150])
  const s1TitleXRight = useTransform(smoothProgress, [0, 0.02, 0.07, 0.08], [0, 0, 120, 150])
  const s1Scale = useTransform(smoothProgress, [0, 0.08], [1, 1.08])
  const s1Blur = useTransform(smoothProgress, [0.055, 0.08], [0, 20])
  const s1Filter = useMotionTemplate`blur(${s1Blur}px)`
  const s1LineScaleX = useTransform(smoothProgress, [0, 0.01, 0.06], [0, 1, 0])
  const s1TagsY = useTransform(smoothProgress, [0, 0.02, 0.06, 0.08], [30, 0, 0, 30])
  const s1Display = useTransform(scrollYProgress, (v) => (v < 0.085 ? "flex" : "none"))

  // STAGE 2: MANIFESTO (0.05 - 0.23)
  const s2Op = useTransform(smoothProgress, [0.05, 0.10, 0.19, 0.23], [0, 1, 1, 0])
  const s2RotateY = useTransform(smoothProgress, [0.05, 0.11, 0.19, 0.23], [45, 0, 0, -45])
  const s2Scale = useTransform(smoothProgress, [0.05, 0.11, 0.19, 0.23], [0.7, 1, 1, 0.7])
  const s2TextBlur = useTransform(smoothProgress, [0.05, 0.10], [8, 0])
  const s2Filter = useMotionTemplate`blur(${s2TextBlur}px)`
  const s2LineH = useTransform(smoothProgress, [0.07, 0.13, 0.19, 0.22], [0, 1, 1, 0])
  const s2CardSkewY = useTransform(smoothProgress, [0.05, 0.11], [6, 0])
  const s2Display = useTransform(scrollYProgress, (v) => (v >= 0.05 && v < 0.23 ? "flex" : "none"))

  // STAGE 3: DESIGN SYSTEMS (0.20 - 0.40)
  const s3Op = useTransform(smoothProgress, [0.20, 0.25, 0.36, 0.40], [0, 1, 1, 0])
  const s3ClipProgress = useTransform(smoothProgress, [0.20, 0.27], [0, 100])
  const s3Clip = useMotionTemplate`inset(0 ${useTransform(s3ClipProgress, (v) => 100 - v)}% 0 0)`
  const s3TitleY = useTransform(smoothProgress, [0.20, 0.26, 0.36, 0.40], [80, 0, 0, -80])
  const s3TitleSkewX = useTransform(smoothProgress, [0.20, 0.26, 0.36, 0.40], [-15, 0, 0, 15])
  const s3CardRotateX = useTransform(smoothProgress, [0.20, 0.26], [-25, 0])
  const s3CardScale = useTransform(smoothProgress, [0.20, 0.26, 0.36, 0.40], [0.85, 1, 1, 0.85])
  const s3NumbersX = useTransform(smoothProgress, [0.20, 0.28], [200, 0])
  const s3Display = useTransform(scrollYProgress, (v) => (v >= 0.20 && v < 0.40 ? "flex" : "none"))

  // STAGE 4: ENGINEERING (0.37 - 0.57)
  const s4Op = useTransform(smoothProgress, [0.37, 0.42, 0.53, 0.57], [0, 1, 1, 0])
  const s4RotateZ = useTransform(smoothProgress, [0.37, 0.42, 0.53, 0.57], [-8, 0, 0, 8])
  const s4Scale = useTransform(smoothProgress, [0.37, 0.42, 0.53, 0.57], [0.6, 1, 1, 0.6])
  const s4CardX = useTransform(smoothProgress, [0.37, 0.43], [-300, 0])
  const s4TagsX = useTransform(smoothProgress, [0.39, 0.45], [300, 0])
  const s4Filter = useMotionTemplate`blur(${useTransform(smoothProgress, [0.37, 0.42, 0.53, 0.57], [15, 0, 0, 15])}px)`
  const s4TitleSkewX = useTransform(smoothProgress, [0.37, 0.43], [20, 0])
  const s4Display = useTransform(scrollYProgress, (v) => (v >= 0.37 && v < 0.57 ? "flex" : "none"))

  // STAGE 5: AI SYSTEMS (0.54 - 0.74)
  const s5Op = useTransform(smoothProgress, [0.54, 0.59, 0.70, 0.74], [0, 1, 1, 0])
  const s5RotateX = useTransform(smoothProgress, [0.54, 0.60, 0.70, 0.74], [-35, 0, 0, 35])
  const s5Scale = useTransform(smoothProgress, [0.54, 0.60, 0.70, 0.74], [0.75, 1, 1, 0.75])
  const s5CardScaleX = useTransform(smoothProgress, [0.54, 0.61], [0, 1])
  const s5CardSkewX = useTransform(smoothProgress, [0.54, 0.61], [30, 0])
  const s5TagsRotate = useTransform(smoothProgress, [0.54, 0.62], [45, 0])
  const s5TagsScale = useTransform(smoothProgress, [0.54, 0.62], [0, 1])
  const s5Display = useTransform(scrollYProgress, (v) => (v >= 0.54 && v < 0.74 ? "flex" : "none"))

  // STAGE 6: CONTACT (0.71 - 1.00)
  const s6Op = useTransform(smoothProgress, [0.71, 0.78, 1.0], [0, 1, 1])
  const s6ScaleIn = useTransform(smoothProgress, [0.71, 0.78], [0.4, 1])
  const s6BgRotate = useTransform(smoothProgress, [0.71, 0.85, 1.0], [15, 0, 0])
  const s6TitleFilter = useTransform(smoothProgress, [0.71, 0.78], [30, 0])
  const s6TitleMotionFilter = useMotionTemplate`blur(${s6TitleFilter}px)`
  const s6TitleY = useTransform(smoothProgress, [0.71, 0.79, 1.0], [120, 0, 0])
  const s6TitleSkewX = useTransform(smoothProgress, [0.71, 0.79], [-20, 0])
  const s6SubOp = useTransform(smoothProgress, [0.76, 0.83, 1.0], [0, 1, 1])
  const s6SubScale = useTransform(smoothProgress, [0.76, 0.83], [0.5, 1])
  const s6LineScale = useTransform(smoothProgress, [0.73, 0.81, 1.0], [0, 1, 1])
  const s6Display = useTransform(scrollYProgress, (v) => (v >= 0.71 ? "flex" : "none"))

  const headerColor = useTransform(scrollYProgress, () => INK)

  const scrollToPercent = (percent: number) => {
    if (containerRef.current) {
      const totalHeight = containerRef.current.scrollHeight - window.innerHeight
      window.scrollTo({ top: totalHeight * percent, behavior: "smooth" })
    }
  }

  return (
    <SmoothScroll>
      <main
        ref={containerRef}
        className="relative h-[900vh] w-full overflow-clip"
        style={{ color: INK }}
      >
        <div className="flowing-gradient-bg" />
        <div className="sticky top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden">

          <motion.header
            style={{ color: headerColor }}
            className="glass-nav absolute left-1/2 top-5 z-50 flex w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 flex-col items-center justify-between rounded-3xl px-3 py-2 sm:flex-row sm:rounded-full md:top-6 md:px-4"
          >
            <motion.h3
              onClick={() => scrollToPercent(0)}
              style={{ color: headerColor }}
              className="rounded-full px-3 py-1.5 font-satoshi text-xs font-black tracking-tight uppercase cursor-pointer select-none hover:opacity-60 transition-opacity sm:py-2 sm:text-sm md:px-5"
            >
              Sokołek Studio
            </motion.h3>
            <nav className="flex flex-wrap items-center justify-center gap-1 font-satoshi text-[8px] font-bold tracking-widest uppercase sm:text-[9px] md:text-xs">
              {["Manifesto", "Design", "IT", "AI"].map((label, i) => (
                <motion.button
                  key={label}
                  onClick={() => scrollToPercent([0.14, 0.30, 0.47, 0.64][i])}
                  style={{ color: headerColor }}
                  className="rounded-full px-2 py-1.5 hover:bg-white/30 hover:opacity-70 transition sm:px-2.5 sm:py-2 md:px-4"
                >
                  {label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollToPercent(0.85)}
                className="rounded-full bg-ink px-3 py-1.5 font-bold text-[8px] tracking-wider text-paper hover:scale-105 hover:bg-black transition sm:py-2 sm:text-[9px] md:px-5 md:text-xs"
              >
                Contact
              </motion.button>
            </nav>
          </motion.header>

          {/* STAGE 1: HERO */}
          <motion.div
            style={{ opacity: s1Op, display: s1Display, filter: s1Filter, scale: s1Scale }}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16 z-10"
          >
            <div className="relative w-full max-w-7xl flex flex-col justify-center items-stretch">

              <motion.div style={{ opacity: s1Op }} className="flex items-center gap-3 mb-5">
                <div className="h-[4px] w-16 rounded-full" style={{ backgroundColor: AMBER }} />
                <span className="font-mono text-xs tracking-[0.25em] uppercase font-bold" style={{ color: AMBER }}>
                  Digital & AI Agency
                </span>
              </motion.div>

              <motion.h1
                style={{ x: s1TitleX, skewX: smoothSkew }}
                className="font-satoshi text-[10vw] font-black uppercase tracking-tighter leading-[0.9] text-left"
              >
                <span style={{ color: WHITE }}>Soko</span>
                <span style={{ color: AMBER }}>łe</span>
                <span style={{ color: WHITE }}>k</span>
              </motion.h1>

              <motion.div
                style={{ scaleX: s1LineScaleX }}
                className="h-[4px] w-full my-5 origin-left rounded-full"
              >
                <div className="w-full h-full rounded-full" style={{
                  background: `linear-gradient(90deg, ${AMBER}, ${WHITE}20)`,
                }} />
              </motion.div>

              <motion.h1
                style={{ x: s1TitleXRight, skewX: smoothSkew, color: AMBER }}
                className="font-satoshi text-[10vw] font-black italic uppercase tracking-tighter leading-[0.9] text-right"
              >
                Studio
              </motion.h1>

              <motion.div
                style={{ y: s1TagsY, opacity: s1Op }}
                className="flex flex-wrap gap-3 mt-10"
              >
                {["AI Systems", "Design", "Engineering", "Strategy"].map((tag, i) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 border-2 rounded-full px-4 py-1.5 font-satoshi text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      borderColor: i % 2 === 0 ? AMBER : `${WHITE}40`,
                      color: i % 2 === 0 ? AMBER : `${WHITE}70`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i % 2 === 0 ? AMBER : `${WHITE}70` }} />
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* STAGE 2: MANIFESTO — 3D perspective flip */}
          <motion.div
            style={{ opacity: s2Op, display: s2Display, filter: s2Filter }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16 z-10"
          >
            <motion.div
              style={{
                scale: s2Scale,
                rotateY: s2RotateY,
                perspective: "1200px",
                skewY: s2CardSkewY,
              }}
              className="relative w-full max-w-5xl flex flex-col md:flex-row items-stretch gap-8 md:gap-0"
            >
              <div className="glass-panel glass-panel-strong flex-1 rounded-2xl p-10 md:p-14" style={{ color: NAVY }}>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: `${NAVY}80` }}>Our Manifesto</p>
                <h2 className="font-satoshi text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
                  Systems architecture.<br />Visual precision.
                </h2>
                <div className="mt-6 h-[3px] w-16 rounded-full" style={{ backgroundColor: NAVY }} />
              </div>

              <motion.div
                style={{ scaleY: s2LineH, backgroundColor: NAVY }}
                className="w-[3px] hidden md:block origin-top rounded-full mx-6"
              />

              <div className="flex-1 flex flex-col gap-6 justify-center">
                <div className="glass-panel rounded-2xl p-8">
                  <p className="font-inter text-base md:text-lg leading-relaxed" style={{ color: `${WHITE}d9` }}>
                    Sokołek Studio operates at the boundary of design purity and hardcore engineering.
                    We construct durable digital systems, graphic frameworks, and advanced neural modules.
                  </p>
                </div>
                <div className="glass-chip rounded-xl p-6">
                  <p className="font-inter text-sm leading-relaxed" style={{ color: `${WHITE}cc` }}>
                    We do not build temporal artifacts; we write structural foundations.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* STAGE 3: DESIGN SYSTEMS — clip-path reveal + rotateX */}
          <motion.div
            style={{ opacity: s3Op, display: s3Display }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16 z-10"
          >
            <div className="relative w-full max-w-5xl flex flex-col justify-center gap-8 md:gap-10">

              <div className="overflow-hidden">
                <motion.div
                  style={{ y: s3TitleY, skewX: s3TitleSkewX }}
                  className="flex flex-col md:flex-row items-start md:items-end justify-between pb-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-satoshi text-8xl md:text-9xl font-black opacity-[0.07]" style={{ color: AMBER }}>01</span>
                    <h2 className="font-satoshi text-4xl md:text-7xl font-black uppercase tracking-tighter" style={{ color: WHITE }}>
                      Design Systems
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase mt-2 md:mt-0 font-bold" style={{ color: AMBER }}>
                    Visual Logic & Interfaces
                  </span>
                </motion.div>
              </div>

              <motion.div style={{ clipPath: s3Clip }} className="h-[3px] w-full rounded-full">
                <div className="w-full h-full rounded-full" style={{
                  background: `linear-gradient(90deg, ${AMBER}, ${WHITE}30)`,
                }} />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                <motion.div
                  style={{ scale: s3CardScale, rotateX: s3CardRotateX, perspective: "1400px" }}
                  className="md:col-span-8"
                >
                  <div className="glass-panel rounded-2xl p-8 md:p-10">
                    <p className="font-inter text-base md:text-lg leading-relaxed" style={{ color: `${WHITE}80` }}>
                      We engineer uncompromising visual grids. Specialized in structural typography systems,
                      spatial computing layouts, design asset pipelines, and high-fidelity motion systems.
                      Our work translates branding metrics into mathematical rules.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  style={{ x: s3NumbersX }}
                  className="md:col-span-4 flex flex-col gap-3 pl-0 md:pl-4"
                >
                  {["Brand Architecture", "Spatial UI/UX", "Interactive Motion", "Design Pipelines"].map((tag, i) => (
                    <div
                      key={tag}
                      className="glass-chip flex items-center gap-3 rounded-xl px-5 py-3 font-mono text-[10px] md:text-xs tracking-wider uppercase font-bold"
                      style={{
                        backgroundColor: i % 2 === 0 ? `${AMBER}15` : `${WHITE}08`,
                        color: i % 2 === 0 ? AMBER : `${WHITE}70`,
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: i % 2 === 0 ? AMBER : `${WHITE}50` }} />
                      {tag}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* STAGE 4: ENGINEERING — rotateZ spin + blur + horizontal slide split */}
          <motion.div
            style={{ opacity: s4Op, display: s4Display, filter: s4Filter, rotate: s4RotateZ, scale: s4Scale }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16 z-10"
          >
            <div className="relative w-full max-w-5xl flex flex-col justify-center gap-8 md:gap-10">

              <div className="overflow-hidden">
                <motion.div
                  style={{ skewX: s4TitleSkewX }}
                  className="flex flex-col md:flex-row items-start md:items-end justify-between pb-6"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-satoshi text-8xl md:text-9xl font-black opacity-[0.07]" style={{ color: WHITE }}>02</span>
                    <h2 className="font-satoshi text-4xl md:text-7xl font-black uppercase tracking-tighter" style={{ color: WHITE }}>
                      Engineering
                    </h2>
                  </div>
                  <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase mt-2 md:mt-0 font-bold" style={{ color: AMBER }}>
                    Distributed Systems & Performance
                  </span>
                </motion.div>
              </div>

              <div className="w-full h-[3px] rounded-full" style={{ background: `linear-gradient(90deg, ${WHITE}30, ${AMBER})` }} />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                <motion.div style={{ x: s4CardX }} className="md:col-span-8">
                  <div className="glass-panel glass-panel-strong rounded-2xl p-8 md:p-10" style={{ color: NAVY }}>
                    <p className="font-inter text-base md:text-lg leading-relaxed" style={{ color: `${NAVY}cc` }}>
                      We develop performance-critical backends and server structures. Our core competence includes
                      architecting real-time streaming services, configuring secure distributed infrastructures,
                      and establishing robust custom databases with type-safe parameters and compile-time assurances.
                    </p>
                  </div>
                </motion.div>
                <motion.div style={{ x: s4TagsX }} className="md:col-span-4 flex flex-col gap-3 pl-0 md:pl-4">
                  {["Distributed Systems", "Type-Safe Engine", "API Optimization", "Cloud & Security"].map((tag, i) => (
                    <div
                      key={tag}
                      className="glass-chip flex items-center gap-3 rounded-xl px-5 py-3 font-mono text-[10px] md:text-xs tracking-wider uppercase font-bold"
                      style={{
                        backgroundColor: i % 2 === 0 ? `${WHITE}08` : `${AMBER}15`,
                        color: i % 2 === 0 ? `${WHITE}70` : AMBER,
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: i % 2 === 0 ? `${WHITE}50` : AMBER }} />
                      {tag}
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* STAGE 5: AI SYSTEMS — rotateX overhead flip + scaleX wipe + spinning tags */}
          <motion.div
            style={{
              opacity: s5Op,
              display: s5Display,
              rotateX: s5RotateX,
              scale: s5Scale,
              perspective: "1000px",
            }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16 z-10"
          >
            <div className="relative w-full max-w-5xl flex flex-col justify-center gap-8 md:gap-10">

              <div className="flex flex-col md:flex-row items-start md:items-end justify-between pb-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-satoshi text-8xl md:text-9xl font-black opacity-[0.07]" style={{ color: AMBER }}>03</span>
                  <h2 className="font-satoshi text-4xl md:text-7xl font-black uppercase tracking-tighter" style={{ color: WHITE }}>
                    AI Systems
                  </h2>
                </div>
                <span className="font-mono text-[10px] md:text-xs tracking-widest uppercase mt-2 md:mt-0 font-bold" style={{ color: AMBER }}>
                  Cognitive Pipelines & Agents
                </span>
              </div>

              <div className="w-full h-[3px] rounded-full" style={{ background: `linear-gradient(90deg, ${AMBER}, ${WHITE}30)` }} />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                <motion.div
                  style={{ scaleX: s5CardScaleX, skewX: s5CardSkewX, originX: "left" }}
                  className="md:col-span-8"
                >
                  <div className="glass-panel rounded-2xl p-8 md:p-10">
                    <p className="font-inter text-base md:text-lg leading-relaxed" style={{ color: `${WHITE}80` }}>
                      We implement enterprise artificial intelligence frameworks. Specialized in deploying
                      and fine-tuning local open-source LLMs, building semantic search and custom vector
                      retrieval (RAG) indices, and coding multi-agent orchestration systems that handle
                      live database interfaces securely.
                    </p>
                  </div>
                </motion.div>
                <div className="md:col-span-4 flex flex-col gap-3 pl-0 md:pl-4">
                  {(["Agent Automation", "RAG Pipelines", "Local Model Tuning", "Cognitive Systems"] as const).map((tag, i) => (
                    <motion.div
                      key={tag}
                      className="glass-chip flex items-center gap-3 rounded-xl px-5 py-3 font-mono text-[10px] md:text-xs tracking-wider uppercase font-bold"
                      style={{
                        rotate: useTransform(s5TagsRotate, (v) => v * (1 + i * 0.3)),
                        scale: s5TagsScale,
                        backgroundColor: i % 2 === 0 ? `${AMBER}15` : `${WHITE}08`,
                        color: i % 2 === 0 ? AMBER : `${WHITE}70`,
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: i % 2 === 0 ? AMBER : `${WHITE}50` }} />
                      {tag}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* STAGE 6: CONTACT — amber explosion + navy text */}
          <motion.div
            style={{ opacity: s6Op, display: s6Display }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10"
          >
            <motion.div
              style={{ scale: s6ScaleIn, rotate: s6BgRotate }}
              className="absolute inset-6 md:inset-12 rounded-3xl z-0 overflow-hidden"
            >
              <div className="glass-panel glass-panel-strong w-full h-full rounded-3xl" />
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20" style={{ backgroundColor: WHITE }} />
              <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full opacity-10" style={{ backgroundColor: NAVY }} />
            </motion.div>

            <div className="relative flex flex-col items-center max-w-4xl text-center z-10">
              <motion.h2
                style={{
                  y: s6TitleY,
                  skewX: s6TitleSkewX,
                  filter: s6TitleMotionFilter,
                  color: NAVY,
                }}
                className="font-satoshi text-[11vw] font-black uppercase tracking-tighter leading-none mb-6"
              >
                Let's Talk
              </motion.h2>

              <motion.div
                style={{ scaleX: s6LineScale, originX: "center" }}
                className="h-[3px] w-[300px] md:w-[500px] mb-8 rounded-full"
              >
                <div className="w-full h-full rounded-full" style={{ backgroundColor: NAVY }} />
              </motion.div>

              <motion.div
                style={{ opacity: s6SubOp, scale: s6SubScale }}
                className="flex flex-col items-center gap-4"
              >
                <a
                  href="mailto:hello@sokolek.com"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-satoshi text-xl md:text-3xl font-bold tracking-wider transition-all hover:scale-105 hover:brightness-95"
                  style={{ backgroundColor: NAVY, color: PAPER }}
                >
                  hello@sokolek.com
                  <span className="text-2xl">→</span>
                </a>
                <p className="font-mono text-xs tracking-widest uppercase mt-4" style={{ color: `${NAVY}80` }}>
                  Based in Poland · Deploying Globally
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* SCROLL DEPTH INDICATOR */}
          <div className="absolute top-[25vh] right-[40px] md:right-[60px] h-[50vh] w-[2px] z-50 rounded-full" style={{ backgroundColor: `${WHITE}10` }}>
            <div
              ref={barRef}
              className="absolute top-0 left-0 w-full rounded-full origin-top"
              style={{ height: "0%", backgroundColor: AMBER }}
            />
            <div className="absolute top-full right-0 translate-y-4 whitespace-nowrap text-right">
              <span
                ref={percentRef}
                className="font-mono text-[9px] tracking-[0.2em] block font-bold"
                style={{ color: `${WHITE}30` }}
              >
                SCROLL DEPTH: 000%
              </span>
            </div>
          </div>

        </div>
      </main>
    </SmoothScroll>
  )
}
