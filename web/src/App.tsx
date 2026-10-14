import { useCallback, useEffect, useState } from 'react'
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
import { RealizacjePage } from './pages/realizacje'

function getCurrentPath() {
  return window.location.pathname.replace(/\/$/, '') || '/'
}

function App() {
  useSmoothScroll()

  const { acceptAnalytics, rejectAnalytics, shouldShowNotice } = useCookieConsent()
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

  if (currentPath === '/portfolio') {
    return (
      <>
        <RealizacjePage />
        <AnimatePresence>
          {shouldShowNotice ? (
            <CookieConsentBanner onAccept={acceptAnalytics} onReject={rejectAnalytics} />
          ) : null}
        </AnimatePresence>
      </>
    )
  }

  return (
    <main className="site-shell min-h-dvh bg-paper text-ink antialiased">
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
      <Philosophy />
      <Footer />
      <AnimatePresence>
        {(isIntroDismissing || isIntroComplete) && shouldShowNotice ? (
          <CookieConsentBanner onAccept={acceptAnalytics} onReject={rejectAnalytics} />
        ) : null}
      </AnimatePresence>
    </main>
  )
}

export default App
