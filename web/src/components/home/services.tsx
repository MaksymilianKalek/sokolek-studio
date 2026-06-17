import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

const services = [
  {
    index: '01',
    title: 'Brand systems',
    description:
      'Naming support, visual direction, typography, identity foundations, and reusable design rules that make a young company feel inevitable.',
  },
  {
    index: '02',
    title: 'AI product interfaces',
    description:
      'Human-centered AI workflows, prompt surfaces, automation dashboards, and evaluation-minded UX for teams building with language models.',
  },
  {
    index: '03',
    title: 'Premium web experiences',
    description:
      'Fast, responsive React websites and product surfaces with careful motion, accessibility, and performance as part of the design language.',
  },
  {
    index: '04',
    title: 'Technical direction',
    description:
      'Architecture, implementation planning, and focused senior engineering for founders who need clarity before scale turns expensive.',
  },
]

export function Services() {
  return (
    <section id="services" className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[92rem] gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <div className="sticky top-10">
            <SectionLabel>Services</SectionLabel>
            <h2 className="mt-5 max-w-xl font-satoshi text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">
              Designed to look simple. Built to stay useful.
            </h2>
          </div>
        </Reveal>

        <div className="border-t border-line">
          {services.map((service, itemIndex) => (
            <Reveal key={service.index} delay={itemIndex * 0.08}>
              <article className="grid gap-5 border-b border-line py-8 sm:grid-cols-[6rem_0.75fr_1fr] sm:py-10">
                <p className="font-inter text-sm text-ink-muted">{service.index}</p>
                <h3 className="font-satoshi text-3xl font-medium leading-none tracking-[-0.035em]">
                  {service.title}
                </h3>
                <p className="font-inter text-base leading-7 text-ink-soft">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
