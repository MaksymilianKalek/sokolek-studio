import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

export function HorizontalScrollSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  // We have 3 sections, so we want to translate horizontally
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"])

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw]">
          {/* Section 1: Design */}
          <div className="flex h-screen w-screen flex-col items-center justify-center border-r border-white/10 bg-black relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]"></div>
            <h2 className="font-satoshi text-6xl md:text-9xl font-bold text-white uppercase tracking-tighter z-10">Design</h2>
            <p className="mt-8 text-white/50 max-w-md text-center font-inter text-lg z-10">Clean, brutalist aesthetics engineered for high impact.</p>
          </div>
          
          {/* Section 2: IT Services */}
          <div className="flex h-screen w-screen flex-col items-center justify-center border-r border-white/10 bg-[#0a0a0a] relative">
            <h2 className="font-mono text-5xl md:text-8xl font-bold text-white uppercase tracking-tight">System.IT()</h2>
            <div className="mt-8 bg-black/80 backdrop-blur-sm border border-white/10 p-6 md:p-10 rounded-lg font-mono text-sm md:text-base text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.1)]">
              <p className="opacity-50">// Initialization</p>
              <p><span className="text-pink-500">const</span> architecture = <span className="text-green-400">"scalable"</span>;</p>
              <p><span className="text-pink-500">const</span> performance = <span className="text-green-400">"maximized"</span>;</p>
              <p className="mt-4"><span className="text-yellow-400">deploy</span>(architecture, performance);</p>
            </div>
          </div>

          {/* Section 3: AI Studio */}
          <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-black overflow-hidden">
            {/* AI Glow Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[30rem] h-[30rem] md:w-[50rem] md:h-[50rem] bg-indigo-500/20 blur-[100px] md:blur-[150px] rounded-full"></div>
            </div>
            <h2 className="relative font-satoshi text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-[#00F0FF] uppercase tracking-tighter z-10">AI Studio</h2>
            <p className="relative mt-8 text-white/70 max-w-md text-center font-inter text-lg z-10">Intelligent solutions. Model integration. The future.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
