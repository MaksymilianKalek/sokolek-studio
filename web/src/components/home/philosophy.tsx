import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

const principles = [
  'Start with what must become obvious.',
  'Design the smallest system that can carry the ambition.',
  'Make the interaction feel inevitable before making it loud.',
]

export function Philosophy() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Reveal>
          <div>
            <SectionLabel>Philosophy</SectionLabel>
            <h2 className="mt-5 font-satoshi text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">
              Clear work wins before it shouts.
            </h2>
          </div>
        </Reveal>

        <div className="space-y-12">
          <Reveal delay={0.08}>
            <p className="font-satoshi text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl">
              We pair taste with engineering discipline, so every page, workflow, and brand
              decision has a job.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="grid gap-5 font-inter text-base leading-7 text-ink-soft sm:grid-cols-2">
              <p>
                Sokołek Studio is intentionally small. That keeps strategy, design, and code close
                enough to move quickly without losing the thread.
              </p>
              <p>
                We are best for founders and teams who want a premium digital presence, a sharper
                product surface, or an AI-enabled workflow that people can actually understand.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ol className="border-t border-line">
              {principles.map((principle) => (
                <li
                  key={principle}
                  className="border-b border-line py-5 font-inter text-lg text-ink"
                >
                  {principle}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
