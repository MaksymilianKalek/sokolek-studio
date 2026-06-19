import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { CookieConsentBanner } from './components/cookie-consent-banner'
import { LoadingCurtain } from './components/loading-curtain'
import { Footer } from './components/home/footer'
import { Hero } from './components/home/hero'
import { Philosophy } from './components/home/philosophy'
import { PortfolioPreview } from './components/home/portfolio-preview'
import { Services } from './components/home/services'
import { useCookieConsent } from './hooks/use-cookie-consent'
import { useSmoothScroll } from './hooks/use-smooth-scroll'

function App() {
  useSmoothScroll()

  const { acceptConsent, consent, rejectConsent } = useCookieConsent()
  const [portfolioThemeActive, setPortfolioThemeActive] = useState(false)
  const [isIntroTypingActive, setIsIntroTypingActive] = useState(false)
  const [isIntroDismissing, setIsIntroDismissing] = useState(false)
  const [isIntroComplete, setIsIntroComplete] = useState(false)
  const completeIntroTyping = useCallback(() => {
    setIsIntroDismissing(true)
  }, [])

  return (
    <main
      className={`site-shell min-h-dvh bg-paper text-ink antialiased ${
        portfolioThemeActive ? 'site-shell--portfolio' : ''
      }`}
    >
      <Hero
        isIntroActive={!isIntroComplete}
        isIntroDismissing={isIntroDismissing}
        onIntroTypingComplete={completeIntroTyping}
        startTyping={isIntroTypingActive}
      />
      <Services />
      <PortfolioPreview onActiveChange={setPortfolioThemeActive} />
      <Philosophy />
      <Footer />
      <AnimatePresence>
        {consent === 'pending' ? (
          <CookieConsentBanner onAccept={acceptConsent} onReject={rejectConsent} />
        ) : null}
      </AnimatePresence>
      <LoadingCurtain
        isDismissing={isIntroDismissing}
        onComplete={() => setIsIntroComplete(true)}
        onReadyToType={() => setIsIntroTypingActive(true)}
      />
    </main>
  )
}

export default App
