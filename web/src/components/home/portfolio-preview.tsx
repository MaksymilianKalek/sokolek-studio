import { ArrowUpRight } from 'lucide-react'
import { DataItem, DataReveal, MaskTextReveal, ParallaxImage } from './motion-primitives'

const project = {
  index: '01',
  name: 'DOG TOK',
  client: 'DOG TOK SZKOLENIOWY RAJ',
  industry: 'CANINE EDUCATION / RETREAT INFRASTRUCTURE',
  stack: 'REACT / VITE / TYPESCRIPT / I18N',
  year: '2026',
  url: 'https://dogtok.pl',
  image: '/portfolio/dogtok.webp',
  alt: 'DOG TOK Szkoleniowy Raj website designed and developed by Sokołek Studio',
}

export function PortfolioPreview() {
  return (
    <section id="portfolio" className="grid bg-ink text-paper md:grid-cols-[30%_70%]">
      <aside className="grid content-between gap-16 px-5 py-14 sm:px-8 lg:px-10">
        <DataReveal className="font-mono text-[10px] uppercase leading-relaxed tracking-widest text-neutral-500">
          <DataItem>[CASE: {project.index}]</DataItem>
        </DataReveal>

        <DataReveal className="grid font-mono text-[10px] uppercase leading-relaxed tracking-widest text-neutral-500" delay={0.35}>
          <DataItem className="grid grid-cols-[6rem_1fr] gap-5 border-b border-neutral-800 py-4">
            <dt>[CLIENT]</dt>
            <dd className="text-paper">{project.client}</dd>
          </DataItem>
          <DataItem className="grid grid-cols-[6rem_1fr] gap-5 border-b border-neutral-800 py-4">
            <dt>[INDUSTRY]</dt>
            <dd className="text-paper">{project.industry}</dd>
          </DataItem>
          <DataItem className="grid grid-cols-[6rem_1fr] gap-5 border-b border-neutral-800 py-4">
            <dt>[STACK]</dt>
            <dd className="text-paper">{project.stack}</dd>
          </DataItem>
          <DataItem className="grid grid-cols-[6rem_1fr] gap-5 border-b border-neutral-800 py-4">
            <dt>[YEAR]</dt>
            <dd className="text-paper">{project.year}</dd>
          </DataItem>
        </DataReveal>

        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex w-fit gap-3 border-b border-paper pb-2 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-paper outline-none transition-colors hover:border-[var(--color-brand-orange)] focus-visible:ring-2 focus-visible:ring-paper"
        >
          [VISIT LIVE SITE]
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </aside>

      <div className="px-5 py-14 sm:px-8 lg:px-10">
        <h2 className="mb-10 font-satoshi text-6xl font-medium uppercase leading-none tracking-tighter text-paper md:text-[7vw]">
          <MaskTextReveal>{project.name}</MaskTextReveal>
        </h2>
        <ParallaxImage src={project.image} alt={project.alt} className="h-[62vh] min-h-[28rem] w-full" />
      </div>
    </section>
  )
}
