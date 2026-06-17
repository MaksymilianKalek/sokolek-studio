import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../reveal'
import { SectionLabel } from './section-label'

export function PortfolioPreview() {
  return (
    <section id="portfolio" className="bg-ink px-5 py-24 text-paper sm:px-8 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[92rem]">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionLabel>Portfolio</SectionLabel>
              <h2 className="mt-5 max-w-4xl font-satoshi text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-paper sm:text-7xl">
                A calm digital home for a place built with real care.
              </h2>
            </div>
            <p className="max-w-sm font-inter text-sm leading-6 text-paper/62">
              DOG TOK is a training retreat for dogs and their handlers, set across 3.5 hectares
              of fenced meadows, cabins, water, and focused workshop infrastructure.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <article className="mt-14 grid items-stretch overflow-hidden border border-paper/18 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[26rem] overflow-hidden text-ink lg:min-h-0">
              <div className="accent-gradient absolute inset-x-0 top-0 z-10 h-1" />
              <div className="h-full overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.22)]">
                <img
                  src="/portfolio/dogtok.png"
                  alt="DOG TOK Szkoleniowy Raj website designed and developed by Sokołek Studio"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-16 border-t border-paper/18 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <div>
                <p className="font-inter text-sm uppercase tracking-[0.2em] text-paper/45">
                  Website / Identity / Experience
                </p>
                <h3 className="mt-5 font-satoshi text-4xl font-medium leading-[0.98] tracking-[-0.045em] sm:text-5xl">
                  DOG TOK Szkoleniowy Raj
                </h3>
                <p className="mt-6 font-inter text-base leading-7 text-paper/68">
                  A minimal bilingual site for a premium training destination in Magiczny Las.
                  The page translates a dense offer - workshops, camps, lodging, dog-friendly
                  facilities, event categories, and a 2026 schedule - into a clear editorial
                  structure.
                </p>
                <dl className="mt-8 grid gap-5 border-t border-paper/14 pt-6 font-inter sm:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-paper/38">Focus</dt>
                    <dd className="mt-2 text-sm leading-6 text-paper/72">
                      Calm navigation for events, place details, founder story, and contact.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.2em] text-paper/38">Role</dt>
                    <dd className="mt-2 text-sm leading-6 text-paper/72">
                      Designed and developed by Sokołek Studio.
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://dogtok.pl"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex w-fit items-center gap-3 px-5 py-3 font-inter text-sm font-medium text-paper outline-none transition-colors before:absolute before:inset-0 before:ring-1 before:ring-paper/35 before:transition-opacity hover:before:opacity-0 focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
                >
                  <span className="accent-gradient absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10">Visit live site</span>
                  <ArrowUpRight className="relative z-10 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <a
                  href="mailto:hello@sokolek.com?subject=Portfolio%20case%20inquiry"
                  className="group inline-flex w-fit items-center gap-3 py-3 font-inter text-sm font-medium text-paper/62 outline-none transition-colors hover:text-paper focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-4 focus-visible:ring-offset-ink"
                >
                  <span className="border-b border-paper/18 pb-0.5 transition-colors group-hover:border-paper/55">
                    Ask about similar work
                  </span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
