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
import { Process } from './components/home/process'
import { Services } from './components/home/services'
import { TargetAudience } from './components/home/target-audience'
import { useCookieConsent } from './hooks/use-cookie-consent'
import { useSmoothScroll } from './hooks/use-smooth-scroll'
import { cx } from './lib/class-names'
import { RealizacjePage } from './pages/realizacje'

function getCurrentPath() {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

function App() {
  useSmoothScroll()

  const { dismissNotice, shouldShowNotice } = useCookieConsent()
  const audienceRegionRef = useRef<HTMLDivElement>(null)
  const [audienceThemeActive, setAudienceThemeActive] = useState(false)
  const [isIntroTypingActive, setIsIntroTypingActive] = useState(false)
  const [isIntroDismissing, setIsIntroDismissing] = useState(false)
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const [currentPath, setCurrentPath] = useState(getCurrentPath)

  const completeIntroTyping = useCallback(() => {
    setIsIntroDismissing(true)
  }, [])

  useEffect(() => {
    const handlePopState = () => setCurrentPath(getCurrentPath())

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 })
  }, [currentPath])

  useEffect(() => {
    const region = audienceRegionRef.current

    if (!region) {
      return
    }

    const mobileQuery = window.matchMedia('(max-width: 767px)')
    let observer: IntersectionObserver | null = null

    const observeRegion = () => {
      observer?.disconnect()
      observer = new IntersectionObserver(
        ([entry]) => {
          setAudienceThemeActive(entry.isIntersecting)
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
      setAudienceThemeActive(false)
    }
  }, [currentPath])

  if (currentPath === '/realizacje') {
    return (
      <>
        <RealizacjePage />
        <AnimatePresence>
          {shouldShowNotice ? (
            <CookieConsentBanner onDismiss={dismissNotice} />
          ) : null}
        </AnimatePresence>
      </>
    )
  }

  return (
    <main
      className={cx(
        'site-shell min-h-dvh bg-paper text-ink antialiased',
        audienceThemeActive && 'site-shell--focus',
      )}
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
      <div ref={audienceRegionRef}>
        <TargetAudience />
      </div>
      <Process />
      <MidPageCta />
      <AiPhilosophy />
      <EngineeringFoundation />
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
