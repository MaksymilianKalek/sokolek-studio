import { DataItem, DataReveal, MaskTextReveal } from './motion-primitives'

const services = [
  {
    index: '01',
    title: 'Brand systems',
    tags: '[IDENTITY] [TYPOGRAPHY] [ART DIRECTION]',
  },
  {
    index: '02',
    title: 'AI interfaces',
    tags: '[LLM UX] [WORKFLOWS] [EVALUATION]',
  },
  {
    index: '03',
    title: 'Web systems',
    tags: '[REACT] [VITE] [PERFORMANCE]',
  },
]

export function Services() {
  return (
    <section id="services" className="grid bg-paper text-ink md:grid-cols-[30%_70%]">
      <aside className="px-5 py-10 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-neutral-500 sm:px-8 lg:px-10">
        <DataReveal className="sticky top-10 grid gap-3">
          <DataItem>[SECTION: SERVICES]</DataItem>
          <DataItem>[ROWS: 03]</DataItem>
        </DataReveal>
      </aside>

      <div>
        {services.map((service, itemIndex) => (
          <article
            key={service.index}
            className="grid gap-8 border-b border-neutral-200 px-5 py-16 sm:px-8 md:py-10 lg:grid-cols-[1fr_14rem] lg:px-10"
          >
            <DataReveal delay={0.22 + itemIndex * 0.08}>
              <div>
                <DataItem className="mb-5 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-neutral-500">
                  [{service.index}]
                </DataItem>
                <h2 className="font-satoshi text-6xl font-medium leading-none tracking-tighter text-ink md:text-[7vw]">
                  <MaskTextReveal delay={itemIndex * 0.08}>{service.title}</MaskTextReveal>
                </h2>
              </div>
            </DataReveal>
            <DataReveal
              delay={0.5 + itemIndex * 0.08}
              className="font-mono text-[10px] uppercase leading-relaxed tracking-widest text-neutral-500 lg:pt-11"
            >
              <DataItem>
                {service.tags}
              </DataItem>
            </DataReveal>
          </article>
        ))}
      </div>
    </section>
  )
}
