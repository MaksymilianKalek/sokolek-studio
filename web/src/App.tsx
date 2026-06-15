import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"
import { useRef } from "react"
import { SmoothScroll } from "./components/SmoothScroll"

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const percentRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Update scroll depth indicators (percentage and bar height)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const percent = Math.round(latest * 100)
    if (percentRef.current) {
      percentRef.current.textContent = `SCROLL DEPTH: ${percent.toString().padStart(3, '0')}%`
    }
    if (barRef.current) {
      barRef.current.style.height = `${percent}%`
    }
  })

  // ==========================================
  // BACKGROUND GRID LINES (Animate on Scroll)
  // ==========================================
  const lineV1Scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const lineV2Scale = useTransform(scrollYProgress, [0.1, 0.25, 0.75, 0.9], [0, 1, 1, 0])
  const lineH1Scale = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0])
  const lineH2Scale = useTransform(scrollYProgress, [0.12, 0.3, 0.7, 0.88], [0, 1, 1, 0])

  // ==========================================
  // STAGE 1: SOKOŁEK STUDIO TITLE (0.00 - 0.08)
  // ==========================================
  const s1Op = useTransform(scrollYProgress, [0, 0.02, 0.08], [1, 1, 0])
  const s1TextLeft = useTransform(scrollYProgress, [0, 0.02, 0.08], [0, 0, -300])
  const s1TextRight = useTransform(scrollYProgress, [0, 0.02, 0.08], [0, 0, 300])
  const s1LineScale = useTransform(scrollYProgress, [0, 0.02, 0.07], [1, 1, 0])

  // ==========================================
  // STAGE 2: MANIFESTO (0.05 - 0.23)
  // ==========================================
  const s2Op = useTransform(scrollYProgress, [0.05, 0.10, 0.18, 0.23], [0, 1, 1, 0])
  const s2Y = useTransform(scrollYProgress, [0.05, 0.10, 0.18, 0.23], [50, 0, 0, -50])
  const s2LineScaleY = useTransform(scrollYProgress, [0.06, 0.11, 0.18, 0.22], [0, 1, 1, 0])

  // ==========================================
  // STAGE 3: DESIGN SYSTEMS (0.20 - 0.40)
  // ==========================================
  const s3Op = useTransform(scrollYProgress, [0.20, 0.25, 0.35, 0.40], [0, 1, 1, 0])
  const s3TextY = useTransform(scrollYProgress, [0.20, 0.25, 0.35, 0.40], [50, 0, 0, -50])
  const s3LineScaleX = useTransform(scrollYProgress, [0.21, 0.26, 0.35, 0.39], [0, 1, 1, 0])

  // ==========================================
  // STAGE 4: CORE ENGINEERING (0.37 - 0.57)
  // ==========================================
  const s4Op = useTransform(scrollYProgress, [0.37, 0.42, 0.52, 0.57], [0, 1, 1, 0])
  const s4TextY = useTransform(scrollYProgress, [0.37, 0.42, 0.52, 0.57], [50, 0, 0, -50])
  const s4LineScaleY = useTransform(scrollYProgress, [0.38, 0.43, 0.52, 0.56], [0, 1, 1, 0])

  // ==========================================
  // STAGE 5: AI & COGNITIVE SYSTEMS (0.54 - 0.74)
  // ==========================================
  const s5Op = useTransform(scrollYProgress, [0.54, 0.59, 0.69, 0.74], [0, 1, 1, 0])
  const s5TextY = useTransform(scrollYProgress, [0.54, 0.59, 0.69, 0.74], [50, 0, 0, -50])
  const s5LineScaleX = useTransform(scrollYProgress, [0.55, 0.60, 0.69, 0.73], [0, 1, 1, 0])

  // ==========================================
  // STAGE 6: CONTACT & OUTRO (0.71 - 1.00)
  // ==========================================
  const s6Op = useTransform(scrollYProgress, [0.71, 0.78, 1.00], [0, 1, 1])
  const s6Scale = useTransform(scrollYProgress, [0.71, 0.78, 1.00], [0.95, 1, 1])
  const s6SubOp = useTransform(scrollYProgress, [0.75, 0.82, 1.00], [0, 1, 1])
  const s6SubY = useTransform(scrollYProgress, [0.75, 0.82, 1.00], [30, 0, 0])
  const s6LineScale = useTransform(scrollYProgress, [0.73, 0.80, 1.00], [0, 1, 1])

  // Display toggles to prevent inactive stages from rendering or capturing pointer events
  const s1Display = useTransform(scrollYProgress, (v) => v < 0.08 ? "flex" : "none")
  const s2Display = useTransform(scrollYProgress, (v) => (v >= 0.05 && v < 0.23) ? "flex" : "none")
  const s3Display = useTransform(scrollYProgress, (v) => (v >= 0.20 && v < 0.40) ? "flex" : "none")
  const s4Display = useTransform(scrollYProgress, (v) => (v >= 0.37 && v < 0.57) ? "flex" : "none")
  const s5Display = useTransform(scrollYProgress, (v) => (v >= 0.54 && v < 0.74) ? "flex" : "none")
  const s6Display = useTransform(scrollYProgress, (v) => v >= 0.71 ? "flex" : "none")

  // Click navigation mapping percentage to pixel height
  const scrollToPercent = (percent: number) => {
    if (containerRef.current) {
      const totalHeight = containerRef.current.scrollHeight - window.innerHeight
      window.scrollTo({
        top: totalHeight * percent,
        behavior: "smooth"
      })
    }
  }

  return (
    <SmoothScroll>
      {/* 900vh container for rich scroll progress spacing */}
      <main ref={containerRef} className="relative h-[900vh] w-full bg-obsidian text-electric selection:bg-electric selection:text-obsidian">
        
        {/* Sticky viewport frame */}
        <div className="sticky top-0 left-0 flex h-screen w-full items-center justify-center overflow-hidden">
          
          {/* ==========================================
              STATIONARY NAVBAR (Always Pinned)
              ========================================== */}
          <header className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference">
            <h3 
              onClick={() => scrollToPercent(0)}
              className="font-satoshi text-base md:text-lg font-bold tracking-tight uppercase cursor-pointer select-none hover:opacity-75 transition-opacity"
            >
              Sokołek Studio
            </h3>
            <nav className="flex items-center gap-6 md:gap-8 font-mono text-[10px] md:text-xs tracking-widest uppercase">
              <button onClick={() => scrollToPercent(0.14)} className="hover:opacity-75 transition-opacity">
                [ MANIFESTO ]
              </button>
              <button onClick={() => scrollToPercent(0.30)} className="hover:opacity-75 transition-opacity">
                [ DESIGN ]
              </button>
              <button onClick={() => scrollToPercent(0.47)} className="hover:opacity-75 transition-opacity">
                [ IT ]
              </button>
              <button onClick={() => scrollToPercent(0.64)} className="hover:opacity-75 transition-opacity">
                [ AI ]
              </button>
              <button onClick={() => scrollToPercent(0.85)} className="hover:opacity-75 transition-opacity">
                [ CONTACT ]
              </button>
            </nav>
          </header>

          {/* ==========================================
              DYNAMIC BACKGROUND ARCHITECTURAL GRID
              ========================================== */}
          <motion.div style={{ scaleY: lineV1Scale }} className="absolute top-0 left-[20vw] w-[1px] h-full bg-electric/5 origin-top z-0" />
          <motion.div style={{ scaleY: lineV2Scale }} className="absolute top-0 left-[80vw] w-[1px] h-full bg-electric/5 origin-top z-0" />
          <motion.div style={{ scaleX: lineH1Scale }} className="absolute top-[25vh] left-0 w-full h-[1px] bg-electric/5 origin-left z-0" />
          <motion.div style={{ scaleX: lineH2Scale }} className="absolute top-[75vh] left-0 w-full h-[1px] bg-electric/5 origin-left z-0" />


          {/* ==========================================
              STAGE 1: SOKOŁEK STUDIO TITLE
              ========================================== */}
          <motion.div 
            style={{ opacity: s1Op, display: s1Display }}
            className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16 z-10"
          >
            <div className="relative w-full max-w-7xl flex flex-col justify-center items-stretch h-[60vh]">
              <motion.h1 
                style={{ x: s1TextLeft }}
                className="font-satoshi text-[12vw] md:text-[14vw] font-black uppercase tracking-tighter leading-none text-left"
              >
                Sokołek
              </motion.h1>

              <motion.div 
                style={{ scaleX: s1LineScale }}
                className="h-[1px] bg-electric w-full my-6 md:my-8 origin-left"
              />

              <motion.h1 
                style={{ x: s1TextRight }}
                className="font-satoshi text-[12vw] md:text-[14vw] font-light italic uppercase tracking-tighter leading-none text-right"
              >
                Studio
              </motion.h1>
            </div>
          </motion.div>


          {/* ==========================================
              STAGE 2: MANIFESTO
              ========================================== */}
          <motion.div 
            style={{ opacity: s2Op, y: s2Y, display: s2Display }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16 z-10"
          >
            <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-stretch gap-10 md:gap-16">
              <motion.div 
                style={{ scaleY: s2LineScaleY }}
                className="w-[1px] bg-electric/20 origin-top hidden md:block"
              />
              <div className="flex flex-col gap-6 md:gap-8 justify-center">
                <h2 className="font-satoshi text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight">
                  Systems architecture.<br />Visual precision.
                </h2>
                <p className="font-inter text-lg md:text-xl text-electric/50 max-w-3xl leading-relaxed">
                  Sokołek Studio operates at the boundary of design purity and hardcore engineering. 
                  We construct durable digital systems, graphic frameworks, and advanced neural modules for partners who prioritize technical clarity and structural logic. 
                  We do not build temporal artifacts; we write structural foundations.
                </p>
              </div>
            </div>
          </motion.div>


          {/* ==========================================
              STAGE 3: DESIGN SYSTEMS
              ========================================== */}
          <motion.div 
            style={{ opacity: s3Op, y: s3TextY, display: s3Display }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16 z-10"
          >
            <div className="relative w-full max-w-5xl flex flex-col justify-center gap-8 md:gap-12">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-electric/10 pb-6">
                <h2 className="font-satoshi text-4xl md:text-7xl font-black uppercase tracking-tighter">
                  01 / Design Systems
                </h2>
                <span className="font-mono text-[10px] md:text-xs tracking-widest text-electric/40 uppercase mt-2 md:mt-0">
                  VISUAL LOGIC & INTERFACES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-8">
                  <p className="font-inter text-base md:text-lg text-electric/60 leading-relaxed">
                    We engineer uncompromising visual grids. Specialized in structural typography systems, spatial computing layouts, design asset pipelines, and high-fidelity motion systems. Our work translates branding metrics into mathematical rules, establishing clean, predictable, and gorgeous front-end architectures that adapt seamlessly across devices and display parameters.
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col gap-4 font-mono text-[10px] md:text-xs text-electric/40 border-l border-electric/10 pl-6 md:pl-8">
                  <div className="flex justify-between"><span>[BRAND ARCHITECTURE]</span></div>
                  <div className="flex justify-between"><span>[SPATIAL UI/UX]</span></div>
                  <div className="flex justify-between"><span>[INTERACTIVE MOTION]</span></div>
                  <div className="flex justify-between"><span>[DESIGN ASSET PIPELINES]</span></div>
                </div>
              </div>
              <motion.div style={{ scaleX: s3LineScaleX }} className="h-[1px] bg-electric/20 w-full origin-left" />
            </div>
          </motion.div>


          {/* ==========================================
              STAGE 4: CORE ENGINEERING
              ========================================== */}
          <motion.div 
            style={{ opacity: s4Op, y: s4TextY, display: s4Display }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16 z-10"
          >
            <div className="relative w-full max-w-5xl flex flex-col justify-center gap-8 md:gap-12">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-electric/10 pb-6">
                <h2 className="font-satoshi text-4xl md:text-7xl font-black uppercase tracking-tighter">
                  02 / Engineering
                </h2>
                <span className="font-mono text-[10px] md:text-xs tracking-widest text-electric/40 uppercase mt-2 md:mt-0">
                  DISTRIBUTED SYSTEMS & PERFORMANCE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-8">
                  <p className="font-inter text-base md:text-lg text-electric/60 leading-relaxed">
                    We develop performance-critical backends and server structures. Our core competence includes architecting real-time streaming services, configuring secure distributed infrastructures, and establishing robust custom databases. We code with type-safe parameters, compile-time assurances, and minimal packaging vectors to ensure system security, high performance under peak loads, and structural simplicity.
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col gap-4 font-mono text-[10px] md:text-xs text-electric/40 border-l border-electric/10 pl-6 md:pl-8">
                  <div className="flex justify-between"><span>[DISTRIBUTED SYSTEMS]</span></div>
                  <div className="flex justify-between"><span>[TYPE-SAFE ENGINE]</span></div>
                  <div className="flex justify-between"><span>[API OPTIMIZATION]</span></div>
                  <div className="flex justify-between"><span>[CLOUD INFRAS & SECURITY]</span></div>
                </div>
              </div>
              <motion.div style={{ scaleY: s4LineScaleY }} className="w-[1px] bg-electric/20 h-16 origin-top mx-auto" />
            </div>
          </motion.div>


          {/* ==========================================
              STAGE 5: AI & COGNITIVE SYSTEMS
              ========================================== */}
          <motion.div 
            style={{ opacity: s5Op, y: s5TextY, display: s5Display }}
            className="absolute inset-0 flex items-center justify-center px-6 md:px-16 z-10"
          >
            <div className="relative w-full max-w-5xl flex flex-col justify-center gap-8 md:gap-12">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-electric/10 pb-6">
                <h2 className="font-satoshi text-4xl md:text-7xl font-black uppercase tracking-tighter">
                  03 / AI Systems
                </h2>
                <span className="font-mono text-[10px] md:text-xs tracking-widest text-electric/40 uppercase mt-2 md:mt-0">
                  COGNITIVE PIPELINES & AGENTS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-8">
                  <p className="font-inter text-base md:text-lg text-electric/60 leading-relaxed">
                    We implement enterprise artificial intelligence frameworks. Specialized in deploying and fine-tuning local open-source LLMs, building semantic search and custom vector retrieval (RAG) indices, and coding multi-agent orchestration systems. Our focus is moving AI models away from sandbox environments into highly integrated pipelines that handle live database interfaces securely and generate measurable efficiency gains.
                  </p>
                </div>
                <div className="md:col-span-4 flex flex-col gap-4 font-mono text-[10px] md:text-xs text-electric/40 border-l border-electric/10 pl-6 md:pl-8">
                  <div className="flex justify-between"><span>[AGENT AUTOMATION]</span></div>
                  <div className="flex justify-between"><span>[RAG PIPELINES]</span></div>
                  <div className="flex justify-between"><span>[LOCAL MODEL TUNING]</span></div>
                  <div className="flex justify-between"><span>[COGNITIVE SYSTEMS]</span></div>
                </div>
              </div>
              <motion.div style={{ scaleX: s5LineScaleX }} className="h-[1px] bg-electric/20 w-full origin-right" />
            </div>
          </motion.div>


          {/* ==========================================
              STAGE 6: CONTACT & OUTRO
              ========================================== */}
          <motion.div 
            style={{ opacity: s6Op, display: s6Display }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 z-10"
          >
            <div className="relative flex flex-col items-center max-w-4xl text-center">
              <motion.h2 
                style={{ scale: s6Scale }}
                className="font-satoshi text-[11vw] font-black uppercase tracking-tighter leading-none mb-6 hover:opacity-85 transition-opacity cursor-pointer"
              >
                Let's Talk
              </motion.h2>

              <motion.div 
                style={{ scaleX: s6LineScale }}
                className="h-[1px] bg-electric/30 w-[300px] md:w-[500px] mb-8"
              />

              <motion.div 
                style={{ opacity: s6SubOp, y: s6SubY }}
                className="flex flex-col items-center gap-4"
              >
                <a
                  href="mailto:hello@sokolek.com"
                  className="font-inter text-2xl md:text-4xl text-electric font-medium hover:opacity-80 transition-opacity relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-electric after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100"
                >
                  hello@sokolek.com
                </a>
                <p className="font-mono text-xs tracking-widest text-electric/30 uppercase mt-4">
                  Based in Poland // Deploying Globally
                </p>
              </motion.div>
            </div>
          </motion.div>


          {/* ==========================================
              SCROLL PROGRESS BAR & METRIC TRACK (Monochrome)
              ========================================== */}
          <div className="absolute top-[25vh] right-[40px] md:right-[60px] h-[50vh] w-[1px] bg-electric/10 z-50">
            {/* Scroll indicator cursor */}
            <div 
              ref={barRef}
              className="absolute top-0 left-0 w-full bg-electric transition-all duration-75 origin-top"
              style={{ height: '0%' }}
            />
            {/* Scroll progress string */}
            <div className="absolute top-full right-0 translate-y-4 whitespace-nowrap text-right mix-blend-difference">
              <span 
                ref={percentRef} 
                className="font-mono text-[9px] tracking-[0.2em] text-electric/40 block"
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
