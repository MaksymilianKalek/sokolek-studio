import { motion } from 'motion/react'
import { DataItem, DataReveal } from './motion-primitives'

const heroMeta = ['[STUDIO: SOKOŁEK]', '[DISCIPLINE: DESIGN / AI / WEB]', '[BASE: POZNAŃ]']

export function Hero() {
  return (
    <section className="flex h-screen flex-col bg-paper text-ink md:grid md:grid-cols-[30%_70%]">
      <aside className="px-5 py-6 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-neutral-500 sm:px-8 lg:px-10">
        <img src="/logo.svg" alt="Sokołek Studio" className="mb-24 w-36" />
        <DataReveal className="grid gap-3" delay={0.25}>
          {heroMeta.map((item) => (
            <DataItem key={item}>{item}</DataItem>
          ))}
        </DataReveal>
      </aside>

      <motion.div
        id="top"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-1 flex-col justify-center px-5 sm:px-8 md:h-screen lg:px-10"
      >
        <h1>
          <span className="sr-only">Sokołek Studio</span>
          <motion.img
            src="/logo.svg"
            alt=""
            className="w-full max-w-[62rem]"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          />
        </h1>

        <DataReveal className="mt-24 grid gap-4 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-neutral-500 md:grid-cols-2">
          <DataItem>[OUTPUT: BRAND SYSTEMS / AI INTERFACES]</DataItem>
          <DataItem>[METHOD: STRUCTURED EDITORIAL MINIMALISM]</DataItem>
        </DataReveal>
      </motion.div>
    </section>
  )
}
