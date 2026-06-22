import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { CookieConsentBanner } from './components/cookie-consent-banner'
import { LoadingCurtain } from './components/loading-curtain'
import { AiPhilosophy } from './components/home/ai-philosophy'
import { EngineeringFoundation } from './components/home/engineering-foundation'
import { Footer } from './components/home/footer'
import { Hero } from './components/home/hero'
import { MidPageCta } from './components/home/mid-page-cta'
import { Philosophy } from './components/home/philosophy'
import { PortfolioPreview } from './components/home/portfolio-preview'
import { Process } from './components/home/process'
import { Services } from './components/home/services'
import { TargetAudience } from './components/home/target-audience'
import { useCookieConsent } from './hooks/use-cookie-consent'
import { useSmoothScroll } from './hooks/use-smooth-scroll'

function App() {
  useSmoothScroll()

  const { dismissNotice, shouldShowNotice } = useCookieConsent()
  const portfolioProofRegionRef = useRef<HTMLDivElement>(null)
  const [portfolioThemeActive, setPortfolioThemeActive] = useState(false)
  const [isIntroTypingActive, setIsIntroTypingActive] = useState(false)
  const [isIntroDismissing, setIsIntroDismissing] = useState(false)
  const [isIntroComplete, setIsIntroComplete] = useState(false)

  const completeIntroTyping = useCallback(() => {
    setIsIntroDismissing(true)
  }, [])

  useEffect(() => {
    const region = portfolioProofRegionRef.current

    if (!region) {
      return
    }

    const mobileQuery = window.matchMedia('(max-width: 767px)')
    let observer: IntersectionObserver | null = null

    const observeRegion = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        ([entry]) => {
          setPortfolioThemeActive(entry.isIntersecting)
        },
        {
          rootMargin: mobileQuery.matches ? '-52% 0px -32% 0px' : '-60% 0px -35% 0px',
          threshold: 0,
        },
      )
      observer.observe(region)
    }

    observeRegion()
    mobileQuery.addEventListener('change', observeRegion)

    return () => {
      mobileQuery.removeEventListener('change', observeRegion)
      observer?.disconnect()
      setPortfolioThemeActive(false)
    }
  }, [])

  return (
    <main
      className={`site-shell min-h-dvh bg-paper text-ink antialiased ${
        portfolioThemeActive ? 'site-shell--portfolio' : ''
      }`}
    >
      <div className="relative overflow-hidden">
        <Hero
          isIntroActive={!isIntroComplete}
          isIntroDismissing={isIntroDismissing}
          onIntroTypingComplete={completeIntroTyping}
          startTyping={isIntroTypingActive}
        />
        <LoadingCurtain
          className="absolute inset-0"
          isDismissing={isIntroDismissing}
          onComplete={() => setIsIntroComplete(true)}
          onReadyToType={() => setIsIntroTypingActive(true)}
        />
      </div>
      <Services />
      <TargetAudience />
      <Process />
      <MidPageCta />
      <AiPhilosophy />
      <EngineeringFoundation />
      <div ref={portfolioProofRegionRef}>
        <PortfolioPreview />
      </div>
      <Philosophy />
      <Footer />
      <AnimatePresence>
        {(isIntroDismissing || isIntroComplete) && shouldShowNotice ? (
          <CookieConsentBanner onDismiss={dismissNotice} />
        ) : null}
      </AnimatePresence>
    </main>
  )
}

export default App
