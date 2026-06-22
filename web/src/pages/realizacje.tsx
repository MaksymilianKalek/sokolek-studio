import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { SiteHeader } from '../components/site-header'
import { Reveal } from '../components/reveal'
import { Footer } from '../components/home/footer'
import { PrimaryCtaLink } from '../components/home/ui'
import { SectionLabel } from '../components/home/section-label'

type PortfolioProject = {
  client: string
  id: string
  image: string
  imageAlt: string
  imageSizes: string
  imageSrcSet: string
  index: string
  industry: string
  liveUrl?: string
  scope: string[]
  summary: string
  title: string
  year: string
}

const dogTokScreenshotSrc = '/portfolio/dogtok-screenshot-960.webp'
const dogTokScreenshotSrcSet = '/portfolio/dogtok-screenshot-640.webp 640w, /portfolio/dogtok-screenshot-960.webp 960w, /portfolio/dogtok-screenshot-1200.webp 1200w, /portfolio/dogtok-screenshot-1600.webp 1600w, /portfolio/dogtok-screenshot-2400.webp 2400w, /portfolio/dogtok-screenshot-3200.webp 3200w'
const dogTokScreenshotSizes = '(min-width: 1280px) 82rem, (min-width: 768px) calc(100vw - 5rem), calc(100vw - 2.5rem)'

export function RealizacjePage() {
  const { t } = useTranslation()
  const projects: PortfolioProject[] = [
    {
      client: t('portfolio.dogTok.data.client'),
      id: 'dog-tok',
      image: dogTokScreenshotSrc,
      imageAlt: t('portfolio.dogTok.imageAlt'),
      imageSizes: dogTokScreenshotSizes,
      imageSrcSet: dogTokScreenshotSrcSet,
      index: '01',
      industry: t('portfolio.dogTok.data.industry'),
      liveUrl: 'https://dogtok.pl',
      scope: t('portfolio.dogTok.data.stack').split(' / '),
      summary: t('portfolio.dogTok.summary'),
      title: t('portfolio.dogTok.subtitle'),
      year: t('portfolio.dogTok.data.year'),
    },
  ]

  return (
    <main className="site-shell min-h-dvh bg-paper text-ink antialiased">
      <section className="relative overflow-hidden px-5 py-5 sm:px-8 lg:px-10">
        <SiteHeader />

        <div className="site-container pt-16 sm:pt-22 lg:pt-24">
          <Reveal>
            <SectionLabel>{t('portfolio.label')}</SectionLabel>
          </Reveal>

          <div className="section-offset grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,0.42fr)] lg:items-end">
            <Reveal>
              <h1 className="max-w-[11ch] font-satoshi text-[clamp(4.5rem,8vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
                {t('portfolio.heading')}
              </h1>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-6">
                <p className="body-copy max-w-sm">
                  {t('portfolio.intro')}
                </p>
                <PrimaryCtaLink href="mailto:hello@sokolek.com">
                  {t('common.startProject')}
                </PrimaryCtaLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <PortfolioProjectList projects={projects} />

      <Footer />
    </main>
  )
}

function PortfolioProjectList({ projects }: { projects: PortfolioProject[] }) {
  return (
    <section className="site-section-compact pt-12 sm:pt-16 lg:pt-20">
      <div className="site-container grid gap-28 lg:gap-36">
        {projects.map((project, index) => (
          <PortfolioProjectItem
            key={project.id}
            isFirst={index === 0}
            project={project}
          />
        ))}
      </div>
    </section>
  )
}

function PortfolioProjectItem({
  isFirst,
  project,
}: {
  isFirst: boolean
  project: PortfolioProject
}) {
  const { t } = useTranslation()

  return (
    <Reveal>
      <motion.article
        className="overflow-hidden border border-line bg-paper"
      >
        <ProjectImage
          isFirst={isFirst}
          project={project}
          visitLabel={t('common.visitLiveSite')}
        />

        <div className="grid gap-8 bg-ink px-5 py-4 text-paper sm:px-6 sm:py-5 lg:grid-cols-[minmax(15rem,0.38fr)_minmax(0,0.42fr)_minmax(17rem,0.3fr)] lg:gap-10 lg:px-8 lg:py-7">
          <div>
            <p className="meta-text text-paper/50">
              {project.index}
            </p>
            <h2 className="heading-sm mt-4 max-w-lg text-paper">
              {project.title}
            </h2>
          </div>

          <p className="body-copy max-w-2xl !text-paper lg:pt-8">
            {project.summary}
          </p>

          <div className="grid gap-6 lg:pt-8">
            <ProjectMetadata project={project} />

            {project.liveUrl ? (
              <PrimaryCtaLink
                href={project.liveUrl}
                ariaLabel={`${t('common.visitLiveSite')}: ${project.title}`}
                className="mt-1"
                inverted
                target="_blank"
                rel="noreferrer"
              >
                {t('common.visitLiveSite')}
              </PrimaryCtaLink>
            ) : null}
          </div>
        </div>
      </motion.article>
    </Reveal>
  )
}

function ProjectImage({
  isFirst,
  project,
  visitLabel,
}: {
  isFirst: boolean
  project: PortfolioProject
  visitLabel: string
}) {
  const image = (
    <>
      <img
        src={project.image}
        srcSet={project.imageSrcSet}
        sizes={project.imageSizes}
        alt={project.imageAlt}
        width="960"
        height="460"
        loading={isFirst ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={isFirst ? 'high' : 'auto'}
        className="aspect-[16/9] w-full object-cover"
      />
      <span
        aria-hidden="true"
        className="portfolio-image-dim absolute inset-0 bg-ink-fixed/0 group-hover/image:bg-ink-fixed/18 group-focus-visible/image:bg-ink-fixed/18"
      />
    </>
  )

  if (!project.liveUrl) {
    return (
      <div className="relative overflow-hidden bg-ink">
        {image}
      </div>
    )
  }

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${visitLabel}: ${project.title}`}
      className="focus-ring-inverted group/image relative block overflow-hidden bg-ink"
    >
      {image}
    </a>
  )
}

function ProjectMetadata({ project }: { project: PortfolioProject }) {
  const { t } = useTranslation()
  const metadata = [
    {
      label: t('portfolio.dogTok.labels.client'),
      value: project.client,
    },
    {
      label: t('portfolio.dogTok.labels.industry'),
      value: project.industry,
    },
    {
      label: t('portfolio.dogTok.labels.stack'),
      value: project.scope,
    },
    {
      label: t('portfolio.dogTok.labels.year'),
      value: project.year,
    },
  ]

  return (
    <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-1">
      {metadata.map((item) => (
        <div key={item.label}>
          <dt className="meta-text text-paper/44">
            {item.label}
          </dt>
          <dd className="meta-text mt-2 text-paper">
            {Array.isArray(item.value) ? (
              <span className="flex max-w-[24rem] flex-wrap gap-x-2 gap-y-1 leading-[1.35] tracking-[0.08em]">
                {item.value.map((part, index) => (
                  <span key={part} className="inline-flex">
                    {index > 0 ? <span aria-hidden="true" className="mr-2">/</span> : null}
                    {part}
                  </span>
                ))}
              </span>
            ) : item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
